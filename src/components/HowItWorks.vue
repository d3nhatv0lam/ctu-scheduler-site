<template>
  <section id="how-it-works" class="py-20 bg-plaster-band">
    <div class="container mx-auto max-w-clickup px-4 sm:px-6">
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 450, ease: [0.33, 1, 0.68, 1] } }"
        class="max-w-2xl text-left mb-12"
      >
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#e8e8e8] text-[#6647f0] text-xs font-bold tracking-wider uppercase mb-3">
          <span class="w-1.5 h-1.5 rounded-full bg-[#6647f0]"></span>
          Quy Trình 3 Bước
        </div>
        <h2 class="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#090c1d] mb-3 font-display">
          Cách thức hoạt động thông minh
        </h2>
        <p class="text-[#646464] text-base leading-relaxed">
          Quy trình tự động hóa khép kín, loại bỏ hoàn toàn việc dò tìm mã lớp thủ công trên giấy hoặc bảng tính Excel rời rạc.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Step 1 -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 450, delay: 50, ease: [0.33, 1, 0.68, 1] } }"
          class="clickup-card p-6 flex flex-col justify-between"
        >
          <div>
            <div class="w-10 h-10 rounded-full bg-[#f5f3ff] text-[#6647f0] border border-[#ddd6fe] flex items-center justify-center font-extrabold text-sm mb-4 font-display">
              01
            </div>
            <h3 class="text-lg font-bold text-[#202020] mb-2 font-display">Khởi chạy trực tiếp cục bộ</h3>
            <p class="text-[#646464] text-sm leading-relaxed">
              Mở ứng dụng trên máy tính của bạn, không cần cài đặt rườm rà. Dữ liệu xử lý an toàn và cục bộ 100%, không gửi thông tin sinh viên lên máy chủ trung gian.
            </p>
          </div>
          <div class="mt-6 pt-4 border-t border-[#e8e8e8] flex items-center gap-2 text-xs text-[#0091ff] font-semibold">
            <span>Sẵn sàng Portable</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>

        <!-- Step 2 -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 450, delay: 150, ease: [0.33, 1, 0.68, 1] } }"
          class="clickup-card p-6 flex flex-col justify-between"
        >
          <div>
            <div class="w-10 h-10 rounded-full bg-[#e6f4ff] text-[#0091ff] border border-[#b3e0ff] flex items-center justify-center font-extrabold text-sm mb-4 font-display">
              02
            </div>
            <h3 class="text-lg font-bold text-[#202020] mb-2 font-display">Thiết lập bộ lọc cá nhân</h3>
            <p class="text-[#646464] text-sm leading-relaxed">
              Tùy chỉnh linh hoạt: ưu tiên né ca sáng, đảm bảo giờ nghỉ trưa, dồn lịch đầu tuần để đi làm thêm, tránh đổi cơ sở và giới hạn số buổi học trong tuần.
            </p>
          </div>
          <div class="mt-6 pt-4 border-t border-[#e8e8e8] flex items-center gap-2 text-xs text-[#0091ff] font-semibold">
            <span>Đa tiêu chí tối ưu</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>

        <!-- Step 3 -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 450, delay: 250, ease: [0.33, 1, 0.68, 1] } }"
          class="clickup-card p-6 flex flex-col justify-between"
        >
          <div>
            <div class="w-10 h-10 rounded-full bg-[#ecfdf5] text-[#00c07a] border border-[#a7f3d0] flex items-center justify-center font-extrabold text-sm mb-4 font-display">
              03
            </div>
            <h3 class="text-lg font-bold text-[#202020] mb-2 font-display">Nhận phương án tối ưu</h3>
            <p class="text-[#646464] text-sm leading-relaxed">
              Hệ thống tự động tính toán hàng ngàn tổ hợp môn học, loại trừ hoàn toàn lịch trùng, kiểm tra sĩ số MyCTU và xuất thời khóa biểu sang iCal, Excel.
            </p>
          </div>
          <div class="mt-6 pt-4 border-t border-[#e8e8e8] flex items-center gap-2 text-xs text-[#00c07a] font-semibold">
            <span>Xuất dữ liệu 1-click</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
