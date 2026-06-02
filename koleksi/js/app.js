// ==================== ROUTER ====================
import { renderHeader, initHeaderEvents } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { renderModal, initModalEvents, closeAllModals } from './components/modal.js';
import { renderHome } from './pages/home.js';
import { renderDetail } from './pages/detail.js';
import { renderLogin } from './pages/login.js';
import { renderProfil } from './pages/profil.js';
import { renderFilter } from './pages/filter.js';

const routes = {
    '': 'home',
    'home': 'home',
    'detail': 'detail',
    'login': 'login',
    'profil': 'profil',
    'filter': 'filter',
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
        case 'detail':
            renderDetail(main, currentParam);
            break;
        case 'login':
            renderLogin(main);
            break;
        case 'profil':
            renderProfil(main);
            break;
        case 'filter':
            renderFilter(main);
            break;
        default:
            main.innerHTML = '<p class="text-center" style="padding:40px;">Halaman tidak ditemukan</p>';
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
