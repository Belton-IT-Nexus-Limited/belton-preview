/**
 * Site Includes Loader
 * Loads header and footer partials, handles active nav state
 */
(function() {
    'use strict';

    // Detect if we're on AU or NZ site
    const isAU = window.location.pathname.includes('/au/');
    const basePath = isAU ? '../' : '';
    const region = isAU ? 'au' : 'nz';

    // Get current page name for active nav highlighting
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';

    // Map pages to their nav parent for highlighting
    const pageNavMap = {
        'how-we-work': 'how-we-work',
        'services': 'services',
        'endpoints': 'services',
        'security': 'services',
        'network-security': 'services',
        'microsoft365': 'services',
        'cloud': 'services',
        'connectivity': 'services',
        'voice': 'services',
        'identity': 'services',
        'email-security': 'services',
        'backup': 'services',
        'compliance': 'services',
        'it-advisory': 'services',
        'ai': 'services',
        'projects': 'services',
        'managed-it': 'services',
        'procurement': 'services',
        'licensing': 'services',
        'client-success': 'clients',
        'who-we-work-with': 'clients',
        'about': 'about',
        'get-started': 'get-started',
        'diy-cybersecurity': 'resources',
        'essential-eight': 'resources',
        'security-assessment': 'resources',
        'faq': 'resources',
        'm365-security-checklist': 'resources',
        'cyber-insurance-readiness': 'resources'
    };

    // Load a partial HTML file
    async function loadPartial(url, targetId) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to load ${url}`);
            const html = await response.text();
            const target = document.getElementById(targetId);
            if (target) {
                target.innerHTML = html;
            }
        } catch (error) {
            console.error('Include error:', error);
        }
    }

    // Set active nav item based on current page
    function setActiveNav() {
        const navParent = pageNavMap[currentPage];
        if (navParent) {
            const activeLink = document.querySelector(`[data-page="${navParent}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }

    // Initialize mobile toggle (moved from main.js to run after header loads)
    function initMobileToggle() {
        const mobileToggle = document.getElementById('mobileToggle');
        const nav = document.getElementById('nav');
        const header = document.getElementById('header');

        if (mobileToggle && nav) {
            mobileToggle.addEventListener('click', function() {
                nav.classList.toggle('nav-open');
                mobileToggle.classList.toggle('active');
                document.body.classList.toggle('nav-open');

                const isOpen = nav.classList.contains('nav-open');
                mobileToggle.setAttribute('aria-expanded', isOpen);
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!nav.contains(e.target) && !mobileToggle.contains(e.target)) {
                    nav.classList.remove('nav-open');
                    mobileToggle.classList.remove('active');
                    document.body.classList.remove('nav-open');
                    mobileToggle.setAttribute('aria-expanded', 'false');
                }
            });

            // Close menu on escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && nav.classList.contains('nav-open')) {
                    nav.classList.remove('nav-open');
                    mobileToggle.classList.remove('active');
                    document.body.classList.remove('nav-open');
                    mobileToggle.setAttribute('aria-expanded', 'false');
                }
            });
        }

        // Header scroll behavior
        if (header) {
            let lastScroll = 0;
            window.addEventListener('scroll', function() {
                const currentScroll = window.pageYOffset;
                if (currentScroll > 100) {
                    header.classList.add('header-scrolled');
                } else {
                    header.classList.remove('header-scrolled');
                }
                lastScroll = currentScroll;
            });
        }
    }

    // Initialize back to top button
    function initBackToTop() {
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            });

            backToTop.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    // Main initialization
    async function init() {
        const headerTarget = document.getElementById('site-header');
        const footerTarget = document.getElementById('site-footer');

        // Load partials
        const promises = [];

        if (headerTarget) {
            promises.push(loadPartial(`${basePath}partials/header-${region}.html`, 'site-header'));
        }

        if (footerTarget) {
            promises.push(loadPartial(`${basePath}partials/footer-${region}.html`, 'site-footer'));
        }

        // Wait for partials to load
        await Promise.all(promises);

        // Initialize functionality after partials are loaded
        setActiveNav();
        initMobileToggle();
        initBackToTop();
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose a promise for other scripts to wait on
    window.siteIncludesReady = new Promise((resolve) => {
        const checkReady = setInterval(() => {
            if (document.getElementById('header')) {
                clearInterval(checkReady);
                resolve();
            }
        }, 10);
    });
})();
