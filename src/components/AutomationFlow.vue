<template>
  <section class="py-20 bg-plaster-band border-b border-[#e4e4e7]">
    <div class="container mx-auto max-w-clickup px-4 sm:px-6">
      <motion.div
        :initial="{ opacity: 0, y: 16 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :inViewOptions="{ once: true }"
        :transition="{ duration: 0.45, ease: [0.33, 1, 0.68, 1] }"
        class="max-w-3xl mx-auto text-center mb-14"
      >
        <h2
          class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[-0.035em] text-[#090c1d] mb-3.5 font-display text-balance"
        >
          Từ cổng MyCTU đến lịch học tối ưu cho bạn.
        </h2>
        <p class="text-[#52525b] text-sm sm:text-base leading-relaxed text-pretty">
          Dữ liệu học phần được kết nối trực tiếp qua HTTPS và xử lý ngay trên
          máy tính của bạn, không gửi thông tin qua máy chủ trung gian.
        </p>
      </motion.div>

      <!-- 3-Stage Diagram Flow -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 relative">
        <!-- Stage 1 -->
        <motion.div
          :initial="{ opacity: 0, y: 16 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :inViewOptions="{ once: true }"
          :transition="{ duration: 0.45, delay: 0.05, ease: [0.33, 1, 0.68, 1] }"
          class="clickup-card p-5 sm:p-7 relative flex flex-col justify-between hover-lift"
        >
          <div>
            <div
              class="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#f0f7ff] text-[#00529c] border border-[#bae0fd] flex items-center justify-center text-lg sm:text-xl mb-4 sm:mb-5 shadow-2xs"
            >
              <i class="fa-solid fa-cloud-arrow-down" aria-hidden="true"></i>
            </div>
            <h3 class="text-base sm:text-lg font-bold text-[#18181b] mb-2 font-display text-balance">
              Trích xuất dữ liệu MyCTU
            </h3>
            <p class="text-[#52525b] text-xs sm:text-sm leading-relaxed text-pretty">
              Kết nối an toàn trực tiếp đến cổng thông tin MyCTU qua HTTPS để lấy
              danh sách lớp học phần, phòng học và sĩ số mới nhất từ hệ thống của
              trường.
            </p>
          </div>
          <div
            class="mt-6 pt-4 border-t border-[#e4e4e7] text-xs font-semibold text-[#00c07a] flex items-center gap-2"
          >
            <span class="w-2 h-2 rounded-full bg-[#00c07a] shrink-0"></span>
            <span class="text-[11px] sm:text-xs">Xử lý trên RAM · Không lưu tài khoản</span>
          </div>
        </motion.div>

        <!-- Stage 2 -->
        <motion.div
          :initial="{ opacity: 0, y: 16 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :inViewOptions="{ once: true }"
          :transition="{ duration: 0.45, delay: 0.12, ease: [0.33, 1, 0.68, 1] }"
          class="clickup-card p-5 sm:p-7 relative flex flex-col justify-between hover-lift"
        >
          <div>
            <div
              class="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#f0f7ff] text-[#00529c] border border-[#bae0fd] flex items-center justify-center text-lg sm:text-xl mb-4 sm:mb-5 shadow-2xs"
            >
              <i class="fa-solid fa-microchip" aria-hidden="true"></i>
            </div>
            <h3 class="text-base sm:text-lg font-bold text-[#18181b] mb-2 font-display text-balance">
              Thuật toán xếp lịch thông minh
            </h3>
            <p class="text-[#52525b] text-xs sm:text-sm leading-relaxed text-pretty">
              Tự động tìm kiếm và loại bỏ các phương án bị trùng giờ học hoặc trùng
              lịch thi, sắp xếp thời khóa biểu theo đúng nguyện vọng và thời gian
              biểu của bạn.
            </p>
          </div>
          <div
            class="mt-6 pt-4 border-t border-[#e4e4e7] text-xs font-semibold text-[#00529c] flex items-center gap-2"
          >
            <span class="w-2 h-2 rounded-full bg-[#00529c] shrink-0"></span>
            <span class="text-[11px] sm:text-xs">Tính toán &amp; phản hồi trong tích tắc</span>
          </div>
        </motion.div>

        <!-- Stage 3 -->
        <motion.div
          :initial="{ opacity: 0, y: 16 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :inViewOptions="{ once: true }"
          :transition="{ duration: 0.45, delay: 0.18, ease: [0.33, 1, 0.68, 1] }"
          class="clickup-card p-5 sm:p-7 relative flex flex-col justify-between hover-lift"
        >
          <div>
            <div
              class="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#ecfdf5] text-[#00c07a] border border-[#a7f3d0] flex items-center justify-center text-lg sm:text-xl mb-4 sm:mb-5 shadow-2xs"
            >
              <i class="fa-solid fa-file-export" aria-hidden="true"></i>
            </div>
            <h3 class="text-base sm:text-lg font-bold text-[#18181b] mb-2 font-display text-balance">
              Xuất file &amp; Chia sẻ nhanh chóng
            </h3>
            <p class="text-[#52525b] text-xs sm:text-sm leading-relaxed text-pretty">
              Sao chép ảnh thời khóa biểu vào bộ nhớ tạm (Ctrl + V dán gửi ngay cho
              bạn bè), xuất bảng tính Excel (.xlsx) chi tiết hoặc lưu file sao lưu
              (.json) để mở lại bất cứ lúc nào.
            </p>
          </div>
          <div
            class="mt-6 pt-4 border-t border-[#e4e4e7] text-xs font-semibold text-[#00529c] flex items-center gap-2"
          >
            <span class="w-2 h-2 rounded-full bg-[#00529c] shrink-0"></span>
            <span class="text-[11px] sm:text-xs">Ảnh dán nhanh, bảng tính Excel &amp; File sao lưu</span>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { motion } from 'motion-v';
</script>
