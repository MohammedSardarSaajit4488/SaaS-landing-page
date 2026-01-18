document.addEventListener('DOMContentLoaded', () => {

    // Theme Toggle Functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');

    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        if (newTheme === 'dark') {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        } else {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        }
    });

    // Modal Functionality
    const modal = document.getElementById('demo-modal');
    const openModalBtns = document.querySelectorAll('a[href="#demo"]');
    const closeModalBtn = document.querySelector('.modal-close');

    if (modal) {
        openModalBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });

        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        };

        closeModalBtn.addEventListener('click', closeModal);

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // Scroll Animations (High Budget)
    const scrollObserverOptions = {
        threshold: 0.1,
        rootMargin: "0px"
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                scrollObserver.unobserve(entry.target); // Reveal once
            }
        });
    }, scrollObserverOptions);

    const revealElements = document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card, .section-title, .hero-content > *');

    revealElements.forEach((el, index) => {
        el.classList.add('reveal-hidden');
        // Add stagger delay based on index or position could be complex, 
        // using simple CSS transition delay in style for now or just letting them pop naturally.
        // For "High Budget" feel, let's add specific delay based on child index if possible,
        // or just rely on the natural scroll speed.
        scrollObserver.observe(el);
    });

    // Parallax & 3D Tilt on Scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroMockup = document.querySelector('.perspective-container');

        if (heroMockup && window.innerWidth > 968) {
            const rotation = -12 + (scrolled * 0.02); // Rotate slightly as we scroll
            if (rotation < 0) {
                heroMockup.style.transform = `rotateY(${rotation}deg) rotateX(5deg)`;
            }
        }
    });

    // Mobile Menu functionality (placeholder)
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            console.log('Toggle menu clicked');
            // Logic to toggle mobile menu would go here
            // e.g., document.querySelector('.nav-links').classList.toggle('active');
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple Intersection Observer to fade in elements on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select elements to animate (cards, headers, etc)
    const animatedElements = document.querySelectorAll('.feature-card, .pricing-card, .section-header, .testimonial-card');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

});
