// ==========================================
// GLOBAL VARIABLES & INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeLoadingScreen();
    initializeNavigation();
    initializeHeroAnimations();
    initializeScrollEffects();
    initializeCounters();
    initializePortfolioFilters();
    initializeTestimonials();
    initializeContactForm();
    initializeBackToTop();
    initializeParticles();
    initializeScrollSpy();
});

// ==========================================
// LOADING SCREEN
// ==========================================
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.style.overflow = 'auto';
        
        // Start hero animations after loading is complete
        setTimeout(startHeroAnimations, 500);
    }, 2000);
}

// ==========================================
// NAVIGATION FUNCTIONALITY
// ==========================================
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                
                // Smooth scroll to target
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active link
                updateActiveNavLink(link);
            }
        });
    });
}

function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// ==========================================
// HERO SECTION ANIMATIONS
// ==========================================
function initializeHeroAnimations() {
    const typingElement = document.querySelector('.typing-animation');
    const texts = ['SEO خبير', 'مطور مواقع', 'مسوق رقمي', 'استشاري تقني'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let delay = 200;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            delay = 100;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            delay = 200;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            delay = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
        
        setTimeout(typeText, delay);
    }
    
    // Start typing animation after loading screen
    setTimeout(typeText, 3000);
}

function startHeroAnimations() {
    const heroElements = document.querySelectorAll('.hero-text > *');
    const profileCard = document.querySelector('.profile-card');
    
    // Animate hero text elements
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Animate profile card
    setTimeout(() => {
        profileCard.style.opacity = '1';
        profileCard.style.transform = 'translateX(0)';
    }, 800);
}

// ==========================================
// SCROLL EFFECTS & ANIMATIONS
// ==========================================
function initializeScrollEffects() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Trigger counter animation for stats
                if (entry.target.classList.contains('stat-card') || 
                    entry.target.classList.contains('stat-item')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    const elementsToAnimate = document.querySelectorAll(
        'section, .service-card, .portfolio-item, .skill-item, .stat-card, .testimonial-card, .contact-card'
    );
    
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
}

// ==========================================
// COUNTER ANIMATIONS
// ==========================================
function initializeCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        counter.textContent = '0';
        counter.style.transition = 'all 0.5s ease';
    });
}

function animateCounter(element) {
    const counter = element.querySelector('[data-count]');
    if (!counter || counter.classList.contains('counted')) return;
    
    counter.classList.add('counted');
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        counter.textContent = Math.floor(current);
    }, 16);
}

// ==========================================
// PORTFOLIO FILTERS
// ==========================================
function initializePortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter portfolio items
            const filter = button.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ==========================================
// TESTIMONIALS SLIDER
// ==========================================
function initializeTestimonials() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentTestimonial = index;
    }
    
    // Navigation buttons
    prevBtn.addEventListener('click', () => {
        const prevIndex = currentTestimonial === 0 ? testimonialCards.length - 1 : currentTestimonial - 1;
        showTestimonial(prevIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        const nextIndex = currentTestimonial === testimonialCards.length - 1 ? 0 : currentTestimonial + 1;
        showTestimonial(nextIndex);
    });
    
    // Dots navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
    
    // Auto-slide every 5 seconds
    setInterval(() => {
        const nextIndex = currentTestimonial === testimonialCards.length - 1 ? 0 : currentTestimonial + 1;
        showTestimonial(nextIndex);
    }, 5000);
}

// ==========================================
// CONTACT FORM
// ==========================================
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
        
        // Add floating label effect
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value.trim()) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = `
        <i class="fas fa-spinner fa-spin"></i>
        <span>جاري الإرسال...</span>
    `;
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        showNotification('تم إرسال رسالتك بنجاح! سأتواصل معك قريباً.', 'success');
        e.target.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #00c9ff, #92fe9d);
        color: white;
        padding: 15px 25px;
        border-radius: 12px;
        box-shadow: 0 8px 30px rgba(0, 201, 255, 0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 600;
        transform: translateX(100%);
        transition: transform 0.5s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}

