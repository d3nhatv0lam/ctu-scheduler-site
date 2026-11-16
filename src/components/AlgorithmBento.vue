<template>
  <section id="certification" class="py-24 dark-bento-section">
    <!-- Ambient Neon Violet & Blue Glows in Dark Background -->
    <div class="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#6647f0]/15 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#0091ff]/15 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="container mx-auto max-w-clickup px-4 sm:px-6 relative z-10">
      <!-- Section Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 450, ease: [0.33, 1, 0.68, 1] } }"
        class="max-w-3xl mx-auto text-center mb-16"
      >
        <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#6ee7b7] border border-white/15 text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur-md">
          <span class="w-2 h-2 rounded-full bg-[#00c07a] animate-pulse"></span>
          Bảo Chứng Học Thuật &amp; Thuật Toán Đột Phá
        </div>
        <h2 class="text-3xl sm:text-5xl font-extrabold tracking-[-0.035em] text-white mb-4 font-display">
          Sức mạnh công nghệ đằng sau từng phương án xếp lịch.
        </h2>
        <p class="text-[#acafb9] text-base sm:text-lg leading-relaxed">
          Đề tài Nghiên cứu Khoa học Sinh viên được Hội đồng khoa học Khoa Công nghệ Thông tin &amp; Truyền thông — Đại học Cần Thơ chính thức đánh giá xuất sắc và thông qua nghiệm thu.
        </p>
      </div>

      <!-- Bento Grid (Dark Inverted Layout) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <!-- Bento Item 1: Core Solver Capabilities (7 cols) -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 450, delay: 50, ease: [0.33, 1, 0.68, 1] } }"
          class="lg:col-span-7 dark-bento-card p-8 flex flex-col justify-between"
        >
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6647f0]/20 text-[#c4b5fd] border border-[#6647f0]/30 text-xs font-bold mb-5">
              <span>ĐỘ CHÍNH XÁC 100%</span>
            </div>
            <h3 class="text-2xl font-bold text-white mb-3 font-display">
              Thuật toán duyệt tổ hợp &amp; Khử xung đột ma trận
            </h3>
            <p class="text-[#acafb9] text-sm leading-relaxed mb-6">
              Thuật toán tự động sinh và kiểm tra hàng chục ngàn nhánh kết hợp giữa các nhóm học phần lý thuyết và thực hành. Đảm bảo triệt tiêu hoàn toàn:
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-white">
              <div class="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                <span class="w-6 h-6 rounded-full bg-[#00c07a]/20 text-[#00c07a] flex items-center justify-center shrink-0">
                  <i class="fa-solid fa-check text-xs"></i>
                </span>
                <span>Khử 100% trùng tiết học</span>
              </div>
              <div class="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                <span class="w-6 h-6 rounded-full bg-[#00c07a]/20 text-[#00c07a] flex items-center justify-center shrink-0">
                  <i class="fa-solid fa-check text-xs"></i>
                </span>
                <span>Khử 100% trùng ngày thi kết thúc</span>
              </div>
              <div class="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                <span class="w-6 h-6 rounded-full bg-[#0091ff]/20 text-[#0091ff] flex items-center justify-center shrink-0">
                  <i class="fa-solid fa-check text-xs"></i>
                </span>
                <span>Tránh đổi cơ sở trong cùng 1 buổi</span>
              </div>
              <div class="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                <span class="w-6 h-6 rounded-full bg-[#0091ff]/20 text-[#0091ff] flex items-center justify-center shrink-0">
                  <i class="fa-solid fa-check text-xs"></i>
                </span>
                <span>Cố định giờ nghỉ trưa &amp; ăn uống</span>
              </div>
            </div>
          </div>

          <div class="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-[#9194a1]">
            <span>Đã kiểm nghiệm thực tế qua nhiều học kỳ tại ĐH Cần Thơ</span>
            <span class="text-[#6ee7b7] font-bold">Nghiệm thu chính thức</span>
          </div>
        </div>

        <!-- Bento Item 2: Document Certification Preview (5 cols) -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 450, delay: 150, ease: [0.33, 1, 0.68, 1] } }"
          class="lg:col-span-5 dark-bento-card p-8 flex flex-col justify-between"
        >
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00c07a]/20 text-[#6ee7b7] border border-[#00c07a]/30 text-xs font-bold mb-4">
              <span>BIÊN BẢN NGHIỆM THU NCKH</span>
            </div>
            <h3 class="text-xl font-bold text-white mb-2 font-display">
              Chứng Nhận Khoa CNTT&amp;TT
            </h3>
            <p class="text-[#acafb9] text-xs leading-relaxed mb-4">
              Hội đồng khoa học Khoa Công nghệ Thông tin &amp; Truyền thông thẩm định và thông qua tính ứng dụng cao.
            </p>

            <div class="flex justify-center my-3">
              <a
                href="/assets/images/02_TB Cong nghe va CNTT_SV_Bien ban_duoc duyet-images-48.webp"
                target="_blank"
                rel="noopener noreferrer"
                class="group block rounded-xl overflow-hidden border border-white/20 bg-white/5 p-2 shadow-2xl hover:border-[#6647f0] transition-all"
                title="Bấm để xem văn bản nghiệm thu kích thước lớn"
              >
                <img
                  src="/assets/images/02_TB Cong nghe va CNTT_SV_Bien ban_duoc duyet-images-48.webp"
                  alt="Biên bản nghiệm thu đề tài NCKH CTU Scheduler"
                  class="max-w-[200px] sm:max-w-[220px] object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </a>
            </div>
          </div>

          <div class="mt-4 text-center">
            <span class="text-xs text-[#9194a1]">Biên bản nghiệm thu đề tài NCKH Sinh viên cấp Khoa</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

