// Arca de Noé - Script Principal
// Funcionalidades interativas e animações avançadas

document.addEventListener('DOMContentLoaded', function() {
    // Inicialização de todas as funcionalidades
    initScrollReveal();
    initHeaderEffects();
    initSmoothScroll();
    initMobileMenu();
    initAnimations();
    initFormInteractions();
    initPerformanceOptimizations();
});

// Scroll Reveal Animation
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Adiciona delay para elementos consecutivos
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.style.transitionDelay = '0s';
                }, delay);
            }
        });
    }, observerOptions);

    // Observa elementos para animação
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

// Header Effects on Scroll
function initHeaderEffects() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Adiciona classe scrolled quando rolar para baixo
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
    });
}

// Smooth Scroll for Navigation Links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
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

                // Fecha menu mobile se estiver aberto
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                }
            }
        });
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    // Cria botão menu mobile
    const nav = document.querySelector('.nav');
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.setAttribute('aria-label', 'Toggle menu');
    mobileMenuBtn.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;

    // Adiciona estilos CSS para o botão
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu-btn {
            display: none;
            flex-direction: column;
            gap: 4px;
            background: none;
            border: none;
            cursor: pointer;
            padding: 8px;
            z-index: 1001;
        }
        
        .mobile-menu-btn span {
            width: 25px;
            height: 3px;
            background: var(--text);
            border-radius: 2px;
            transition: all 0.3s ease;
        }
        
        .mobile-menu-btn.active span:nth-child(1) {
            transform: rotate(45deg) translate(6px, 6px);
        }
        
        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-btn.active span:nth-child(3) {
            transform: rotate(-45deg) translate(6px, -6px);
        }
        
        @media (max-width: 980px) {
            .mobile-menu-btn {
                display: flex;
            }
            
            .nav-links {
                position: fixed;
                top: 0;
                left: -100%;
                width: 80%;
                max-width: 300px;
                height: 100vh;
                background: var(--bg);
                flex-direction: column;
                padding: 80px 20px 20px;
                gap: 20px;
                transition: left 0.3s ease;
                z-index: 1000;
                box-shadow: 2px 0 20px rgba(0,0,0,0.3);
            }
            
            .nav-links.active {
                left: 0;
            }
            
            .nav-links a {
                font-size: 1.2rem;
                padding: 15px 20px;
                border-radius: 12px;
            }
        }
    `;
    document.head.appendChild(style);

    // Insere botão no nav
    nav.insertBefore(mobileMenuBtn, nav.firstChild);

    // Toggle menu
    mobileMenuBtn.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Previne scroll do body quando menu está aberto
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
}

// Advanced Animations
function initAnimations() {
    // Animação de digitação para o título principal
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

    // Parallax effect para hero cards
    const heroCards = document.querySelectorAll('.hero-card');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        heroCards.forEach((card, index) => {
            const speed = 0.5 + (index * 0.2);
            card.style.transform = `translateY(${rate * speed}px)`;
        });
    });

    // Efeito de brilho em botões primários
    const primaryButtons = document.querySelectorAll('.btn-primary');
    primaryButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.background = `radial-gradient(circle at ${x}px ${y}px, var(--primary-2), var(--primary))`;
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.background = '';
        });
    });
}

// Form Interactions (se houver formulários no futuro)
function initFormInteractions() {
    // Animação de foco para inputs (quando implementados)
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

// Performance Optimizations
function initPerformanceOptimizations() {
    // Lazy loading para imagens
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('fade-in');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Debounce para eventos de scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = window.requestAnimationFrame(() => {
            // Performance optimizations durante scroll
            document.body.style.willChange = 'auto';
        });
    });

    // Preload de recursos críticos
    const criticalResources = [
        './src/assets/logo-arca-noe.jpg',
        './src/assets/pets-services.jpg'
    ];

    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = resource;
        document.head.appendChild(link);
    });
}

// Utilitários
const utils = {
    // Debounce function
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

    // Throttle function
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Animação suave de contagem
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

// Exporta utilitários para uso global
window.utils = utils;

// Console message personalizado
console.log('%c🐾 Arca de Noé Clínica Veterinária', 'font-size: 20px; font-weight: bold; color: #34d16a;');
console.log('%cSite desenvolvido com ❤️ para pets', 'font-size: 14px; color: #c9e4d0;');
