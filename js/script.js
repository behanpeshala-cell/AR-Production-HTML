document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.innerHTML = navLinks.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }

    // Close mobile menu when a link is clicked
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load
    revealOnScroll();

    // Active link highlighting based on current page
    const currentLocation = location.href;
    const menuItem = document.querySelectorAll('.nav-links a');
    const menuLength = menuItem.length;
    for (let i = 0; i < menuLength; i++) {
        const itemHref = menuItem[i].href;
        // Check if the current location includes the href of the link, or if it's the home page
        if (currentLocation.includes(itemHref) || (currentLocation.endsWith('/') && itemHref.includes('index.html'))) {
            menuItem.forEach(item => item.classList.remove('active')); // remove from all
            menuItem[i].className += " active";
        }
    }

    // Lightbox for Portfolio
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    if (portfolioItems.length > 0) {
        // Create lightbox elements
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        document.body.appendChild(lightbox);

        portfolioItems.forEach(item => {
            item.style.cursor = 'pointer'; // Make sure cursor indicates it's clickable
            item.addEventListener('click', e => {
                lightbox.classList.add('active');
                const img = document.createElement('img');
                img.src = item.querySelector('img').src;
                while (lightbox.firstChild) {
                    lightbox.removeChild(lightbox.firstChild);
                }
                lightbox.appendChild(img);

                // Add close button
                const closeBtn = document.createElement('div');
                closeBtn.classList.add('lightbox-close');
                closeBtn.innerHTML = '<i class="fas fa-times"></i>';
                lightbox.appendChild(closeBtn);
            });
        });

        lightbox.addEventListener('click', e => {
            if (e.target !== e.currentTarget && !e.target.classList.contains('lightbox-close') && !e.target.closest('.lightbox-close')) return;
            lightbox.classList.remove('active');
        });
    }
});
