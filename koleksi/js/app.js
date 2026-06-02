// ==================== ROUTER ====================
import { renderHeader, initHeaderEvents } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { renderModal, initModalEvents, closeAllModals } from './components/modal.js';
import { renderHome } from './pages/home.js';
import { renderLogin } from './pages/login.js';

const routes = {
    '': 'home',
    'home': 'home',
    'login': 'login',
};

let currentPage = 'home';
let currentParam = null;

function router() {
    // Tutup semua modal saat navigasi
    closeAllModals();

    const hash = window.location.hash.slice(2) || 'home';
    const [page, param] = hash.split('/');

    const routeKey = routes[page] || 'home';
    currentPage = routeKey;
    currentParam = param || null;

    // Render header
    renderHeader();
    initHeaderEvents();

    // Render halaman
    const main = document.getElementById('mainContent');
    main.innerHTML = '';

    switch (currentPage) {
        case 'home':
            renderHome(main);
            break;
        case 'login':
            renderLogin(main);
            break;
        default:
            renderHome(main);
    }

    // Render footer
    renderFooter();

    // Render modal container
    renderModal();
    initModalEvents();
}

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);

export { currentPage, currentParam };
