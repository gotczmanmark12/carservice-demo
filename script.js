// Mobil menü kezelése
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

// Számlálók animációja (Counter)
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
    
    const counterObserver = new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting && !animated) {
            runCounters();
            animated = true;
        }
    }, { threshold: 0.2 }); 

    if (aboutSection) {
        counterObserver.observe(aboutSection);
    }
});

// Vajpuha beúszás (IntersectionObserver - laggmentes, CPU barát megoldás scroll helyett)
document.addEventListener("DOMContentLoaded", () => {
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Ha már betűnt, nem figyeli tovább feleslegesen
            }
        });
    }, {
        threshold: 0.15, // Mikor kezdjen el látszódni
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
});

// --- GALLERY FILTER & LIGHTBOX ---
document.addEventListener("DOMContentLoaded", () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.querySelector('.lightbox-close');

    // Kategória szűrő logika
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Aktív gomb stílus váltás
            document.querySelector('.filter-btn.active').classList.remove('active');
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });

    // Lightbox megnyitása képre kattintva
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').getAttribute('src');
            lightboxImg.setAttribute('src', imgSrc);
            lightbox.classList.add('active');
        });
    });

    // Lightbox bezárása
    const closeLightbox = () => {
        lightbox.classList.remove('active');
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // ESC billentyűre is záródjon be
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
});

// --- CONTACT FORM DEMO LOGIC ---
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            formStatus.innerText = "Thank you! Your message has been sent successfully.";
            formStatus.style.color = "#22c55e"; // Zöld szín
            
            contactForm.reset();
            
            setTimeout(() => {
                formStatus.innerText = "";
            }, 4000);
        });
    }
});