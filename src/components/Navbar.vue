<template>
  <header
    class="sticky top-0 z-50 bg-white/95 border-b border-[#e4e4e7] backdrop-blur-md transition-colors"
  >
    <div
      class="container mx-auto max-w-clickup px-4 sm:px-6 h-16 flex items-center justify-between"
    >
      <!-- Brand Logo & Name -->
      <a
        href="#home"
        class="flex items-center gap-3 text-[#18181b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00529c] rounded-full px-1"
        aria-label="CTU Scheduler Trang chủ"
        @click="onBrandClick"
      >
        <img
          src="/assets/images/icon.svg"
          alt="CTU Scheduler Logo"
          class="h-8 w-8 shrink-0"
        />
        <div class="flex items-center gap-2">
          <span
            class="text-base font-extrabold tracking-tight text-[#18181b] font-display"
            >CTU Scheduler</span
          >
        </div>
      </a>

      <!-- Desktop Navigation Menu (Hardware-accelerated Motion Gliding Pill) -->
      <nav
        ref="navRef"
        class="relative hidden md:flex items-center gap-1 text-sm font-semibold text-[#52525b]"
        aria-label="Menu điều hướng chính"
      >
        <!-- Motion Gliding Active Indicator Pill (Smoothly translates & morphs width) -->
        <span
          class="absolute top-0 left-0 bg-[#f0f7ff] border border-[#bae0fd] rounded-full pointer-events-none z-0 will-change-transform shadow-2xs"
          :style="{
            transform: `translate3d(${pillStyle.left}px, ${pillStyle.top}px, 0)`,
            width: `${pillStyle.width}px`,
            height: `${pillStyle.height}px`,
            opacity: pillStyle.opacity,
            transition:
              'transform 0.3s cubic-bezier(0.33, 1, 0.68, 1), width 0.3s cubic-bezier(0.33, 1, 0.68, 1), height 0.3s cubic-bezier(0.33, 1, 0.68, 1), opacity 0.2s ease',
          }"
          aria-hidden="true"
        />

        <a
          v-for="item in navItems"
          :key="item.id"
          :href="'#' + item.id"
          class="relative z-10 px-3 py-1.5 rounded-full transition-colors duration-150 cursor-pointer select-none active:scale-95"
          :class="
            activeSection === item.id
              ? 'text-[#00529c]'
              : 'text-[#52525b] hover:text-[#00529c]'
          "
          :aria-current="activeSection === item.id ? 'true' : undefined"
          @click="onNavItemClick(item.id, $event)"
        >
          {{ item.label }}
        </a>
      </nav>

      <!-- Right Action Controls -->
      <div class="hidden sm:flex items-center gap-2.5">
        <a
          href="https://github.com/d3nhatv0lam/CTU-Scheduler"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-clickup-ghost !py-2 !px-3.5 !text-xs"
        >
          <svg
            class="w-4 h-4 text-[#18181b]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            />
          </svg>
          GitHub
        </a>
        <a href="#download" class="btn-clickup-primary !py-2 !px-4 !text-xs">
          Tải Ứng Dụng
        </a>
      </div>

      <!-- Mobile Menu Button -->
      <motion.button
        type="button"
        :whilePress="{ scale: 0.92 }"
        class="md:hidden p-2 text-[#52525b] hover:text-[#18181b] rounded-lg focus:outline-none cursor-pointer"
        :aria-expanded="isMenuOpen"
        aria-label="Mở menu điều hướng"
        @click="isMenuOpen = !isMenuOpen"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            v-if="!isMenuOpen"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.75"
            d="M4 6h16M4 12h16M4 18h16"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.75"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </motion.button>
    </div>

    <!-- Mobile Dropdown Menu -->
    <AnimatePresence mode="wait">
      <motion.div
        v-if="isMenuOpen"
        key="mobile-nav-dropdown"
        :initial="{ opacity: 0, y: -8 }"
        :animate="{ opacity: 1, y: 0 }"
        :exit="{ opacity: 0, y: -8 }"
        :transition="{ duration: 0.18, ease: [0.33, 1, 0.68, 1] }"
        class="md:hidden bg-white border-b border-[#e4e4e7] px-4 py-4 space-y-2 text-sm shadow-lg"
      >
        <a
          v-for="item in navItems"
          :key="'mobile-' + item.id"
          :href="'#' + item.id"
          class="block font-medium py-2 px-3 rounded-lg transition-colors text-sm active:scale-98"
          :class="
            activeSection === item.id
              ? 'text-[#00529c] bg-[#f0f7ff]'
              : 'text-[#52525b] hover:text-[#00529c] hover:bg-[#f0f7ff]'
          "
          :aria-current="activeSection === item.id ? 'true' : undefined"
          @click="onMobileNavItemClick(item.id, $event)"
        >
          {{ item.label }}
        </a>
        <div class="pt-3 border-t border-[#e4e4e7] flex gap-2">
          <a
            href="#download"
            class="btn-clickup-primary flex-1 !py-2.5 !text-xs text-center justify-center"
            @click="isMenuOpen = false"
          >
            Tải Ứng Dụng
          </a>
          <a
            href="https://github.com/d3nhatv0lam/CTU-Scheduler"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-clickup-ghost !py-2.5 !text-xs px-3 text-center justify-center"
          >
            GitHub
          </a>
        </div>
      </motion.div>
    </AnimatePresence>
  </header>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from "vue";
