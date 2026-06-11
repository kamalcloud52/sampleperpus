// ==================== MODAL COMPONENT ====================
import { setFilter, updateFilterIcon, getFilterState, fetchAndRender } from '../pages/home.js';

let currentModal = null;

export function renderModal() {
    const container = document.getElementById('modalContainer');
    if (!container) return;
    container.innerHTML = `
        <div class="modal-overlay" id="modalDetail">
            <div class="modal-sheet">
                <div class="modal-header">
                    <button class="modal-close-btn" data-close="modalDetail"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <div class="modal-body">
                    <div class="modal-cover" id="detailCover" style="background:linear-gradient(135deg,#d1fae5,#a7f3d0);color:#047857;"><i class="fa-solid fa-book-open"></i></div>
                    <h3 class="modal-title" id="detailTitle">Judul Buku</h3>
                    <div class="modal-info-row"><span>Jenis</span><span id="detailKategori">-</span></div>
                    <div class="modal-info-row"><span>Penulis</span><span id="detailPenulis">-</span></div>
                    <div class="modal-info-row"><span>Edisi</span><span id="detailEdisi">-</span></div>
                    <div class="modal-info-row"><span>Bahasa</span><span id="detailBahasa">-</span></div>
                    <div class="modal-info-row"><span>Kata Kunci</span><span id="detailKeywords">-</span></div>
                </div>
                <div class="modal-footer">
                    <div class="modal-actions-row">
                        <button class="modal-action-btn modal-btn-baca" id="btnBaca"><i class="fa-solid fa-book-open"></i> Baca</button>
                        <button class="modal-action-btn modal-btn-simpan" id="btnSimpan"><i class="fa-solid fa-bookmark"></i> Simpan</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-overlay" id="modalProfil">
            <div class="modal-sheet">
                <div class="modal-header">
                    <button class="modal-close-btn" data-close="modalProfil"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <div class="modal-body">
                    <div class="profile-avatar"><i class="fa-solid fa-circle-user"></i></div>
                    <h3 class="modal-title">Akun Saya</h3>
                    <div class="modal-info-row"><span>Nama</span><span id="profilNama">Ahmad Santri</span></div>
                    <div class="modal-info-row"><span>Kelas</span><span id="profilKelas">2 Aliyah</span></div>
                    <div class="modal-info-row"><span>No. Anggota</span><span id="profilNo">PIM-2024-0012</span></div>
                </div>
                <div class="modal-footer">
                    <button class="modal-action-btn" style="background:#e5e7eb;color:#374151;" data-close="modalProfil"><i class="fa-solid fa-right-from-bracket"></i> Keluar</button>
                </div>
            </div>
        </div>
        <div class="modal-overlay" id="modalFilter">
            <div class="modal-sheet">
                <div class="modal-header">
                    <button class="modal-close-btn" data-close="modalFilter"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <div class="modal-body">
                    <h3 class="modal-title">Filter Koleksi</h3>
                    <div class="filter-group">
                        <div class="filter-label">Jenis</div>
                        <div class="filter-options" id="filterJenis"><button class="filter-option selected" data-value="">Semua</button></div>
                    </div>
                    <div class="filter-group">
                        <div class="filter-label">Bahasa</div>
                        <div class="filter-options" id="filterBahasa"><button class="filter-option selected" data-value="">Semua</button></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="modal-action-btn" id="btnTerapkanFilter"><i class="fa-solid fa-check"></i> Terapkan Filter</button>
                    <button class="modal-action-btn" id="btnResetFilter" style="background:#6b7280;margin-top:8px;"><i class="fa-solid fa-rotate"></i> Reset Filter</button>
                </div>
            </div>
        </div>
    `;
}

