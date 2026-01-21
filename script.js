window.addEventListener('load', () => {
    const intro = document.getElementById('intro');
    const home = document.getElementById('home');
    const nav = document.getElementById('nav');
    
    setTimeout(() => {
        intro.classList.add('fade-out');
        
        setTimeout(() => {
            home.classList.add('show');
            nav.classList.add('visible');
        }, 300);
        
        setTimeout(() => {
            intro.style.display = 'none';
        }, 1000);
    }, 2500);
});

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const menuOverlay = document.getElementById('menuOverlay');

function toggleMenu() {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    menuOverlay.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
}

hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
});

menuOverlay.addEventListener('click', (e) => {
    if (e.target === menuOverlay) {
        toggleMenu();
    }
});

document.querySelectorAll('.hyperlinks a').forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('open')) {
            toggleMenu();
        }
    });
});

window.addEventListener('scroll', () => {
    const nav = document.getElementById('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

const sections = document.querySelectorAll('.home, .aboutUs, .services, .contactUs');
const navLinks = document.querySelectorAll('.hyperlinks a');

function setActiveLink() {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const scrollPosition = window.scrollY + 100;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('activeHyperlink');
        
        const href = link.getAttribute('href').substring(1);
        if (href === currentSection) {
            link.classList.add('activeHyperlink');
        }
    });
}

window.addEventListener('scroll', setActiveLink);

setTimeout(() => {
    setActiveLink();
}, 3000);

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

let currentSlideIndex = 1;
let autoSlideInterval;

function showSlide(n) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');

    if (n > slides.length) { currentSlideIndex = 1; }
    if (n < 1) { currentSlideIndex = slides.length; }

    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    slides[currentSlideIndex - 1].classList.add('active');
    indicators[currentSlideIndex - 1].classList.add('active');

    const allTexts = document.querySelectorAll('.slide-text');
    const allButtons = document.querySelectorAll('.read-more-btn');
    allTexts.forEach(text => text.classList.remove('expanded'));
    allButtons.forEach(btn => btn.textContent = 'Read More');
}

function changeSlide(n) {
    currentSlideIndex += n;
    showSlide(currentSlideIndex);
    resetAutoSlide();
}

function currentSlide(n) {
    currentSlideIndex = n;
    showSlide(currentSlideIndex);
    resetAutoSlide();
}

function toggleReadMore(slideNum) {
    const text = document.getElementById(`text-${slideNum}`);
    const btn = event.target;
    
    if (text.classList.contains('expanded')) {
        text.classList.remove('expanded');
        btn.textContent = 'Read More';
    } else {
        text.classList.add('expanded');
        btn.textContent = 'Read Less';
    }
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        currentSlideIndex++;
        showSlide(currentSlideIndex);
    }, 4000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

showSlide(currentSlideIndex);
startAutoSlide();

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') changeSlide(-1);
    if (e.key === 'ArrowRight') changeSlide(1);
});

document.querySelectorAll('.prev, .next').forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});
