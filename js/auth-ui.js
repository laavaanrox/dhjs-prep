// ===== AUTH UI — Navbar login button & profile dropdown =====

function initAuthUI() {
  if (!window.FirebaseApp) return;

  const ok = window.FirebaseApp.init();
  if (!ok) { console.warn('Firebase not loaded'); return; }

  // Inject the auth nav item if the navbar exists
  injectAuthButton();

  // Listen for auth changes
  window.FirebaseApp.onUserChange(user => {
    updateNavbar(user);
    // Trigger dashboard refresh if on progress page
    if (typeof renderDashboard === 'function') renderDashboard(user);
  });
}

function injectAuthButton() {
  const menu = document.getElementById('navMenu');
  if (!menu) return;
  // Remove any existing auth item
  const existing = document.getElementById('authNavItem');
  if (existing) existing.remove();

  const li = document.createElement('li');
  li.id = 'authNavItem';
  li.innerHTML = `
    <div class="auth-nav-wrap" id="authNavWrap">
      <button class="nav-link auth-login-btn" id="authLoginBtn" onclick="handleAuthClick()">
        <span>🔐 Sign In</span>
      </button>
    </div>`;
  // Insert before the CTA button (last item)
  const cta = menu.querySelector('.cta-btn')?.parentElement;
  if (cta) menu.insertBefore(li, cta);
  else menu.appendChild(li);
}

function updateNavbar(user) {
  const wrap = document.getElementById('authNavWrap');
  if (!wrap) return;
  if (user) {
    const initial = (user.displayName || user.email || 'U')[0].toUpperCase();
    const photo = user.photoURL;
    wrap.innerHTML = `
      <div class="auth-profile-btn" id="authProfileBtn" onclick="toggleProfileMenu()">
        ${photo
          ? `<img src="${photo}" class="auth-avatar" alt="${user.displayName}" referrerpolicy="no-referrer">`
          : `<div class="auth-avatar auth-avatar-initial">${initial}</div>`}
        <span class="auth-name">${(user.displayName || user.email || '').split(' ')[0]}</span>
        <span class="auth-caret">▾</span>
      </div>
      <div class="auth-dropdown" id="authDropdown">
        <div class="auth-dropdown-header">
          ${photo ? `<img src="${photo}" class="auth-dropdown-avatar" referrerpolicy="no-referrer">` : `<div class="auth-dropdown-avatar auth-avatar-initial">${initial}</div>`}
          <div>
            <div class="auth-dropdown-name">${user.displayName || 'User'}</div>
            <div class="auth-dropdown-email">${user.email || ''}</div>
          </div>
        </div>
        <a href="progress.html" class="auth-dropdown-item">📊 My Progress</a>
        <button class="auth-dropdown-item auth-dropdown-signout" onclick="handleSignOut()">🚪 Sign Out</button>
      </div>`;
  } else {
    wrap.innerHTML = `
      <button class="nav-link auth-login-btn" id="authLoginBtn" onclick="handleAuthClick()">
        <span>🔐 Sign In</span>
      </button>`;
  }
}

function toggleProfileMenu() {
  const dropdown = document.getElementById('authDropdown');
  if (!dropdown) return;
  dropdown.classList.toggle('open');
  // Close on outside click
  setTimeout(() => {
    document.addEventListener('click', closeProfileMenu, { once: true });
  }, 10);
}

function closeProfileMenu(e) {
  const dropdown = document.getElementById('authDropdown');
  const btn = document.getElementById('authProfileBtn');
  if (dropdown && !dropdown.contains(e.target) && !btn?.contains(e.target)) {
    dropdown.classList.remove('open');
  }
}

async function handleAuthClick() {
  const user = await window.FirebaseApp.signInWithGoogle();
  if (user) {
    // If on progress page, reload
    if (window.location.pathname.includes('progress')) {
      renderDashboard(user);
    }
  }
}

async function handleSignOut() {
  await window.FirebaseApp.signOutUser();
  // Redirect to home if on progress page
  if (window.location.pathname.includes('progress')) {
    window.location.href = 'index.html';
  }
}

// Make global
window.handleAuthClick = handleAuthClick;
window.handleSignOut = handleSignOut;
window.toggleProfileMenu = toggleProfileMenu;

// Auto-init after DOM ready
document.addEventListener('DOMContentLoaded', initAuthUI);
