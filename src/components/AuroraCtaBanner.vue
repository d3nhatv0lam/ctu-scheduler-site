<template>
  <section class="py-16 md:py-20 bg-white">
    <div class="container mx-auto max-w-clickup px-4 sm:px-6">
      <motion.div
        :initial="{ opacity: 0, y: 16 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :inViewOptions="{ once: true }"
        :transition="{ duration: 0.45, ease: [0.33, 1, 0.68, 1] }"
        class="rounded-2xl sm:rounded-3xl bg-[#003b7a] text-white p-8 sm:p-12 md:p-14 text-center relative overflow-hidden shadow-card"
      >
        <div class="relative z-10 max-w-2xl mx-auto space-y-4 sm:space-y-5">
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-[-0.03em] font-display text-white text-balance leading-tight">
            Sẵn sàng tối ưu thời khóa biểu của bạn?
          </h2>

          <p class="text-white/80 text-sm sm:text-base leading-relaxed text-pretty max-w-xl mx-auto">
            Tự động hóa hoàn toàn việc xếp lịch học, loại bỏ nguy cơ trùng tiết và chủ động chọn phương án tốt nhất cho học kỳ mới.
          </p>

          <div class="pt-2 sm:pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#download"
              class="w-full sm:w-auto px-7 py-3 rounded-full bg-white text-[#003b7a] font-bold text-xs sm:text-sm hover:bg-[#f8f9fa] shadow-sm transition-colors duration-150 text-center whitespace-nowrap flex items-center justify-center gap-2"
            >
              <span>Tải Phần Mềm Miễn Phí</span>
              <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>

          <p class="text-[11px] sm:text-xs text-white/60 tracking-wide pt-1">
            Hỗ trợ Windows, macOS &amp; Linux · Miễn phí &amp; Mã nguồn mở MIT
          </p>
        </div>
      </motion.div>
    </div>
  </section>
</template>

<script setup>
import { motion } from 'motion-v';
</script>
