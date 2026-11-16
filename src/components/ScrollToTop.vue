<template>
  <button
    v-show="isVisible"
    type="button"
    class="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full bg-[#121317] hover:bg-[#1c1d22] text-[#ffffff] border border-[#2e3038] flex items-center justify-center transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-[#ffffff]"
    aria-label="Cuộn lên đầu trang"
    title="Cuộn lên đầu trang"
    @click="scrollToTop"
  >
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
    </svg>
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isVisible = ref(false);

function handleScroll() {
  isVisible.value = window.scrollY > 400;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

