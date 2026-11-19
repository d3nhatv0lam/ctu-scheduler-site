<template>
  <section
    id="ecosystem"
    class="scroll-mt-16 py-20 md:py-24 border-b border-[#e4e4e7] bg-[#f8f9fa]/60"
  >
    <div class="container mx-auto max-w-clickup px-4 sm:px-6">
      <!-- Section Header -->
      <motion.div
        :initial="{ opacity: 0, y: 16 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :inViewOptions="{ once: true }"
        :transition="{ duration: 0.45, ease: [0.33, 1, 0.68, 1] }"
        class="max-w-2xl text-left mb-10 sm:mb-12"
      >
        <h2
          class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[-0.03em] text-[#090c1d] mb-3 font-display text-balance"
        >
          Hệ sinh thái CTU Student's Tools
        </h2>
        <p
          class="text-[#52525b] text-sm sm:text-base leading-relaxed text-pretty"
        >
          Bộ công cụ đồng hành do sinh viên ĐH Cần Thơ phát triển, phục vụ trọn
          vẹn lộ trình học tập từ tuyển sinh, tính điểm học phần đến xét học
          bổng.
        </p>
      </motion.div>

      <!-- Unified Architecture Card (Zero Nested Cards, Uniform Palette, Typographic Air) -->
      <motion.div
        :initial="{ opacity: 0, y: 16 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :inViewOptions="{ once: true }"
        :transition="{ duration: 0.45, delay: 0.08, ease: [0.33, 1, 0.68, 1] }"
        class="clickup-card-elevated bg-white border border-[#e4e4e7] overflow-hidden"
      >
        <!-- Top Identity & Header Row -->
        <div
          class="p-6 sm:p-8 border-b border-[#e4e4e7] flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div class="space-y-2 max-w-2xl">
            <h3
              class="text-xl sm:text-2xl font-bold text-[#090c1d] font-display"
            >
              CTUST – Tiện ích học tập toàn diện cho sinh viên CTU
            </h3>
            <p class="text-xs sm:text-sm text-[#52525b] leading-relaxed">
              Tích hợp các thuật toán chuẩn hóa điểm số theo quy chế đào tạo tín
              chỉ và đề án tuyển sinh của Đại học Cần Thơ, hoạt động hoàn toàn
              trên trình duyệt mà không yêu cầu tài khoản.
            </p>
          </div>

          <div
            class="flex items-center gap-2.5 shrink-0 self-start md:self-center"
          >
            <a
              href="https://ctust.pages.dev/"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-clickup-primary !py-2.5 !px-5 !text-xs whitespace-nowrap flex items-center gap-1.5"
            >
              <span>Truy Cập CTUST</span>
              <svg
                class="w-3.5 h-3.5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </div>

        <!-- 4 Core Capabilities (Hairline Divided Grid – No Nested Cards, No Rainbow Badges) -->
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#e4e4e7] bg-white"
        >
          <!-- Item 1: V-SAT -->
          <div
            class="p-6 sm:p-7 space-y-2 hover:bg-[#f8f9fa]/50 transition-colors"
          >
            <h4
              class="text-sm sm:text-base font-bold text-[#18181b] font-display"
            >
              Quy Đổi Điểm V-SAT
            </h4>
            <p class="text-xs text-[#52525b] leading-relaxed">
              Đối sánh và chuẩn hóa kết quả thi đánh giá năng lực V-SAT sang
              thang 30 theo công thức tuyển sinh chính thức của trường.
            </p>
          </div>

          <!-- Item 2: Học bạ -->
          <div
            class="p-6 sm:p-7 space-y-2 hover:bg-[#f8f9fa]/50 transition-colors"
          >
            <h4
              class="text-sm sm:text-base font-bold text-[#18181b] font-display"
            >
              Tính Điểm Học Bạ
            </h4>
            <p class="text-xs text-[#52525b] leading-relaxed">
              Tính điểm tổ hợp 3 môn lớp 12, tự động tích hợp điểm ưu tiên khu
              vực (KV1, KV2, KV2-NT) và đối tượng chính sách.
            </p>
          </div>

          <!-- Item 3: GPA / CPA -->
          <div
            class="p-6 sm:p-7 space-y-2 hover:bg-[#f8f9fa]/50 transition-colors"
          >
            <h4
              class="text-sm sm:text-base font-bold text-[#18181b] font-display"
            >
              Quản Lý Điểm GPA
            </h4>
            <p class="text-xs text-[#52525b] leading-relaxed">
              Bảng điểm theo trọng số tín chỉ, tính CPA tích lũy toàn khóa, dự
              báo cải thiện và phát hiện sớm nguy cơ học vụ.
            </p>
          </div>

          <!-- Item 4: Học bổng -->
          <div
            class="p-6 sm:p-7 space-y-2 hover:bg-[#f8f9fa]/50 transition-colors"
          >
            <h4
              class="text-sm sm:text-base font-bold text-[#18181b] font-display"
            >
              Ước Tính Học Bổng
            </h4>
            <p class="text-xs text-[#52525b] leading-relaxed">
              Tự động phân hạng Xuất sắc / Giỏi theo quy chế đào tạo dựa trên tổ
              hợp GPA học kỳ và Điểm rèn luyện.
            </p>
          </div>
        </div>

        <!-- Quiet Bottom Metadata Bar -->
        <div
          class="px-6 py-3.5 bg-[#f8f9fa] border-t border-[#e4e4e7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#71717a]"
        >
          <div class="flex items-center gap-2">
            <span
              >Xử lý cục bộ tại trình duyệt · Không thu thập dữ liệu cá nhân ·
              Miễn phí phi lợi nhuận</span
            >
          </div>
          <a
            href="https://ctust.pages.dev/"
            target="_blank"
            rel="noopener noreferrer"
            class="font-semibold text-[#00529c] hover:underline"
          >
            ctust.pages.dev
          </a>
        </div>
      </motion.div>
    </div>
  </section>
</template>

<script setup>
import { motion } from "motion-v";
</script>
