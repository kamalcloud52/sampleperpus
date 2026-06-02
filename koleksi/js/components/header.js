// ==================== HEADER COMPONENT ====================
import { openModal } from '../components/modal.js';

export function renderHeader() {
    const header = document.getElementById('appHeader');
    if (!header) return;
    
    header.innerHTML = `
        <div class="logo-area">
            <img src="../../icon.jpg" alt="Logo PIM" class="logo-icon-img">
            <span class="logo-title">Perpustakaan Digital PIM</span>
        </div>
        <button class="profile-btn" id="btnProfile" title="Profil Saya">
            <i class="fa-solid fa-circle-user"></i>
        </button>
    `;
}

export function initHeaderEvents() {
    const btnProfile = document.getElementById('btnProfile');
    if (btnProfile) {
        // Hapus event listener lama (hindari double)
        const newBtn = btnProfile.cloneNode(true);
        btnProfile.parentNode.replaceChild(newBtn, btnProfile);
        
        newBtn.addEventListener('click', () => {
            openModal('modalProfil');
        });
    }
}
