// ==================== NAVBAR ====================
(function() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
    });
    document.querySelectorAll('.nav-mobile li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
        });
    });
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(4,120,87,0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.25)';
        } else {
            navbar.style.background = 'rgba(4,120,87,0.95)';
            navbar.style.boxShadow = '0 2px 12px rgba(0,0,0,0.15)';
        }
    });
})();

// ==================== ARSIP DATA ====================
const defaultConfig = {
    site_title: "Arsip PIM",
    footer_text: "© 2025 Perpustakaan Digital Mathali'ul Falah",
    primary_color: "#16a34a",
    secondary_color: "#ffffff",
    text_color: "#1f2937",
    header_background: "#16a34a",
    accent_color: "#059669"
};
let config = {};
let allData = [];
let filteredData = [];
let currentPage = 1;
let itemsPerPage = 12;
let currentView = 'grid';
let allKeywords = new Set();
let allJenis = new Set();
let allBahasa = new Set();
const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRBqLeFfIE2f8LrLwreSDp3_VRAcAoxAlcn03GgkfQheKilkU_tmEWI3ZSt7lEOBVMTQ2tAij0JhI8i/pub?gid=262881156&single=true&output=csv';

async function fetchCSVData() {
    try {
        const response = await fetch(CSV_URL);
        const csvText = await response.text();
        return parseCSV(csvText);
    } catch (error) { console.error('Error fetching data:', error); return []; }
}

function parseCSV(csvText) {
    const lines = csvText.split('\n');
    const data = [];
    allKeywords.clear(); allJenis.clear(); allBahasa.clear();
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line) {
            const values = parseCSVLine(line);
            if (values.length >= 1 && values[0]) {
                data.push(values);
                const jenis = values[1] || '';
                if (jenis) allJenis.add(jenis.trim());
                const bahasa = values[5] || '';
                if (bahasa) allBahasa.add(bahasa.trim());
                const keywords = values[8] || '';
                if (keywords) { keywords.split(',').forEach(keyword => { const trimmed = keyword.trim(); if (trimmed) allKeywords.add(trimmed); }); }
            }
        }
    }
    return data;
}

function parseCSVLine(line) {
    const values = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') inQuotes = !inQuotes;
        else if (char === ',' && !inQuotes) { values.push(current.trim()); current = ''; }
        else current += char;
    }
    values.push(current.trim());
    return values;
}

function getPdfThumbnailUrl(pdfUrl) {
    if (!pdfUrl) return '';
    if (pdfUrl.includes('drive.google.com')) {
        let fileId = '';
        if (pdfUrl.includes('/file/d/')) fileId = pdfUrl.split('/file/d/')[1].split('/')[0];
        else if (pdfUrl.includes('open?id=')) fileId = pdfUrl.split('open?id=')[1].split('&')[0];
        else if (pdfUrl.includes('uc?id=')) fileId = pdfUrl.split('uc?id=')[1].split('&')[0];
        if (fileId) return `https://drive.google.com/thumbnail?id=${fileId}&sz=w200`;
    }
    return pdfUrl;
}

// ==================== CUSTOM SELECT ====================
function initCustomSelect(selectId) {
    const originalSelect = document.getElementById(selectId);
    if (!originalSelect) return;
    const existing = originalSelect.parentNode.querySelector('.custom-select');
    if (existing) existing.remove();

    const wrapper = document.createElement('div');
    wrapper.className = 'custom-select';
    const trigger = document.createElement('div');
    trigger.className = 'custom-select-trigger';
    trigger.innerHTML = `<span class="selected-text">${originalSelect.options[originalSelect.selectedIndex]?.text || 'Pilih...'}</span><i class="fa-solid fa-chevron-down arrow"></i>`;
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'custom-select-options';

    Array.from(originalSelect.options).forEach(option => {
        const optionEl = document.createElement('div');
        optionEl.className = 'custom-select-option';
        if (option.selected) optionEl.classList.add('selected');
        optionEl.textContent = option.text;
        optionEl.dataset.value = option.value;
        optionEl.addEventListener('click', () => {
            originalSelect.value = option.value;
            originalSelect.dispatchEvent(new Event('change'));
            trigger.querySelector('.selected-text').textContent = option.text;
            optionsContainer.querySelectorAll('.custom-select-option').forEach(el => el.classList.remove('selected'));
            optionEl.classList.add('selected');
            optionsContainer.classList.remove('open');
            trigger.classList.remove('active');
        });
        optionsContainer.appendChild(optionEl);
    });

    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        trigger.classList.toggle('active');
        optionsContainer.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
        if (!wrapper.contains(e.target)) {
            trigger.classList.remove('active');
            optionsContainer.classList.remove('open');
        }
    });

    originalSelect.style.display = 'none';
    wrapper.appendChild(trigger);
    wrapper.appendChild(optionsContainer);
    originalSelect.parentNode.insertBefore(wrapper, originalSelect);
}