export function initModalEvents() {
    // Klik overlay tutup modal
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        const newOverlay = overlay.cloneNode(true);
        overlay.parentNode.replaceChild(newOverlay, overlay);
        newOverlay.addEventListener('click', (e) => { if (e.target === newOverlay) closeModal(newOverlay.id); });
    });

    // Baca
    const btnBaca = document.getElementById('btnBaca');
    if (btnBaca) { const nb = btnBaca.cloneNode(true); btnBaca.parentNode.replaceChild(nb, btnBaca); nb.addEventListener('click', () => { const link = nb.dataset.link; if (link) window.open(link, '_blank'); else alert('Link tidak tersedia'); }); }

    // Simpan
    const btnSimpan = document.getElementById('btnSimpan');
    if (btnSimpan) { const ns = btnSimpan.cloneNode(true); btnSimpan.parentNode.replaceChild(ns, btnSimpan); ns.addEventListener('click', function() { this.classList.toggle('saved'); this.innerHTML = this.classList.contains('saved') ? '<i class="fa-solid fa-bookmark"></i> Tersimpan' : '<i class="fa-solid fa-bookmark"></i> Simpan'; }); }

    // Filter options
    document.querySelectorAll('.filter-options').forEach(group => { group.querySelectorAll('.filter-option').forEach(opt => { const newOpt = opt.cloneNode(true); opt.parentNode.replaceChild(newOpt, opt); newOpt.addEventListener('click', function() { group.querySelectorAll('.filter-option').forEach(o => o.classList.remove('selected')); this.classList.add('selected'); }); }); });

    // Terapkan Filter
    const btnTerapkan = document.getElementById('btnTerapkanFilter');
    if (btnTerapkan) { const nb = btnTerapkan.cloneNode(true); btnTerapkan.parentNode.replaceChild(nb, btnTerapkan); nb.addEventListener('click', () => { const selectedJenis = document.querySelector('#filterJenis .filter-option.selected')?.dataset.value || ''; const selectedBahasa = document.querySelector('#filterBahasa .filter-option.selected')?.dataset.value || ''; const { search, limit } = getFilterState(); closeModal('modalFilter'); fetchAndRender(search, selectedJenis, selectedBahasa, 1, limit === 'all' ? 999 : limit).then(() => { updateFilterIcon(!!(selectedJenis || selectedBahasa)); }); }); }

    // Reset Filter
    const btnReset = document.getElementById('btnResetFilter');
    if (btnReset) { const nb = btnReset.cloneNode(true); btnReset.parentNode.replaceChild(nb, btnReset); nb.addEventListener('click', () => { const icon = nb.querySelector('.fa-rotate'); if (icon) { icon.classList.add('fa-spin'); setTimeout(() => icon.classList.remove('fa-spin'), 1000); } const { search, limit } = getFilterState(); setFilter('', ''); document.querySelectorAll('.filter-option').forEach(opt => opt.classList.remove('selected')); document.querySelectorAll('.filter-option:first-child').forEach(opt => opt.classList.add('selected')); closeModal('modalFilter'); fetchAndRender(search, '', '', 1, limit === 'all' ? 999 : limit).then(() => { updateFilterIcon(false); }); }); }
}

document.addEventListener('click', (e) => { const closeBtn = e.target.closest('.modal-close-btn') || e.target.closest('[data-close]'); if (closeBtn) { const modalId = closeBtn.dataset.close; if (modalId) closeModal(modalId); } });

// ==================== MODAL OPEN/CLOSE ====================
export function openModal(modalId) {
    document.querySelectorAll('.modal-overlay.open').forEach(m => {
        const sheet = m.querySelector('.modal-sheet');
        if (sheet) { sheet.style.transform = 'scale(0.9)'; sheet.style.opacity = '0'; }
        m.classList.remove('open');
    });
    const modal = document.getElementById(modalId); if (!modal) return;
    const sheet = modal.querySelector('.modal-sheet');
    if (sheet) { sheet.style.transition = 'none'; sheet.style.transform = 'scale(0.9)'; sheet.style.opacity = '0'; }
    modal.classList.add('open'); currentModal = modalId;
    if (sheet) { sheet.offsetHeight; sheet.style.transition = 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease'; sheet.style.transform = 'scale(1)'; sheet.style.opacity = '1'; }
}

export function closeModal(modalId) {
    const modal = document.getElementById(modalId); if (!modal) return;
    const sheet = modal.querySelector('.modal-sheet');
    if (sheet) { sheet.style.transition = 'transform 0.25s cubic-bezier(0.55, 0, 1, 0.45), opacity 0.2s ease'; sheet.style.transform = 'scale(0.9)'; sheet.style.opacity = '0'; setTimeout(() => { modal.classList.remove('open'); if (currentModal === modalId) currentModal = null; }, 250); }
    else { modal.classList.remove('open'); if (currentModal === modalId) currentModal = null; }
}

export function closeAllModals() { document.querySelectorAll('.modal-overlay.open').forEach(m => { const sheet = m.querySelector('.modal-sheet'); if (sheet) { sheet.style.transform = 'scale(0.9)'; sheet.style.opacity = '0'; } m.classList.remove('open'); }); currentModal = null; }
