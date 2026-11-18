<template>
  <section id="features" class="py-20 border-b border-[#e4e4e7] bg-white">
    <div class="container mx-auto max-w-clickup px-4 sm:px-6">
      <motion.div
        :initial="{ opacity: 0, y: 16 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :inViewOptions="{ once: true }"
        :transition="{ duration: 0.45, ease: [0.33, 1, 0.68, 1] }"
        class="max-w-2xl text-left mb-10 sm:mb-12"
      >
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[-0.03em] text-[#090c1d] mb-3 font-display text-balance">
          Tính năng hỗ trợ chuyên sâu
        </h2>
        <p class="text-[#52525b] text-sm sm:text-base leading-relaxed text-pretty">
          Xây dựng xuất phát từ thực tế đăng ký môn học tại Đại học Cần Thơ, giải quyết trọn vẹn từng điểm nghẽn của sinh viên.
        </p>
      </motion.div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        <!-- Feature 1 -->
        <motion.div
          :initial="{ opacity: 0, y: 16 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :inViewOptions="{ once: true }"
          :transition="{ duration: 0.45, delay: 0.05, ease: [0.33, 1, 0.68, 1] }"
          class="clickup-card p-5 sm:p-6 flex flex-col justify-between hover-lift"
        >
          <div>
            <h3 class="text-base sm:text-lg font-bold text-[#18181b] mb-2 font-display text-balance">Tự động tạo và tối ưu thời khóa biểu</h3>
            <p class="text-[#52525b] text-xs sm:text-sm leading-relaxed text-pretty">
              Tự động tính toán các tổ hợp lớp học phần khả thi nhất, giúp bạn tránh hoàn toàn tình trạng trùng giờ môn học và trùng lịch thi kết thúc học phần.
            </p>
          </div>
        </motion.div>

        <!-- Feature 2 -->
        <motion.div
          :initial="{ opacity: 0, y: 16 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :inViewOptions="{ once: true }"
          :transition="{ duration: 0.45, delay: 0.1, ease: [0.33, 1, 0.68, 1] }"
          class="clickup-card p-5 sm:p-6 flex flex-col justify-between hover-lift"
        >
          <div>
            <h3 class="text-base sm:text-lg font-bold text-[#18181b] mb-2 font-display text-balance">Bộ lọc tiêu chí linh hoạt</h3>
            <p class="text-[#52525b] text-xs sm:text-sm leading-relaxed text-pretty">
              Bộ lọc đa chiều: ưu tiên dồn lịch, chỉ học ca sáng hoặc ca chiều, né ngày cuối tuần, đảm bảo thời gian ăn trưa và hạn chế di chuyển giữa các cơ sở (Khu II, Hòa An).
            </p>
          </div>
        </motion.div>

        <!-- Feature 3 -->
        <motion.div
          :initial="{ opacity: 0, y: 16 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :inViewOptions="{ once: true }"
          :transition="{ duration: 0.45, delay: 0.15, ease: [0.33, 1, 0.68, 1] }"
          class="clickup-card p-5 sm:p-6 flex flex-col justify-between hover-lift"
        >
          <div>
            <h3 class="text-base sm:text-lg font-bold text-[#18181b] mb-2 font-display text-balance">Cập nhật biến động sĩ số</h3>
            <p class="text-[#52525b] text-xs sm:text-sm leading-relaxed text-pretty">
              Tự động cập nhật sĩ số của từng lớp học phần trực tiếp từ hệ thống MyCTU. Nhận biết tức thời lớp nào còn chỗ hoặc đã đầy để kịp thời chuyển đổi phương án dự phòng.
            </p>
          </div>
        </motion.div>

        <!-- Feature 4 -->
        <motion.div
          :initial="{ opacity: 0, y: 16 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :inViewOptions="{ once: true }"
          :transition="{ duration: 0.45, delay: 0.2, ease: [0.33, 1, 0.68, 1] }"
          class="clickup-card p-5 sm:p-6 flex flex-col justify-between hover-lift"
        >
          <div>
            <h3 class="text-base sm:text-lg font-bold text-[#18181b] mb-2 font-display text-balance">Quản lý và so sánh nhiều phương án</h3>
            <p class="text-[#52525b] text-xs sm:text-sm leading-relaxed text-pretty">
              Hỗ trợ quản lý, lưu trữ, tải lại và so sánh nhiều bộ thời khóa biểu song song. Sinh viên luôn chủ động sẵn sàng phương án thay thế khi cổng đăng ký mở.
            </p>
          </div>
        </motion.div>

        <!-- Feature 5 (Spans 2 columns, clean borders without colored border-left) -->
        <motion.div
          :initial="{ opacity: 0, y: 16 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :inViewOptions="{ once: true }"
          :transition="{ duration: 0.45, delay: 0.25, ease: [0.33, 1, 0.68, 1] }"
          class="clickup-card p-5 sm:p-6 md:col-span-2 flex flex-col justify-between hover-lift"
        >
          <div>
            <h3 class="text-base sm:text-lg font-bold text-[#18181b] mb-2 font-display text-balance">Bảo mật cục bộ và hỗ trợ xem ngoại tuyến</h3>
            <p class="text-[#52525b] text-xs sm:text-sm leading-relaxed text-pretty">
              Mọi thao tác trích xuất và tính toán đều diễn ra trực tiếp giữa máy tính cá nhân của bạn và hệ thống MyCTU qua giao thức HTTPS bảo mật, không qua máy chủ trung gian. Thông tin tài khoản không bao giờ bị ghi lại. Sinh viên có thể tra cứu lịch học đã lưu mọi lúc mọi nơi ngay cả khi không có kết nối mạng Internet.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { motion } from 'motion-v';
</script>
