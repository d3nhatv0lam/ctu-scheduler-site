<template>
  <section id="certification" class="py-20 bg-plaster-band">
    <div class="container mx-auto max-w-clickup px-4 sm:px-6">
      <div
        v-motion
        :initial="{ opacity: 0, y: 24 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 500, ease: [0.33, 1, 0.68, 1] } }"
        class="clickup-card-elevated !p-0 overflow-hidden bg-white border border-[#e8e8e8] shadow-card"
      >
        <div class="flex flex-col lg:flex-row items-stretch">
          <!-- Left Text Details -->
          <div class="p-8 sm:p-12 lg:w-3/5 flex flex-col justify-center space-y-5">
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ecfdf5] text-[#00c07a] border border-[#a7f3d0] text-xs font-bold tracking-wider uppercase w-fit">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
              </svg>
              Bảo Chứng Học Thuật Chính Thức
            </div>

            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#090c1d] tracking-[-0.03em] leading-snug font-display">
              Nghiệm thu đề tài Nghiên cứu Khoa học Sinh viên
            </h2>

            <p class="text-[#202020] text-base leading-relaxed font-medium">
              CTU Scheduler là đề tài nghiên cứu khoa học sinh viên được Hội đồng khoa học Khoa Công nghệ Thông tin &amp; Truyền thông - Đại học Cần Thơ chính thức đánh giá cao, nghiệm thu và thông qua.
            </p>

            <p class="text-[#646464] text-sm leading-relaxed">
              Sự thẩm định nghiêm ngặt từ các giảng viên chuyên môn là minh chứng rõ rệt cho tính chính xác của thuật toán xếp lịch và mức độ bảo mật dữ liệu phục vụ trực tiếp cộng đồng sinh viên trường.
            </p>

            <div class="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-[#646464]">
              <div class="flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-[#00c07a]"></span>
                <span>Hội đồng Khoa CNTT&amp;TT nghiệm thu</span>
              </div>
              <div class="flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-[#0091ff]"></span>
                <span>Mã nguồn mở phi thương mại</span>
              </div>
            </div>
          </div>

          <!-- Right Document Preview -->
          <div class="lg:w-2/5 bg-[#f8f9fa] p-8 flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-l border-[#e8e8e8]">
            <a
              href="/assets/images/02_TB Cong nghe va CNTT_SV_Bien ban_duoc duyet-images-48.webp"
              target="_blank"
              rel="noopener noreferrer"
              class="group block rounded-xl overflow-hidden border border-[#d4d4d4] shadow-subtle hover:shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6647f0] transition-all bg-white p-2"
              title="Xem biên bản nghiệm thu kích thước đầy đủ"
            >
              <img
                src="/assets/images/02_TB Cong nghe va CNTT_SV_Bien ban_duoc duyet-images-48.webp"
                alt="Biên bản nghiệm thu đề tài NCKH CTU Scheduler"
                class="max-w-[240px] sm:max-w-xs object-cover rounded-lg group-hover:scale-[1.02] transition-transform duration-300"
                loading="lazy"
              />
            </a>
            <span class="text-xs text-[#838383] mt-3 text-center font-medium">
              Biên bản nghiệm thu đề tài NCKH cấp Khoa CNTT&amp;TT
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
