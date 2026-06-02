// ==================== PROFIL PAGE ====================
import { openModal } from '../components/modal.js';

export function renderProfil(main) {
    // Redirect ke modal profil
    setTimeout(() => {
        openModal('modalProfil');
        
        // Kembali ke home setelah modal ditutup
        const modalProfil = document.getElementById('modalProfil');
        const observer = new MutationObserver(() => {
            if (!modalProfil.classList.contains('open')) {
                window.location.hash = '#/home';
                observer.disconnect();
            }
        });
        observer.observe(modalProfil, { attributes: true, attributeFilter: ['class'] });
    }, 100);
}
