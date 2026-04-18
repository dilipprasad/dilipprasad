// Set Current Year in Footer
document.getElementById('year').textContent = new Date().getFullYear();

// --- Theme Toggle Logic ---
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check for saved theme preference, otherwise use system preference
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
} else if (!systemPrefersDark) {
    htmlElement.setAttribute('data-theme', 'light');
}

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// --- Mobile Navigation Toggle ---
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.getElementById('nav-links');

mobileMenuToggle.addEventListener('click', () => {
    const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
    mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('active');
    });
});

// --- Typing Animation ---
const typingTextElement = document.querySelector('.typing-text');
const roles = [
    "Technical Architect",
    "Full-Stack Developer",
    "Cloud Specialist",
    "Azure Certified Professional"
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;

function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingTextElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = erasingDelay;
    } else {
        typingTextElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 100;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingDelay = newTextDelay;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex++;
        if (roleIndex >= roles.length) {
            roleIndex = 0;
        }
        typingDelay = 500;
    }
    
    setTimeout(type, typingDelay);
}

// Start typing animation on load
if(typingTextElement) {
    setTimeout(type, newTextDelay);
}

// --- Scroll Reveal Animations & Navbar Highlighting ---
const revealElements = document.querySelectorAll('.reveal');
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');
const navbar = document.getElementById('navbar');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const scrollObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        }
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
    });
}, revealOptions);

revealElements.forEach(el => {
    scrollObserver.observe(el);
});

// Highlight Active Nav Link on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
    
    // Navbar glass effect enhancement on scroll
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        navbar.style.background = getComputedStyle(document.documentElement).getPropertyValue('--nav-bg');
    } else {
        navbar.style.boxShadow = 'none';
    }
});
