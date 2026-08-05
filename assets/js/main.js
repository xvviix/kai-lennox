/* ============================================
   KAI LENNOX | Elite Performance Coaching
   Premium Vanilla JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  let lastScrollY = window.scrollY;

  function handleNavbarScroll() {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // Mobile navigation toggle
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
      navToggle.classList.toggle('active');
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        navToggle.classList.remove('active');
      });
    });
  }

  // Smooth scrolling for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      
      if (target) {
        e.preventDefault();
        
        const navbarHeight = navbar ? navbar.offsetHeight : 78;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - navbarHeight - 20;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Testimonial Slider
  const track = document.getElementById('testimonial-track');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  if (track && prevBtn && nextBtn) {
    let currentIndex = 0;
    const slides = track.children;
    const totalSlides = slides.length;
    let slideWidth = 0;

    function updateSlideWidth() {
      if (window.innerWidth >= 768) {
        // On desktop: show 2 slides
        slideWidth = track.offsetWidth / 2;
      } else {
        // Mobile: 1 slide
        slideWidth = track.offsetWidth;
      }
    }

    function updateTrackPosition() {
      const offset = currentIndex * slideWidth;
      track.style.transform = `translateX(-${offset}px)`;
    }

    function goToSlide(index) {
      currentIndex = (index + totalSlides) % totalSlides;
      updateTrackPosition();
    }

    // Button events
    nextBtn.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
    });

    prevBtn.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
    });

    // Auto-slide every 7 seconds
    let autoSlideInterval = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 7000);

    // Pause auto-slide on hover
    const sliderContainer = track.parentElement;
    sliderContainer.addEventListener('mouseenter', () => {
      clearInterval(autoSlideInterval);
    });

    sliderContainer.addEventListener('mouseleave', () => {
      autoSlideInterval = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, 7000);
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') goToSlide(currentIndex + 1);
      if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1);
    });

    // Resize handling
    function handleResize() {
      updateSlideWidth();
      updateTrackPosition();
    }

    window.addEventListener('resize', handleResize);
    updateSlideWidth();
    updateTrackPosition();

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      clearInterval(autoSlideInterval);
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      autoSlideInterval = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, 7000);
    }, { passive: true });

    function handleSwipe() {
      if (touchEndX < touchStartX - 60) {
        goToSlide(currentIndex + 1);
      }
      if (touchEndX > touchStartX + 60) {
        goToSlide(currentIndex - 1);
      }
    }
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all others
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });

        // Toggle current
        if (isActive) {
          item.classList.remove('active');
        } else {
          item.classList.add('active');
        }
      });
    }
  });

  // Form handling (simulated)
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Simulate loading
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = `
        <span style="display:flex; align-items:center; justify-content:center; gap:8px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="animation: spin 1s linear infinite;">
            <circle cx="12" cy="12" r="10" stroke="#0F0F0F" stroke-width="3" stroke-opacity="0.3"/>
            <path d="M12 2a10 10 0 0 1 10 10" stroke="#0F0F0F" stroke-width="3" stroke-linecap="round"/>
          </svg>
          Submitting...
        </span>
      `;
      submitBtn.disabled = true;

      setTimeout(() => {
        // Hide form
        contactForm.style.display = 'none';
        
        // Show success state
        formSuccess.classList.add('active');

        // Reset form for future demo (optional)
        setTimeout(() => {
          contactForm.reset();
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 1500);
      }, 1250);
    });
  }

  // Scroll reveal animations
  const revealElements = document.querySelectorAll('.reveal');

  function checkReveal() {
    const windowHeight = window.innerHeight;
    
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const revealPoint = 140;

      if (elementTop < windowHeight - revealPoint) {
        el.classList.add('visible');
      }
    });
  }

  // Initial check
  setTimeout(() => {
    checkReveal();
  }, 450);

  window.addEventListener('scroll', checkReveal, { passive: true });

  // Add subtle hover lift effect on program cards
  const programCards = document.querySelectorAll('.program-card');
  programCards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });
  });

  // Add CSS for subtle interactive tilt effect on programs (inline)
  const style = document.createElement('style');
  style.innerHTML = `
    .program-card {
      transition: transform 0.4s cubic-bezier(0.23, 1.0, 0.32, 1), box-shadow 0.4s ease;
    }
    .program-card:hover {
      box-shadow: 0 30px 70px rgba(0, 0, 0, 0.5);
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);

  // Optional: Add premium subtle parallax on hero (performance friendly)
  const hero = document.querySelector('.hero');
  const heroVisual = document.querySelector('.hero-visual img');

  if (hero && heroVisual) {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const heroHeight = hero.offsetHeight;
          
          if (scrollY < heroHeight) {
            const parallax = scrollY * 0.14;
            heroVisual.style.transform = `translateY(${parallax}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // Easter egg: logo click shows a subtle highlight
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('click', () => {
      logo.style.transition = 'all .15s ease';
      logo.style.transform = 'scale(0.9)';
      setTimeout(() => {
        logo.style.transform = 'scale(1)';
      }, 150);
    });
  }

  // Accessibility: Escape key closes mobile nav
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('mobile-open')) {
      navLinks.classList.remove('mobile-open');
      if (navToggle) navToggle.classList.remove('active');
    }
  });

  // Mark that everything is ready
  console.log('%c[Kai Lennox] Premium site initialized successfully.', 'color:#6B6762; font-size: 9.5px');
});