// ==================== LOGIN PAGE ====================

export function renderLogin(main) {
    main.innerHTML = `
        <div class="login-wrapper slide-up">
            <!-- Logo -->
            <div class="login-logo-container">
                <img src="../../icon.jpg" alt="Logo PIM" class="login-logo-img">
            </div>
            
            <!-- Judul -->
            <h2 class="login-title">Masuk ke Akun</h2>
            <p class="login-subtitle">Perpustakaan Digital Mathali'ul Falah</p>
            
            <!-- Form -->
            <form class="login-form" id="loginForm" autocomplete="off">
                <div class="form-group">
                    <label for="inputEmail">Email / No. Anggota</label>
                    <div class="input-icon-wrapper">
                        <i class="fa-solid fa-envelope input-icon"></i>
                        <input type="text" class="form-input" id="inputEmail" placeholder="Masukkan email atau no. anggota" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="inputPassword">Kata Sandi</label>
                    <div class="input-icon-wrapper">
                        <i class="fa-solid fa-lock input-icon"></i>
                        <input type="password" class="form-input" id="inputPassword" placeholder="Masukkan kata sandi" required>
                        <button type="button" class="toggle-password-btn" id="btnTogglePassword" title="Tampilkan kata sandi">
                            <i class="fa-solid fa-eye"></i>
                        </button>
                    </div>
                </div>
                
                <!-- Error Message -->
                <div class="login-error hidden" id="loginError">
                    <i class="fa-solid fa-circle-exclamation"></i> <span id="loginErrorText"></span>
                </div>
                
                <!-- Submit Button -->
                <button type="submit" class="login-submit-btn" id="btnLogin">
                    <i class="fa-solid fa-right-to-bracket"></i> Masuk
                </button>
            </form>
            
            <!-- Links -->
            <div class="login-links">
                <a href="#" class="login-link">Lupa kata sandi?</a>
                <span class="login-divider">|</span>
                <a href="#" class="login-link">Daftar akun baru</a>
            </div>
            
            <!-- Back to Home -->
            <a href="#/home" class="login-back-link">
                <i class="fa-solid fa-arrow-left"></i> Kembali ke Koleksi
            </a>
        </div>
    `;

    // Init events
    initLoginEvents();
}

function initLoginEvents() {
    // Toggle password visibility
    const btnToggle = document.getElementById('btnTogglePassword');
    const inputPassword = document.getElementById('inputPassword');
    
    if (btnToggle && inputPassword) {
        btnToggle.addEventListener('click', () => {
            const isPassword = inputPassword.type === 'password';
            inputPassword.type = isPassword ? 'text' : 'password';
            btnToggle.innerHTML = isPassword 
                ? '<i class="fa-solid fa-eye-slash"></i>' 
                : '<i class="fa-solid fa-eye"></i>';
        });
    }
    
    // Form submit
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('inputEmail').value.trim();
            const password = document.getElementById('inputPassword').value.trim();
            const errorDiv = document.getElementById('loginError');
            const errorText = document.getElementById('loginErrorText');
            const btnLogin = document.getElementById('btnLogin');
            
            // Validasi
            if (!email) {
                showError('Email atau No. Anggota harus diisi.');
                return;
            }
            if (!password) {
                showError('Kata sandi harus diisi.');
                return;
            }
            if (password.length < 4) {
                showError('Kata sandi minimal 4 karakter.');
                return;
            }
            
            // Loading state
            hideError();
            btnLogin.disabled = true;
            btnLogin.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Memproses...';
            
            // Simulasi login (nanti ganti dengan API)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Simulasi sukses
            if (email === 'admin' && password === '1234') {
                // Simpan session
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userName', 'Administrator');
                
                // Redirect ke home
                window.location.hash = '#/home';
                
                // Reload header (biar nama berubah)
                setTimeout(() => location.reload(), 100);
            } else {
                showError('Email atau kata sandi salah.');
                btnLogin.disabled = false;
                btnLogin.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Masuk';
            }
        });
    }
    
    function showError(msg) {
        const errorDiv = document.getElementById('loginError');
        const errorText = document.getElementById('loginErrorText');
        if (errorDiv && errorText) {
            errorText.textContent = msg;
            errorDiv.classList.remove('hidden');
            errorDiv.style.animation = 'shake 0.4s ease';
            setTimeout(() => errorDiv.style.animation = '', 400);
        }
    }
    
    function hideError() {
        const errorDiv = document.getElementById('loginError');
        if (errorDiv) errorDiv.classList.add('hidden');
    }
}
