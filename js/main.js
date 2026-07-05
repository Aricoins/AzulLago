(function ($) {
    "use strict";

    const isHomePage = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');

    // Sticky Navbar
    function handleScroll() {
        const nav = $('.sticky-nav');
        const scrollY = $(this).scrollTop();
        nav.toggleClass('scrolled', scrollY > 80);

        const btn = $('#backToTop');
        if (btn.length) {
            btn.toggleClass('show', scrollY > 400);
        }
    }
    $(window).on('scroll', handleScroll);

    // Back to top
    $('#backToTop').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 800, 'easeOutExpo');
    });

    // Hero carousel
    if ($('.hero-carousel').length) {
        $('.hero-carousel').owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            autoplayTimeout: 6000,
            smartSpeed: 1200,
            dots: true,
            nav: true,
            navText: [
                '<i class="fa-solid fa-chevron-left"></i>',
                '<i class="fa-solid fa-chevron-right"></i>'
            ]
        });
    }

    // Header carousel (anuncios page)
    if ($('.header-carousel').length) {
        $('.header-carousel').owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            smartSpeed: 1000,
            dots: true,
            nav: true,
            navText: [
                '<i class="fa-solid fa-chevron-left"></i>',
                '<i class="fa-solid fa-chevron-right"></i>'
            ]
        });
    }

    // Counter animation
    function animateCounters() {
        $('.stat-number').each(function () {
            const $el = $(this);
            const target = parseInt($el.data('count'));
            if (target && !$el.hasClass('counted')) {
                $el.addClass('counted');
                let current = 0;
                const step = Math.ceil(target / 60);
                const timer = setInterval(function () {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    $el.text(current + '+');
                }, 25);
            }
        });
    }

    // Scroll-triggered animations with Intersection Observer
    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    if (entry.target.classList.contains('stat-card') || entry.target.classList.contains('stat-number')) {
                        animateCounters();
                    }
                }
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('.fade-up, .fade-in').forEach(el => observer.observe(el));
    }

    // Add animation classes to elements
    function setupAnimations() {
        $('.value-card, .service-card, .partner-card, .stat-card').each(function (i) {
            $(this).addClass('fade-up');
            $(this).css('transition-delay', (i * 0.08) + 's');
        });
        $('.section-title, .section-badge, .about-text, .about-image').addClass('fade-up');
        $('.hero-title, .hero-tagline, .hero-desc').addClass('fade-in');
    }

    // Contact form feedback
    $('#contact-form').on('submit', function () {
        setTimeout(() => {
            this.reset();
        }, 1000);
    });

    $(document).ready(function () {
        setupAnimations();
        initScrollAnimations();
        setTimeout(function () {
            $('.hero-title, .hero-tagline, .hero-desc').addClass('visible');
        }, 200);
    });

})(jQuery);
