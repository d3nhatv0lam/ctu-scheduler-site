<template>
  <section class="py-16 md:py-24 bg-white overflow-hidden">
    <div class="container mx-auto max-w-clickup px-4 sm:px-6">
      <motion.div
        :initial="{ opacity: 0, scale: 0.96 }"
        :whileInView="{ opacity: 1, scale: 1 }"
        :inViewOptions="{ once: true }"
        :transition="{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }"
        class="aurora-cta-banner p-6 sm:p-12 md:p-16 text-center text-white relative hover-lift"
      >
        <div class="relative z-10 max-w-3xl mx-auto space-y-5 sm:space-y-6">
          <div class="w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl sm:text-2xl shadow-lg border border-white/30">
            <img src="/assets/images/icon.svg" class="w-7 h-7 sm:w-8 sm:h-8" alt="CTU Scheduler" />
          </div>

          <h2 class="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.035em] leading-tight font-display text-white text-balance">
            Xếp lịch học tự động, giải phóng áp lực học kỳ.
          </h2>

          <p class="text-white/90 text-sm sm:text-base md:text-lg max-w-xl mx-auto font-medium leading-relaxed text-pretty">
            Hàng ngàn sinh viên Đại học Cần Thơ đã tối ưu hóa thời khóa biểu thành công. Tải về và trải nghiệm hoàn toàn miễn phí ngay hôm nay.
          </p>

          <div class="pt-3 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-sm sm:max-w-none mx-auto">
            <a
              href="#download"
              class="w-full sm:w-auto px-7 sm:px-8 py-3.5 rounded-full bg-white text-[#003b7a] font-extrabold text-xs sm:text-sm shadow-xl hover:bg-[#f8f9fa] transition-colors duration-200 text-center justify-center whitespace-nowrap"
            >
              <span>Tải Phần Mềm Miễn Phí</span>
            </a>
            <a
              href="https://github.com/d3nhatv0lam/CTU-Scheduler"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full sm:w-auto px-6 sm:px-7 py-3.5 rounded-full bg-black/25 backdrop-blur-md text-white border border-white/30 font-bold text-xs sm:text-sm hover:bg-black/40 transition-colors duration-200 text-center justify-center whitespace-nowrap"
            >
              <span>Kho Mã Nguồn GitHub</span>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
</template>

<script setup>
import { motion } from 'motion-v';
</script>
