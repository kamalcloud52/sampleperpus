// ==================== ROUTER ====================
import { renderHeader, initHeaderEvents } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { renderModal, initModalEvents, closeAllModals } from './components/modal.js';
import { renderHome } from './pages/home.js';
import { renderLogin } from './pages/login.js';
import { renderRegister } from './pages/register.js';  // ← tambah ini

const routes = { '': 'home', 'home': 'home', 'login': 'login', 'register': 'register' };
let currentPage = 'home', currentParam = null;

function router() {
    closeAllModals();
    const hash = window.location.hash.slice(2) || 'home';
    const [page, param] = hash.split('/');
    const routeKey = routes[page] || 'home';
    currentPage = routeKey; currentParam = param || null;
    renderHeader(); initHeaderEvents();
    const main = document.getElementById('mainContent'); main.innerHTML = '';
    
    switch (currentPage) {
        case 'home': renderHome(main); break;
        case 'login': renderLogin(main); break;
        case 'register': renderRegister(main); break;  // ← tambah ini
        default: renderHome(main);
    }
    
    renderFooter(); renderModal(); initModalEvents();
}

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
export { currentPage, currentParam };
