<template>
  <header class="sticky top-0 z-50 bg-[#08080a]/95 border-b border-[#1c1d22] backdrop-blur-md">
    <div class="container mx-auto max-w-slash px-4 h-16 flex items-center justify-between">
      <!-- Brand Logo & Name -->
      <a
        href="#home"
        class="flex items-center gap-3 text-[#ffffff] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#ffffff]"
        aria-label="CTU Scheduler Trang chủ"
      >
        <img
          src="/assets/images/icon.svg"
          alt="CTU Scheduler Logo"
          class="h-8 w-8 shrink-0"
        />
        <span class="text-base font-semibold tracking-tight text-[#ffffff]">CTU Scheduler</span>
      </a>

      <!-- Desktop Navigation Menu -->
      <nav class="hidden md:flex items-center gap-7 text-sm font-medium" aria-label="Menu điều hướng chính">
        <a href="#features" class="text-[#9194a1] hover:text-[#ffffff] transition-colors">Tính Năng</a>
        <a href="#certification" class="text-[#9194a1] hover:text-[#ffffff] transition-colors">Nghiệm Thu NCKH</a>
        <a href="#download" class="text-[#9194a1] hover:text-[#ffffff] transition-colors">Tải Xuống</a>
        <a href="#faq" class="text-[#9194a1] hover:text-[#ffffff] transition-colors">Hỏi Đáp</a>
        <a href="#team" class="text-[#9194a1] hover:text-[#ffffff] transition-colors">Đội Ngũ</a>
      </nav>

      <!-- Right Action Controls (Slash Style: Ghost + Primary White Pill) -->
      <div class="hidden sm:flex items-center gap-3">
        <a
          href="https://github.com/d3nhatv0lam/CTU-Scheduler"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-pill-ghost !py-1.5 !px-3.5 !text-xs"
        >
          Mã Nguồn GitHub
        </a>
        <a href="#download" class="btn-pill-primary !py-1.5 !px-4 !text-xs">
          Tải Ứng Dụng
        </a>
      </div>

      <!-- Mobile Menu Button -->
      <button
        type="button"
        class="md:hidden p-2 text-[#9194a1] hover:text-[#ffffff] focus:outline-none"
        :aria-expanded="isMenuOpen"
        aria-label="Mở menu điều hướng"
        @click="isMenuOpen = !isMenuOpen"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            v-if="!isMenuOpen"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M4 6h16M4 12h16M4 18h16"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile Dropdown Menu -->
    <div
      v-show="isMenuOpen"
      class="md:hidden bg-[#040406] border-b border-[#1c1d22] px-4 py-4 space-y-3 text-sm"
    >
      <a href="#features" class="block text-[#9194a1] hover:text-[#ffffff] py-1" @click="isMenuOpen = false">Tính Năng</a>
      <a href="#certification" class="block text-[#9194a1] hover:text-[#ffffff] py-1" @click="isMenuOpen = false">Nghiệm Thu NCKH</a>
      <a href="#download" class="block text-[#9194a1] hover:text-[#ffffff] py-1" @click="isMenuOpen = false">Tải Xuống</a>
      <a href="#faq" class="block text-[#9194a1] hover:text-[#ffffff] py-1" @click="isMenuOpen = false">Hỏi Đáp</a>
      <a href="#team" class="block text-[#9194a1] hover:text-[#ffffff] py-1" @click="isMenuOpen = false">Đội Ngũ</a>
      <div class="pt-3 border-t border-[#1c1d22] flex gap-2">
        <a href="#download" class="btn-pill-primary flex-1 !py-2 !text-xs text-center" @click="isMenuOpen = false">
          Tải Ứng Dụng
        </a>
        <a
          href="https://github.com/d3nhatv0lam/CTU-Scheduler"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-pill-ghost !py-2 !text-xs px-3 text-center"
        >
          GitHub
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false);
</script>

