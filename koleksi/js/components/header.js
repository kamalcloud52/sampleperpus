// ==================== HEADER COMPONENT ====================
import { openModal } from '../components/modal.js';

export function renderHeader() {
    const header = document.getElementById('appHeader');
    if (!header) return;
    
    header.innerHTML = `
        <div style="display:flex;align-items:center;gap:10px;">
            <button class="profile-btn" id="btnProfile" title="Profil Saya" style="font-size:1.5rem;color:#4b5563;background:none;border:none;cursor:pointer;padding:4px;">
                <i class="fa-solid fa-circle-user"></i>
            </button>
            <span style="font-weight:600;font-size:0.9rem;color:#1f2937;" id="userName">Tamu</span>
        </div>
        
        <!-- Hamburger + Dropdown -->
        <div style="position:relative;">
            <button class="hamburger-white" id="hamburgerKoleksi" aria-label="Menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <div class="hamburger-dropdown" id="hamburgerDropdown">
                <a href="../index.html">🏠 Beranda</a>
                <a href="index.html">📚 Koleksi Buku</a>
                <a href="../mediapim/">📱 Media PIM</a>
                <a href="../arsipfoto/">📸 Arsip Foto PIM</a>
            </div>
        </div>
    `;
}

export function initHeaderEvents() {
    // Profil
    const btnProfile = document.getElementById('btnProfile');
    if (btnProfile) {
        const newBtn = btnProfile.cloneNode(true);
        btnProfile.parentNode.replaceChild(newBtn, btnProfile);
        newBtn.addEventListener('click', () => {
            openModal('modalProfil');
        });
    }

    // Hamburger
    const hamburger = document.getElementById('hamburgerKoleksi');
    const dropdown = document.getElementById('hamburgerDropdown');
    if (hamburger && dropdown) {
        const newHamburger = hamburger.cloneNode(true);
        hamburger.parentNode.replaceChild(newHamburger, hamburger);
        
        newHamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            newHamburger.classList.toggle('open');
            dropdown.classList.toggle('open');
        });
        
        // Tutup dropdown saat klik di luar
        document.addEventListener('click', (e) => {
            if (!newHamburger.contains(e.target) && !dropdown.contains(e.target)) {
                newHamburger.classList.remove('open');
                dropdown.classList.remove('open');
            }
        });
        
        // Tutup dropdown saat link diklik
        dropdown.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                newHamburger.classList.remove('open');
                dropdown.classList.remove('open');
            });
        });
    }
}
