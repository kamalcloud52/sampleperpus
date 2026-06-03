// ==================== MODAL COMPONENT ====================
let currentModal = null;

export function renderModal() {
    const container = document.getElementById('modalContainer');
    if (!container) return;

    container.innerHTML = `
        <!-- Modal Detail -->
        <div class="modal-overlay" id="modalDetail">
            <div class="modal-sheet" id="modalSheetDetail">
                <div class="modal-handle"></div>
                <button class="modal-close-btn" data-close="modalDetail"><i class="fa-solid fa-xmark"></i></button>
                <div class="modal-cover" id="detailCover" style="background:linear-gradient(135deg,#d1fae5,#a7f3d0);color:#047857;"><i class="fa-solid fa-book-open"></i></div>
                <h3 class="modal-title" id="detailTitle">Judul Buku</h3>
                <div class="modal-info-row"><span>Jenis</span><span id="detailKategori">-</span></div>
                <div class="modal-info-row"><span>Penulis</span><span id="detailPenulis">-</span></div>
                <div class="modal-info-row"><span>Edisi</span><span id="detailEdisi">-</span></div>
                <div class="modal-info-row"><span>Bahasa</span><span id="detailBahasa">-</span></div>
                <div class="modal-info-row"><span>Kata Kunci</span><span id="detailKeywords">-</span></div>
                <button class="modal-action-btn" id="btnBaca"><i class="fa-solid fa-book-open"></i> Baca Sekarang</button>
                <button class="modal-action-btn" id="btnDownload" style="background:#065f46;margin-top:8px;"><i class="fa-solid fa-download"></i> Unduh PDF</button>
            </div>
        </div>

        <!-- Modal Profil -->
        <div class="modal-overlay" id="modalProfil">
            <div class="modal-sheet" id="modalSheetProfil">
                <div class="modal-handle"></div>
                <button class="modal-close-btn" data-close="modalProfil"><i class="fa-solid fa-xmark"></i></button>
                <div class="profile-avatar"><i class="fa-solid fa-circle-user"></i></div>
                <h3 class="modal-title text-center">Akun Saya</h3>
                <div class="modal-info-row"><span>Nama</span><span id="profilNama">Ahmad Santri</span></div>
                <div class="modal-info-row"><span>Kelas</span><span id="profilKelas">2 Aliyah</span></div>
                <div class="modal-info-row"><span>No. Anggota</span><span id="profilNo">PIM-2024-0012</span></div>
                <button class="modal-action-btn" style="background:#e5e7eb;color:#374151;margin-top:12px;" data-close="modalProfil"><i class="fa-solid fa-right-from-bracket"></i> Keluar</button>
            </div>
        </div>

        <!-- Modal Filter -->
        <div class="modal-overlay" id="modalFilter">
            <div class="modal-sheet" id="modalSheetFilter">
                <div class="modal-handle"></div>
                <button class="modal-close-btn" data-close="modalFilter"><i class="fa-solid fa-xmark"></i></button>
                <h3 class="modal-title">Filter Koleksi</h3>
                <div class="filter-group">
                    <div class="filter-label">Jenis</div>
                    <div class="filter-options" id="filterJenis">
                        <button class="filter-option selected" data-value="">Semua</button>
                        <button class="filter-option" data-value="Buku">Buku</button>
                        <button class="filter-option" data-value="Karya Tulis Ilmiah">KTI</button>
                        <button class="filter-option" data-value="Kitab">Kitab</button>
                        <button class="filter-option" data-value="Majalah">Majalah</button>
                        <button class="filter-option" data-value="Modul">Modul</button>
                        <button class="filter-option" data-value="Skripsi">Skripsi</button>
                        <button class="filter-option" data-value="Tesis">Tesis</button>
                        <button class="filter-option" data-value="Web">Web</button>
                    </div>
                </div>
                <div class="filter-group">
                    <div class="filter-label">Bahasa</div>
                    <div class="filter-options" id="filterBahasa">
                        <button class="filter-option selected" data-value="">Semua</button>
                        <button class="filter-option" data-value="Indonesia">Indonesia</button>
                        <button class="filter-option" data-value="Arab">Arab</button>
                        <button class="filter-option" data-value="Arab Pegon">Arab Pegon</button>
                        <button class="filter-option" data-value="Inggris">Inggris</button>
                    </div>
                </div>
                <button class="modal-action-btn" id="btnTerapkanFilter"><i class="fa-solid fa-check"></i> Terapkan Filter</button>
                <button class="modal-action-btn" id="btnResetFilter" style="background:#6b7280;margin-top:8px;"><i class="fa-solid fa-rotate"></i> Reset Filter</button>
            </div>
        </div>

        <!-- Modal Limit -->

    `;
}

