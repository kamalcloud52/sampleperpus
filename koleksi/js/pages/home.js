// ==================== HOME PAGE ====================
import { openModal } from '../components/modal.js';

// Data dummy buku
const booksData = [
    { id: 1, title: 'Metodologi Riset Modern', penulis: 'Dr. Rahmawan', edisi: '2024 / Vol 2', kategori: 'Buku', cover: 'linear-gradient(135deg,#d1fae5,#a7f3d0)', color: '#047857', icon: 'fa-book-open', label: 'PIM BOOK' },
    { id: 2, title: 'Fathul Qarib Al-Mujib', penulis: 'Ibnu Qasim', edisi: '1445 Hijriah', kategori: 'Kitab', cover: 'linear-gradient(135deg,#fef3c7,#fde68a)', color: '#92400e', icon: 'fa-scroll', label: 'CLASSIC KITAB' },
    { id: 3, title: 'Pengantar Statistik Pendidikan', penulis: 'Prof. Dr. Aminah', edisi: '2023 / Cetakan 5', kategori: 'Buku', cover: 'linear-gradient(135deg,#d1fae5,#a7f3d0)', color: '#047857', icon: 'fa-flask', label: 'RISET' },
    { id: 4, title: 'Amanat Edisi I', penulis: 'HSM PIM', edisi: '1991 / TH.VII', kategori: 'Majalah', cover: 'linear-gradient(135deg,#e0e7ff,#c7d2fe)', color: '#3730a3', icon: 'fa-newspaper', label: 'MAGAZINE' },
    { id: 5, title: 'Nahwu Wadhih Juz 1', penulis: 'Ali Al-Jarim', edisi: '2020 / Cetakan 10', kategori: 'Kitab', cover: 'linear-gradient(135deg,#fef3c7,#fde68a)', color: '#92400e', icon: 'fa-scroll', label: 'NAHWU' },
    { id: 6, title: 'Fiqih Ibadah Kontemporer', penulis: 'Dr. H. Ahmad', edisi: '2024 / Cetakan 1', kategori: 'Buku', cover: 'linear-gradient(135deg,#d1fae5,#a7f3d0)', color: '#047857', icon: 'fa-book-open', label: 'FIQIH' },
];

