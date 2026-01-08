/* ============================================
   BELTON IT NEXUS - MAIN JAVASCRIPT
   ============================================ */

// Resource descriptions for lead modal
const resourceInfo = {
    'ai-policy': {
        title: 'AI Policy Template',
        subtitle: 'Get our ready-to-use AI governance policy template — perfect for businesses starting their AI journey responsibly.'
    },
    'security-checklist': {
        title: 'Security Checklist',
        subtitle: 'Download our essential security controls checklist that every NZ business should have in place.'
    },
    'm365-guide': {
        title: 'M365 Optimisation Guide',
        subtitle: 'Learn how to get more value from your Microsoft 365 subscription with our practical guide.'
    }
};

// Open Lead Capture Modal
function openLeadModal(resourceType) {
    const modal = document.getElementById('leadModal');
    const resourceInput = document.getElementById('resourceType');
    const subtitle = document.getElementById('modalSubtitle');

    if (modal && resourceInfo[resourceType]) {
        resourceInput.value = resourceType;
        subtitle.textContent = resourceInfo[resourceType].subtitle;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Close Lead Capture Modal
function closeLeadModal() {
    const modal = document.getElementById('leadModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Handle Lead Form Submission
function handleLeadSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Validate
    if (!data.name || !data.email) {
        showNotification('Please fill in your name and email.', 'error');
        return;
    }

    // Get submit button
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;

    // Simulate API call (replace with actual endpoint)
    setTimeout(() => {
        // Success
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Check Your Email!';
        showNotification('Success! Check your inbox for the download link.', 'success');

        // Store lead in localStorage for demo purposes
        const leads = JSON.parse(localStorage.getItem('beltonLeads') || '[]');
        leads.push({
            ...data,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('beltonLeads', JSON.stringify(leads));

        // Close modal after delay
        setTimeout(() => {
            closeLeadModal();
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);

    }, 1500);
}

// Make functions globally available
window.openLeadModal = openLeadModal;
window.closeLeadModal = closeLeadModal;
window.handleLeadSubmit = handleLeadSubmit;

document.addEventListener('DOMContentLoaded', function() {

    // Note: Header/nav initialization is handled by includes.js
    // which loads the partials and sets up mobile toggle, scroll effects, etc.

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const header = document.getElementById('header');
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // TESTIMONIALS SLIDER
    // ============================================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.nav-btn.prev');
    const nextBtn = document.querySelector('.nav-btn.next');
    let currentSlide = 0;

    function showSlide(index) {
        // Wrap around
        if (index >= testimonialCards.length) index = 0;
        if (index < 0) index = testimonialCards.length - 1;

        currentSlide = index;

        // Update cards
        testimonialCards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });

        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
        nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => showSlide(i));
    });

    // Auto-advance testimonials
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 6000);

    // Note: Back to top button is initialized by includes.js

    // ============================================
    // ANIMATED COUNTERS
    // ============================================
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);

        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }

        updateCounter();
    }

    // Intersection Observer for counter animation
    const counterElements = document.querySelectorAll('[data-count]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counterElements.forEach(el => counterObserver.observe(el));

    // ============================================
    // SCROLL ANIMATIONS (AOS-like)
    // ============================================
    const animatedElements = document.querySelectorAll('[data-aos]');

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add delay if specified
                const delay = entry.target.dataset.aosDelay || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => animationObserver.observe(el));

    // ============================================
    // CONTACT FORM HANDLING
    // ============================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Simple validation
            if (!data.name || !data.email) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }

            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                showNotification('Thank you! We\'ll be in touch soon.', 'success');

                // Reset form
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        });
    }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">&times;</button>
        `;

        // Add styles dynamically
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            gap: 1rem;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    // Add notification animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        .notification button {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
    `;
    document.head.appendChild(style);

    // ============================================
    // PARALLAX EFFECT FOR HERO
    // ============================================
    const heroBg = document.querySelector('.hero-bg');

    if (heroBg) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            heroBg.style.transform = `translateY(${rate}px)`;
        });
    }

    // ============================================
    // TYPING EFFECT FOR HERO (Optional Enhancement)
    // ============================================
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }

        type();
    }

    // ============================================
    // LAZY LOADING IMAGES
    // ============================================
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // ============================================
    // HOVER EFFECTS FOR SERVICE CARDS
    // ============================================
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // ============================================
    // KEYBOARD NAVIGATION
    // ============================================
    document.addEventListener('keydown', function(e) {
        // ESC to close lead modal
        if (e.key === 'Escape') {
            closeLeadModal();
        }
        // Note: ESC to close mobile nav is handled by includes.js
    });

    // ============================================
    // PRELOADER (Optional)
    // ============================================
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');

        // Trigger initial animations
        document.querySelectorAll('.animate-fade-up').forEach(el => {
            el.style.animationPlayState = 'running';
        });
    });

    // ============================================
    // DYNAMIC YEAR IN FOOTER
    // ============================================
    const yearElements = document.querySelectorAll('[data-year]');
    yearElements.forEach(el => {
        el.textContent = new Date().getFullYear();
    });

    // ============================================
    // COOKIE CONSENT BANNER
    // ============================================
    function initCookieConsent() {
        const consentGiven = localStorage.getItem('beltonCookieConsent');

        if (!consentGiven) {
            const banner = document.createElement('div');
            banner.className = 'cookie-consent';
            banner.setAttribute('role', 'dialog');
            banner.setAttribute('aria-labelledby', 'cookie-title');
            banner.setAttribute('aria-describedby', 'cookie-desc');
            banner.innerHTML = `
                <div class="cookie-content">
                    <div class="cookie-text">
                        <strong id="cookie-title">We value your privacy</strong>
                        <p id="cookie-desc">We use cookies to enhance your browsing experience and analyse site traffic. By clicking "Accept", you consent to our use of cookies.</p>
                    </div>
                    <div class="cookie-actions">
                        <button class="cookie-btn cookie-btn-secondary" id="cookieDecline">Decline</button>
                        <button class="cookie-btn cookie-btn-primary" id="cookieAccept">Accept</button>
                    </div>
                </div>
            `;

            document.body.appendChild(banner);

            setTimeout(() => banner.classList.add('visible'), 100);

            document.getElementById('cookieAccept').addEventListener('click', () => {
                localStorage.setItem('beltonCookieConsent', 'accepted');
                banner.classList.remove('visible');
                setTimeout(() => banner.remove(), 300);
            });

            document.getElementById('cookieDecline').addEventListener('click', () => {
                localStorage.setItem('beltonCookieConsent', 'declined');
                banner.classList.remove('visible');
                setTimeout(() => banner.remove(), 300);
            });
        }
    }

    initCookieConsent();
});
