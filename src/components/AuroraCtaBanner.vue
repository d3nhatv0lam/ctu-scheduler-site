<template>
  <section class="py-16 md:py-24 bg-white overflow-hidden">
    <div class="container mx-auto max-w-clickup px-4 sm:px-6">
      <div
        v-motion
        :initial="{ opacity: 0, scale: 0.96 }"
        :visibleOnce="{ opacity: 1, scale: 1, transition: { duration: 500, ease: [0.33, 1, 0.68, 1] } }"
        class="aurora-cta-banner p-8 sm:p-14 md:p-16 text-center text-white relative hover-lift"
      >
        <div class="relative z-10 max-w-3xl mx-auto space-y-6">
          <div class="w-14 h-14 mx-auto rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-lg border border-white/30">
            <img src="/assets/images/icon.svg" class="w-8 h-8" alt="CTU Scheduler" />
          </div>

          <h2 class="text-3xl sm:text-5xl font-extrabold tracking-[-0.035em] leading-tight font-display text-white">
            Xếp lịch học tự động, giải phóng áp lực học kỳ.
          </h2>

          <p class="text-white/90 text-base sm:text-lg max-w-xl mx-auto font-medium leading-relaxed">
            Hàng ngàn sinh viên Đại học Cần Thơ đã tối ưu hóa thời khóa biểu thành công. Tải về và trải nghiệm hoàn toàn miễn phí ngay hôm nay.
          </p>

          <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#download"
              class="px-8 py-3.5 rounded-full bg-white text-[#003b7a] font-extrabold text-sm shadow-xl hover:bg-[#f8f9fa] hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <span>Tải Phần Mềm Miễn Phí</span>
            </a>
            <a
              href="https://github.com/d3nhatv0lam/CTU-Scheduler"
              target="_blank"
              rel="noopener noreferrer"
              class="px-7 py-3.5 rounded-full bg-black/25 backdrop-blur-md text-white border border-white/30 font-bold text-sm hover:bg-black/40 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <span>Kho Mã Nguồn GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
