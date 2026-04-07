// ===== AUTH UI =====

function initAuthUI() {
  if (!window.FirebaseApp) return;
  const ok = window.FirebaseApp.init();
  if (!ok) { console.warn('Firebase SDK not loaded'); return; }

  injectAuthItem();

  window.FirebaseApp.onUserChange(user => {
    updateAuthItem(user);
    if (typeof renderDashboard === 'function') renderDashboard(user);
  });
}

function injectAuthItem() {
  const menu = document.getElementById('navMenu');
  if (!menu) return;
  if (document.getElementById('authNavItem')) return;

  const li = document.createElement('li');
  li.id = 'authNavItem';
  li.innerHTML = `<a href="#" class="nav-link auth-login-btn" id="authLoginBtn" onclick="event.preventDefault();handleAuthClick()">Sign In</a>`;

  const cta = menu.querySelector('.cta-btn')?.parentElement;
  if (cta) menu.insertBefore(li, cta);
  else menu.appendChild(li);
}

function updateAuthItem(user) {
  const li = document.getElementById('authNavItem');
  if (!li) return;

  if (user) {
    const name = (user.displayName || user.email || 'User').split(' ')[0];
    const photo = user.photoURL;
    const initial = name[0].toUpperCase();

    li.innerHTML = `
      <div class="auth-menu-wrap">
        <button class="auth-avatar-btn" id="authAvatarBtn" onclick="toggleAuthDropdown(event)">
          ${photo
            ? `<img src="${photo}" class="auth-avatar-img" referrerpolicy="no-referrer" alt="${name}">`
            : `<span class="auth-avatar-fallback">${initial}</span>`}
          <span class="auth-user-name">${name}</span>
          <span class="auth-chevron">▾</span>
        </button>
        <div class="auth-dropdown-menu" id="authDropdownMenu">
          <div class="auth-dropdown-user">
            ${photo ? `<img src="${photo}" referrerpolicy="no-referrer" class="auth-dropdown-photo">` : `<span class="auth-dropdown-photo auth-avatar-fallback" style="font-size:1.1rem">${initial}</span>`}
            <div>
              <div class="auth-dropdown-name">${user.displayName || 'User'}</div>
              <div class="auth-dropdown-email">${user.email || ''}</div>
            </div>
          </div>
          <a href="progress.html" class="auth-dropdown-link">📊 My Progress</a>
          <button class="auth-dropdown-link auth-signout-btn" onclick="handleSignOut()">🚪 Sign Out</button>
        </div>
      </div>`;
  } else {
    li.innerHTML = `<a href="#" class="nav-link auth-login-btn" id="authLoginBtn" onclick="event.preventDefault();handleAuthClick()">Sign In</a>`;
  }
}

function toggleAuthDropdown(e) {
  e.stopPropagation();
  const menu = document.getElementById('authDropdownMenu');
  if (!menu) return;
  const isOpen = menu.classList.contains('open');
  closeAllDropdowns();
  if (!isOpen) {
    menu.classList.add('open');
    setTimeout(() => document.addEventListener('click', closeAllDropdowns, { once: true }), 0);
  }
}

function closeAllDropdowns() {
  document.querySelectorAll('.auth-dropdown-menu').forEach(m => m.classList.remove('open'));
}

async function handleAuthClick() {
  const btn = document.getElementById('authLoginBtn');
  if (btn) { btn.textContent = 'Signing in...'; btn.style.opacity = '0.7'; }
  const user = await window.FirebaseApp.signInWithGoogle();
  if (!user && btn) { btn.textContent = 'Sign In'; btn.style.opacity = '1'; }
  if (user && window.location.pathname.includes('progress')) renderDashboard(user);
}

async function handleSignOut() {
  closeAllDropdowns();
  await window.FirebaseApp.signOutUser();
  if (window.location.pathname.includes('progress')) window.location.href = 'index.html';
}

window.handleAuthClick = handleAuthClick;
window.handleSignOut = handleSignOut;
window.toggleAuthDropdown = toggleAuthDropdown;

document.addEventListener('DOMContentLoaded', initAuthUI);
