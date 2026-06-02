// ==================== HEADER COMPONENT ====================
import { openModal } from '../components/modal.js';

export function renderHeader() {
    const header = document.getElementById('appHeader');
    if (!header) return;
    
    header.innerHTML = `
        <div class="header-left">
            <button class="profile-btn" id="btnProfile" title="Profil Saya">
                <i class="fa-solid fa-circle-user"></i>
            </button>
            <span class="user-name" id="userName">Tamu</span>
        </div>
        
        <!-- Hamburger -->
        <button class="hamburger" id="hamburgerKoleksi" aria-label="Menu">
            <span></span>
            <span></span>
            <span></span>
        </button>
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

    // Hamburger + Mobile Menu
    const hamburger = document.getElementById('hamburgerKoleksi');
    const mobileMenu = document.getElementById('mobileMenuKoleksi');
    
    if (hamburger && mobileMenu) {
        const newHamburger = hamburger.cloneNode(true);
        hamburger.parentNode.replaceChild(newHamburger, hamburger);
        
        newHamburger.addEventListener('click', () => {
            newHamburger.classList.toggle('open');
            mobileMenu.classList.toggle('open');
        });
        
        // Tutup menu saat link diklik
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                newHamburger.classList.remove('open');
                mobileMenu.classList.remove('open');
            });
        });
    }
}