// ==========================================
// BACK TO TOP BUTTON
// ==========================================
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==========================================
// PARTICLE SYSTEM
// ==========================================
function initializeParticles() {
    const particleContainer = document.querySelector('.hero-particles');
    
    // Create additional particles dynamically
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particleContainer.appendChild(particle);
    }
}

// ==========================================
// SCROLL SPY
// ==========================================
function initializeScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observerOptions = {
        root: null,
        rootMargin: '-50px 0px -50px 0px',
        threshold: 0.3
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetId = entry.target.id;
                const correspondingNavLink = document.querySelector(`.nav-link[href="#${targetId}"]`);
                
                if (correspondingNavLink) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// ==========================================
// ADVANCED INTERACTIONS
// ==========================================

// Cursor tracking for hero section
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    const heroRect = hero.getBoundingClientRect();
    
    if (e.clientY >= heroRect.top && e.clientY <= heroRect.bottom) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        hero.style.background = `
            radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(0, 201, 255, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)
        `;
    }
});

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) rotateX(5deg)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0deg)';
    });
});

// Portfolio item parallax effect
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        item.style.transform = `rotateX(${y / 10}deg) rotateY(${x / 10}deg) scale(1.02)`;
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    });
});

// Stats counter on scroll
let statsAnimated = false;

window.addEventListener('scroll', () => {
    const statsSection = document.querySelector('.about-stats');
    if (statsSection && !statsAnimated) {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            animateAllStats();
            statsAnimated = true;
        }
    }
});

function animateAllStats() {
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        setTimeout(() => {
            animateCounter(card);
            card.style.transform = 'scale(1.1)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 300);
        }, index * 200);
    });
}

// Dynamic testimonial loading effect
document.querySelectorAll('.testimonial-card').forEach(card => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'testimonialSlideIn 0.8s ease forwards';
            }
        });
    });
    observer.observe(card);
});

// Add CSS for testimonial animation
const style = document.createElement('style');
style.textContent = `
    @keyframes testimonialSlideIn {
        from {
            opacity: 0;
            transform: translateX(50px) rotateY(10deg);
        }
        to {
            opacity: 1;
            transform: translateX(0) rotateY(0deg);
        }
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .notification {
        font-family: var(--font-primary);
    }
`;
document.head.appendChild(style);

// Preloader progress tracking
function trackLoadingProgress() {
    const resources = document.querySelectorAll('img, link[rel="stylesheet"]');
    let loadedResources = 0;
    const totalResources = resources.length;
    
    resources.forEach(resource => {
        if (resource.complete || resource.readyState === 'complete') {
            loadedResources++;
        } else {
            resource.addEventListener('load', () => {
                loadedResources++;
                updateLoadingProgress(loadedResources / totalResources * 100);
            });
        }
    });
    
    updateLoadingProgress(loadedResources / totalResources * 100);
}

function updateLoadingProgress(percentage) {
    const loadingSpinner = document.querySelector('.loading-spinner');
    if (loadingSpinner) {
        loadingSpinner.style.background = `
            conic-gradient(from 0deg, var(--primary-color) 0deg, var(--primary-color) ${percentage * 3.6}deg, rgba(0, 201, 255, 0.1) ${percentage * 3.6}deg)
        `;
    }
}

// Initialize progress tracking
trackLoadingProgress();

// Add smooth page transitions
document.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0';
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    konamiCode = konamiCode.slice(-10);
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    document.body.style.filter = 'hue-rotate(180deg)';
    showNotification('🎉 كود سري! تم تفعيل الوضع الخاص!', 'success');
    
    setTimeout(() => {
        document.body.style.filter = 'none';
    }, 5000);
}

// Performance optimization: Lazy load images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if there are lazy images
if (document.querySelectorAll('img[data-src]').length > 0) {
    initializeLazyLoading();
}

// Add CSS for smooth transitions
const additionalStyles = `
    .loading-spinner {
        border-radius: 50%;
        background: conic-gradient(from 0deg, var(--primary-color) 0deg, rgba(0, 201, 255, 0.1) 360deg);
    }
    
    .hero-text > * {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .profile-card {
        opacity: 0;
        transform: translateX(50px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);