function populateFilterDropdowns() {
    const jenisSelect = document.getElementById('filter-jenis');
    jenisSelect.innerHTML = '<option value="">Semua Jenis Bacaan</option>';
    Array.from(allJenis).sort().forEach(jenis => {
        const option = document.createElement('option');
        option.value = jenis; option.textContent = jenis;
        jenisSelect.appendChild(option);
    });
    const bahasaSelect = document.getElementById('filter-bahasa');
    bahasaSelect.innerHTML = '<option value="">Semua Bahasa</option>';
    Array.from(allBahasa).sort().forEach(bahasa => {
        const option = document.createElement('option');
        option.value = bahasa; option.textContent = bahasa;
        bahasaSelect.appendChild(option);
    });
    initCustomSelect('filter-jenis');
    initCustomSelect('filter-bahasa');
}

function filterData() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const selectedJenis = document.getElementById('filter-jenis').value;
    const selectedBahasa = document.getElementById('filter-bahasa').value;
    filteredData = allData.filter(row => {
        const matchesSearch = !searchTerm || row.some(cell => cell.toLowerCase().includes(searchTerm));
        const jenis = row[1] || '';
        const matchesJenis = !selectedJenis || jenis.trim() === selectedJenis;
        const bahasa = row[5] || '';
        const matchesBahasa = !selectedBahasa || bahasa.trim() === selectedBahasa;
        return matchesSearch && matchesJenis && matchesBahasa;
    });
    currentPage = 1;
    renderData();
}

function renderData() {
    const start = itemsPerPage === 'all' ? 0 : (currentPage - 1) * itemsPerPage;
    const end = itemsPerPage === 'all' ? filteredData.length : start + itemsPerPage;
    const pageData = filteredData.slice(start, end);
    document.getElementById('showing-start').textContent = filteredData.length > 0 ? start + 1 : 0;
    document.getElementById('showing-end').textContent = Math.min(end, filteredData.length);
    document.getElementById('total-items').textContent = filteredData.length;
    if (currentView === 'list') renderTableView(pageData);
    else renderGridView(pageData);
    renderPagination();
}

function renderTableView(data) {
    const tbody = document.getElementById('table-body');
    tbody.innerHTML = '';
    data.forEach(row => {
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-gray-50';
        const jenis = row[1] || '';
        const nama = row[2] || '';
        const judul = row[3] || '';
        const edisiTahun = row[4] || '';
        const bahasa = row[5] || '';
        const linkBaca = row[6] || '';
        const kataKunci = row[8] || '';
        let kataKunciDisplay = kataKunci;
        if (kataKunci && kataKunci.length > 40) {
            const truncated = kataKunci.substring(0, 40);
            const rowId = 'kata-' + Math.random().toString(36).substr(2, 9);
            kataKunciDisplay = `<span id="${rowId}-short">${truncated}<span class="text-green-600 cursor-pointer hover:underline font-semibold" onclick="document.getElementById('${rowId}-short').style.display='none'; document.getElementById('${rowId}-full').style.display='inline';">...selengkapnya</span></span><span id="${rowId}-full" style="display:none;">${kataKunci}<span class="text-green-600 cursor-pointer hover:underline font-semibold" onclick="document.getElementById('${rowId}-full').style.display='none'; document.getElementById('${rowId}-short').style.display='inline';"> tampilkan sedikit</span></span>`;
        }
        const coverThumbnailUrl = getPdfThumbnailUrl(linkBaca);
        tr.innerHTML = `
            <td class="px-4 py-3">${coverThumbnailUrl ? `<div class="w-16 h-20 rounded image-loading"><img src="${coverThumbnailUrl}" alt="Cover" class="thumbnail w-16 h-20 object-cover rounded" loading="lazy" onload="this.parentElement.classList.remove('image-loading');" onerror="this.style.display='none'; this.parentElement.classList.remove('image-loading'); this.nextElementSibling.style.display='flex';"><div style="display:none;" class="w-16 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded flex items-center justify-center shadow-md"><svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6 2h8l6 6v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2zm7 1.5V8h4.5L13 3.5zM8 11h8v2H8v-2zm0 4h8v2H8v-2z"/></svg></div></div>` : `<div class="w-16 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded flex items-center justify-center shadow-md"><svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6 2h8l6 6v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2zm7 1.5V8h4.5L13 3.5zM8 11h8v2H8v-2zm0 4h8v2H8v-2z"/></svg></div>`}</td>
            <td class="px-4 py-3">${linkBaca ? `<a href="${linkBaca}" target="_blank" rel="noopener noreferrer" class="inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium touch-manipulation active:bg-green-800">Baca</a>` : '<span class="text-gray-400 text-sm">-</span>'}</td>
            <td class="px-4 py-3 font-semibold">${judul}</td>
            <td class="px-4 py-3">${jenis}</td>
            <td class="px-4 py-3">${nama}</td>
            <td class="px-4 py-3">${edisiTahun}</td>
            <td class="px-4 py-3">${bahasa}</td>
            <td class="px-4 py-3">${kataKunciDisplay}</td>`;
        tbody.appendChild(tr);
    });
    document.getElementById('table-view').classList.remove('hidden');
    document.getElementById('grid-view').classList.add('hidden');
}

