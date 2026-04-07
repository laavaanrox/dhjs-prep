// ===== DHJS PREP — MAIN APP LOGIC =====

// ===== STORAGE HELPERS =====
const Storage = {
  get: (key) => { try { return JSON.parse(localStorage.getItem('dhjs_' + key)); } catch { return null; } },
  set: (key, val) => { try { localStorage.setItem('dhjs_' + key, JSON.stringify(val)); } catch {} },
  getStats: () => Storage.get('stats') || { totalAnswered: 0, totalCorrect: 0, subjects: {}, sessions: [] },
  updateStats: (subject, correct, total) => {
    const stats = Storage.getStats();
    stats.totalAnswered += total;
    stats.totalCorrect += correct;
    if (!stats.subjects[subject]) stats.subjects[subject] = { answered: 0, correct: 0 };
    stats.subjects[subject].answered += total;
    stats.subjects[subject].correct += correct;
    stats.sessions.push({ date: Date.now(), subject, correct, total, pct: Math.round(correct/total*100) });
    if (stats.sessions.length > 50) stats.sessions = stats.sessions.slice(-50);
    Storage.set('stats', stats);
  }
};

// ===== QUIZ ENGINE =====
class QuizEngine {
  constructor(questions, options = {}) {
    this.questions = questions;
    this.options = { timePerQuestion: 90, mode: 'practice', ...options };
    this.currentIndex = 0;
    this.answers = [];
    this.startTime = Date.now();
    this.timer = null;
    this.timeLeft = this.options.timePerQuestion;
    this.answered = false;
  }

  get current() { return this.questions[this.currentIndex]; }
  get isLast() { return this.currentIndex === this.questions.length - 1; }
  get score() { return this.answers.filter(a => a.correct).length; }
  get pct() { return Math.round((this.score / this.answers.length) * 100) || 0; }

  answer(optionIndex) {
    if (this.answered) return null;
    this.answered = true;
    this.stopTimer();
    const correct = optionIndex === this.current.answer;
    const result = { questionId: this.current.id, selected: optionIndex, correct, timeTaken: this.options.timePerQuestion - this.timeLeft };
    this.answers.push(result);
    return { correct, correctAnswer: this.current.answer, result };
  }

  next() {
    if (this.isLast) return false;
    this.currentIndex++;
    this.answered = false;
    this.timeLeft = this.options.timePerQuestion;
    return true;
  }

  startTimer(onTick, onExpire) {
    this.stopTimer();
    this.timeLeft = this.options.timePerQuestion;
    this.timer = setInterval(() => {
      this.timeLeft--;
      onTick(this.timeLeft);
      if (this.timeLeft <= 0) { this.stopTimer(); onExpire(); }
    }, 1000);
  }

  stopTimer() { if (this.timer) { clearInterval(this.timer); this.timer = null; } }

  getResults() {
    return {
      total: this.questions.length,
      answered: this.answers.length,
      correct: this.score,
      wrong: this.answers.filter(a => !a.correct).length,
      pct: this.pct,
      timeTaken: Math.round((Date.now() - this.startTime) / 1000),
      answers: this.answers
    };
  }
}

