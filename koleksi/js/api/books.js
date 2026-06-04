// ==================== API BOOKS ====================
const API_URL = 'https://script.google.com/macros/s/AKfycbxGxMfe48R_pfZx0bpNSgG1gvegbsTmaiZ7ydnceEhpU24BihZqLOO_1YJAhebpgGsu/exec';

let isLoading = false;

/**
 * Fetch buku dari Google Apps Script API
 * @param {string} search - Kata kunci pencarian
 * @param {string} jenis - Filter jenis (Buku, Kitab, dll)
 * @param {string} bahasa - Filter bahasa (Indonesia, Arab, dll)
 * @param {number} page - Halaman
 * @param {number} limit - Jumlah per halaman
 * @returns {object|null} - Data buku atau null jika gagal
 */
export async function fetchBooks(search = '', jenis = '', bahasa = '', page = 1, limit = 12) {
    if (isLoading) return null;
    isLoading = true;
    try {
        const params = new URLSearchParams({ search, jenis, bahasa, page, limit });
        const response = await fetch(`${API_URL}?${params}`);
        const result = await response.json();
        isLoading = false;
        
        if (result.success) {
            return {
                data: shuffleArray(result.data),
                allJenis: result.allJenis || [],
                allBahasa: result.allBahasa || [],
                totalPages: result.totalPages || 1,
                currentPage: result.page || 1,
                total: result.total || 0
            };
        }
        return null;
    } catch (error) {
        console.error('Error fetching books:', error);
        isLoading = false;
        return null;
    }
}

/**
 * Fisher-Yates shuffle untuk mengacak array
 * @param {array} array - Array yang akan diacak
 * @returns {array} - Array baru yang sudah diacak
 */
export function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/**
 * Ekstrak file ID dari URL Google Drive
 * @param {string} url - URL Google Drive
 * @returns {string|null} - File ID atau null
 */
export function extractFileId(url) {
    if (!url) return null;
    const patterns = [
        /\/file\/d\/([^\/]+)/,
        /[?&]id=([^&]+)/,
        /\/d\/([^\/]+)/
    ];
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }
    return null;
}

/**
 * Generate URL thumbnail Google Drive
 * @param {string} fileUrl - URL file PDF di Google Drive
 * @param {number} size - Ukuran thumbnail (default: w400)
 * @returns {string} - URL thumbnail
 */
export function getThumbnailUrl(fileUrl, size = 'w400') {
    const fileId = extractFileId(fileUrl);
    return fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=${size}` : '';
}

/**
 * Cek apakah URL adalah Google Drive
 * @param {string} url - URL yang dicek
 * @returns {boolean}
 */
export function isGoogleDriveUrl(url) {
    return url && url.includes('drive.google.com');
}
