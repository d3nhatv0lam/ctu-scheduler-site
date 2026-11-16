<template>
  <section id="home" class="py-16 md:py-24 border-b border-[#1c1d22]">
    <div class="container mx-auto max-w-slash px-4">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <!-- Left Editorial Presentation -->
        <div class="lg:col-span-6 space-y-6">
          <div class="copper-tag">
            Đề tài Nghiên cứu Khoa học Sinh viên · Khoa CNTT&amp;TT
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#ffffff] leading-[1.1]">
            Lên lịch học Đại học Cần Thơ tự động &amp; chuẩn xác.
          </h1>

          <p class="text-base sm:text-lg text-[#9194a1] leading-relaxed max-w-xl font-normal">
            Loại bỏ việc dò mã lớp thủ công, giải quyết xung đột lịch học phức tạp và theo dõi biến động sĩ số trực tiếp từ hệ thống MyCTU.
          </p>

          <div class="flex flex-col sm:flex-row gap-3 pt-2 items-stretch sm:items-center">
            <a href="#download" class="btn-pill-primary">
              Tải Bản Mới Nhất
            </a>
            <a
              href="https://github.com/d3nhatv0lam/CTU-Scheduler"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-pill-ghost"
            >
              Xem Mã Nguồn GitHub
            </a>
          </div>

          <!-- Editorial Trust Metrics (Slash Ledger Punctuation) -->
          <div class="pt-6 border-t border-[#1c1d22] flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#9194a1]">
            <div class="flex items-center gap-2">
              <span class="w-1 h-1 rounded-full bg-[#cc9166]"></span>
              <span>Đề tài NCKH được nghiệm thu</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-1 h-1 rounded-full bg-[#cc9166]"></span>
              <span>Xử lý cục bộ 100%</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-1 h-1 rounded-full bg-[#cc9166]"></span>
              <span>Tra cứu lịch học Offline</span>
            </div>
          </div>
        </div>

        <!-- Right Timetable Showcase -->
        <div class="lg:col-span-6">
          <TimetableSimulator />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import TimetableSimulator from './TimetableSimulator.vue';
</script>

