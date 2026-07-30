
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');


hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.counter');
    let animated = false;

    const runCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const speed = target / 50; 

            const updateCount = () => {
                count += speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count);
                    setTimeout(updateCount, 30);
                } else {
                    counter.innerText = target + (counter.parentElement.querySelector('p').innerText.includes('%') ? '%' : '+');
                }
            };

            updateCount();
        });
    };

    const aboutSection = document.querySelector('.about');
    
    const observer = new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting && !animated) {
            runCounters();
            animated = true;
        }
    }, { threshold: 0.2 }); 

    if (aboutSection) {
        observer.observe(aboutSection);
    }
});


// Szekciók és kártyák
const revealElements = document.querySelectorAll('.service-card, .about-container, .services h2');

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

window.addEventListener('scroll', () => {
    requestAnimationFrame(revealOnScroll);
});

window.addEventListener('load', revealOnScroll);


