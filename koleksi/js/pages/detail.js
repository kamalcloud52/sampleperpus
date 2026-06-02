// ==================== DETAIL PAGE ====================
import { openModal } from '../components/modal.js';

const booksData = [
    { id: 1, title: 'Metodologi Riset Modern', penulis: 'Dr. Rahmawan', edisi: '2024 / Vol 2', kategori: 'Buku', bahasa: 'Indonesia', keywords: 'riset, metodologi, penelitian', cover: 'linear-gradient(135deg,#d1fae5,#a7f3d0)', color: '#047857' },
    { id: 2, title: 'Fathul Qarib Al-Mujib', penulis: 'Ibnu Qasim', edisi: '1445 Hijriah', kategori: 'Kitab', bahasa: 'Arab', keywords: 'fiqih, kitab, klasik', cover: 'linear-gradient(135deg,#fef3c7,#fde68a)', color: '#92400e' },
    { id: 3, title: 'Pengantar Statistik Pendidikan', penulis: 'Prof. Dr. Aminah', edisi: '2023 / Cetakan 5', kategori: 'Buku', bahasa: 'Indonesia', keywords: 'statistik, pendidikan, penelitian', cover: 'linear-gradient(135deg,#d1fae5,#a7f3d0)', color: '#047857' },
    { id: 4, title: 'Amanat Edisi I', penulis: 'HSM PIM', edisi: '1991 / TH.VII', kategori: 'Majalah', bahasa: 'Indonesia', keywords: 'majalah, HSM, amanat', cover: 'linear-gradient(135deg,#e0e7ff,#c7d2fe)', color: '#3730a3' },
    { id: 5, title: 'Nahwu Wadhih Juz 1', penulis: 'Ali Al-Jarim', edisi: '2020 / Cetakan 10', kategori: 'Kitab', bahasa: 'Arab', keywords: 'nahwu, gramatika, arab', cover: 'linear-gradient(135deg,#fef3c7,#fde68a)', color: '#92400e' },
    { id: 6, title: 'Fiqih Ibadah Kontemporer', penulis: 'Dr. H. Ahmad', edisi: '2024 / Cetakan 1', kategori: 'Buku', bahasa: 'Indonesia', keywords: 'fiqih, ibadah, kontemporer', cover: 'linear-gradient(135deg,#d1fae5,#a7f3d0)', color: '#047857' },
];

export function renderDetail(main, param) {
    const bookId = parseInt(param);
    const book = booksData.find(b => b.id === bookId);
    
    if (!book) {
        main.innerHTML = '<p class="text-center" style="padding:40px;">Buku tidak ditemukan.</p>';
        return;
    }
    
    // Update modal content
    setTimeout(() => {
        const detailCover = document.getElementById('detailCover');
        const detailTitle = document.getElementById('detailTitle');
        const detailKategori = document.getElementById('detailKategori');
        const detailPenulis = document.getElementById('detailPenulis');
        const detailEdisi = document.getElementById('detailEdisi');
        const detailBahasa = document.getElementById('detailBahasa');
        const detailKeywords = document.getElementById('detailKeywords');
        
        if (detailCover) detailCover.style.background = book.cover;
        if (detailCover) detailCover.style.color = book.color;
        if (detailTitle) detailTitle.textContent = book.title;
        if (detailKategori) detailKategori.textContent = book.kategori;
        if (detailPenulis) detailPenulis.textContent = book.penulis;
        if (detailEdisi) detailEdisi.textContent = book.edisi;
        if (detailBahasa) detailBahasa.textContent = book.bahasa;
        if (detailKeywords) detailKeywords.textContent = book.keywords;
        
        openModal('modalDetail');
        
        // Kembali ke home setelah modal ditutup
        const modalDetail = document.getElementById('modalDetail');
        const observer = new MutationObserver(() => {
            if (!modalDetail.classList.contains('open')) {
                window.location.hash = '#/home';
                observer.disconnect();
            }
        });
        observer.observe(modalDetail, { attributes: true, attributeFilter: ['class'] });
    }, 100);
}
