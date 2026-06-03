// ==================== HOME PAGE ====================
import { openModal } from '../components/modal.js';

const booksData = [
    { id: 1, title: 'Metodologi Riset Modern', penulis: 'Dr. Rahmawan', edisi: '2024 / Vol 2', kategori: 'Buku', bahasa: 'Indonesia', keywords: 'riset, metodologi, penelitian', cover: 'linear-gradient(135deg,#d1fae5,#a7f3d0)', color: '#047857', icon: 'fa-book-open', label: 'PIM BOOK' },
    { id: 2, title: 'Fathul Qarib Al-Mujib', penulis: 'Ibnu Qasim', edisi: '1445 Hijriah', kategori: 'Kitab', bahasa: 'Arab', keywords: 'fiqih, kitab, klasik', cover: 'linear-gradient(135deg,#fef3c7,#fde68a)', color: '#92400e', icon: 'fa-scroll', label: 'CLASSIC KITAB' },
    { id: 3, title: 'Pengantar Statistik Pendidikan', penulis: 'Prof. Dr. Aminah', edisi: '2023 / Cetakan 5', kategori: 'Buku', bahasa: 'Indonesia', keywords: 'statistik, pendidikan, penelitian', cover: 'linear-gradient(135deg,#d1fae5,#a7f3d0)', color: '#047857', icon: 'fa-flask', label: 'RISET' },
    { id: 4, title: 'Amanat Edisi I', penulis: 'HSM PIM', edisi: '1991 / TH.VII', kategori: 'Majalah', bahasa: 'Indonesia', keywords: 'majalah, HSM, amanat', cover: 'linear-gradient(135deg,#e0e7ff,#c7d2fe)', color: '#3730a3', icon: 'fa-newspaper', label: 'MAGAZINE' },
    { id: 5, title: 'Nahwu Wadhih Juz 1', penulis: 'Ali Al-Jarim', edisi: '2020 / Cetakan 10', kategori: 'Kitab', bahasa: 'Arab', keywords: 'nahwu, gramatika, arab', cover: 'linear-gradient(135deg,#fef3c7,#fde68a)', color: '#92400e', icon: 'fa-scroll', label: 'NAHWU' },
    { id: 6, title: 'Fiqih Ibadah Kontemporer', penulis: 'Dr. H. Ahmad', edisi: '2024 / Cetakan 1', kategori: 'Buku', bahasa: 'Indonesia', keywords: 'fiqih, ibadah, kontemporer', cover: 'linear-gradient(135deg,#d1fae5,#a7f3d0)', color: '#047857', icon: 'fa-book-open', label: 'FIQIH' },
];

let currentLimit = 12;
let limitMenuOpen = false;

export function renderHome(main) {
    main.innerHTML = `
        <div class="welcome-card slide-up slide-up-delay-1">
            <span class="welcome-tag">👋 Halo, Pembaca Hebat!</span>
            <h1>Selamat Datang di Perpustakaan Digital PIM</h1>
            <p>Temukan ribuan referensi dalam satu genggaman.</p>
        </div>

        <div class="stats-grid slide-up slide-up-delay-2">
            <div class="stat-item">
                <div class="stat-icon-wrapper"><i class="fa-solid fa-book-bookmark"></i></div>
                <div class="stat-info"><span class="stat-label">Koleksi</span><span class="stat-value" id="countKoleksi">0</span></div>
            </div>
            <div class="stat-item">
                <div class="stat-icon-wrapper"><i class="fa-solid fa-tags"></i></div>
                <div class="stat-info"><span class="stat-label">Jenis</span><span class="stat-value" id="countJenis">0</span></div>
            </div>
        </div>

        <div class="search-row slide-up slide-up-delay-3">
            <div class="search-box">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" class="search-input" id="searchInput" placeholder="Cari judul, penulis...">
            </div>
            <button class="filter-action-btn" id="btnFilterHome" title="Filter">
                <i class="fa-solid fa-arrow-down-short-wide"></i>
            </button>
        </div>

        <div class="display-controls slide-up slide-up-delay-4">
            <div class="limit-dropdown">
                <button class="limit-btn" id="btnLimit">
                    <i class="fa-solid fa-eye"></i> Tampilkan <span id="limitText">12</span> <i class="fa-solid fa-chevron-down"></i>
                </button>
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

        <div class="books-layout-grid" id="booksGrid">${renderBookCards('grid')}</div>
        <div class="books-layout-list hidden" id="booksList">${renderBookCards('list')}</div>

        <div class="paginator-box">
            <span class="paginator-caption">Halaman</span>
            <div class="paginator-row">
                <button class="nav-step-btn">Awal</button>
                <button class="nav-step-btn"><i class="fa-solid fa-angle-left"></i></button>
                <button class="nav-step-btn active">1</button>
                <button class="nav-step-btn"><i class="fa-solid fa-angle-right"></i></button>
                <button class="nav-step-btn">Akhir</button>
            </div>
        </div>
    `;

    setTimeout(() => {
        animateCounter('countKoleksi', booksData.length, 'Buku');
        animateCounter('countJenis', new Set(booksData.map(b => b.kategori)).size, 'Jenis');
    }, 300);

    initHomeEvents();
}

function renderBookCards(type) {
    const data = booksData.slice(0, currentLimit === 'all' ? booksData.length : currentLimit);
    return data.map(book => type === 'grid' ? renderGridCard(book) : renderListCard(book)).join('');
}

