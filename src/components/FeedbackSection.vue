<template>
  <section id="feedback" class="py-20 border-b border-[#e4e4e7] bg-white">
    <div class="container mx-auto max-w-4xl px-4 sm:px-6">
      <div
        v-motion
        :initial="{ opacity: 0, scale: 0.96 }"
        :visibleOnce="{ opacity: 1, scale: 1, transition: { duration: 450, ease: [0.33, 1, 0.68, 1] } }"
        class="clickup-card-elevated text-center p-8 sm:p-12 space-y-4 bg-white border border-[#e4e4e7] shadow-card hover-lift"
      >
        <h2 class="text-2xl sm:text-3xl font-extrabold text-[#090c1d] font-display">
          Bạn gặp sự cố hoặc có ý tưởng cải tiến?
        </h2>
        <p class="text-[#52525b] text-base max-w-xl mx-auto leading-relaxed">
          Mọi phản hồi và đóng góp từ các bạn sinh viên CTU là động lực để đội ngũ hoàn thiện thuật toán xếp lịch và mang lại trải nghiệm tối ưu nhất.
        </p>
        <div class="pt-3 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfjU3UmQCetqDPxXowysP-OyfJc_QOscjXvdLepzJszug5u7w/viewform"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-clickup-primary !px-7 !py-3"
          >
            <span>Gửi Phản Hồi Qua Biểu Mẫu</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <a
            href="https://github.com/d3nhatv0lam/CTU-Scheduler/issues"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-clickup-ghost !px-6 !py-3"
          >
            <i class="fa-brands fa-github text-sm"></i>
            <span>Báo Lỗi Trên GitHub Issues</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
