// ===== FIREBASE CONFIG =====
// HOW TO SET UP:
// 1. Go to console.firebase.google.com
// 2. Click "Add Project" → name it "dhjs-prep" → Continue
// 3. Disable Google Analytics if you want → Create Project
// 4. Click "</>" (Web) → Register app → name it "dhjs-prep"
// 5. Copy the firebaseConfig object values below
// 6. In Firebase console → Authentication → Sign-in method → Enable "Google"
// 7. In Firebase console → Firestore Database → Create database → Start in production mode
//    → Choose region (asia-south1 for India) → Enable
// 8. In Firestore → Rules → paste this rule:
//    rules_version = '2';
//    service cloud.firestore {
//      match /databases/{database}/documents {
//        match /users/{userId} {
//          allow read, write: if request.auth != null && request.auth.uid == userId;
//        }
//      }
//    }
// 9. Replace the placeholder values below with your actual values

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyC1cHtkbU06jMWfngExsirGuGIFyrkZHrk",
  authDomain: "dhjs-prep.firebaseapp.com",
  projectId: "dhjs-prep",
  storageBucket: "dhjs-prep.firebasestorage.app",
  messagingSenderId: "706750192136",
  appId: "1:706750192136:web:01a8c8c1d2b525d2094fbd",
  measurementId: "G-DP7L1TK1EC"
};

// ===== INIT =====
let _auth = null;
let _db = null;
let _currentUser = null;

function initFirebase() {
  if (typeof firebase === 'undefined') return false;
  if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
  _auth = firebase.auth();
  _db = firebase.firestore();
  return true;
}

// ===== AUTH STATE =====
function onUserChange(callback) {
  if (!_auth) return;
  _auth.onAuthStateChanged(user => {
    _currentUser = user;
    callback(user);
  });
}

function getCurrentUser() { return _currentUser; }

async function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    const result = await _auth.signInWithPopup(provider);
    return result.user;
  } catch (err) {
    console.error('Sign-in error', err);
    return null;
  }
}

async function signOutUser() {
  await _auth.signOut();
  _currentUser = null;
}

// ===== FIRESTORE =====
async function saveSessionToCloud(user, sessionData) {
  if (!user || !_db) return;
  try {
    const ref = _db.collection('users').doc(user.uid);
    const snap = await ref.get();
    const session = { ...sessionData, date: Date.now() };
    const subjectKey = sessionData.subject || 'all';

    if (!snap.exists()) {
      await ref.set({
        uid: user.uid,
        name: user.displayName || '',
        email: user.email || '',
        photoURL: user.photoURL || '',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        totalAnswered: sessionData.total,
        totalCorrect: sessionData.correct,
        subjects: { [subjectKey]: { answered: sessionData.total, correct: sessionData.correct } },
        sessions: [session]
      });
    } else {
      const data = snap.data();
      const prevSubj = (data.subjects || {})[subjectKey] || { answered: 0, correct: 0 };
      await ref.update({
        totalAnswered: firebase.firestore.FieldValue.increment(sessionData.total),
        totalCorrect: firebase.firestore.FieldValue.increment(sessionData.correct),
        [`subjects.${subjectKey}.answered`]: prevSubj.answered + sessionData.total,
        [`subjects.${subjectKey}.correct`]: prevSubj.correct + sessionData.correct,
        sessions: firebase.firestore.FieldValue.arrayUnion(session)
      });
    }
  } catch (err) {
    console.error('Save session error', err);
  }
}

async function getUserStatsFromCloud(user) {
  if (!user || !_db) return null;
  try {
    const snap = await _db.collection('users').doc(user.uid).get();
    return snap.exists() ? snap.data() : null;
  } catch (err) {
    console.error('Get stats error', err);
    return null;
  }
}

// Always export to window
window.FirebaseApp = {
  init: initFirebase,
  onUserChange,
  getCurrentUser,
  signInWithGoogle,
  signOutUser,
  saveSession: saveSessionToCloud,
  getStats: getUserStatsFromCloud
};