import { motion, AnimatePresence } from "motion-v";

const isMenuOpen = ref(false);
const activeSection = ref("");
const navRef = ref(null);

const pillStyle = ref({
  left: 0,
  top: 0,
  width: 0,
  height: 0,
  opacity: 0,
});

const navItems = [
  { id: "features", label: "Tính Năng" },
  { id: "certification", label: "Đề Tài NCKH" },
  { id: "ecosystem", label: "Hệ Sinh Thái" },
  { id: "download", label: "Tải Xuống" },
  { id: "faq", label: "Hỏi Đáp" },
  { id: "team", label: "Đội Ngũ" },
];

function updatePillPosition() {
  if (!navRef.value) return;
  if (!activeSection.value) {
    pillStyle.value = { ...pillStyle.value, opacity: 0 };
    return;
  }
  const el = navRef.value.querySelector(`a[href="#${activeSection.value}"]`);
  if (el) {
    pillStyle.value = {
      left: el.offsetLeft,
      top: el.offsetTop,
      width: el.offsetWidth,
      height: el.offsetHeight,
      opacity: 1,
    };
  } else {
    pillStyle.value = { ...pillStyle.value, opacity: 0 };
  }
}

watch(activeSection, () => {
  nextTick(() => {
    updatePillPosition();
  });
});

function onNavItemClick(id, event) {
  if (event) event.preventDefault();
  activeSection.value = id;
  updatePillPosition();

  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
    try {
      history.pushState(null, "", "#" + id);
    } catch {}
  }
}

function onBrandClick(event) {
  if (event) event.preventDefault();
  activeSection.value = "";
  updatePillPosition();
  window.scrollTo({ top: 0, behavior: "smooth" });
  try {
    history.pushState(null, "", "#home");
  } catch {}
}

function onMobileNavItemClick(id, event) {
  if (event) event.preventDefault();
  activeSection.value = id;
  isMenuOpen.value = false;

  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
    try {
      history.pushState(null, "", "#" + id);
    } catch {}
  }
}

function calculateActiveSection() {
  const scrollY = window.scrollY;

  // At the very top (Hero section)
  if (scrollY < 120) {
    return "";
  }

  // At the very bottom of the page, activate the last nav item ('team')
  if (
    window.innerHeight + scrollY >=
    document.documentElement.scrollHeight - 60
  ) {
    return "team";
  }

  // Trigger threshold: 40% of viewport height (comfort zone where heading is read)
  const triggerPoint = window.innerHeight * 0.4;
  let current = "";

  for (const item of navItems) {
    const el = document.getElementById(item.id);
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= triggerPoint) {
        current = item.id;
      }
    }
  }

  return current;
}

let ticking = false;
function handleScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const nextSection = calculateActiveSection();
      if (nextSection !== activeSection.value) {
        activeSection.value = nextSection;
        updatePillPosition();
      }
      ticking = false;
    });
    ticking = true;
  }
}

function handleResize() {
  handleScroll();
  updatePillPosition();
}

onMounted(async () => {
  await nextTick();
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", handleResize, { passive: true });

  // Initial detection
  const hash = window.location.hash.replace("#", "");
  if (hash && navItems.some((n) => n.id === hash)) {
    activeSection.value = hash;
  } else {
    activeSection.value = calculateActiveSection();
  }

  updatePillPosition();

  // If custom webfonts finish loading, re-measure to ensure millimeter precision
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      updatePillPosition();
    });
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", handleResize);
});
</script>