// ===== FORMAT TIMER =====
function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2,'0')}`;
}

// ===== QUIZ PAGE CONTROLLER =====
function initQuizPage() {
  const container = document.getElementById('quizApp');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const subjectParam = params.get('subject');
  const modeParam = params.get('mode');

  let selectedSubject = subjectParam || 'all';
  let selectedMode = modeParam || 'practice';
  let engine = null;

  function getSubjectName(key) {
    if (key === 'all') return 'Mixed (All Subjects)';
    return SUBJECTS[key]?.name || key;
  }

  function renderSetup() {
    const stats = Storage.getStats();
    const totalPct = stats.totalAnswered > 0 ? Math.round(stats.totalCorrect / stats.totalAnswered * 100) : 0;

    container.innerHTML = `
      <div class="mode-selector fade-in">
        <h2>DHJS Practice Quiz</h2>
        ${stats.totalAnswered > 0 ? `
          <div style="text-align:center;margin-bottom:24px;padding:12px;background:white;border-radius:8px;box-shadow:var(--shadow)">
            <strong>Your Progress:</strong> ${stats.totalAnswered} questions answered |
            <span style="color:var(--success)">${stats.totalCorrect} correct (${totalPct}%)</span>
          </div>` : ''}
        <div class="mode-grid">
          <div class="mode-card ${selectedMode==='practice'?'selected':''}" onclick="selectMode('practice')">
            <div class="mode-icon">📚</div>
            <h3>Practice Mode</h3>
            <p>See explanation after each answer. No time pressure. Best for learning.</p>
          </div>
          <div class="mode-card ${selectedMode==='exam'?'selected':''}" onclick="selectMode('exam')">
            <div class="mode-icon">⏱️</div>
            <h3>Exam Mode</h3>
            <p>90 seconds per question. Simulates actual DHJS prelim pressure.</p>
          </div>
          <div class="mode-card ${selectedMode==='mock'?'selected':''}" onclick="selectMode('mock')">
            <div class="mode-icon">🎯</div>
            <h3>Mock Test (150 Q's)</h3>
            <p>Full prelim simulation: 150 questions, 3 hours, -0.25 for wrong.</p>
          </div>
        </div>

        <div class="subject-selector" style="margin-top:32px">
          <h3>Select Subject:</h3>
          <div class="subject-filter-grid">
            <button class="filter-btn ${selectedSubject==='all'?'active':''}" onclick="selectSubject('all')">All Subjects</button>
            ${Object.entries(SUBJECTS).map(([k,v]) => `
              <button class="filter-btn ${selectedSubject===k?'active':''}" onclick="selectSubject('${k}')">${v.icon} ${v.name} (${v.count()})</button>
            `).join('')}
          </div>
        </div>

        <div style="text-align:center;margin-top:32px">
          <button class="btn btn-primary btn-lg" onclick="startQuiz()">
            Start ${getSubjectName(selectedSubject)} Quiz ▶
          </button>
        </div>
      </div>
    `;

    window.selectMode = (m) => { selectedMode = m; renderSetup(); };
    window.selectSubject = (s) => { selectedSubject = s; renderSetup(); };
    window.startQuiz = () => {
      let questions;
      const count = selectedMode === 'mock' ? 150 : (selectedMode === 'exam' ? 25 : 15);
      if (selectedSubject === 'all') {
        questions = getRandomQuestions(count);
      } else {
        questions = getRandomQuestions(count, selectedSubject);
        if (questions.length === 0) {
          alert('No questions available for this subject yet. Try another subject!');
          return;
        }
      }
      const timePerQ = selectedMode === 'exam' ? 90 : (selectedMode === 'mock' ? 72 : 0);
      engine = new QuizEngine(questions, { timePerQuestion: timePerQ || 9999, mode: selectedMode });
      renderQuestion();

      if (typeof gtag !== 'undefined') {
        gtag('event', 'quiz_start', { mode: selectedMode, subject: selectedSubject, question_count: questions.length });
      }
    };
  }

  function renderQuestion() {
    const q = engine.current;
    const questionNum = engine.currentIndex + 1;
    const total = engine.questions.length;
    const pct = Math.round((questionNum - 1) / total * 100);
    const labels = ['A', 'B', 'C', 'D'];

    container.innerHTML = `
      <div class="quiz-header">
        <div class="quiz-header-inner">
          <div class="quiz-meta">
            <span class="q-badge">${getSubjectName(selectedSubject)}</span>
            <span class="q-score">Score: <span>${engine.score}/${engine.answers.length}</span></span>
          </div>
          ${engine.options.mode !== 'practice' ? `
            <div class="timer-display" id="timerDisplay">⏱ <span id="timerText">${formatTime(engine.timeLeft)}</span></div>` : ''}
          <button class="btn btn-sm" style="background:var(--bg);border:1px solid var(--border)" onclick="endQuiz()">End Quiz</button>
        </div>
      </div>

      <div class="quiz-body fade-in">
        <div class="progress-bar-wrap">
          <div class="progress-label">Question ${questionNum} of ${total}</div>
          <div class="progress-bar-track"><div class="progress-bar-fill" id="progressFill" style="width:${pct}%"></div></div>
        </div>

        <div class="question-card">
          <div class="q-number">Question ${questionNum}</div>
          <div class="q-meta-tags">
            <span class="q-tag difficulty-${q.difficulty}">${q.difficulty}</span>
            ${q.year ? `<span class="q-tag">${q.year}</span>` : ''}
          </div>
          <div class="question-text">${q.question}</div>
          <div class="options-grid" id="optionsGrid">
            ${q.options.map((opt, i) => `
              <button class="option-btn" id="opt_${i}" onclick="selectAnswer(${i})" data-index="${i}">
                <span class="opt-label">${labels[i]}.</span>
                <span class="opt-text">${opt}</span>
              </button>
            `).join('')}
          </div>
          <div class="explanation-box" id="explanationBox">
            <strong>✅ Explanation:</strong>
            <p>${q.explanation || 'See the relevant statutory provision and case law.'}</p>
            ${q.year ? `<div class="explanation-year">📄 From: ${q.year}</div>` : ''}
          </div>
        </div>

        <div class="quiz-actions" id="quizActions">
          ${engine.options.mode === 'practice' ? `<button class="btn btn-secondary btn-sm" onclick="skipQuestion()" id="skipBtn">Skip →</button>` : ''}
        </div>
      </div>
    `;

    window.selectAnswer = (index) => {
      const result = engine.answer(index);
      if (!result) return;

      // Disable all buttons
      document.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true);

      // Show correct/wrong
      document.getElementById(`opt_${index}`).classList.add(result.correct ? 'correct' : 'wrong');
      if (!result.correct) {
        document.getElementById(`opt_${result.correctAnswer}`).classList.add('revealed');
      }

      // Show explanation in practice mode
      if (engine.options.mode === 'practice') {
        document.getElementById('explanationBox').classList.add('show');
      }

      // Update actions
      const actions = document.getElementById('quizActions');
      if (!engine.isLast) {
        actions.innerHTML = `<button class="btn btn-primary" onclick="nextQuestion()">Next Question →</button>`;
      } else {
        actions.innerHTML = `<button class="btn btn-success" onclick="showResults()">See Results 🏆</button>`;
      }

      // Track
      if (typeof gtag !== 'undefined') {
        gtag('event', 'question_answered', { correct: result.correct, subject: selectedSubject });
      }
    };

    window.skipQuestion = () => {
      if (!engine.answered) {
        engine.answers.push({ questionId: q.id, selected: -1, correct: false, timeTaken: 0, skipped: true });
        engine.answered = true;
      }
      if (!engine.next()) { showResults(); return; }
      renderQuestion();
    };

    window.nextQuestion = () => {
      if (!engine.next()) { showResults(); return; }
      renderQuestion();
    };

    window.endQuiz = () => {
      engine.stopTimer();
      if (confirm('End quiz and see results?')) showResults();
    };

    // Start timer if exam/mock mode
    if (engine.options.mode !== 'practice') {
      engine.startTimer(
        (t) => {
          const timerText = document.getElementById('timerText');
          const timerDisplay = document.getElementById('timerDisplay');
          if (timerText) timerText.textContent = formatTime(t);
          if (timerDisplay && t <= 15) timerDisplay.classList.add('warning');
        },
        () => {
          // Time expired — count as wrong
          engine.answers.push({ questionId: q.id, selected: -1, correct: false, timeTaken: engine.options.timePerQuestion, expired: true });
          engine.answered = true;
          if (!engine.next()) { showResults(); return; }
          renderQuestion();
        }
      );
    }
  }

  function showResults() {
    engine.stopTimer();
    const r = engine.getResults();
    const subject = selectedSubject;
    // Save to Firebase if logged in, else localStorage
    const sessionPayload = { subject, correct: r.correct, total: r.total, pct: r.pct };
    const fbUser = window.FirebaseApp?.getCurrentUser();
    if (fbUser && window.FirebaseApp) {
      window.FirebaseApp.saveSession(fbUser, sessionPayload);
    } else {
      Storage.updateStats(subject, r.correct, r.total);
    }

    const grade = r.pct >= 80 ? 'excellent' : r.pct >= 60 ? 'good' : 'needs-work';
    const gradeLabel = r.pct >= 80 ? '🏆 Excellent!' : r.pct >= 60 ? '👍 Good Job!' : '📖 Keep Practicing';

    container.innerHTML = `
      <div class="results-screen fade-in">
        <div class="results-card">
          <h2>${gradeLabel}</h2>
          <div class="score-circle ${grade}">
            <span class="score-pct">${r.pct}%</span>
            <span class="score-label-sm">${r.correct}/${r.total}</span>
          </div>
          <div class="results-grid">
            <div class="result-stat">
              <div class="number" style="color:var(--success)">${r.correct}</div>
              <div class="label">Correct</div>
            </div>
            <div class="result-stat">
              <div class="number" style="color:var(--danger)">${r.wrong}</div>
              <div class="label">Wrong</div>
            </div>
            <div class="result-stat">
              <div class="number">${r.answered - r.correct - r.wrong}</div>
              <div class="label">Skipped</div>
            </div>
          </div>
          <p style="margin-bottom:8px">Subject: <strong>${getSubjectName(subject)}</strong></p>
          <p>Time: <strong>${Math.floor(r.timeTaken/60)}m ${r.timeTaken%60}s</strong></p>
          ${r.pct < 60 ? `<div style="margin-top:16px;padding:12px;background:#fef2f2;border-radius:8px;font-size:0.9rem">
            💡 <strong>Tip:</strong> Review the topic in your study plan and try again. Focus on the explanation for each wrong answer.
          </div>` : ''}
        </div>
        <div class="results-actions">
          <button class="btn btn-primary" onclick="location.reload()">Practice Again 🔄</button>
          <a href="studyplan.html" class="btn btn-secondary">Study Plan 📅</a>
          <a href="index.html" class="btn" style="background:white;border:1px solid var(--border)">Home</a>
        </div>
      </div>
    `;

    if (r.pct >= 70) setTimeout(launchConfetti, 400);

    if (typeof gtag !== 'undefined') {
      gtag('event', 'quiz_complete', { score_pct: r.pct, correct: r.correct, total: r.total, subject });
    }
  }

  renderSetup();
}

// ===== ANIMATED COUNTER =====
function animateCounter(el, target, duration = 1500) {
  const start = performance.now();
  const startVal = 0;
  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(startVal + (target - startVal) * eased) + (target === 100 ? '%' : '+');
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target + (el.dataset.suffix || '+');
  }
  requestAnimationFrame(step);
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));
}

// ===== ANIMATED PROGRESS BARS (study plan teaser) =====
function initProgressBars() {
  const bars = document.querySelectorAll('.mp-fill');
  if (!bars.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('animated'), 200);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(bar => observer.observe(bar));
}

// ===== HERO COUNTERS =====
function initHeroCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  if (!counters.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.count);
        animateCounter(entry.target, target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => observer.observe(el));
}

// ===== CONFETTI =====
function launchConfetti() {
  const colors = ['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ef4444', '#fbbf24'];
  for (let i = 0; i < 60; i++) {
    setTimeout(() => {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.cssText = `
        left: ${Math.random() * 100}vw;
        top: -10px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        width: ${6 + Math.random() * 8}px;
        height: ${6 + Math.random() * 8}px;
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        animation-duration: ${1.5 + Math.random() * 2}s;
        animation-delay: ${Math.random() * 0.5}s;
      `;
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 3000);
    }, i * 20);
  }
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', function() {
  // Navbar
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') &&
          !navToggle.contains(e.target) &&
          !navMenu.contains(e.target)) {
        navMenu.classList.remove('open');
      }
    });
  }
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  // Scroll reveal
  initScrollReveal();
  initProgressBars();
  initHeroCounters();

  // Add reveal classes to cards dynamically
  document.querySelectorAll('.overview-card, .tier-card, .subject-card, .faq-item').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
    // Trigger observer re-check
  });
  // Re-run scroll reveal after adding classes
  setTimeout(initScrollReveal, 50);

  // FAQ toggle
  window.toggleFaq = function(btn) {
    const answer = btn.nextElementSibling;
    const isOpen = answer.classList.contains('show');
    document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('show'));
    document.querySelectorAll('.faq-q').forEach(q => {
      q.classList.remove('open');
      const icon = q.querySelector('.faq-icon');
      if (icon) icon.textContent = '+';
    });
    if (!isOpen) {
      answer.classList.add('show');
      btn.classList.add('open');
      const icon = btn.querySelector('.faq-icon');
      if (icon) icon.textContent = '×';
    }
  };

  // Init quiz if on quiz page
  if (document.getElementById('quizApp')) {
    initQuizPage();
  }
});
