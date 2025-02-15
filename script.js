// Initialize theme on page load to prevent flash of wrong theme
const initTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
};
initTheme();

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Function to update theme
    function toggleTheme() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update button icon
        themeToggle.textContent = newTheme === 'light' ? '🌓' : '☀️';
    }

    // Set initial button state
    const currentTheme = html.getAttribute('data-theme');
    themeToggle.textContent = currentTheme === 'light' ? '🌓' : '☀️';

    // Add click event listener
    themeToggle.addEventListener('click', toggleTheme);
});

// Scroll animation
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    // Add scroll-fade-in class to elements
    const elements = document.querySelectorAll('.feature-card, .pricing-card, .about-content, .contact-content');
    elements.forEach(el => {
        el.classList.add('scroll-fade-in');
        observer.observe(el);
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Header scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.style.boxShadow = 'none';
        } else {
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        }

        lastScroll = currentScroll;
    });
});