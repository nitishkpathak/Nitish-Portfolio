// Initialize everything on DOMContentLoaded to prevent render blocking issues
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });
    }

    // Initialize Tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));


    // Force page to scroll to top on refresh
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggleBtn.querySelector('i');

    // Update theme icon visual state (theme is set immediately in head script)
    updateThemeIcon(htmlElement.getAttribute('data-bs-theme'));

    themeToggleBtn.addEventListener('click', () => {
        const newTheme = htmlElement.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-bs-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        updateNavbar();
    });

    function updateNavbar() {
        const nav = document.querySelector('.glass-nav');
        const isDark = htmlElement.getAttribute('data-bs-theme') === 'dark';

        if (window.scrollY > 50) {
            nav.style.background = isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = isDark ? '0 4px 30px rgba(0, 0, 0, 0.5)' : '0 4px 30px rgba(0, 0, 0, 0.08)';
        } else {
            nav.style.background = isDark ? 'rgba(15, 23, 42, 0.5)' : 'rgba(255, 255, 255, 0.7)';
            nav.style.boxShadow = 'none';
        }
    }

    // Initial setup for navbar
    updateNavbar();

    function updateThemeIcon(theme) {
        const tooltipSpan = themeToggleBtn.querySelector('.custom-tooltip');
        const mobileText = document.getElementById('themeTextMobile');
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun'; // Show sun in dark mode to toggle to light
            themeIcon.style.color = '#fcd34d'; // Yellow sun
            if (tooltipSpan) tooltipSpan.textContent = 'Switch to Light Mode';
            if (mobileText) mobileText.textContent = 'Switch to Light Mode';
        } else {
            themeIcon.className = 'fas fa-moon'; // Show moon in light mode to toggle to dark
            themeIcon.style.color = '#475569'; // Dark moon
            if (tooltipSpan) tooltipSpan.textContent = 'Switch to Dark Mode';
            if (mobileText) mobileText.textContent = 'Switch to Dark Mode';
        }
    }

    // Set dynamic copyright year
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Typewriter Effect
    const texts = [
        "Full Stack Web Developer",
        "Frontend Developer",
        "Java Developer",
        "React Developer"
    ];
    let count = 0;
    let index = 0;
    let currentText = '';
    let letter = '';
    let isDeleting = false;

    (function type() {
        if (count === texts.length) {
            count = 0;
        }
        currentText = texts[count];

        if (isDeleting) {
            letter = currentText.slice(0, --index);
        } else {
            letter = currentText.slice(0, ++index);
        }

        const typingElement = document.getElementById('typewriter-text');
        if (typingElement) typingElement.textContent = letter;

        let typeSpeed = 100;
        if (isDeleting) typeSpeed = 50;

        if (!isDeleting && letter.length === currentText.length) {
            isDeleting = true;
            typeSpeed = 2000; // pause at end
        } else if (isDeleting && letter.length === 0) {
            isDeleting = false;
            count++;
            typeSpeed = 500; // pause before typing next
        }

        setTimeout(type, typeSpeed);
    })();

    // Navbar blur and Scroll To Top visibility on scroll
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    window.addEventListener('scroll', () => {
        updateNavbar();

        // Scroll to top button
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    // Close mobile menu on link click and fix scroll position
    const navLinksMobile = document.querySelectorAll('.nav-link:not(.dropdown-toggle), .dropdown-item');
    const navbarCollapseDiv = document.getElementById('navbarNavDropdown');
    navLinksMobile.forEach(link => {
        link.addEventListener('click', (e) => {
            if (navbarCollapseDiv.classList.contains('show')) {
                const targetId = link.getAttribute('href');

                // Only intercept if it's an anchor link on the same page
                if (targetId && targetId.startsWith('#')) {
                    e.preventDefault();
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapseDiv);
                    if (bsCollapse) {
                        // Wait for menu to close before scrolling to prevent layout shift offset
                        navbarCollapseDiv.addEventListener('hidden.bs.collapse', function onHidden() {
                            navbarCollapseDiv.removeEventListener('hidden.bs.collapse', onHidden);
                            const targetEl = document.querySelector(targetId);
                            if (targetEl) {
                                targetEl.scrollIntoView({ behavior: 'smooth' });
                            }
                        });
                        bsCollapse.hide();
                    }
                }
            }
        });
    });

    // Scroll To Top Click
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    emailjs.init("t0hko6qmXDfjVglF2");

    // Initialize Toast
    const toastEl = document.getElementById('contactToast');
    const contactToast = new bootstrap.Toast(toastEl, { delay: 4000 });

    function showToast(message, isSuccess) {
        const toastMessage = document.getElementById('toastMessage');
        const toastIcon = document.getElementById('toastIcon');
        if (toastMessage) toastMessage.textContent = message;
        if (toastIcon) {
            if (isSuccess) {
                toastIcon.className = 'fa-solid fa-circle-check text-success fs-5';
            } else {
                toastIcon.className = 'fa-solid fa-circle-xmark text-danger fs-5';
            }
        }
        contactToast.show();
    }

    // Custom Glow Cursor Follower
    const cursor = document.getElementById('customCursor');
    const cursorDot = document.getElementById('customCursorDot');
    
    if (cursor && cursorDot) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });

        // Hover transitions for interactive elements
        const interactives = document.querySelectorAll('a, button, .btn, .glass-icon, .social-circle, .form-control');
        interactives.forEach(item => {
            item.addEventListener('mouseenter', () => {
                cursor.style.width = '50px';
                cursor.style.height = '50px';
                cursor.style.backgroundColor = 'rgba(2, 132, 199, 0.1)';
                cursor.style.borderColor = 'var(--primary)';
            });
            item.addEventListener('mouseleave', () => {
                cursor.style.width = '32px';
                cursor.style.height = '32px';
                cursor.style.backgroundColor = 'transparent';
                cursor.style.borderColor = 'var(--primary)';
            });
        });
    }

    // Scroll Progress Bar
    const progress = document.getElementById('scrollProgress');
    if (progress) {
        window.addEventListener('scroll', () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (totalHeight > 0) {
                const percent = (window.scrollY / totalHeight) * 100;
                progress.style.width = percent + '%';
            }
        });
    }

    // Interactive Project Filters
    const filterButtons = document.querySelectorAll('[data-filter]');
    const projectCards = document.querySelectorAll('.project-card-wrapper');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Toggle active button class
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.classList.remove('hide-card');
                    // Let AOS recalculate animations
                    if (typeof AOS !== 'undefined') {
                        AOS.refresh();
                    }
                } else {
                    card.classList.add('hide-card');
                }
            });
        });
    });

    // Interactive Particles Background
    const canvas = document.getElementById('bg-particles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: null, y: null, radius: 100 };

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 20) + 5;
                this.speedX = (Math.random() * 0.4) - 0.2;
                this.speedY = (Math.random() * 0.4) - 0.2;
            }
            draw() {
                const isDark = document.documentElement.getAttribute('data-bs-theme') === 'dark';
                ctx.fillStyle = isDark ? 'rgba(56, 189, 248, 0.4)' : 'rgba(2, 132, 199, 0.2)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
            update() {
                // Regular drift motion
                this.x += this.speedX;
                this.y += this.speedY;

                // Wrap around boundaries
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

                // Interactive cursor attraction/repulsion
                if (mouse.x != null && mouse.y != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.hypot(dx, dy);
                    if (distance < mouse.radius) {
                        const force = (mouse.radius - distance) / mouse.radius;
                        const directionX = dx / distance;
                        const directionY = dy / distance;
                        
                        // Pull particles slightly towards the mouse
                        this.x += directionX * force * 1.5;
                        this.y += directionY * force * 1.5;
                    }
                }
            }
        }

        function initCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = [];
            const particleCount = Math.min(60, Math.floor((canvas.width * canvas.height) / 20000));
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function animateCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw connections (network effect)
            const isDark = document.documentElement.getAttribute('data-bs-theme') === 'dark';
            const maxDistance = 110;
            
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let dx = particles[a].x - particles[b].x;
                    let dy = particles[a].y - particles[b].y;
                    let dist = Math.hypot(dx, dy);
                    
                    if (dist < maxDistance) {
                        const opacity = (1 - (dist / maxDistance)) * 0.15;
                        ctx.strokeStyle = isDark ? `rgba(56, 189, 248, ${opacity})` : `rgba(2, 132, 199, ${opacity})`;
                        ctx.lineWidth = 0.8;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }

            particles.forEach(p => {
                p.update();
                p.draw();
            });
            
            requestAnimationFrame(animateCanvas);
        }

        window.addEventListener('resize', initCanvas);
        initCanvas();
        animateCanvas();
    }

    document
        .getElementById("contactForm")
        .addEventListener("submit", function (e) {
            e.preventDefault();

            emailjs.sendForm(
                "service_86eoorq",
                "template_7lbur4y",
                this
            )
            .then(() => {
                showToast("Message Sent Successfully!", true);
                this.reset();
            })
            .catch((error) => {
                showToast("Failed To Send Message. Please try again.", false);
                console.log(error);
            });
        });
}); // End DOMContentLoaded
