import { initGithubRelease } from './github-release.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Tải thông tin Release từ GitHub
  initGithubRelease();

  // 2. Reveal animation on scroll
  const revealElements = document.querySelectorAll('.reveal');
  const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px"
  };

  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => revealOnScroll.observe(el));

  // 3. Accessible Mobile Navigation
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  function openMobileMenu() {
    if (!mobileMenu || !mobileBtn) return;
    mobileMenu.classList.remove('hidden');
    mobileBtn.setAttribute('aria-expanded', 'true');
  }

  function closeMobileMenu() {
    if (!mobileMenu || !mobileBtn) return;
    mobileMenu.classList.add('hidden');
    mobileBtn.setAttribute('aria-expanded', 'false');
  }

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = mobileBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileBtn.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        closeMobileMenu();
        mobileBtn.focus();
      }
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => closeMobileMenu());
    });
  }

  // 4. Smooth Anchor Scrolling & Active Nav Highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('text-primary', 'font-semibold');
            link.classList.remove('text-slate-300');
          } else {
            link.classList.remove('text-primary', 'font-semibold');
            link.classList.add('text-slate-300');
          }
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(sec => navObserver.observe(sec));

  // 5. Interactive Timetable Simulator
  initTimetableSimulator();

  // 6. Scroll to Top Button
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        scrollToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
        scrollToTopBtn.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
      } else {
        scrollToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
        scrollToTopBtn.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
      }
    }, { passive: true });

    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

/**
 * Interactive Timetable Simulator Logic
 */
function initTimetableSimulator() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const courseSlots = document.querySelectorAll('.sim-slot');
  const statConflicts = document.getElementById('sim-stat-conflicts');
  const statFreeDays = document.getElementById('sim-stat-freedays');
  const statCapacity = document.getElementById('sim-stat-capacity');
  const statStatus = document.getElementById('sim-stat-status');

  if (!filterButtons.length) return;

  const presets = {
    'all': {
      activeSlots: ['slot-ct176-m', 'slot-ct112-a', 'slot-ct103-m', 'slot-ct178-a', 'slot-ml014-a'],
      conflicts: '0 môn trùng',
      freeDays: 'Chủ nhật',
      capacity: 'Đang mở (42/45 chỗ)',
      statusText: 'Phương án cân bằng tiêu chuẩn: Rải đều các buổi sáng/chiều.'
    },
    'afternoon': {
      activeSlots: ['slot-ct176-a', 'slot-ct112-a', 'slot-ct103-a', 'slot-ct178-a', 'slot-ml014-a'],
      conflicts: '0 môn trùng',
      freeDays: 'Tất cả buổi sáng',
      capacity: 'Đang mở (38/40 chỗ)',
      statusText: 'Đã né 100% ca sáng: Toàn bộ lịch học chuyển sang tiết 6 - 10.'
    },
    'condensed': {
      activeSlots: ['slot-ct176-m', 'slot-ct112-a', 'slot-ct103-m', 'slot-ct178-a', 'slot-ml014-m'],
      conflicts: '0 môn trùng',
      freeDays: 'Thứ 6 & Thứ 7',
      capacity: 'Đang mở (35/40 chỗ)',
      statusText: 'Đã dồn lịch: Thứ 6 & Thứ 7 trống hoàn toàn để đi làm thêm.'
    },
    'campus': {
      activeSlots: ['slot-ct176-m', 'slot-ct112-a', 'slot-ct103-m', 'slot-ct178-a', 'slot-ml014-a'],
      conflicts: '0 môn trùng',
      freeDays: 'Chủ nhật',
      capacity: '100% Khu II',
      statusText: 'Đã khóa cơ sở: 0km di chuyển, toàn bộ diễn ra tại Khu II ĐH Cần Thơ.'
    }
  };

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('bg-primary', 'text-white', 'border-primary');
        b.classList.add('bg-slate-800', 'text-slate-300', 'border-slate-700');
        b.setAttribute('aria-pressed', 'false');
      });

      btn.classList.add('bg-primary', 'text-white', 'border-primary');
      btn.classList.remove('bg-slate-800', 'text-slate-300', 'border-slate-700');
      btn.setAttribute('aria-pressed', 'true');

      const filterKey = btn.dataset.filter || 'all';
      const config = presets[filterKey] || presets['all'];

      // Cập nhật slot hiển thị
      courseSlots.forEach(slot => {
        if (config.activeSlots.includes(slot.id)) {
          slot.classList.remove('slot-dimmed');
        } else {
          slot.classList.add('slot-dimmed');
        }
      });

      // Cập nhật nhãn thống kê
      if (statConflicts) statConflicts.textContent = config.conflicts;
      if (statFreeDays) statFreeDays.textContent = config.freeDays;
      if (statCapacity) statCapacity.textContent = config.capacity;
      if (statStatus) statStatus.textContent = config.statusText;
    });
  });
}
