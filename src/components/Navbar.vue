<template>
  <header class="sticky top-0 z-50 bg-white/95 border-b border-[#e4e4e7] backdrop-blur-md transition-colors">
    <div class="container mx-auto max-w-clickup px-4 sm:px-6 h-16 flex items-center justify-between">
      <!-- Brand Logo & Name -->
      <a
        href="#home"
        class="flex items-center gap-3 text-[#18181b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00529c] rounded-full px-1"
        aria-label="CTU Scheduler Trang chủ"
      >
        <img
          src="/assets/images/icon.svg"
          alt="CTU Scheduler Logo"
          class="h-8 w-8 shrink-0"
        />
        <div class="flex items-center gap-2">
          <span class="text-base font-extrabold tracking-tight text-[#18181b] font-display">CTU Scheduler</span>
          <span class="hidden sm:inline-flex px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-[#f0f7ff] text-[#00529c] border border-[#bae0fd]">v4.0</span>
        </div>
      </a>

      <!-- Desktop Navigation Menu -->
      <nav class="hidden md:flex items-center gap-1 text-sm font-semibold text-[#52525b]" aria-label="Menu điều hướng chính">
        <a href="#features" class="px-3 py-1.5 rounded-full hover:text-[#00529c] hover:bg-[#f0f7ff] transition-colors">Tính Năng</a>
        <a href="#certification" class="px-3 py-1.5 rounded-full hover:text-[#00529c] hover:bg-[#f0f7ff] transition-colors">Nghiệm Thu NCKH</a>
        <a href="#ecosystem" class="px-3 py-1.5 rounded-full hover:text-[#00529c] hover:bg-[#f0f7ff] transition-colors">Hệ Sinh Thái</a>
        <a href="#download" class="px-3 py-1.5 rounded-full hover:text-[#00529c] hover:bg-[#f0f7ff] transition-colors">Tải Xuống</a>
        <a href="#faq" class="px-3 py-1.5 rounded-full hover:text-[#00529c] hover:bg-[#f0f7ff] transition-colors">Hỏi Đáp</a>
        <a href="#team" class="px-3 py-1.5 rounded-full hover:text-[#00529c] hover:bg-[#f0f7ff] transition-colors">Đội Ngũ</a>
      </nav>

      <!-- Right Action Controls -->
      <div class="hidden sm:flex items-center gap-2.5">
        <a
          href="https://github.com/d3nhatv0lam/CTU-Scheduler"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-clickup-ghost !py-2 !px-3.5 !text-xs"
        >
          <svg class="w-4 h-4 text-[#18181b]" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          GitHub
        </a>
        <a href="#download" class="btn-clickup-primary !py-2 !px-4 !text-xs">
          Tải Ứng Dụng
        </a>
      </div>

      <!-- Mobile Menu Button -->
      <button
        type="button"
        v-motion
        :tapped="{ scale: 0.92, transition: { duration: 150 } }"
        class="md:hidden p-2 text-[#52525b] hover:text-[#18181b] rounded-lg focus:outline-none cursor-pointer"
        :aria-expanded="isMenuOpen"
        aria-label="Mở menu điều hướng"
        @click="isMenuOpen = !isMenuOpen"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      </button>
    </div>

    <!-- Mobile Dropdown Menu -->
    <div
      v-if="isMenuOpen"
      v-motion
      :initial="{ opacity: 0, y: -10 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 200, ease: [0.33, 1, 0.68, 1] } }"
      :leave="{ opacity: 0, y: -10, transition: { duration: 150, ease: [0.33, 1, 0.68, 1] } }"
      class="md:hidden bg-white border-b border-[#e4e4e7] px-4 py-4 space-y-2 text-sm shadow-lg"
    >
      <a href="#features" class="block text-[#52525b] hover:text-[#00529c] font-medium py-2 px-3 rounded-lg hover:bg-[#f0f7ff]" @click="isMenuOpen = false">Tính Năng</a>
      <a href="#certification" class="block text-[#52525b] hover:text-[#00529c] font-medium py-2 px-3 rounded-lg hover:bg-[#f0f7ff]" @click="isMenuOpen = false">Nghiệm Thu NCKH</a>
      <a href="#ecosystem" class="block text-[#52525b] hover:text-[#00529c] font-medium py-2 px-3 rounded-lg hover:bg-[#f0f7ff]" @click="isMenuOpen = false">Hệ Sinh Thái</a>
      <a href="#download" class="block text-[#52525b] hover:text-[#00529c] font-medium py-2 px-3 rounded-lg hover:bg-[#f0f7ff]" @click="isMenuOpen = false">Tải Xuống</a>
      <a href="#faq" class="block text-[#52525b] hover:text-[#00529c] font-medium py-2 px-3 rounded-lg hover:bg-[#f0f7ff]" @click="isMenuOpen = false">Hỏi Đáp</a>
      <a href="#team" class="block text-[#52525b] hover:text-[#00529c] font-medium py-2 px-3 rounded-lg hover:bg-[#f0f7ff]" @click="isMenuOpen = false">Đội Ngũ</a>
      <div class="pt-3 border-t border-[#e4e4e7] flex gap-2">
        <a href="#download" class="btn-clickup-primary flex-1 !py-2.5 !text-xs text-center justify-center" @click="isMenuOpen = false">
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
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false);
</script>
