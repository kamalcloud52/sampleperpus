// ==================== MODAL COMPONENT ====================
let currentModal = null;

export function renderModal() {
    const container = document.getElementById('modalContainer');
    if (!container) return;
    
    container.innerHTML = `
        <!-- Modal Detail -->
        <div class="modal-overlay" id="modalDetail">
            <div class="modal-sheet">
                <div class="modal-handle"></div>
                <button class="modal-close-btn" data-close="modalDetail">
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <div class="modal-cover" id="detailCover" style="background:linear-gradient(135deg,#d1fae5,#a7f3d0);color:#047857;">
                    <i class="fa-solid fa-book-open"></i>
                </div>
                <h3 class="modal-title" id="detailTitle">Judul Buku</h3>
                <div class="modal-info-row"><span>Kategori</span><span id="detailKategori">-</span></div>
                <div class="modal-info-row"><span>Penulis</span><span id="detailPenulis">-</span></div>
                <div class="modal-info-row"><span>Edisi</span><span id="detailEdisi">-</span></div>
                <div class="modal-info-row"><span>Bahasa</span><span id="detailBahasa">-</span></div>
                <div class="modal-info-row"><span>Kata Kunci</span><span id="detailKeywords">-</span></div>
                <button class="modal-action-btn" id="btnBaca">
                    <i class="fa-solid fa-book-open"></i> Baca Sekarang
                </button>
                <button class="modal-action-btn" id="btnDownload" style="background:#065f46;margin-top:8px;">
                    <i class="fa-solid fa-download"></i> Unduh PDF
                </button>
            </div>
        </div>

        <!-- Modal Profil -->
        <div class="modal-overlay" id="modalProfil">
            <div class="modal-sheet">
                <div class="modal-handle"></div>
                <button class="modal-close-btn" data-close="modalProfil">
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <div class="profile-avatar">
                    <i class="fa-solid fa-circle-user"></i>
                </div>
                <h3 class="modal-title text-center">Akun Saya</h3>
                <div class="modal-info-row"><span>Nama</span><span id="profilNama">Ahmad Santri</span></div>
                <div class="modal-info-row"><span>Kelas</span><span id="profilKelas">2 Aliyah</span></div>
                <div class="modal-info-row"><span>No. Anggota</span><span id="profilNo">PIM-2024-0012</span></div>
                <button class="modal-action-btn" style="background:#e5e7eb;color:#374151;margin-top:12px;" data-close="modalProfil">
                    <i class="fa-solid fa-right-from-bracket"></i> Keluar
                </button>
            </div>
        </div>

        <!-- Modal Filter -->
        <div class="modal-overlay" id="modalFilter">
            <div class="modal-sheet">
                <div class="modal-handle"></div>
                <button class="modal-close-btn" data-close="modalFilter">
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <h3 class="modal-title">Filter Koleksi</h3>
                <div class="filter-group">
                    <div class="filter-label">Kategori</div>
                    <div class="filter-options" id="filterKategori">
                        <button class="filter-option selected" data-value="">Semua</button>
                        <button class="filter-option" data-value="Buku">Buku</button>
                        <button class="filter-option" data-value="Kitab">Kitab</button>
                        <button class="filter-option" data-value="Majalah">Majalah</button>
                        <button class="filter-option" data-value="KTI">KTI</button>
                    </div>
                </div>
                <div class="filter-group">
                    <div class="filter-label">Bahasa</div>
                    <div class="filter-options" id="filterBahasa">
                        <button class="filter-option selected" data-value="">Semua</button>
                        <button class="filter-option" data-value="Indonesia">Indonesia</button>
                        <button class="filter-option" data-value="Arab">Arab</button>
                        <button class="filter-option" data-value="Inggris">Inggris</button>
                    </div>
                </div>
                <div class="filter-group">
                    <div class="filter-label">Tahun</div>
                    <div class="filter-options" id="filterTahun">
                        <button class="filter-option selected" data-value="">Semua</button>
                        <button class="filter-option" data-value="2024">2024</button>
                        <button class="filter-option" data-value="2023">2023</button>
                        <button class="filter-option" data-value="2022">2022</button>
                        <button class="filter-option" data-value="2021">2021</button>
                    </div>
                </div>
                <button class="modal-action-btn" id="btnTerapkanFilter">
                    <i class="fa-solid fa-check"></i> Terapkan Filter
                </button>
                <button class="modal-action-btn" id="btnResetFilter" style="background:#6b7280;margin-top:8px;">
                    <i class="fa-solid fa-rotate"></i> Reset Filter
                </button>
            </div>
        </div>
    `;
}

export function initModalEvents() {
    // Tutup modal
    document.querySelectorAll('.modal-close-btn, [data-close]').forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.dataset.close;
            if (modalId) {
                document.getElementById(modalId).classList.remove('open');
            }
        });
    });

    // Klik overlay tutup modal
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('open');
            }
        });
    });

    // Tombol Baca
    const btnBaca = document.getElementById('btnBaca');
    if (btnBaca) {
        btnBaca.addEventListener('click', () => {
            alert('Fitur baca akan segera hadir!');
        });
    }

    // Tombol Download
    const btnDownload = document.getElementById('btnDownload');
    if (btnDownload) {
        btnDownload.addEventListener('click', () => {
            alert('Fitur unduh akan segera hadir!');
        });
    }

    // Filter options
    document.querySelectorAll('.filter-options').forEach(group => {
        group.querySelectorAll('.filter-option').forEach(opt => {
            opt.addEventListener('click', function() {
                group.querySelectorAll('.filter-option').forEach(o => o.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
    });

    // Tombol Terapkan Filter
    const btnTerapkan = document.getElementById('btnTerapkanFilter');
    if (btnTerapkan) {
        btnTerapkan.addEventListener('click', () => {
            document.getElementById('modalFilter').classList.remove('open');
            window.location.hash = '#/home';
        });
    }

    // Tombol Reset Filter
    const btnReset = document.getElementById('btnResetFilter');
    if (btnReset) {
        btnReset.addEventListener('click', () => {
            document.querySelectorAll('.filter-option').forEach(opt => opt.classList.remove('selected'));
            document.querySelectorAll('.filter-option:first-child').forEach(opt => opt.classList.add('selected'));
        });
    }
}

export function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('open');
    }
}

export function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('open');
    }
}
