// Gallery Modal Functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.querySelector('.gallery-modal');
    const modalImg = document.getElementById('modal-image');
    const modalCaption = document.querySelector('.modal-caption');
    const closeModal = document.querySelector('.close-modal');
    
    // Open modal when gallery item is clicked
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.querySelector('img').src;
            
            const title = this.querySelector('h3').textContent;
            const description = this.querySelector('p').textContent;
            if (modalCaption) {
                modalCaption.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
            }
        });
    });
    
    // Close modal when close button is clicked
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside the image
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
    // Home Slider Functionality
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let slideInterval;

    // Initialize slider
    function initSlider() {
        // Show the first slide initially
        goToSlide(0);
        
        // Start automatic slideshow
        startSlideshow();
        
        // Add event listeners for controls
        prevBtn.addEventListener('click', function() {
            pauseSlideshow();
            prevSlide();
            startSlideshow();
        });
        
        nextBtn.addEventListener('click', function() {
            pauseSlideshow();
            nextSlide();
            startSlideshow();
        });
        
        // Add event listeners for dots
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                pauseSlideshow();
                const slideIndex = parseInt(this.getAttribute('data-slide'));
                goToSlide(slideIndex);
                startSlideshow();
            });
        });

        // Pause slideshow on hover
        const sliderContainer = document.querySelector('.slider-container');
        sliderContainer.addEventListener('mouseenter', pauseSlideshow);
        sliderContainer.addEventListener('mouseleave', startSlideshow);
    }

    // Go to specific slide
    function goToSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        // Update current slide index
        currentSlide = index;
    }

    // Go to next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    }

    // Go to previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(currentSlide);
    }

    // Start automatic slideshow
    function startSlideshow() {
        // Clear any existing interval
        clearInterval(slideInterval);
        // Set new interval
        slideInterval = setInterval(function() {
            nextSlide();
        }, 5000); // Changed to 5 seconds for better viewing experience
    }

    // Pause automatic slideshow
    function pauseSlideshow() {
        clearInterval(slideInterval);
    }

    // Initialize slider
    initSlider();

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });



    // Form validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            let isValid = true;
            
            // Simple validation
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Name is required');
                isValid = false;
            } else {
                removeError(nameInput);
            }
            
            if (emailInput.value.trim() === '') {
                showError(emailInput, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email');
                isValid = false;
            } else {
                removeError(emailInput);
            }
            
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Message is required');
                isValid = false;
            } else {
                removeError(messageInput);
            }
            
            if (isValid) {
                // In a real application, you would send the form data to a server here
                // For this demo, we'll just show a success message
                showSuccessMessage();
                contactForm.reset();
            }
        });
    }
    
    // Helper functions for form validation
    function showError(input, message) {
        const formGroup = input.parentElement;
        let errorElement = formGroup.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        input.classList.add('error-input');
    }
    
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
        
        input.classList.remove('error-input');
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showSuccessMessage() {
        const formContainer = contactForm.parentElement;
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
        
        formContainer.appendChild(successMessage);
        
        // Remove the success message after 5 seconds
        setTimeout(() => {
            formContainer.removeChild(successMessage);
        }, 5000);
    }

    // Add scroll animation for elements
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.project-card, .founder, .mission, .vision, .objectives');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('fade-in');
            }
        });
    };
    
    // Add CSS for the animation
    const style = document.createElement('style');
    style.textContent = `
        .project-card, .founder, .mission, .vision, .objectives {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .fade-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .error-message {
            color: #ff3333;
            font-size: 0.8rem;
            margin-top: 5px;
        }
        
        .error-input {
            border-color: #ff3333 !important;
        }
        
        .success-message {
            background-color: #4CAF50;
            color: white;
            padding: 1rem;
            border-radius: 5px;
            margin-top: 1rem;
            text-align: center;
        }
    `;
    document.head.appendChild(style);
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    // Run once on page load
    animateOnScroll();

    // Add sticky header effect
    const header = document.querySelector('header');
    const scrollWatcher = () => {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    };

    // Add CSS for sticky header
    const headerStyle = document.createElement('style');
    headerStyle.textContent = `
        header.sticky {
            background-color: rgba(255, 255, 255, 0.95);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(headerStyle);

    window.addEventListener('scroll', scrollWatcher);
