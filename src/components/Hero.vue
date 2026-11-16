<template>
  <section id="home" class="py-16 md:py-24 border-b border-[#e8e8e8] bg-white overflow-hidden">
    <div class="container mx-auto max-w-clickup px-4 sm:px-6">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <!-- Left Editorial Presentation -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 450, ease: [0.33, 1, 0.68, 1] } }"
          class="lg:col-span-6 space-y-6"
        >
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5f3ff] text-[#6647f0] border border-[#ddd6fe] text-xs font-bold tracking-wide">
            <span class="w-2 h-2 rounded-full bg-[#6647f0]"></span>
            <span>ĐỀ TÀI NGHIÊN CỨU KHOA HỌC · KHOA CNTT&amp;TT</span>
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-[3.75rem] font-extrabold tracking-[-0.04em] text-[#090c1d] leading-[1.08] font-display">
            Xếp lịch học Đại học Cần Thơ tự động &amp; chuẩn xác.
          </h1>

          <p class="text-base sm:text-lg text-[#646464] leading-relaxed max-w-xl font-normal">
            Loại bỏ việc dò mã lớp thủ công bằng tay, giải quyết xung đột lịch học phức tạp và theo dõi biến động sĩ số trực tiếp từ hệ thống MyCTU.
          </p>

          <div class="flex flex-col sm:flex-row gap-3 pt-2 items-stretch sm:items-center">
            <!-- ClickUp Conic Gradient Highlighted CTA -->
            <div class="conic-border-wrapper">
              <a href="#download" class="conic-border-inner">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Tải Bản Mới Nhất (v4.0.0)
              </a>
            </div>
            <a
              href="https://github.com/d3nhatv0lam/CTU-Scheduler"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-clickup-ghost"
            >
              Xem Mã Nguồn GitHub
            </a>
          </div>

          <!-- Feature Trust List with Signal Blue Checkmarks -->
          <div class="pt-6 border-t border-[#e8e8e8] space-y-2.5 text-sm text-[#202020]">
            <div class="flex items-center gap-2.5">
              <span class="w-5 h-5 rounded-full bg-[#e6f4ff] text-[#0091ff] flex items-center justify-center shrink-0">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span class="font-medium">Đề tài NCKH được nghiệm thu chính thức tại ĐH Cần Thơ</span>
            </div>
            <div class="flex items-center gap-2.5">
              <span class="w-5 h-5 rounded-full bg-[#e6f4ff] text-[#0091ff] flex items-center justify-center shrink-0">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span class="font-medium">Xử lý cục bộ 100% không lưu trữ dữ liệu cá nhân hay cookie</span>
            </div>
            <div class="flex items-center gap-2.5">
              <span class="w-5 h-5 rounded-full bg-[#e6f4ff] text-[#0091ff] flex items-center justify-center shrink-0">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span class="font-medium">Tự động phát hiện trùng lịch học, trùng lịch thi &amp; xếp phòng</span>
            </div>
          </div>
        </div>

        <!-- Right Timetable Showcase -->
        <div
          v-motion
          :initial="{ opacity: 0, scale: 0.96 }"
          :enter="{ opacity: 1, scale: 1, transition: { duration: 550, delay: 100, ease: [0.33, 1, 0.68, 1] } }"
          class="lg:col-span-6"
        >
          <TimetableSimulator />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import TimetableSimulator from './TimetableSimulator.vue';
</script>
