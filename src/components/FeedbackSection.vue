<template>
  <section id="feedback" class="py-20 border-b border-[#e8e8e8] bg-white">
    <div class="container mx-auto max-w-4xl px-4 sm:px-6">
      <div
        v-motion
        :initial="{ opacity: 0, scale: 0.96 }"
        :visibleOnce="{ opacity: 1, scale: 1, transition: { duration: 450, ease: [0.33, 1, 0.68, 1] } }"
        class="clickup-card-elevated text-center p-8 sm:p-12 space-y-4 bg-white border border-[#e8e8e8] shadow-card"
      >
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f5f3ff] text-[#6647f0] border border-[#ddd6fe] text-xs font-bold tracking-wider uppercase">
          <span class="w-1.5 h-1.5 rounded-full bg-[#6647f0]"></span>
          Góp Ý &amp; Báo Cáo Sự Cố
        </div>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-[#090c1d] font-display">
          Bạn gặp sự cố hoặc có ý tưởng cải tiến?
        </h2>
        <p class="text-[#646464] text-base max-w-xl mx-auto leading-relaxed">
          Mọi phản hồi và đóng góp từ các bạn sinh viên CTU là động lực để đội ngũ hoàn thiện thuật toán xếp lịch và mang lại trải nghiệm tối ưu nhất.
        </p>
        <div class="pt-3">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfjU3UmQCetqDPxXowysP-OyfJc_QOscjXvdLepzJszug5u7w/viewform"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-clickup-primary !px-8 !py-3"
          >
            <span>Gửi Phản Hồi Qua Biểu Mẫu</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
