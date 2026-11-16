<template>
  <section id="home" class="pt-16 pb-20 md:pt-24 md:pb-28 border-b border-[#e4e4e7] bg-white overflow-hidden relative">
    <!-- Subtle Background Ambient Elevation -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-[#f0f7ff] via-[#e0f2fe]/40 to-transparent blur-3xl pointer-events-none -z-10"></div>

    <div class="container mx-auto max-w-clickup px-4 sm:px-6 text-center">
      <!-- Mega Keynote Centered Headline -->
      <h1
        v-motion
        :initial="{ opacity: 0, y: 16 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 450, ease: [0.33, 1, 0.68, 1] } }"
        class="text-4xl sm:text-6xl lg:text-[4.25rem] font-extrabold tracking-[-0.035em] text-[#090c1d] leading-[1.08] font-display max-w-4xl mx-auto"
      >
        Một không gian xếp lịch thông minh cho sinh viên Đại học Cần Thơ.
      </h1>

      <!-- Centered Subtitle -->
      <p
        v-motion
        :initial="{ opacity: 0, y: 16 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: 60, ease: [0.33, 1, 0.68, 1] } }"
        class="text-base sm:text-lg md:text-xl text-[#52525b] leading-relaxed max-w-2xl mx-auto mt-6 font-normal"
      >
        Tự động hóa hoàn toàn việc tổ hợp môn học, loại trừ 100% xung đột lịch thi, lịch học và cập nhật sĩ số trực tiếp từ hệ thống MyCTU.
      </p>

      <!-- Mobile Visitor Context Banner -->
      <div
        v-if="isMobileDevice"
        class="mt-6 max-w-md mx-auto p-3 rounded-full bg-[#f0f7ff] border border-[#bae0fd] text-xs text-[#00529c] flex items-center justify-center gap-2 shadow-sm font-medium"
      >
        <i class="fa-solid fa-mobile-screen-button"></i>
        <span>Đang mở trên điện thoại: Hãy lưu liên kết để tải trên máy tính Windows.</span>
      </div>

      <!-- Centered Confident Action Buttons -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 16 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 450, delay: 120, ease: [0.33, 1, 0.68, 1] } }"
        class="flex flex-col sm:flex-row gap-3 pt-8 items-center justify-center"
      >
        <a
          href="#download"
          class="btn-clickup-primary !py-3.5 !px-8 !text-sm flex items-center gap-2 shadow-md hover:shadow-lg"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>Tải Bản Mới Nhất (v4.0.0)</span>
        </a>

        <a
          href="https://github.com/d3nhatv0lam/CTU-Scheduler"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-clickup-ghost !py-3.5 !px-6 !text-sm hover:border-[#00529c] hover:text-[#00529c]"
        >
          <svg class="w-4 h-4 text-[#18181b]" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          <span>Xem Mã Nguồn GitHub</span>
        </a>
      </div>

      <!-- Trust Row -->
      <div
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1, transition: { duration: 450, delay: 180 } }"
        class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-6 text-xs text-[#52525b] font-medium"
      >
        <span class="flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5 text-[#00c07a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
          Miễn phí &amp; Mã nguồn mở MIT
        </span>
        <span class="flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5 text-[#00c07a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
          Xử lý cục bộ 100% Offline
        </span>
        <span class="flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5 text-[#00c07a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
          Hội đồng Khoa CNTT&amp;TT nghiệm thu
        </span>
      </div>

      <!-- Centered Epic Product Interface Window Showcase -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30, scale: 0.99 }"
        :enter="{ opacity: 1, y: 0, scale: 1, transition: { duration: 600, delay: 220, ease: [0.33, 1, 0.68, 1] } }"
        class="mt-12 max-w-5xl mx-auto relative text-left"
      >
        <!-- Mockup Ambient Shadow -->
        <div class="absolute -inset-1 bg-gradient-to-r from-[#00529c]/15 via-[#0091ff]/15 to-[#00c07a]/15 rounded-2xl blur-lg opacity-70"></div>

        <!-- Window Container with Authentic Windows Titlebar -->
        <div class="relative bg-white rounded-2xl border border-[#d4d4d8] shadow-float overflow-hidden hover-lift">
          <!-- Window Header / Authentic Windows Controls -->
          <div class="h-10 bg-[#f8f9fa] border-b border-[#e4e4e7] px-4 flex items-center justify-between select-none">
            <div class="flex items-center gap-2 text-xs font-bold text-[#18181b]">
              <img src="/assets/images/icon.svg" class="w-4 h-4" alt="logo" />
              <span>CTU Scheduler — Thời Khóa Biểu Học Kỳ 1 (Bản chính thức v4.0.0)</span>
            </div>
            
            <div class="flex items-center gap-3 text-xs text-[#71717a]">
              <span class="px-2 py-0.5 rounded-full bg-[#ecfdf5] text-[#00c07a] font-bold text-[10px] border border-[#a7f3d0]">
                ONLINE SYNC
              </span>
              <div class="hidden sm:flex items-center gap-3 text-[#71717a] ml-2">
                <span class="hover:text-[#18181b] cursor-pointer text-sm">─</span>
                <span class="hover:text-[#18181b] cursor-pointer text-xs">□</span>
                <span class="hover:text-[#ef4444] cursor-pointer text-sm">✕</span>
              </div>
            </div>
          </div>

          <!-- Inside Application Dashboard -->
          <div class="p-4 sm:p-6 bg-white">
            <TimetableSimulator />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import TimetableSimulator from './TimetableSimulator.vue';
import { detectDevice, OS } from '../../js/detector.js';

const isMobileDevice = ref(false);

onMounted(() => {
  const device = detectDevice();
  isMobileDevice.value = device.os === OS.ANDROID || device.os === OS.IOS || window.innerWidth < 768;
});
</script>