function renderGridView(data) {
    const gridView = document.getElementById('grid-view');
    gridView.innerHTML = '';
    const fragment = document.createDocumentFragment();
    data.forEach(row => {
        const jenis = row[1] || '';
        const nama = row[2] || '';
        const judul = row[3] || '';
        const edisiTahun = row[4] || '';
        const bahasa = row[5] || '';
        const linkBaca = row[6] || '';
        const coverThumbnailUrl = getPdfThumbnailUrl(linkBaca);
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item bg-white rounded-lg shadow-md overflow-hidden cursor-pointer';
        gridItem.innerHTML = `
            <div class="aspect-[3/4] overflow-hidden relative image-loading">${coverThumbnailUrl ? `<img src="${coverThumbnailUrl}" alt="${judul}" class="w-full h-full object-cover" loading="lazy" onload="this.parentElement.classList.remove('image-loading');" onerror="this.onerror=null; this.style.display='none'; this.parentElement.classList.remove('image-loading'); this.nextElementSibling.style.display='flex';"><div style="display:none;" class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-400 to-green-600"><svg class="w-12 h-12 md:w-20 md:h-20 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6 2h8l6 6v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2zm7 1.5V8h4.5L13 3.5zM8 11h8v2H8v-2zm0 4h8v2H8v-2z"/></svg></div>` : `<div class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-400 to-green-600"><svg class="w-12 h-12 md:w-20 md:h-20 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6 2h8l6 6v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2zm7 1.5V8h4.5L13 3.5zM8 11h8v2H8v-2zm0 4h8v2H8v-2z"/></svg></div>`}</div>
            <div class="p-3">
                <div class="flex items-start justify-between gap-2 mb-1"><div class="text-xs text-green-600 font-semibold">${jenis}</div><p class="text-xs text-gray-600 line-clamp-1 flex-1 text-right">${nama}</p></div>
                <h3 class="font-bold text-sm mb-1 line-clamp-2">${judul}</h3>
                <p class="text-xs text-gray-500 mb-2">${edisiTahun}</p>
                <p class="text-xs text-gray-600 mb-2">Bahasa: ${bahasa}</p>
                ${linkBaca ? `<a href="${linkBaca}" target="_blank" rel="noopener noreferrer" class="block w-full text-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs font-medium touch-manipulation active:bg-green-800 min-h-[40px] flex items-center justify-center" onclick="event.stopPropagation();">Baca</a>` : '<span class="block text-center text-gray-400 text-xs">Link tidak tersedia</span>'}
            </div>`;
        fragment.appendChild(gridItem);
    });
    gridView.appendChild(fragment);
    document.getElementById('grid-view').classList.remove('hidden');
    document.getElementById('table-view').classList.add('hidden');
}

function renderPagination() {
    if (itemsPerPage === 'all') { document.getElementById('pagination').classList.add('hidden'); return; }
    document.getElementById('pagination').classList.remove('hidden');
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const pageNumbers = document.getElementById('page-numbers');
    pageNumbers.innerHTML = '';
    const maxButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);
    if (endPage - startPage < maxButtons - 1) startPage = Math.max(1, endPage - maxButtons + 1);
    for (let i = startPage; i <= endPage; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className = `px-4 py-2 rounded-lg ${i === currentPage ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`;
        btn.addEventListener('click', () => { currentPage = i; renderData(); });
        pageNumbers.appendChild(btn);
    }
    document.getElementById('prev-btn').disabled = currentPage === 1;
    document.getElementById('next-btn').disabled = currentPage === totalPages;
}

