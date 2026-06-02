// ==================== FOOTER COMPONENT ====================
export function renderFooter() {
    const footer = document.getElementById('appFooter');
    if (!footer) return;
    
    footer.innerHTML = `
        <p>&copy; 2026 Perpustakaan Digital PIM</p>
        <div class="footer-social">
            <a href="https://facebook.com/perpuspim" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Facebook">
                <i class="fa-brands fa-facebook-f"></i>
            </a>
            <a href="https://instagram.com/perpus_pim" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Instagram">
                <i class="fa-brands fa-instagram"></i>
            </a>
            <a href="https://youtube.com/@perpuspim" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="YouTube">
                <i class="fa-brands fa-youtube"></i>
            </a>
        </div>
    `;
}
