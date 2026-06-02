// ==================== FILTER PAGE ====================
import { openModal } from '../components/modal.js';

export function renderFilter(main) {
    // Redirect ke modal filter
    setTimeout(() => {
        openModal('modalFilter');
        
        // Kembali ke home setelah modal ditutup
        const modalFilter = document.getElementById('modalFilter');
        const observer = new MutationObserver(() => {
            if (!modalFilter.classList.contains('open')) {
                window.location.hash = '#/home';
                observer.disconnect();
            }
        });
        observer.observe(modalFilter, { attributes: true, attributeFilter: ['class'] });
    }, 100);
}
