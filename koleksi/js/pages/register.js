// ==================== REGISTER PAGE ====================

export function renderRegister(main) {
    main.innerHTML = `
        <div class="login-wrapper slide-up">
            <!-- Logo -->
            <div class="login-logo-container">
                <img src="../../icon.jpg" alt="Logo PIM" class="login-logo-img">
            </div>
            
            <!-- Judul -->
            <h2 class="login-title">Daftar Akun Baru</h2>
            <p class="login-subtitle">Perpustakaan Digital Mathali'ul Falah</p>
            
            <!-- Form -->
            <form class="login-form" id="registerForm" autocomplete="off">
                <div class="form-group">
                    <label for="regNama">Nama Lengkap</label>
                    <div class="input-icon-wrapper">
                        <i class="fa-solid fa-user input-icon"></i>
                        <input type="text" class="form-input" id="regNama" placeholder="Masukkan nama lengkap" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="regEmail">Email / No. Anggota</label>
                    <div class="input-icon-wrapper">
                        <i class="fa-solid fa-envelope input-icon"></i>
                        <input type="text" class="form-input" id="regEmail" placeholder="Masukkan email atau no. anggota" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="regPassword">Kata Sandi</label>
                    <div class="input-icon-wrapper">
                        <i class="fa-solid fa-lock input-icon"></i>
                        <input type="password" class="form-input" id="regPassword" placeholder="Minimal 4 karakter" required>
                        <button type="button" class="toggle-password-btn" id="btnToggleRegPassword" title="Tampilkan kata sandi">
                            <i class="fa-solid fa-eye"></i>
                        </button>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="regConfirmPassword">Konfirmasi Kata Sandi</label>
                    <div class="input-icon-wrapper">
                        <i class="fa-solid fa-lock input-icon"></i>
                        <input type="password" class="form-input" id="regConfirmPassword" placeholder="Ulangi kata sandi" required>
                        <button type="button" class="toggle-password-btn" id="btnToggleRegConfirmPassword" title="Tampilkan kata sandi">
                            <i class="fa-solid fa-eye"></i>
                        </button>
                    </div>
                </div>
                
                <!-- Error Message -->
                <div class="login-error hidden" id="registerError">
                    <i class="fa-solid fa-circle-exclamation"></i> <span id="registerErrorText"></span>
                </div>
                
                <!-- Submit Button -->
                <button type="submit" class="login-submit-btn" id="btnRegister">
                    <i class="fa-solid fa-user-plus"></i> Daftar
                </button>
            </form>
            
            <!-- Links -->
            <div class="login-links">
                <span style="font-size:0.78rem;color:var(--text-muted);">Sudah punya akun?</span>
                <a href="#/login" class="login-link">Masuk di sini</a>
            </div>
            
            <!-- Back to Home -->
            <a href="#/home" class="login-back-link">
                <i class="fa-solid fa-arrow-left"></i> Kembali ke Koleksi
            </a>
        </div>
    `;

    initRegisterEvents();
}

function initRegisterEvents() {
    // Toggle password visibility
    function setupToggle(btnId, inputId) {
        const btn = document.getElementById(btnId);
        const input = document.getElementById(inputId);
        if (btn && input) {
            btn.addEventListener('click', () => {
                const isPassword = input.type === 'password';
                input.type = isPassword ? 'text' : 'password';
                btn.innerHTML = isPassword 
                    ? '<i class="fa-solid fa-eye-slash"></i>' 
                    : '<i class="fa-solid fa-eye"></i>';
            });
        }
    }
    
    setupToggle('btnToggleRegPassword', 'regPassword');
    setupToggle('btnToggleRegConfirmPassword', 'regConfirmPassword');
    
    // Form submit
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const nama = document.getElementById('regNama').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const password = document.getElementById('regPassword').value.trim();
            const confirm = document.getElementById('regConfirmPassword').value.trim();
            const errorDiv = document.getElementById('registerError');
            const errorText = document.getElementById('registerErrorText');
            const btnRegister = document.getElementById('btnRegister');
            
            // Validasi
            if (!nama) { showError('Nama lengkap harus diisi.'); return; }
            if (nama.length < 3) { showError('Nama minimal 3 karakter.'); return; }
            if (!email) { showError('Email atau No. Anggota harus diisi.'); return; }
            if (!password) { showError('Kata sandi harus diisi.'); return; }
            if (password.length < 4) { showError('Kata sandi minimal 4 karakter.'); return; }
            if (password !== confirm) { showError('Konfirmasi kata sandi tidak cocok.'); return; }
            
            // Loading state
            hideError();
            btnRegister.disabled = true;
            btnRegister.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mendaftarkan...';
            
            // Simulasi registrasi (nanti ganti dengan API)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Simulasi sukses
            alert('Registrasi berhasil! Silakan masuk.');
            window.location.hash = '#/login';
        });
    }
    
    function showError(msg) {
        const errorDiv = document.getElementById('registerError');
        const errorText = document.getElementById('registerErrorText');
        if (errorDiv && errorText) {
            errorText.textContent = msg;
            errorDiv.classList.remove('hidden');
            errorDiv.style.animation = 'shake 0.4s ease';
            setTimeout(() => errorDiv.style.animation = '', 400);
        }
    }
    
    function hideError() {
        const errorDiv = document.getElementById('registerError');
        if (errorDiv) errorDiv.classList.add('hidden');
    }
}
