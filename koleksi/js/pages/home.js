// ==================== HOME PAGE ====================
import { openModal } from '../components/modal.js';

// Ganti dengan URL Apps Script kamu
const API_URL = 'https://script.google.com/macros/s/AKfycbxGxMfe48R_pfZx0bpNSgG1gvegbsTmaiZ7ydnceEhpU24BihZqLOO_1YJAhebpgGsu/exec';

let booksData = [];
let allJenis = [];
let allBahasa = [];
let currentLimit = 12;
let currentPage = 1;
let totalPages = 1;
let currentSearch = '';
let currentFilterJenis = '';
let currentFilterBahasa = '';
let isLoading = false;

function debounce(func, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
}

function showLoading() {
    const grid = document.getElementById('booksGrid');
    const list = document.getElementById('booksList');
    const loadingHTML = `
        <div class="loading-container" style="grid-column:1/-1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 20px;gap:12px;">
            <div class="loading-spinner"></div>
            <p class="loading-text">Memuat koleksi...</p>
        </div>
    `;
    if (grid && !grid.classList.contains('hidden')) grid.innerHTML = loadingHTML;
    if (list && !list.classList.contains('hidden')) list.innerHTML = loadingHTML;
}

async function fetchBooks(search = '', jenis = '', bahasa = '', page = 1, limit = 12) {
    if (isLoading) return null;
    isLoading = true;
    try {
        showLoading();
        const params = new URLSearchParams({ search, jenis, bahasa, page, limit });
        const response = await fetch(`${API_URL}?${params}`);
        const result = await response.json();
        if (result.success) {
            booksData = result.data;
            allJenis = result.allJenis || [];
            allBahasa = result.allBahasa || [];
            totalPages = result.totalPages || 1;
            currentPage = result.page || 1;
            updateFilterOptions();
            isLoading = false;
            return result;
        }
        isLoading = false;
        return null;
    } catch (error) {
        console.error('Error fetching books:', error);
        isLoading = false;
        return null;
    }
}

