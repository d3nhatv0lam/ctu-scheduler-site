<template>
  <section id="certification" class="py-24 dark-bento-section border-y border-[#003b7a]/40 relative">
    <!-- Calm Ambient CTU Deep Navy Radial Wash -->
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,82,156,0.15),rgba(4,13,26,0))] pointer-events-none"></div>

    <div class="container mx-auto max-w-clickup px-4 sm:px-6 relative z-10">
      <!-- Section Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 16 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 450, ease: [0.33, 1, 0.68, 1] } }"
        class="max-w-2xl mx-auto text-center mb-16"
      >
        <h2 class="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-[-0.03em] leading-[1.15] text-white mb-4 font-display text-balance">
          Sức mạnh công nghệ đằng sau từng phương án xếp lịch.
        </h2>
        <p class="text-slate-300 text-base sm:text-lg leading-relaxed font-normal text-pretty">
          Đề tài Nghiên cứu Khoa học Sinh viên được Hội đồng khoa học Khoa Công nghệ Thông tin &amp; Truyền thông — Đại học Cần Thơ chính thức đánh giá xuất sắc và thông qua nghiệm thu.
        </p>
      </div>

      <!-- Bento Grid (Harmonized Deep Navy Layout) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <!-- Bento Item 1: Core Solver Capabilities (7 cols) -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 16 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 450, delay: 50, ease: [0.33, 1, 0.68, 1] } }"
          class="lg:col-span-7 dark-bento-card p-7 sm:p-8 flex flex-col justify-between border border-white/10 hover:border-white/20 transition-colors"
        >
          <div>
            <h3 class="text-2xl font-bold tracking-[-0.025em] leading-snug text-white mb-3 font-display text-balance">
              Thuật toán duyệt tổ hợp &amp; Khử xung đột ma trận
            </h3>
            <p class="text-slate-300 text-sm leading-relaxed mb-6 font-normal text-pretty">
              Thuật toán tự động sinh và kiểm tra hàng chục ngàn nhánh kết hợp giữa các nhóm học phần lý thuyết và thực hành. Đảm bảo triệt tiêu hoàn toàn:
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div class="group p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/15 transition-all duration-200">
                <div class="flex items-center justify-between gap-2 mb-1.5">
                  <div class="flex items-center gap-2.5">
                    <span class="w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                      <i class="fa-solid fa-check text-xs"></i>
                    </span>
                    <span class="font-medium text-slate-100">Khử <strong class="text-white font-semibold tabular-nums">100%</strong> trùng tiết học</span>
                  </div>
                  <span class="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                    Bắt buộc
                  </span>
                </div>
                <p class="text-[11px] text-slate-400 pl-[34px] leading-relaxed font-normal group-hover:text-slate-300 transition-colors">
                  Quét ma trận 10 tiết/ngày, loại bỏ tức thời mọi nhánh xung đột thời gian
                </p>
              </div>

              <div class="group p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/15 transition-all duration-200">
                <div class="flex items-center justify-between gap-2 mb-1.5">
                  <div class="flex items-center gap-2.5">
                    <span class="w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                      <i class="fa-solid fa-check text-xs"></i>
                    </span>
                    <span class="font-medium text-slate-100">Khử <strong class="text-white font-semibold tabular-nums">100%</strong> trùng ngày thi</span>
                  </div>
                  <span class="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                    Bắt buộc
                  </span>
                </div>
                <p class="text-[11px] text-slate-400 pl-[34px] leading-relaxed font-normal group-hover:text-slate-300 transition-colors">
                  Đối chiếu lịch thi kết thúc học phần, ngăn ngừa tuyệt đối trùng ca thi
                </p>
              </div>

              <div class="group p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/15 transition-all duration-200">
                <div class="flex items-center justify-between gap-2 mb-1.5">
                  <div class="flex items-center gap-2.5">
                    <span class="w-6 h-6 rounded-full bg-sky-500/15 text-sky-400 flex items-center justify-center shrink-0">
                      <i class="fa-solid fa-check text-xs"></i>
                    </span>
                    <span class="font-medium text-slate-100">Tránh đổi cơ sở cùng buổi</span>
                  </div>
                  <span class="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/20 shrink-0">
                    Tối ưu
                  </span>
                </div>
                <p class="text-[11px] text-slate-400 pl-[34px] leading-relaxed font-normal group-hover:text-slate-300 transition-colors">
                  Tối ưu hành trình, tránh phải di chuyển giữa Khu 2 và Hòa An trong nửa ngày
                </p>
              </div>

              <div class="group p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/15 transition-all duration-200">
                <div class="flex items-center justify-between gap-2 mb-1.5">
                  <div class="flex items-center gap-2.5">
                    <span class="w-6 h-6 rounded-full bg-sky-500/15 text-sky-400 flex items-center justify-center shrink-0">
                      <i class="fa-solid fa-check text-xs"></i>
                    </span>
                    <span class="font-medium text-slate-100">Cố định giờ nghỉ trưa</span>
                  </div>
                  <span class="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/20 shrink-0">
                    Tối ưu
                  </span>
                </div>
                <p class="text-[11px] text-slate-400 pl-[34px] leading-relaxed font-normal group-hover:text-slate-300 transition-colors">
                  Bảo lưu khoảng trống 11h00 – 13h00 để sinh viên ăn uống và nghỉ ngơi
                </p>
              </div>
            </div>
          </div>

          <div class="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <span class="text-slate-400">Đã kiểm nghiệm thực tế qua nhiều học kỳ tại ĐH Cần Thơ</span>
            <span class="text-emerald-400 font-semibold tracking-wide uppercase text-[11px] flex items-center gap-1.5 self-start sm:self-auto">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Nghiệm thu chính thức
            </span>
          </div>
        </div>

        <!-- Bento Item 2: Document Certification Preview (5 cols) -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 16 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 450, delay: 120, ease: [0.33, 1, 0.68, 1] } }"
          class="lg:col-span-5 dark-bento-card p-7 sm:p-8 flex flex-col justify-between border border-white/10 hover:border-white/20 transition-colors"
        >
          <div>
            <h3 class="text-xl font-bold tracking-[-0.02em] leading-snug text-white mb-2 font-display text-balance">
              Chứng Nhận Khoa CNTT&amp;TT
            </h3>
            <p class="text-slate-300 text-xs leading-relaxed mb-4 font-normal text-pretty">
              Hội đồng khoa học Khoa Công nghệ Thông tin &amp; Truyền thông thẩm định và thông qua tính ứng dụng cao.
            </p>

            <div class="flex justify-center my-3">
              <a
                href="/assets/images/02_TB Cong nghe va CNTT_SV_Bien ban_duoc duyet-images-48.webp"
                target="_blank"
                rel="noopener noreferrer"
                class="group relative block rounded-xl overflow-hidden border border-white/10 bg-white/[0.02] p-2 shadow-lg hover:border-white/25 transition-all"
                title="Bấm để xem văn bản nghiệm thu kích thước lớn"
              >
                <img
                  src="/assets/images/02_TB Cong nghe va CNTT_SV_Bien ban_duoc duyet-images-48.webp"
                  alt="Biên bản nghiệm thu đề tài NCKH CTU Scheduler"
                  class="max-w-[200px] sm:max-w-[220px] object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-[#040d1a]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center p-3 text-center backdrop-blur-xs">
                  <div class="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center mb-2 border border-white/20">
                    <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                  </div>
                  <span class="text-xs font-semibold text-white">Xem toàn văn quyết định</span>
                  <span class="text-[10px] text-slate-300 mt-0.5 font-medium">Biên bản số 02/TB-CN&amp;CNTT-SV</span>
                </div>
              </a>
            </div>
          </div>

          <div class="mt-4 pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-slate-300">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
            <span>Xếp loại: <strong class="text-white font-medium">Xuất sắc</strong> <span class="text-slate-500">•</span> Khoa CNTT&amp;TT — ĐH Cần Thơ</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
