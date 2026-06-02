// ==================== HEADER COMPONENT ====================
import { openModal } from '../components/modal.js';

let isLoggedIn = false;
let userName = 'Kamal Fikar';

export function renderHeader() {
    const header = document.getElementById('appHeader');
    if (!header) return;
    
    const userDisplay = isLoggedIn 
        ? `<div class="user-info logged-in">
              <span class="user-name" id="userName">${userName}</span>
           </div>`
        : `<div class="user-info">
              <span class="user-name" id="userName">Tamu</span>
              <span class="user-role">Silakan Masuk</span>
           </div>`;
    
    header.innerHTML = `
        <div class="header-inner">
            <div class="header-left">
                <div class="avatar-circle" id="btnProfile" title="Profil Saya">
                    <i class="fa-solid fa-circle-user"></i>
                </div>
                ${userDisplay}
            </div>
            
            <button class="hamburger" id="hamburgerKoleksi" aria-label="Menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
        
        <div class="nav-mobile" id="mobileMenuKoleksi">
            <ul>
                <li><a href="../index.html"><i class="fa-solid fa-house"></i> Beranda</a></li>
                <li><a href="index.html" class="active"><i class="fa-solid fa-book"></i> Koleksi Buku</a></li>
                <li><a href="../mediapim/"><i class="fa-solid fa-hashtag"></i> Media PIM</a></li>
                <li><a href="../arsipfoto/"><i class="fa-solid fa-camera-retro"></i> Arsip Foto PIM</a></li>
            </ul>
        </div>
    `;
}

export function initHeaderEvents() {
    const btnProfile = document.getElementById('btnProfile');
    if (btnProfile) {
        btnProfile.addEventListener('click', () => {
            if (isLoggedIn) {
                openModal('modalProfil');
            } else {
                window.location.hash = '#/login';
            }
        });
    }
    
    const userNameEl = document.getElementById('userName');
    if (userNameEl) {
        userNameEl.style.cursor = 'pointer';
        userNameEl.addEventListener('click', () => {
            if (isLoggedIn) {
                openModal('modalProfil');
            } else {
                window.location.hash = '#/login';
            }
        });
    }

    const hamburger = document.getElementById('hamburgerKoleksi');
    const mobileMenu = document.getElementById('mobileMenuKoleksi');
    
    if (hamburger && mobileMenu) {
        const newHamburger = hamburger.cloneNode(true);
        hamburger.parentNode.replaceChild(newHamburger, hamburger);
        
        newHamburger.addEventListener('click', () => {
            newHamburger.classList.toggle('open');
            mobileMenu.classList.toggle('open');
        });
        
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                newHamburger.classList.remove('open');
                mobileMenu.classList.remove('open');
            });
        });
    }
}
