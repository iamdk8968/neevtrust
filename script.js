// ===== DARK / LIGHT MODE TOGGLE =====
// Pehle zaroori elements ko select karein
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const sunIcon = themeToggle.querySelector('.fa-sun');
const moonIcon = themeToggle.querySelector('.fa-moon');

// Theme set karne ke liye function
function setTheme(theme) {
    if (theme === 'dark') {
        body.classList.add('dark-mode'); // Dark mode class add karein
        moonIcon.style.display = 'none'; // Moon icon hide karein
        sunIcon.style.display = 'inline-block'; // Sun icon show karein
        localStorage.setItem('theme', 'dark'); // Preference save karein
    } else {
        body.classList.remove('dark-mode'); // Dark mode class remove karein
        moonIcon.style.display = 'inline-block'; // Moon icon show karein
        sunIcon.style.display = 'none'; // Sun icon hide karein
        localStorage.setItem('theme', 'light'); // Preference save karein
    }
}

// Page load hone par saved theme check karein
// Agar koi theme saved nahi hai, toh 'light' ko default maanein
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

// Button click par theme toggle karein
themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        setTheme('light'); // Agar dark hai, toh light karein
    } else {
        setTheme('dark'); // Agar light hai, toh dark karein
    }
});


// ===== GALLERY MODAL (POPUP) FUNCTIONALITY =====
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.querySelector('.gallery-modal');
const modalImg = document.getElementById('modal-image');
const modalCaption = document.querySelector('.modal-caption');
const closeModal = document.querySelector('.close-modal');

// Har gallery item par click listener add karein
galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        modal.style.display = 'block'; // Modal ko dikhayein
        modalImg.src = this.querySelector('img').src; // Clicked image ko modal mein daalein
        
        // Caption (title aur description) ko modal mein daalein
        const title = this.querySelector('h3').textContent;
        const description = this.querySelector('p').textContent;
        if (modalCaption) {
            modalCaption.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
        }
    });
});

// Close button (X) par click karke modal band karein
if (closeModal) {
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
}

// Modal ke bahar click karke modal band karein
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// 'Escape' key dabakar modal band karein
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
    }
});


// ===== HOME SLIDER FUNCTIONALITY =====
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;
let slideInterval;

// Slider ko shuru karne ka function
function initSlider() {
    goToSlide(0); // Pehli slide dikhayein
    startSlideshow(); // Automatic slideshow shuru karein
    
    // Arrow buttons par click listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            pauseSlideshow();
            prevSlide();
            startSlideshow();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            pauseSlideshow();
            nextSlide();
            startSlideshow();
        });
    }
    
    // Dots par click listeners
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            pauseSlideshow();
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            goToSlide(slideIndex);
            startSlideshow();
        });
    });

    // Slider par mouse le jaane par pause karein
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', pauseSlideshow);
        sliderContainer.addEventListener('mouseleave', startSlideshow);
    }
}

// Specific slide par jaane ka function
function goToSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    
    currentSlide = index;
}

// Agli slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
}

// Pichli slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(currentSlide);
}

// Automatic slideshow shuru karein
function startSlideshow() {
    clearInterval(slideInterval); // Purana interval clear karein
    slideInterval = setInterval(nextSlide, 5000); // Har 5 second mein slide change
}

// Slideshow pause karein
function pauseSlideshow() {
    clearInterval(slideInterval);
}

// Slider ko initialize (start) karein
initSlider();


// ===== MOBILE NAVIGATION TOGGLE (HAMBURGER MENU) =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active'); // Hamburger icon ko 'X' banayein
        navLinks.classList.toggle('active'); // Mobile menu ko dikhayein/chupayein
    });
}

// Mobile menu mein kisi link par click karne par menu band karein
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) {
            hamburger.classList.remove('active');
        }
        if (navLinks) {
            navLinks.classList.remove('active');
        }
    });
});


// ===== SMOOTH SCROLLING (JAB MENU LINK CLICK HO) =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Header ki height (70px) ke liye adjust karein
                behavior: 'smooth'
            });
        }
    });
});


// ===== CONTACT FORM VALIDATION =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Form ko submit hone se rokein
        
        // Yahan aap validation logic add kar sakte hain
        // Abhi ke liye, hum bas success message dikha rahe hain
        
        const nameInput = document.getElementById('name');
        if (nameInput.value.trim() === '') {
            alert('Please enter your name');
            return;
        }
        
        // Agar sab sahi hai
        alert('Thank you for your message!');
        contactForm.reset();
    });
}

// ===== PAGE LOAD ANIMATIONS (Fade-in effect) =====
// Note: Yeh CSS mein define kiya gaya hai (neeche)
// Yeh function elements ko scroll par fade-in karta hai
const animateOnScroll = function() {
    const elements = document.querySelectorAll('.card, .gallery-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) { // Jab element 100px screen par aa jaye
            element.classList.add('fade-in');
        }
    });
};

// Animation ke liye zaroori CSS ko dynamically add karein
const style = document.createElement('style');
style.textContent = `
    .card, .gallery-item {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Scroll karne par aur page load par animation function run karein
window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Page load par ek baar run karein