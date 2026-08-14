import { initGithubRelease } from './github-release.js';

document.addEventListener('DOMContentLoaded', () => {
  // Khởi tạo tải thông tin Release từ GitHub
  initGithubRelease();

  // Reveal animation on scroll
  const revealElements = document.querySelectorAll('.reveal');

  const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealOnScroll.observe(el);
  });

  // Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Simple SPA Navigation
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.page-section');

  function navigateTo(hash) {
    const targetId = hash.replace('#', '') || 'home';
    
    sections.forEach(section => {
      if (section.id === targetId) {
        section.classList.remove('hidden');
        // Reset và kích hoạt lại hoạt ảnh reveal thông qua IntersectionObserver
        section.querySelectorAll('.reveal').forEach(el => {
          el.classList.remove('active');
          revealOnScroll.observe(el);
        });
      } else {
        section.classList.add('hidden');
        // Reset trạng thái reveal của trang ẩn để chuẩn bị cho lần quay lại tiếp theo
        section.querySelectorAll('.reveal').forEach(el => {
          el.classList.remove('active');
        });
      }
    });

    navLinks.forEach(link => {
      if (link.getAttribute('href') === `#${targetId}` || (targetId === 'home' && link.getAttribute('href') === '#')) {
        link.classList.add('text-secondary');
        link.classList.remove('text-gray-300');
      } else {
        link.classList.remove('text-secondary');
        link.classList.add('text-gray-300');
      }
    });
    
    // Close mobile menu on navigate
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
    }
  }

  // Handle initial load
  navigateTo(window.location.hash);

  // Handle hash changes
  window.addEventListener('hashchange', () => {
    navigateTo(window.location.hash);
    window.scrollTo(0, 0);
  });

  // Floating Action Buttons Logic
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  const floatingFeedbackBtn = document.getElementById('floating-feedback');

  if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
        scrollToTopBtn.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
      } else {
        scrollToTopBtn.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
        scrollToTopBtn.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
      }
    });

    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (floatingFeedbackBtn) {
    floatingFeedbackBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentHash = window.location.hash || '#home';
      const feedbackSection = document.getElementById('feedback-section');

      if (currentHash === '#home') {
        if (feedbackSection) {
          feedbackSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        window.location.hash = '#home';
        // Đợi chuyển trang SPA hoàn tất trước khi cuộn
        setTimeout(() => {
          const targetSection = document.getElementById('feedback-section');
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 300);
      }
    });
  }
});