function updateFilterOptions() {
    const filterJenis = document.getElementById('filterJenis');
    const filterBahasa = document.getElementById('filterBahasa');
    if (filterJenis && allJenis.length > 0) {
        const selected = filterJenis.querySelector('.filter-option.selected')?.dataset.value || '';
        filterJenis.innerHTML = '<button class="filter-option selected" data-value="">Semua</button>';
        allJenis.forEach(j => { filterJenis.innerHTML += `<button class="filter-option" data-value="${j}">${j}</button>`; });
        if (selected) {
            const opt = filterJenis.querySelector(`[data-value="${selected}"]`);
            if (opt) { filterJenis.querySelector('.filter-option.selected')?.classList.remove('selected'); opt.classList.add('selected'); }
        }
    }
    if (filterBahasa && allBahasa.length > 0) {
        const selected = filterBahasa.querySelector('.filter-option.selected')?.dataset.value || '';
        filterBahasa.innerHTML = '<button class="filter-option selected" data-value="">Semua</button>';
        allBahasa.forEach(b => { filterBahasa.innerHTML += `<button class="filter-option" data-value="${b}">${b}</button>`; });
        if (selected) {
            const opt = filterBahasa.querySelector(`[data-value="${selected}"]`);
            if (opt) { filterBahasa.querySelector('.filter-option.selected')?.classList.remove('selected'); opt.classList.add('selected'); }
        }
    }
    document.querySelectorAll('.filter-options').forEach(group => {
        group.querySelectorAll('.filter-option').forEach(opt => {
            const newOpt = opt.cloneNode(true);
            opt.parentNode.replaceChild(newOpt, opt);
            newOpt.addEventListener('click', function() {
                group.querySelectorAll('.filter-option').forEach(o => o.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
    });
}

function refreshGrid() {
    const gridView = document.getElementById('booksGrid');
    const listView = document.getElementById('booksList');
    if (gridView) gridView.innerHTML = renderBookCards('grid');
    if (listView) listView.innerHTML = renderBookCards('list');
    bindCardEvents();
}

export async function renderHome(main) {
    main.innerHTML = `
        <div class="welcome-card slide-up slide-up-delay-1">
            <span class="welcome-tag">👋 Halo, Pembaca Hebat!</span>
            <h1>Selamat Datang di Perpustakaan Digital PIM</h1>
            <p>Temukan ribuan referensi dalam satu genggaman.</p>
        </div>
        <div class="stats-grid slide-up slide-up-delay-2">
            <div class="stat-item"><div class="stat-icon-wrapper"><i class="fa-solid fa-book-bookmark"></i></div><div class="stat-info"><span class="stat-label">Koleksi</span><span class="stat-value" id="countKoleksi">0</span></div></div>
            <div class="stat-item"><div class="stat-icon-wrapper"><i class="fa-solid fa-tags"></i></div><div class="stat-info"><span class="stat-label">Jenis</span><span class="stat-value" id="countJenis">0</span></div></div>
        </div>
        <div class="search-row slide-up slide-up-delay-3">
            <div class="search-box"><i class="fa-solid fa-magnifying-glass"></i><input type="text" class="search-input" id="searchInput" placeholder="Cari judul, penulis..."></div>
            <button class="filter-action-btn" id="btnFilterHome"><i class="fa-solid fa-arrow-down-short-wide"></i> Filter</button>
        </div>
        <div class="display-controls slide-up slide-up-delay-4">
            <div class="limit-dropdown">
                <button class="limit-btn" id="btnLimit"><i class="fa-solid fa-eye"></i> Tampilkan <span id="limitText">12</span> <i class="fa-solid fa-chevron-down"></i></button>
                <div class="limit-menu" id="limitMenu">
                    <button class="limit-menu-item" data-value="12">12</button>
                    <button class="limit-menu-item" data-value="24">24</button>
                    <button class="limit-menu-item" data-value="48">48</button>
                    <button class="limit-menu-item" data-value="96">96</button>
                    <button class="limit-menu-item" data-value="all">Semua</button>
                </div>
            </div>
            <div class="toggle-switch-group">
                <button class="toggle-unit active" id="viewGrid"><i class="fa-solid fa-grip-vertical"></i></button>
                <button class="toggle-unit" id="viewList"><i class="fa-solid fa-list"></i></button>
            </div>
        </div>
        <div class="books-layout-grid" id="booksGrid"><div class="loading-container" style="grid-column:1/-1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 20px;gap:12px;"><div class="loading-spinner"></div><p class="loading-text">Memuat koleksi...</p></div></div>
        <div class="books-layout-list hidden" id="booksList"></div>
        <div class="paginator-box">
            <span class="paginator-caption">Halaman ...</span>
            <div class="paginator-row">
                <button class="nav-step-btn" disabled>Awal</button>
                <button class="nav-step-btn" disabled><i class="fa-solid fa-angle-left"></i></button>
                <button class="nav-step-btn active">...</button>
                <button class="nav-step-btn" disabled><i class="fa-solid fa-angle-right"></i></button>
                <button class="nav-step-btn" disabled>Akhir</button>
            </div>
        </div>
    `;

    const result = await fetchBooks();
    const totalBooks = result ? result.total : 0;
    const jenisCount = allJenis.length || 0;
    setTimeout(() => { animateCounter('countKoleksi', totalBooks, 'Buku'); animateCounter('countJenis', jenisCount, 'Jenis'); }, 300);
    refreshGrid();
    document.querySelector('.paginator-caption').textContent = `Halaman ${currentPage} dari ${totalPages}`;
    initHomeEvents();
}

function renderBookCards(type) {
    if (!booksData.length) return '<div class="empty-state" style="grid-column:1/-1;text-align:center;padding:40px;color:#9ca3af;"><i class="fa-solid fa-book-open" style="font-size:2rem;margin-bottom:8px;display:block;opacity:0.5;"></i>Tidak ada koleksi ditemukan</div>';
    const data = booksData.slice(0, currentLimit === 'all' ? booksData.length : currentLimit);
    return data.map(book => type === 'grid' ? renderGridCard(book) : renderListCard(book)).join('');
}

function getCoverStyle(book) {
    const colors = ['linear-gradient(135deg,#d1fae5,#a7f3d0)','linear-gradient(135deg,#fef3c7,#fde68a)','linear-gradient(135deg,#e0e7ff,#c7d2fe)','linear-gradient(135deg,#fce7f3,#fbcfe8)','linear-gradient(135deg,#ffedd5,#fed7aa)','linear-gradient(135deg,#d1fae5,#a7f3d0)'];
    const textColors = ['#047857','#92400e','#3730a3','#9d174d','#c2410c','#047857'];
    const idx = (book.id || 1) % colors.length;
    if (book.cover && book.cover.includes('drive.google.com')) return { background: '#f3f4f6', isImage: true };
    return { background: colors[idx], color: textColors[idx], isImage: false };
}

function renderGridCard(book) {
    const style = getCoverStyle(book);
    const label = (book.judul || 'PIM BOOK').substring(0, 3).toUpperCase();
    return `
        <div class="card-item" data-id="${book.id}" data-title="${book.judul}" data-penulis="${book.nama}" data-edisi="${book.edisi}" data-kategori="${book.jenis}" data-bahasa="${book.bahasa}" data-keywords="${book.kataKunci || ''}" data-cover="${book.cover || ''}">
            <div class="cover-art-container" style="background:${style.background};">
                ${style.isImage ? `<img src="${book.cover}" alt="${book.judul}" class="cover-thumbnail" loading="lazy" onerror="this.parentElement.style.background='${style.background}'; this.style.display='none';">` : `<span class="cover-text-preview">${label}</span>`}
            </div>
            <div class="card-body"><div class="card-info"><span class="tag-badge">${book.jenis || 'Buku'}</span><div class="item-main-title">${book.judul || 'Tanpa Judul'}</div><div class="meta-text-line">${book.nama || 'Tanpa Nama'}</div><div class="meta-text-line">${book.edisi || '-'}</div></div><button class="action-card-btn detail-trigger"><i class="fa-solid fa-circle-info"></i> Detail</button></div>
        </div>`;
}

function renderListCard(book) {
    const style = getCoverStyle(book);
    const label = (book.judul || 'PIM').substring(0, 3).toUpperCase();
    return `
        <div class="list-item" data-id="${book.id}" data-title="${book.judul}" data-penulis="${book.nama}" data-edisi="${book.edisi}" data-kategori="${book.jenis}" data-bahasa="${book.bahasa}" data-keywords="${book.kataKunci || ''}" data-cover="${book.cover || ''}">
            <div class="list-cover" style="background:${style.background};">${style.isImage ? `<img src="${book.cover}" alt="${book.judul}" style="width:100%;height:100%;object-fit:cover;border-radius:6px;" loading="lazy">` : `<span>${label}</span>`}</div>
            <div class="list-info"><span class="tag-badge">${book.jenis || 'Buku'}</span><div class="item-main-title">${book.judul || 'Tanpa Judul'}</div><div class="meta-text-line">${book.nama || 'Tanpa Nama'}</div><div class="meta-text-line">${book.edisi || '-'}</div></div>
            <div class="list-action"><button class="action-card-btn detail-trigger"><i class="fa-solid fa-circle-info"></i> Detail</button></div>
        </div>`;
}

function animateCounter(elementId, target, suffix) {
    const el = document.getElementById(elementId);
    if (!el) return;
    let current = 0;
    const duration = 600, step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => { current += step; if (current >= target) { el.textContent = target + ' ' + suffix; clearInterval(timer); } else { el.textContent = current + ' ' + suffix; } }, 16);
}

function bindCardEvents() {
    document.querySelectorAll('.detail-trigger').forEach(btn => {
        const newBtn = btn.cloneNode(true); btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = newBtn.closest('[data-id]'); if (!card) return;
            document.getElementById('detailTitle').textContent = card.dataset.title || '-';
            document.getElementById('detailPenulis').textContent = card.dataset.penulis || '-';
            document.getElementById('detailEdisi').textContent = card.dataset.edisi || '-';
            document.getElementById('detailKategori').textContent = card.dataset.kategori || '-';
            document.getElementById('detailBahasa').textContent = card.dataset.bahasa || '-';
            document.getElementById('detailKeywords').textContent = card.dataset.keywords || '-';
            const detailCover = document.getElementById('detailCover');
            if (detailCover && card.dataset.cover) detailCover.innerHTML = `<img src="${card.dataset.cover}" alt="${card.dataset.title}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">`;
            openModal('modalDetail');
        });
    });
    document.querySelectorAll('.card-item, .list-item').forEach(card => {
        const newCard = card.cloneNode(true); card.parentNode.replaceChild(newCard, card);
        newCard.addEventListener('click', (e) => { if (e.target.closest('button')) return; newCard.querySelector('.detail-trigger')?.click(); });
    });
}

function initHomeEvents() {
    document.getElementById('btnFilterHome')?.addEventListener('click', () => openModal('modalFilter'));
    const btnLimit = document.getElementById('btnLimit');
    const limitMenu = document.getElementById('limitMenu');
    if (btnLimit && limitMenu) {
        btnLimit.addEventListener('click', (e) => { e.stopPropagation(); limitMenu.classList.toggle('open'); });
        limitMenu.querySelectorAll('.limit-menu-item').forEach(item => { item.addEventListener('click', async function() { const value = this.dataset.value; currentLimit = value === 'all' ? 'all' : parseInt(value); document.getElementById('limitText').textContent = value === 'all' ? 'Semua' : value; showLoading(); await fetchBooks(currentSearch, currentFilterJenis, currentFilterBahasa, currentPage, currentLimit === 'all' ? 999 : currentLimit); refreshGrid(); limitMenu.classList.remove('open'); }); });
        document.addEventListener('click', (e) => { if (!limitMenu.contains(e.target) && !btnLimit.contains(e.target)) limitMenu.classList.remove('open'); });
    }
    bindCardEvents();
    document.getElementById('viewGrid')?.addEventListener('click', function() { this.classList.add('active'); document.getElementById('viewList').classList.remove('active'); document.getElementById('booksGrid').classList.remove('hidden'); document.getElementById('booksList').classList.add('hidden'); });
    document.getElementById('viewList')?.addEventListener('click', function() { this.classList.add('active'); document.getElementById('viewGrid').classList.remove('active'); document.getElementById('booksList').classList.remove('hidden'); document.getElementById('booksGrid').classList.add('hidden'); });
    document.getElementById('searchInput')?.addEventListener('input', debounce(async (e) => { currentSearch = e.target.value; currentPage = 1; showLoading(); await fetchBooks(currentSearch, currentFilterJenis, currentFilterBahasa, currentPage, currentLimit === 'all' ? 999 : currentLimit); refreshGrid(); }, 500));
    document.getElementById('btnAwal')?.addEventListener('click', async () => { currentPage = 1; showLoading(); await fetchBooks(currentSearch, currentFilterJenis, currentFilterBahasa, currentPage, currentLimit === 'all' ? 999 : currentLimit); refreshGrid(); });
    document.getElementById('btnPrev')?.addEventListener('click', async () => { if (currentPage > 1) { currentPage--; showLoading(); await fetchBooks(currentSearch, currentFilterJenis, currentFilterBahasa, currentPage, currentLimit === 'all' ? 999 : currentLimit); refreshGrid(); } });
    document.getElementById('btnNext')?.addEventListener('click', async () => { if (currentPage < totalPages) { currentPage++; showLoading(); await fetchBooks(currentSearch, currentFilterJenis, currentFilterBahasa, currentPage, currentLimit === 'all' ? 999 : currentLimit); refreshGrid(); } });
    document.getElementById('btnAkhir')?.addEventListener('click', async () => { currentPage = totalPages; showLoading(); await fetchBooks(currentSearch, currentFilterJenis, currentFilterBahasa, currentPage, currentLimit === 'all' ? 999 : currentLimit); refreshGrid(); });
}

export async function applyFilterFromModal() {
    const selectedJenis = document.querySelector('#filterJenis .filter-option.selected')?.dataset.value || '';
    const selectedBahasa = document.querySelector('#filterBahasa .filter-option.selected')?.dataset.value || '';
    currentFilterJenis = selectedJenis; currentFilterBahasa = selectedBahasa; currentPage = 1;
    showLoading(); await fetchBooks(currentSearch, currentFilterJenis, currentFilterBahasa, currentPage, currentLimit === 'all' ? 999 : currentLimit); refreshGrid();
    updateFilterIcon(!!(selectedJenis || selectedBahasa));
}

export function resetFilterFromModal() {
    currentFilterJenis = ''; currentFilterBahasa = ''; currentPage = 1;
    showLoading(); fetchBooks(currentSearch, '', '', currentPage, currentLimit === 'all' ? 999 : currentLimit).then(() => { refreshGrid(); updateFilterIcon(false); });
}

function updateFilterIcon(isActive) {
    const filterBtn = document.getElementById('btnFilterHome');
    if (!filterBtn) return;
    filterBtn.style.color = isActive ? '#047857' : '#4b5563';
    filterBtn.style.borderColor = isActive ? '#047857' : '#e5e7eb';
    filterBtn.style.background = isActive ? '#d1fae5' : '#f8fafc';
}

export async function updateLimit(value) {
    currentLimit = value;
    const limitText = document.getElementById('limitText');
    if (limitText) limitText.textContent = value === 'all' ? 'Semua' : value;
    showLoading(); await fetchBooks(currentSearch, currentFilterJenis, currentFilterBahasa, currentPage, value === 'all' ? 999 : value); refreshGrid();
}
