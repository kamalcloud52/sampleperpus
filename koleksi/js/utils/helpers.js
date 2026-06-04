// ==================== UTILITY HELPERS ====================

/**
 * Debounce — tunda eksekusi fungsi sampai user berhenti mengetik
 * @param {function} func - Fungsi yang akan dijalankan
 * @param {number} delay - Waktu tunda dalam milidetik
 * @returns {function}
 */
export function debounce(func, delay = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * Tampilkan loading spinner di grid/list
 * @param {string} text - Teks loading (default: "Memuat koleksi...")
 */
export function showLoading(text = 'Memuat koleksi...') {
    const grid = document.getElementById('booksGrid');
    const list = document.getElementById('booksList');
    const loadingHTML = `
        <div class="loading-container" style="grid-column:1/-1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 20px;gap:12px;">
            <div class="loading-spinner"></div>
            <p class="loading-text">${text}</p>
        </div>
    `;
    if (grid && !grid.classList.contains('hidden')) grid.innerHTML = loadingHTML;
    if (list && !list.classList.contains('hidden')) list.innerHTML = loadingHTML;
}

/**
 * Animasi counter angka (dari 0 ke target)
 * @param {string} elementId - ID elemen HTML
 * @param {number} target - Angka target
 * @param {string} suffix - Teks setelah angka (contoh: "Buku", "Jenis")
 */
export function animateCounter(elementId, target, suffix = '') {
    const el = document.getElementById(elementId);
    if (!el) return;
    let current = 0;
    const duration = 600;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            el.textContent = target + (suffix ? ' ' + suffix : '');
            clearInterval(timer);
        } else {
            el.textContent = current + (suffix ? ' ' + suffix : '');
        }
    }, 16);
}

/**
 * Format angka dengan pemisah ribuan (contoh: 1.234)
 * @param {number} num - Angka yang akan diformat
 * @returns {string}
 */
export function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/**
 * Truncate teks jika melebihi panjang maksimal
 * @param {string} text - Teks yang akan dipotong
 * @param {number} maxLength - Panjang maksimal
 * @returns {string}
 */
export function truncateText(text, maxLength = 100) {
    if (!text || text.length <= maxLength) return text || '';
    return text.substring(0, maxLength) + '...';
}

/**
 * Dapatkan inisial dari judul (untuk cover fallback)
 * @param {string} title - Judul buku
 * @param {number} length - Jumlah karakter (default: 3)
 * @returns {string}
 */
export function getInitials(title, length = 3) {
    if (!title) return 'PIM';
    return title.substring(0, length).toUpperCase();
}

/**
 * Dapatkan warna cover berdasarkan index
 * @param {number} index - Index buku
 * @returns {object} - { background, color }
 */
export function getCoverColors(index = 0) {
    const colors = [
        { background: 'linear-gradient(135deg,#d1fae5,#a7f3d0)', color: '#047857' },
        { background: 'linear-gradient(135deg,#fef3c7,#fde68a)', color: '#92400e' },
        { background: 'linear-gradient(135deg,#e0e7ff,#c7d2fe)', color: '#3730a3' },
        { background: 'linear-gradient(135deg,#fce7f3,#fbcfe8)', color: '#9d174d' },
        { background: 'linear-gradient(135deg,#ffedd5,#fed7aa)', color: '#c2410c' },
        { background: 'linear-gradient(135deg,#d1fae5,#a7f3d0)', color: '#047857' }
    ];
    return colors[index % colors.length];
}

/**
 * Escape HTML untuk mencegah XSS
 * @param {string} str - String yang akan di-escape
 * @returns {string}
 */
export function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

/**
 * Simpan data ke localStorage dengan expiry
 * @param {string} key - Kunci
 * @param {any} value - Nilai
 * @param {number} ttl - Time to live dalam detik
 */
export function setCache(key, value, ttl = 300) {
    const data = {
        value,
        expiry: Date.now() + ttl * 1000
    };
    localStorage.setItem(key, JSON.stringify(data));
}

/**
 * Ambil data dari localStorage (dengan expiry check)
 * @param {string} key - Kunci
 * @returns {any|null}
 */
export function getCache(key) {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (Date.now() > data.expiry) {
        localStorage.removeItem(key);
        return null;
    }
    return data.value;
}

/**
 * Hapus cache berdasarkan key
 * @param {string} key - Kunci
 */
export function clearCache(key) {
    if (key) {
        localStorage.removeItem(key);
    } else {
        localStorage.clear();
    }
}
