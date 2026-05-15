document.addEventListener('DOMContentLoaded', () => {
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
        // Trigger reveal animations inside the section immediately
        setTimeout(() => {
          section.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
        }, 50);
      } else {
        section.classList.add('hidden');
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
});