export function initModalEvents() {
    // Geser handle untuk tutup modal
    document.querySelectorAll('.modal-sheet').forEach(sheet => {
        let startY = 0, currentY = 0, isDragging = false;
        const handle = sheet.querySelector('.modal-handle');
        if (!handle) return;
        handle.addEventListener('touchstart', (e) => { startY = e.touches[0].clientY; isDragging = true; sheet.style.transition = 'none'; }, { passive: true });
        handle.addEventListener('touchmove', (e) => { if (!isDragging) return; currentY = e.touches[0].clientY; const diff = currentY - startY; if (diff > 0) sheet.style.transform = `translateY(${diff}px)`; }, { passive: true });
        handle.addEventListener('touchend', () => {
            if (!isDragging) return; isDragging = false;
            sheet.style.transition = 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)';
            if (currentY - startY > 100) { const overlay = sheet.closest('.modal-overlay'); if (overlay) closeModal(overlay.id); }
            else sheet.style.transform = 'translateY(0)';
            startY = 0; currentY = 0;
        });
    });

    // Tutup modal
    document.querySelectorAll('.modal-close-btn, [data-close]').forEach(btn => {
        btn.addEventListener('click', () => { const modalId = btn.dataset.close; if (modalId) closeModal(modalId); });
    });
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(overlay.id); });
    });

    // Baca & Download
    document.getElementById('btnBaca')?.addEventListener('click', () => alert('Fitur baca akan segera hadir!'));
    document.getElementById('btnDownload')?.addEventListener('click', () => alert('Fitur unduh akan segera hadir!'));

    // Filter options
    document.querySelectorAll('.filter-options').forEach(group => {
        group.querySelectorAll('.filter-option').forEach(opt => {
            opt.addEventListener('click', function() {
                group.querySelectorAll('.filter-option').forEach(o => o.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
    });

    // Terapkan filter
    document.getElementById('btnTerapkanFilter')?.addEventListener('click', () => { applyFilter(); closeModal('modalFilter'); });
    document.getElementById('btnResetFilter')?.addEventListener('click', () => { resetFilter(); closeModal('modalFilter'); });

    // Limit options

}

function applyFilter() {
    const selectedJenis = document.querySelector('#filterJenis .filter-option.selected')?.dataset.value || '';
    const selectedBahasa = document.querySelector('#filterBahasa .filter-option.selected')?.dataset.value || '';
    document.querySelectorAll('.card-item, .list-item').forEach(item => {
        const kategori = item.dataset.kategori || '';
        const bahasa = item.dataset.bahasa || '';
        item.style.display = (!selectedJenis || kategori === selectedJenis) && (!selectedBahasa || bahasa === selectedBahasa) ? '' : 'none';
    });
    updateFilterIcon(!!(selectedJenis || selectedBahasa));
}

function resetFilter() {
    document.querySelectorAll('.filter-option').forEach(opt => opt.classList.remove('selected'));
    document.querySelectorAll('.filter-option:first-child').forEach(opt => opt.classList.add('selected'));
    document.querySelectorAll('.card-item, .list-item').forEach(item => item.style.display = '');
    updateFilterIcon(false);
}

function updateFilterIcon(isActive) {
    const filterBtn = document.getElementById('btnFilterHome');
    if (!filterBtn) return;
    filterBtn.style.color = isActive ? '#047857' : '#4b5563';
    filterBtn.style.borderColor = isActive ? '#047857' : '#e5e7eb';
    filterBtn.style.background = isActive ? '#d1fae5' : '#f8fafc';
}

export function openModal(modalId) {
    document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
    const modal = document.getElementById(modalId);
    if (modal) { modal.classList.add('open'); currentModal = modalId; const sheet = modal.querySelector('.modal-sheet'); if (sheet) sheet.style.transform = 'translateY(0)'; }
}

export function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) { modal.classList.remove('open'); if (currentModal === modalId) currentModal = null; }
}

export function closeAllModals() {
    document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
    currentModal = null;
}