async function initialize() {
    document.getElementById('loading').classList.remove('hidden');
    allData = await fetchCSVData();
    filteredData = [...allData];
    populateFilterDropdowns();
    document.getElementById('loading').classList.add('hidden');
    renderData();
    setInterval(async () => { allData = await fetchCSVData(); populateFilterDropdowns(); filterData(); }, 1200000);
}

// Event Listeners
document.getElementById('search').addEventListener('input', filterData);
document.getElementById('filter-jenis').addEventListener('change', filterData);
document.getElementById('filter-bahasa').addEventListener('change', filterData);
document.getElementById('reset-btn').addEventListener('click', () => {
    document.getElementById('search').value = '';
    document.getElementById('filter-jenis').value = '';
    document.getElementById('filter-bahasa').value = '';
    filterData();
    document.querySelectorAll('.custom-select').forEach(el => el.remove());
    initCustomSelect('filter-jenis');
    initCustomSelect('filter-bahasa');
});
document.getElementById('items-per-page').addEventListener('change', (e) => { itemsPerPage = e.target.value === 'all' ? 'all' : parseInt(e.target.value); currentPage = 1; renderData(); });
document.getElementById('prev-btn').addEventListener('click', () => { if (currentPage > 1) { currentPage = 1; renderData(); } });
document.getElementById('next-btn').addEventListener('click', () => { const totalPages = Math.ceil(filteredData.length / itemsPerPage); if (currentPage < totalPages) { currentPage = totalPages; renderData(); } });
document.getElementById('go-btn').addEventListener('click', () => { const input = document.getElementById('go-to-page'); const pageNumber = parseInt(input.value); const totalPages = Math.ceil(filteredData.length / itemsPerPage); if (pageNumber && pageNumber >= 1 && pageNumber <= totalPages) { currentPage = pageNumber; renderData(); input.value = ''; } else if (pageNumber) { input.classList.add('border-red-500'); setTimeout(() => { input.classList.remove('border-red-500'); }, 1500); } });
document.getElementById('go-to-page').addEventListener('keypress', (e) => { if (e.key === 'Enter') document.getElementById('go-btn').click(); });
document.getElementById('view-list').addEventListener('click', () => { currentView = 'list'; document.getElementById('view-list').classList.remove('text-gray-400'); document.getElementById('view-list').classList.add('text-green-600'); document.getElementById('view-grid').classList.remove('text-green-600'); document.getElementById('view-grid').classList.add('text-gray-400'); renderData(); });
document.getElementById('view-grid').addEventListener('click', () => { currentView = 'grid'; document.getElementById('view-grid').classList.remove('text-gray-400'); document.getElementById('view-grid').classList.add('text-green-600'); document.getElementById('view-list').classList.remove('text-green-600'); document.getElementById('view-list').classList.add('text-gray-400'); renderData(); });
document.getElementById('refresh-btn').addEventListener('click', async () => { const refreshBtn = document.getElementById('refresh-btn'); const refreshIcon = document.getElementById('refresh-icon'); refreshBtn.disabled = true; refreshBtn.classList.add('opacity-50', 'cursor-not-allowed'); refreshIcon.classList.add('animate-spin'); allData = await fetchCSVData(); populateFilterDropdowns(); filterData(); refreshBtn.disabled = false; refreshBtn.classList.remove('opacity-50', 'cursor-not-allowed'); refreshIcon.classList.remove('animate-spin'); });

async function onConfigChange(newConfig) {
    document.getElementById('site-title').textContent = newConfig.site_title || defaultConfig.site_title;
    document.getElementById('footer-text').textContent = newConfig.footer_text || defaultConfig.footer_text;
}
if (window.elementSdk) {
    window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities: (config) => ({
            recolorables: [
                { get: () => config.primary_color || defaultConfig.primary_color, set: (value) => { config.primary_color = value; window.elementSdk.setConfig({ primary_color: value }); } },
                { get: () => config.secondary_color || defaultConfig.secondary_color, set: (value) => { config.secondary_color = value; window.elementSdk.setConfig({ secondary_color: value }); } },
                { get: () => config.text_color || defaultConfig.text_color, set: (value) => { config.text_color = value; window.elementSdk.setConfig({ text_color: value }); } }
            ],
            borderables: [],
            fontEditable: undefined,
            fontSizeable: undefined
        }),
        mapToEditPanelValues: (config) => new Map([["site_title", config.site_title || defaultConfig.site_title], ["footer_text", config.footer_text || defaultConfig.footer_text]])
    });
    config = window.elementSdk.config;
}
initialize();
