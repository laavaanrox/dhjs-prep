// ===== DISCUSSION THREAD =====

let _currentDiscussionQId = null;

function waitForDb(maxMs = 5000) {
  return new Promise(resolve => {
    const start = Date.now();
    const check = () => {
      if (window._db) return resolve(window._db);
      if (Date.now() - start > maxMs) return resolve(null);
      setTimeout(check, 150);
    };
    check();
  });
}

async function loadDiscussion(questionId) {
  _currentDiscussionQId = questionId;
  const mount = document.getElementById('discussionMount');
  if (!mount) return;

  const user = window.FirebaseApp?.getCurrentUser();
  const db = await waitForDb();

  mount.innerHTML = `
    <div class="discussion-panel">
      <div class="discussion-header">
        <h4>💬 Discussion</h4>
        <span class="discussion-count" id="discCount">—</span>
      </div>
      <div class="discussion-body" id="discBody">
        <div class="no-comments">Loading...</div>
      </div>
      <div class="discussion-footer">
        ${user ? `
          <div class="comment-input-row">
            <textarea class="comment-input" id="commentInput" placeholder="Share your approach or ask a question..." rows="1"></textarea>
            <button class="comment-submit" id="commentSubmit">Post</button>
          </div>
        ` : `
          <div class="discussion-signin-note">
            <a href="#" onclick="handleAuthClick();return false">Sign in</a> to join the discussion
          </div>
        `}
      </div>
    </div>
  `;

  // Auto-resize textarea
  const ta = document.getElementById('commentInput');
  if (ta) {
    ta.addEventListener('input', () => {
      ta.style.height = 'auto';
      ta.style.height = Math.min(ta.scrollHeight, 120) + 'px';
    });
  }

  // Submit handler
  document.getElementById('commentSubmit')?.addEventListener('click', () => postComment(questionId));
  if (ta) ta.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); postComment(questionId); } });

  // Fetch comments
  fetchComments(questionId);
}

async function fetchComments(questionId) {
  const body = document.getElementById('discBody');
  const countEl = document.getElementById('discCount');
  if (!body) return;

  // Try Firebase
  const db = await waitForDb();
  if (window.FirebaseApp && db) {
    try {
      const snap = await db
        .collection('discussions')
        .doc(String(questionId))
        .collection('comments')
        .orderBy('createdAt', 'asc')
        .get();

      const comments = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      if (countEl) countEl.textContent = comments.length;
      renderComments(body, comments);
      return;
    } catch(e) {
      console.warn('Discussion fetch error', e);
    }
  }

  // Fallback: empty state
  if (countEl) countEl.textContent = '0';
  body.innerHTML = `<div class="no-comments">Be the first to discuss this question!</div>`;
}

function renderComments(body, comments) {
  if (!comments.length) {
    body.innerHTML = `<div class="no-comments">No comments yet. Be the first!</div>`;
    return;
  }
  const user = window.FirebaseApp?.getCurrentUser();
  body.innerHTML = comments.map(c => {
    const initial = (c.authorName || 'U')[0].toUpperCase();
    const ts = c.createdAt?.seconds ? new Date(c.createdAt.seconds * 1000) : new Date(c.createdAt || 0);
    const timeStr = ts.toLocaleDateString('en-IN', { day:'numeric', month:'short' }) + ' ' + ts.toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' });
    const liked = user && (c.likedBy || []).includes(user.uid);
    return `
      <div class="comment-item" data-id="${c.id}">
        <div class="comment-avatar">${c.photoURL ? `<img src="${c.photoURL}" referrerpolicy="no-referrer" alt="">` : initial}</div>
        <div class="comment-body">
          <div class="comment-meta">
            <span class="comment-author">${escHtml(c.authorName || 'Anonymous')}</span>
            <span class="comment-time">${timeStr}</span>
          </div>
          <div class="comment-text">${escHtml(c.text)}</div>
          <div class="comment-actions">
            <button class="comment-like ${liked ? 'liked' : ''}" data-id="${c.id}">
              ▲ ${c.likes || 0}
            </button>
          </div>
        </div>
      </div>`;
  }).join('');

  // Like buttons
  body.querySelectorAll('.comment-like').forEach(btn => {
    btn.addEventListener('click', () => toggleLike(btn, _currentDiscussionQId, btn.dataset.id));
  });
}

async function postComment(questionId) {
  const user = window.FirebaseApp?.getCurrentUser();
  if (!user) { alert('Please sign in to comment.'); return; }
  const ta = document.getElementById('commentInput');
  const btn = document.getElementById('commentSubmit');
  const text = ta?.value?.trim();
  if (!text) return;

  const db = await waitForDb();
  if (!db) { alert('Database not ready. Please refresh and try again.'); return; }

  btn.disabled = true;
  btn.textContent = '...';

  try {
    await db
      .collection('discussions')
      .doc(String(questionId))
      .collection('comments')
      .add({
        text,
        authorName: user.displayName || user.email?.split('@')[0] || 'User',
        authorUid: user.uid,
        photoURL: user.photoURL || '',
        likes: 0,
        likedBy: [],
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    ta.value = '';
    ta.style.height = 'auto';
    fetchComments(questionId);
  } catch(e) {
    console.error('Post comment error:', e.code, e.message);
    if (e.code === 'permission-denied') {
      alert('Permission denied. Please update your Firestore security rules to allow discussions. Check the browser console for details.');
    } else {
      alert('Could not post comment: ' + (e.message || 'Unknown error'));
    }
  } finally {
    btn.disabled = false;
    btn.textContent = 'Post';
  }
}

async function toggleLike(btn, questionId, commentId) {
  const user = window.FirebaseApp?.getCurrentUser();
  if (!user) { alert('Sign in to like comments.'); return; }

  const db = await waitForDb();
  if (!db) return;

  const liked = btn.classList.contains('liked');
  const ref = db
    .collection('discussions').doc(String(questionId))
    .collection('comments').doc(commentId);

  try {
    if (liked) {
      await ref.update({
        likes: firebase.firestore.FieldValue.increment(-1),
        likedBy: firebase.firestore.FieldValue.arrayRemove(user.uid)
      });
      btn.classList.remove('liked');
      const count = parseInt(btn.textContent.replace('▲','').trim()) - 1;
      btn.textContent = `▲ ${count}`;
    } else {
      await ref.update({
        likes: firebase.firestore.FieldValue.increment(1),
        likedBy: firebase.firestore.FieldValue.arrayUnion(user.uid)
      });
      btn.classList.add('liked');
      const count = parseInt(btn.textContent.replace('▲','').trim()) + 1;
      btn.textContent = `▲ ${count}`;
    }
  } catch(e) { console.error('Like error', e); }
}

function escHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

window.loadDiscussion = loadDiscussion;
