// ==================== LOGIN PAGE ====================
export function renderLogin(main) {
    main.innerHTML = `
        <div class="login-container">
            <div class="login-avatar">
                <i class="fa-solid fa-circle-user"></i>
            </div>
            <h2 class="login-title">Masuk ke Akun</h2>
            <div class="form-group">
                <label for="inputEmail">Email / No. Anggota</label>
                <input type="text" class="form-input" id="inputEmail" placeholder="Masukkan email atau no. anggota">
            </div>
            <div class="form-group">
                <label for="inputPassword">Kata Sandi</label>
                <input type="password" class="form-input" id="inputPassword" placeholder="Masukkan kata sandi">
            </div>
            <button class="modal-action-btn" id="btnLogin" style="margin-top:8px;">
                <i class="fa-solid fa-right-to-bracket"></i> Masuk
            </button>
            <p style="margin-top:16px;font-size:0.8rem;color:#6b7280;">
                Belum punya akun? <a href="#/login" style="color:#047857;font-weight:600;">Daftar</a>
            </p>
        </div>
    `;

    document.getElementById('btnLogin')?.addEventListener('click', () => {
        const email = document.getElementById('inputEmail').value;
        const password = document.getElementById('inputPassword').value;
        
        if (email && password) {
            alert('Login berhasil! (Simulasi)');
            window.location.hash = '#/home';
        } else {
            alert('Harap isi semua kolom.');
        }
    });
}
