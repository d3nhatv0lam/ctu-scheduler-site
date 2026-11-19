<template>
  <section id="feedback" class="scroll-mt-16 py-20 border-b border-[#e4e4e7] bg-white">
    <div class="container mx-auto max-w-4xl px-4 sm:px-6">
      <motion.div
        :initial="{ opacity: 0, scale: 0.96 }"
        :whileInView="{ opacity: 1, scale: 1 }"
        :inViewOptions="{ once: true }"
        :transition="{ duration: 0.45, ease: [0.33, 1, 0.68, 1] }"
        class="clickup-card-elevated text-center p-6 sm:p-12 space-y-4 bg-white border border-[#e4e4e7] shadow-card hover-lift"
      >
        <h2 class="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#090c1d] font-display text-balance">
          Bạn gặp sự cố hoặc có ý tưởng cải tiến?
        </h2>
        <p class="text-[#52525b] text-sm sm:text-base max-w-xl mx-auto leading-relaxed text-pretty">
          Mọi phản hồi và đóng góp từ các bạn sinh viên CTU là động lực để đội ngũ hoàn thiện thuật toán xếp lịch và mang lại trải nghiệm tối ưu nhất.
        </p>
        <div class="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md sm:max-w-none mx-auto">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfjU3UmQCetqDPxXowysP-OyfJc_QOscjXvdLepzJszug5u7w/viewform"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-clickup-primary w-full sm:w-auto justify-center !px-6 !py-3 !text-xs sm:!text-sm whitespace-nowrap flex items-center gap-2"
          >
            <span>Gửi Phản Hồi Qua Biểu Mẫu</span>
            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <a
            href="https://github.com/d3nhatv0lam/CTU-Scheduler/issues"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-clickup-ghost w-full sm:w-auto justify-center !px-6 !py-3 !text-xs sm:!text-sm whitespace-nowrap flex items-center gap-2"
          >
            <i class="fa-brands fa-github text-sm shrink-0"></i>
            <span>Báo Lỗi Trên GitHub Issues</span>
          </a>
        </div>
      </motion.div>
    </div>
  </section>
</template>

<script setup>
import { motion } from 'motion-v';
</script>