export function renderHome(main) {
    main.innerHTML = `
        <!-- Welcome Card -->
        <div class="welcome-card">
            <span class="welcome-tag">👋 Halo, Pembaca Hebat!</span>
            <h1>Selamat Datang di Perpustakaan Digital PIM</h1>
            <p>Temukan ribuan referensi dalam satu genggaman.</p>
        </div>

        <!-- Stats -->
        <div class="stats-grid">
            <div class="stat-item">
                <div class="stat-icon-wrapper"><i class="fa-solid fa-book-bookmark"></i></div>
                <div class="stat-info">
                    <span class="stat-label">Koleksi</span>
                    <span class="stat-value">${booksData.length} Buku</span>
                </div>
            </div>
            <div class="stat-item">
                <div class="stat-icon-wrapper"><i class="fa-solid fa-tags"></i></div>
                <div class="stat-info">
                    <span class="stat-label">Kategori</span>
                    <span class="stat-value">${new Set(booksData.map(b => b.kategori)).size} Grup</span>
                </div>
            </div>
        </div>

        <!-- Search -->
        <div class="search-row">
            <div class="search-box">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" class="search-input" id="searchInput" placeholder="Cari judul, penulis...">
            </div>
            <button class="filter-action-btn" id="btnFilterHome" title="Filter">
                <i class="fa-solid fa-arrow-down-short-wide"></i>
            </button>
        </div>

        <!-- Categories -->
        <div class="categories-bar" id="categoryBar">
            <button class="category-chip active" data-kategori="">Semua</button>
            <button class="category-chip" data-kategori="Buku">Buku</button>
            <button class="category-chip" data-kategori="Karya Tulis Ilmiah">Karya Tulis Ilmiah</button>
            <button class="category-chip" data-kategori="Kitab">Kitab</button>
            <button class="category-chip" data-kategori="Majalah">Majalah</button>
        </div>

        <!-- View Toggle -->
        <div class="display-options">
            <div class="toggle-switch-group">
                <button class="toggle-unit active" id="viewGrid"><i class="fa-solid fa-grip-vertical"></i></button>
                <button class="toggle-unit" id="viewList"><i class="fa-solid fa-list"></i></button>
            </div>
        </div>

        <!-- Grid View -->
        <div class="books-layout-grid" id="booksGrid">
            ${booksData.map(book => renderGridCard(book)).join('')}
        </div>

        <!-- List View -->
        <div class="books-layout-list hidden" id="booksList">
            ${booksData.map(book => renderListCard(book)).join('')}
        </div>

        <!-- Pagination -->
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

    // Init events
    initHomeEvents();
}

function renderGridCard(book) {
    return `
        <div class="card-item" data-id="${book.id}" data-title="${book.title}" data-penulis="${book.penulis}" data-edisi="${book.edisi}" data-kategori="${book.kategori}">
            <div class="cover-art-container" style="background:${book.cover};color:${book.color};">
                <i class="fa-solid ${book.icon}"></i>
                <span class="cover-text-preview">${book.label}</span>
            </div>
            <div class="card-body">
                <div class="card-info">
                    <span class="tag-badge">${book.kategori}</span>
                    <div class="item-main-title">${book.title}</div>
                    <div class="meta-text-line">${book.penulis}</div>
                    <div class="meta-text-line">${book.edisi}</div>
                </div>
                <button class="action-card-btn detail-trigger"><i class="fa-solid fa-circle-info"></i> Detail</button>
            </div>
        </div>
    `;
}

function renderListCard(book) {
    return `
        <div class="list-item" data-id="${book.id}" data-title="${book.title}" data-penulis="${book.penulis}" data-edisi="${book.edisi}" data-kategori="${book.kategori}">
            <div class="list-cover" style="background:${book.cover};color:${book.color};">
                <i class="fa-solid ${book.icon}"></i>
                <span>${book.label.substring(0,3)}</span>
            </div>
            <div class="list-info">
                <span class="tag-badge">${book.kategori}</span>
                <div class="item-main-title">${book.title}</div>
                <div class="meta-text-line">${book.penulis}</div>
                <div class="meta-text-line">${book.edisi}</div>
            </div>
            <div class="list-action">
                <button class="action-card-btn detail-trigger"><i class="fa-solid fa-circle-info"></i> Detail</button>
            </div>
        </div>
    `;
}

function initHomeEvents() {
    // Filter button
    const btnFilter = document.getElementById('btnFilterHome');
    if (btnFilter) {
        btnFilter.addEventListener('click', () => {
            openModal('modalFilter');
        });
    }

    // Detail triggers
    document.querySelectorAll('.detail-trigger').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('[data-id]');
            const id = card.dataset.id;
            window.location.hash = `#/detail/${id}`;
        });
    });

    // Klik card
    document.querySelectorAll('.card-item, .list-item').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('button')) return;
            const id = card.dataset.id;
            window.location.hash = `#/detail/${id}`;
        });
    });

    // View toggle
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

    // Search
    document.getElementById('searchInput')?.addEventListener('input', (e) => {
        const keyword = e.target.value.toLowerCase();
        document.querySelectorAll('.card-item, .list-item').forEach(item => {
            const title = item.dataset.title?.toLowerCase() || '';
            item.style.display = title.includes(keyword) ? '' : 'none';
        });
    });

    // Kategori chips
    document.querySelectorAll('.category-chip').forEach(chip => {
        chip.addEventListener('click', function() {
            document.querySelector('.category-chip.active')?.classList.remove('active');
            this.classList.add('active');
            const kategori = this.dataset.kategori;
            document.querySelectorAll('.card-item, .list-item').forEach(item => {
                if (!kategori || item.dataset.kategori === kategori) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}
