// ===== AUTH UI =====

function initAuthUI() {
  if (!window.FirebaseApp) return;
  const ok = window.FirebaseApp.init();
  if (!ok) return;

  injectAuthItem();

  window.FirebaseApp.onUserChange(user => {
    updateAuthItem(user);
    if (typeof renderDashboard === 'function') renderDashboard(user);
  });
}

function injectAuthItem() {
  const menu = document.getElementById('navMenu');
  if (!menu || document.getElementById('authNavItem')) return;
  const li = document.createElement('li');
  li.id = 'authNavItem';
  li.innerHTML = signedOutHTML();
  const cta = menu.querySelector('.cta-btn')?.parentElement;
  cta ? menu.insertBefore(li, cta) : menu.appendChild(li);
}

function signedOutHTML() {
  return `<button class="auth-signin-btn" onclick="handleAuthClick(this)">
    <svg width="16" height="16" viewBox="0 0 48 48" style="flex-shrink:0">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
    Sign In
  </button>`;
}

function signedInHTML(user) {
  const name = (user.displayName || user.email || 'User').split(' ')[0];
  const photo = user.photoURL;
  const initial = name[0].toUpperCase();
  const avatar = photo
    ? `<img src="${photo}" class="auth-pill-avatar" referrerpolicy="no-referrer" alt="">`
    : `<span class="auth-pill-initial">${initial}</span>`;

  return `
    <a href="progress.html" class="auth-user-pill">
      ${avatar}
      <span class="auth-pill-name">${name}</span>
    </a>
    <button class="auth-signout-pill" onclick="handleSignOut()" title="Sign out">✕</button>`;
}

function updateAuthItem(user) {
  const li = document.getElementById('authNavItem');
  if (!li) return;
  li.innerHTML = user ? signedInHTML(user) : signedOutHTML();
}

async function handleAuthClick(btn) {
  if (btn) { btn.disabled = true; btn.style.opacity = '0.6'; btn.innerHTML = '<span style="animation:spin 0.8s linear infinite;display:inline-block">⏳</span> Signing in...'; }
  const user = await window.FirebaseApp.signInWithGoogle();
  if (!user && btn) { btn.disabled = false; btn.style.opacity = '1'; btn.innerHTML = 'Sign In'; }
  if (user && window.location.pathname.includes('progress')) renderDashboard(user);
}

async function handleSignOut() {
  await window.FirebaseApp.signOutUser();
  if (window.location.pathname.includes('progress')) window.location.href = 'index.html';
}

window.handleAuthClick = handleAuthClick;
window.handleSignOut = handleSignOut;

document.addEventListener('DOMContentLoaded', initAuthUI);
