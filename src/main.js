// Arca de Noe - Script principal
// Funcionalidades interativas e animacoes

document.addEventListener('DOMContentLoaded', function () {
    initScrollReveal();
    initHeaderEffects();
    initSmoothScroll();
    initMobileMenu();
    initAnimations();
    initFormInteractions();
    initPerformanceOptimizations();
});

function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');

                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.style.transitionDelay = '0s';
                }, delay);
            }
        });
    }, observerOptions);

    const elementsToReveal = document.querySelectorAll([
        '.service-card',
        '.hour-item',
        '.section h2',
        '.section-tag',
        '.cta-box',
        '.contact-mini-card',
        '.hours-image-card'
    ].join(', '));

    elementsToReveal.forEach((el, index) => {
        el.classList.add('scroll-reveal');
        el.dataset.delay = index * 100;
        observer.observe(el);
    });
}

function initHeaderEffects() {
    const header = document.querySelector('.header');
    if (!header) {
        return;
    }

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                const mobileMenu = document.querySelector('.nav-links');
                const mobileMenuBtn = document.querySelector('.mobile-menu-btn');

                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                }

                if (mobileMenuBtn && mobileMenuBtn.classList.contains('active')) {
                    mobileMenuBtn.classList.remove('active');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }

                document.body.classList.remove('menu-open');
            }
        });
    });
}

function initMobileMenu() {
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelector('.nav-links');

    if (!nav || !navLinks || document.querySelector('.mobile-menu-btn')) {
        return;
    }

    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.type = 'button';
    mobileMenuBtn.setAttribute('aria-label', 'Abrir menu de navegacao');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');

    navLinks.id = 'mobile-nav-links';
    mobileMenuBtn.setAttribute('aria-controls', navLinks.id);
    mobileMenuBtn.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;

    nav.appendChild(mobileMenuBtn);

    const closeMenu = () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
    };

    const openMenu = () => {
        navLinks.classList.add('active');
        mobileMenuBtn.classList.add('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        document.body.classList.add('menu-open');
    };

    mobileMenuBtn.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            closeMenu();
            return;
        }

        openMenu();
    });

    document.addEventListener('click', (event) => {
        const clickedInsideMenu = navLinks.contains(event.target);
        const clickedButton = mobileMenuBtn.contains(event.target);

        if (!clickedInsideMenu && !clickedButton) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 980) {
            closeMenu();
        }
    });
}

function initAnimations() {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';

        let index = 0;
        const typeWriter = () => {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 50);
            }
        };

        setTimeout(typeWriter, 500);
    }

    const heroCards = document.querySelectorAll('.hero-card');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateHeroParallax = () => {
        if (window.innerWidth <= 980 || prefersReducedMotion.matches) {
            heroCards.forEach((card) => {
                card.style.setProperty('--parallax-y', '0px');
            });
            return;
        }

        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        heroCards.forEach((card, index) => {
            const speed = 0.5 + (index * 0.2);
            card.style.setProperty('--parallax-y', `${rate * speed}px`);
        });
    };

    updateHeroParallax();
    window.addEventListener('scroll', updateHeroParallax, { passive: true });
    window.addEventListener('resize', updateHeroParallax);

    const primaryButtons = document.querySelectorAll('.btn-primary');
    primaryButtons.forEach((btn) => {
        btn.addEventListener('mouseenter', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            this.style.background = `radial-gradient(circle at ${x}px ${y}px, var(--primary-2), var(--primary))`;
        });

        btn.addEventListener('mouseleave', function () {
            this.style.background = '';
        });
    });
}

function initFormInteractions() {
    const style = document.createElement('style');
    style.textContent = `
        input, textarea, select {
            transition: all 0.3s ease;
        }

        input:focus, textarea:focus, select:focus {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(52, 209, 106, 0.2);
            border-color: var(--primary);
        }

        .floating-label {
            transition: all 0.3s ease;
        }

        input:focus + .floating-label,
        input:not(:placeholder-shown) + .floating-label {
            transform: translateY(-25px) scale(0.85);
            color: var(--primary);
        }
    `;
    document.head.appendChild(style);
}

function initPerformanceOptimizations() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('fade-in');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach((img) => imageObserver.observe(img));

    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }

        scrollTimeout = window.requestAnimationFrame(() => {
            document.body.style.willChange = 'auto';
        });
    });

    const criticalResources = [
        './src/assets/logo-arca-noe.jpg',
        './src/assets/pets-services.jpg'
    ];

    criticalResources.forEach((resource) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = resource;
        document.head.appendChild(link);
    });
}

const utils = {
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    throttle: (func, limit) => {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => {
                    inThrottle = false;
                }, limit);
            }
        };
    },

    animateCounter: (element, target, duration = 2000) => {
        let start = 0;
        const increment = target / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }
};

window.utils = utils;

console.log('%cArca de Noe Clinica Veterinaria', 'font-size: 20px; font-weight: bold; color: #34d16a;');
console.log('%cSite desenvolvido com carinho para pets', 'font-size: 14px; color: #c9e4d0;');
