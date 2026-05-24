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

// ==================== ANIMASI SCROLL ====================
(function() {
    const fadeEls = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 70);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeEls.forEach(el => observer.observe(el));
})();

// ==================== TRACKING ====================
document.querySelectorAll('#magazine-grid .magazine-card').forEach(card => {
    card.addEventListener('click', (e) => {
        const judul = card.querySelector('h3').innerText;
        console.log('Membuka berkas: ' + judul);
    });
});
