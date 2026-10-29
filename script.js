const menuToggle = document.getElementById('menuToggle');
const topNav = document.getElementById('topNav');

const navOverlay = document.createElement('div');
navOverlay.className = 'nav-overlay';
document.body.appendChild(navOverlay);

function openMenu() {
    topNav.classList.add('open');
    navOverlay.classList.add('show');
    menuToggle.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    topNav.classList.remove('open');
    navOverlay.classList.remove('show');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

menuToggle.addEventListener('click', () => {
    if (topNav.classList.contains('open')) {
        closeMenu();
    } else {
        openMenu();
    }
});

navOverlay.addEventListener('click', closeMenu);

document.querySelectorAll('.top-nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                closeMenu();
            }
        }
    });
});

const sections = document.querySelectorAll('.content-section');
const navLinks = document.querySelectorAll('.top-nav a');

function updateActiveLink() {
    let current = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        if (section.offsetTop <= scrollPos) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', function() {
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = '<img src="' + this.src + '" alt="' + this.alt + '">';
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        modal.addEventListener('click', () => {
            modal.remove();
            document.body.style.overflow = '';
        });
    });
});
