// Intro Animation
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

        // Mobile Menu Toggle
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');
        const menuOverlay = document.getElementById('menuOverlay');

        function toggleMenu() {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('open');
            menuOverlay.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
        }

        hamburger.addEventListener('click', toggleMenu);
        menuOverlay.addEventListener('click', toggleMenu);

        document.querySelectorAll('.hyperlinks a').forEach(link => {
            link.addEventListener('click', () => {
                if (mobileMenu.classList.contains('open')) {
                    toggleMenu();
                }
            });
        });

        // Scroll effect for nav
        window.addEventListener('scroll', () => {
            const nav = document.getElementById('nav');
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });