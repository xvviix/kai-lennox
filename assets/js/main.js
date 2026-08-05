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
        slideWidth = track.offsetWidth / 2;
      } else {
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

    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));

    let autoSlideInterval = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 7000);

    const sliderContainer = track.parentElement;
    sliderContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    sliderContainer.addEventListener('mouseleave', () => {
      autoSlideInterval = setInterval(() => goToSlide(currentIndex + 1), 7000);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') goToSlide(currentIndex + 1);
      if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1);
    });

    function handleResize() {
      updateSlideWidth();
      updateTrackPosition();
    }

    window.addEventListener('resize', handleResize);
    updateSlideWidth();
    updateTrackPosition();

    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      clearInterval(autoSlideInterval);
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      autoSlideInterval = setInterval(() => goToSlide(currentIndex + 1), 7000);
    }, { passive: true });

    function handleSwipe() {
      if (touchEndX < touchStartX - 60) goToSlide(currentIndex + 1);
      if (touchEndX > touchStartX + 60) goToSlide(currentIndex - 1);
    }
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        faqItems.forEach(otherItem => {
          if (otherItem !== item) otherItem.classList.remove('active');
        });

        if (isActive) {
          item.classList.remove('active');
        } else {
          item.classList.add('active');
        }
      });
    }
  });

  // Form handling
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

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
        contactForm.style.display = 'none';
        formSuccess.classList.add('active');

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

  setTimeout(() => {
    checkReveal();
  }, 450);

  window.addEventListener('scroll', checkReveal, { passive: true });

  // Program cards subtle mouse tilt effect
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

  // Add extra CSS
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
    .floating-cta {
      animation: fadeInUp 0.4s ease forwards;
    }
  `;
  document.head.appendChild(style);

  // Hero parallax
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
            const parallax = scrollY * 0.13;
            heroVisual.style.transform = `translateY(${parallax}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // Logo easter egg
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('click', () => {
      logo.style.transition = 'all .15s ease';
      logo.style.transform = 'scale(0.88)';
      setTimeout(() => {
        logo.style.transform = 'scale(1)';
      }, 160);
    });
  }

  // Escape key handling
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // Close mobile nav
      if (navLinks && navLinks.classList.contains('mobile-open')) {
        navLinks.classList.remove('mobile-open');
        if (navToggle) navToggle.classList.remove('active');
      }
      
      // Close modal
      const modal = document.getElementById('video-modal');
      if (modal && modal.classList.contains('active')) {
        closeVideoModal();
      }
    }
  });

  // Show floating CTA after scroll
  const floatingCTA = document.getElementById('floating-cta');
  if (floatingCTA) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 1100) {
        floatingCTA.style.display = 'flex';
      } else {
        floatingCTA.style.display = 'none';
      }
    }, { passive: true });
  }

  // Back to top button
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 900) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    // Keyboard support
    backToTop.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // Optional: Update nav to include Journal
  const navLinksEl = document.getElementById('nav-links');
  if (navLinksEl) {
    // Already complete but we can make sure links are good
  }

  console.log('%c[Kai Lennox] Premium site fully initialized — Awwwards caliber.', 'color:#6B6762; font-size: 9.5px');
});

/* ============================================
   VIDEO MODAL FUNCTIONS (Premium Feature)
   ============================================ */
function openVideoModal() {
  const modal = document.getElementById('video-modal');
  if (!modal) return;
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  // Optional: auto play a placeholder video if one existed
  const video = modal.querySelector('video');
  if (video) {
    setTimeout(() => {
      video.play().catch(() => {});
    }, 800);
  }
}

function closeVideoModal() {
  const modal = document.getElementById('video-modal');
  if (!modal) return;
  
  modal.classList.remove('active');
  document.body.style.overflow = '';
  
  // Pause any video
  const video = modal.querySelector('video');
  if (video) {
    video.pause();
    video.currentTime = 0;
  }
}

// Make functions available globally
window.openVideoModal = openVideoModal;
window.closeVideoModal = closeVideoModal;

/* ============================================
   PREMIUM VIDEO MODAL SIMULATION
   ============================================ */
function playVideoDemo(playButton) {
  const container = playButton.parentElement;
  const overlay = container.querySelector('.video-overlay');
  const posterImg = container.querySelector('img');
  
  if (!overlay) return;

  // Hide the play button overlay
  overlay.style.transition = 'opacity 0.3s ease';
  overlay.style.opacity = '0';

  setTimeout(() => {
    overlay.style.display = 'none';

    // Create premium simulated video player
    const videoSim = document.createElement('div');
    videoSim.className = 'video-simulator';
    videoSim.innerHTML = `
      <div class="video-sim-content">
        <div class="cinematic-frame">
          <div class="film-grain"></div>
          
          <!-- Simulated cinematic footage -->
          <div class="simulated-scene">
            <div class="scene-bg"></div>
            
            <div class="scene-content">
              <div class="coach-silhouette"></div>
              <div class="client-figure"></div>
              <div class="light-beams"></div>
            </div>
            
            <div class="scene-text">
              <div class="scene-label">KAI LENNOX • 2025</div>
              <div style="font-size:0.75rem; opacity:0.7;">"Precision is everything."</div>
            </div>
          </div>
          
          <!-- Progress bar -->
          <div class="video-progress">
            <div class="progress-bar">
              <div class="progress-fill" style="width: 0%"></div>
            </div>
            <div class="video-time">
              <span class="current-time">0:00</span>
              <span>/</span>
              <span>2:14</span>
            </div>
          </div>
        </div>
      </div>
    `;

    container.appendChild(videoSim);

    // Start simulated playback
    const progressFill = videoSim.querySelector('.progress-fill');
    const currentTime = videoSim.querySelector('.current-time');
    
    let progress = 0;
    const duration = 134000; // 2:14 in ms
    const interval = setInterval(() => {
      progress += 1.1;
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // End of film: show replay button
        setTimeout(() => {
          const replay = document.createElement('div');
          replay.style.cssText = 'position:absolute; bottom:40px; left:50%; transform:translateX(-50%); display:flex; gap:10px; align-items:center;';
          replay.innerHTML = `
            <button onclick="replayVideoDemo(this)" style="background:#C9A96E; color:#0F0F0F; border:none; padding:8px 18px; border-radius:9999px; font-size:0.75rem; font-weight:700; cursor:pointer;">REPLAY FILM</button>
          `;
          videoSim.appendChild(replay);
        }, 600);
      }
      
      progressFill.style.width = progress + '%';
      
      // Update time display
      const seconds = Math.floor((progress / 100) * 134);
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      currentTime.textContent = `${mins}:${secs < 10 ? '0' + secs : secs}`;
    }, 1450); // smooth 2m14s simulation
    
    // Store interval so we can clear if needed
    videoSim.dataset.interval = interval;
  }, 320);
}

function replayVideoDemo(btn) {
  const videoSim = btn.closest('.video-simulator');
  if (videoSim) {
    const container = videoSim.parentElement;
    videoSim.remove();
    
    // Reset overlay
    const overlay = container.querySelector('.video-overlay');
    if (overlay) {
      overlay.style.display = 'flex';
      overlay.style.opacity = '1';
    }
  }
}