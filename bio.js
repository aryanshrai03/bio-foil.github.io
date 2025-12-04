const themeToggle = document.getElementById('themeToggle');
const themeToggleMobile = document.getElementById('themeToggleMobile');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    document.body.setAttribute('data-theme', 'light');
}

const toggleTheme = () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
};

themeToggle.addEventListener('click', toggleTheme);
themeToggleMobile.addEventListener('click', toggleTheme);

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

const phrases = [
    "Founder & Full-Stack Web Developer",
    "Building AI Tools & Platforms",
    "Founded FoilAI",
    "Founded VroAI",
    "Co-Founder of KalaBilla DiscordBOT"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const typingText = document.querySelector('.typing-text');
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 1000);
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.project-card, .tech-card, .achievement-card, .contact-card, .stat-card').forEach(el => {
    observer.observe(el);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

const techCards = document.querySelectorAll('.tech-card');
techCards.forEach(card => {
    card.addEventListener('click', () => {
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 200);
    });
});

let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop;
});

document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(8px)';
    });

    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});

const createParticle = () => {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: var(--accent-light);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
    `;
    document.body.appendChild(particle);
    return particle;
};

document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.95) {
        const particle = createParticle();
        particle.style.left = e.clientX + 'px';
        particle.style.top = e.clientY + 'px';

        particle.animate([
            { opacity: 0.6, transform: 'translate(0, 0) scale(1)' },
            { opacity: 0, transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0)` }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0, .9, .57, 1)'
        }).onfinish = () => particle.remove();
    }
});

const addRippleEffect = (e) => {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        top: ${y}px;
        left: ${x}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
};

const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

document.querySelectorAll('.btn, .contact-card').forEach(button => {
    button.addEventListener('click', addRippleEffect);
});

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll('.floating-shape');

circles.forEach(circle => {
    circle.x = 0;
    circle.y = 0;
});

window.addEventListener('mousemove', (e) => {
    coords.x = e.clientX;
    coords.y = e.clientY;
});

function animateCircles() {
    let x = coords.x;
    let y = coords.y;

    circles.forEach((circle, index) => {
        circle.style.left = x - 12 + 'px';
        circle.style.top = y - 12 + 'px';

        circle.style.transform = `scale(${(circles.length - index) / circles.length})`;

        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
    });

    requestAnimationFrame(animateCircles);
}

animateCircles();

console.log('%c👋 Hey there!', 'color: #3b82f6; font-size: 24px; font-weight: bold;');
console.log('%cWelcome to my portfolio!', 'color: #1e40af; font-size: 16px;');
console.log('%cFeel free to explore and reach out if you want to collaborate!', 'color: #0891b2; font-size: 14px;');
