<template>
  <AnimatePresence mode="wait">
    <motion.button
      v-if="isVisible"
      key="scroll-to-top"
      type="button"
      :initial="{ opacity: 0, scale: 0.85 }"
      :animate="{ opacity: 1, scale: 1 }"
      :exit="{ opacity: 0, scale: 0.85 }"
      :transition="{ duration: 0.18, ease: [0.33, 1, 0.68, 1] }"
      :whilePress="{ scale: 0.92 }"
      class="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-white hover:bg-[#f8f9fa] text-[#18181b] border border-[#e4e4e7] shadow-float flex items-center justify-center transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00529c] transform-gpu"
      aria-label="Cuộn lên đầu trang"
      title="Cuộn lên đầu trang"
      @click="scrollToTop"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2.5"
          d="M5 15l7-7 7 7"
        />
      </svg>
    </motion.button>
  </AnimatePresence>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { motion, AnimatePresence } from "motion-v";

const isVisible = ref(false);
let ticking = false;

function handleScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      // Hysteresis window (320px - 400px) prevents rapid toggling/flutter at threshold
      if (!isVisible.value && scrollY > 400) {
        isVisible.value = true;
      } else if (isVisible.value && scrollY < 320) {
        isVisible.value = false;
      }
      ticking = false;
    });
    ticking = true;
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