function renderGridCard(book) {
    return `
        <div class="card-item" data-id="${book.id}" data-title="${book.title}" data-penulis="${book.penulis}" data-edisi="${book.edisi}" data-kategori="${book.kategori}" data-bahasa="${book.bahasa}">
            <div class="cover-art-container" style="background:${book.cover};color:${book.color};"><i class="fa-solid ${book.icon}"></i><span class="cover-text-preview">${book.label}</span></div>
            <div class="card-body">
                <div class="card-info"><span class="tag-badge">${book.kategori}</span><div class="item-main-title">${book.title}</div><div class="meta-text-line">${book.penulis}</div><div class="meta-text-line">${book.edisi}</div></div>
                <button class="action-card-btn detail-trigger"><i class="fa-solid fa-circle-info"></i> Detail</button>
            </div>
        </div>`;
}

function renderListCard(book) {
    return `
        <div class="list-item" data-id="${book.id}" data-title="${book.title}" data-penulis="${book.penulis}" data-edisi="${book.edisi}" data-kategori="${book.kategori}" data-bahasa="${book.bahasa}">
            <div class="list-cover" style="background:${book.cover};color:${book.color};"><i class="fa-solid ${book.icon}"></i><span>${book.label.substring(0,3)}</span></div>
            <div class="list-info"><span class="tag-badge">${book.kategori}</span><div class="item-main-title">${book.title}</div><div class="meta-text-line">${book.penulis}</div><div class="meta-text-line">${book.edisi}</div></div>
            <div class="list-action"><button class="action-card-btn detail-trigger"><i class="fa-solid fa-circle-info"></i> Detail</button></div>
        </div>`;
}

function animateCounter(elementId, target, suffix) {
    const el = document.getElementById(elementId);
    if (!el) return;
    let current = 0;
    const duration = 600, step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
        current += step;
        if (current >= target) { el.textContent = target + ' ' + suffix; clearInterval(timer); }
        else { el.textContent = current + ' ' + suffix; }
    }, 16);
}

// ==================== EVENT BINDING ====================
function bindCardEvents() {
    document.querySelectorAll('.detail-trigger').forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = newBtn.closest('[data-id]');
            if (!card) return;
            const id = parseInt(card.dataset.id);
            const book = booksData.find(b => b.id === id);
            if (book) {
                document.getElementById('detailTitle').textContent = book.title;
                document.getElementById('detailPenulis').textContent = book.penulis;
                document.getElementById('detailEdisi').textContent = book.edisi;
                document.getElementById('detailKategori').textContent = book.kategori;
                document.getElementById('detailBahasa').textContent = book.bahasa;
                document.getElementById('detailKeywords').textContent = book.keywords;
                const detailCover = document.getElementById('detailCover');
                if (detailCover) { detailCover.style.background = book.cover; detailCover.style.color = book.color; }
                openModal('modalDetail');
            }
        });
    });

    document.querySelectorAll('.card-item, .list-item').forEach(card => {
        const newCard = card.cloneNode(true);
        card.parentNode.replaceChild(newCard, card);
        newCard.addEventListener('click', (e) => {
            if (e.target.closest('button')) return;
            newCard.querySelector('.detail-trigger')?.click();
        });
    });
}

function initHomeEvents() {
    document.getElementById('btnFilterHome')?.addEventListener('click', () => openModal('modalFilter'));

    // Limit dropdown
    const btnLimit = document.getElementById('btnLimit');
    const limitMenu = document.getElementById('limitMenu');
    if (btnLimit && limitMenu) {
        btnLimit.addEventListener('click', (e) => {
            e.stopPropagation();
            limitMenu.classList.toggle('open');
        });
        limitMenu.querySelectorAll('.limit-menu-item').forEach(item => {
            item.addEventListener('click', function() {
                const value = this.dataset.value;
                updateLimit(value === 'all' ? 'all' : parseInt(value));
                limitMenu.classList.remove('open');
            });
        });
        document.addEventListener('click', (e) => {
            if (!limitMenu.contains(e.target) && !btnLimit.contains(e.target)) {
                limitMenu.classList.remove('open');
            }
        });
    }

    bindCardEvents();

    document.getElementById('viewGrid')?.addEventListener('click', function() {
        this.classList.add('active');
        document.getElementById('viewList').classList.remove('active');
        document.getElementById('booksGrid').classList.remove('hidden');
        document.getElementById('booksList').classList.add('hidden');
    });
    document.getElementById('viewList')?.addEventListener('click', function() {
        this.classList.add('active');
        document.getElementById('viewGrid').classList.remove('active');
        document.getElementById('booksList').classList.remove('hidden');
        document.getElementById('booksGrid').classList.add('hidden');
    });
    document.getElementById('searchInput')?.addEventListener('input', (e) => {
        const keyword = e.target.value.toLowerCase();
        document.querySelectorAll('.card-item, .list-item').forEach(item => {
            item.style.display = (item.dataset.title || '').toLowerCase().includes(keyword) ? '' : 'none';
        });
    });
}

export function updateLimit(value) {
    currentLimit = value;
    const limitText = document.getElementById('limitText');
    if (limitText) limitText.textContent = value === 'all' ? 'Semua' : value;
    const gridView = document.getElementById('booksGrid');
    const listView = document.getElementById('booksList');
    if (gridView) gridView.innerHTML = renderBookCards('grid');
    if (listView) listView.innerHTML = renderBookCards('list');
    bindCardEvents();
}

export { booksData };
