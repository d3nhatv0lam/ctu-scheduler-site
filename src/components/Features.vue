<template>
  <section id="features" class="py-20 border-b border-[#e8e8e8] bg-white">
    <div class="container mx-auto max-w-clickup px-4 sm:px-6">
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 450, ease: [0.33, 1, 0.68, 1] } }"
        class="max-w-2xl text-left mb-12"
      >
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f5f3ff] text-[#6647f0] border border-[#ddd6fe] text-xs font-bold tracking-wider uppercase mb-3">
          <span class="w-1.5 h-1.5 rounded-full bg-[#6647f0]"></span>
          Năng Lực Cốt Lõi
        </div>
        <h2 class="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#090c1d] mb-3 font-display">
          Tính năng hỗ trợ chuyên sâu
        </h2>
        <p class="text-[#646464] text-base leading-relaxed">
          Xây dựng xuất phát từ thực tế đăng ký môn học tại Đại học Cần Thơ, giải quyết trọn vẹn từng điểm nghẽn của sinh viên.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Feature 1 -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 450, delay: 50, ease: [0.33, 1, 0.68, 1] } }"
          class="clickup-card p-6 flex flex-col justify-between hover-lift"
        >
          <div>
            <div class="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#f8f9fa] text-[#646464] border border-[#e8e8e8] text-[11px] font-semibold mb-3">
              Thuật toán tối ưu
            </div>
            <h3 class="text-lg font-bold text-[#202020] mb-2 font-display">Tự Động Sinh &amp; Tối Ưu Hóa</h3>
            <p class="text-[#646464] text-sm leading-relaxed">
              Tự động tính toán hàng ngàn tổ hợp lịch học và trả về hàng loạt phương án khả thi nhất, loại bỏ hoàn toàn tình trạng trùng giờ môn học và trùng lịch thi kết thúc học phần.
            </p>
          </div>
        </div>

        <!-- Feature 2 -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 450, delay: 100, ease: [0.33, 1, 0.68, 1] } }"
          class="clickup-card p-6 flex flex-col justify-between hover-lift"
        >
          <div>
            <div class="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#f8f9fa] text-[#646464] border border-[#e8e8e8] text-[11px] font-semibold mb-3">
              Cá nhân hóa
            </div>
            <h3 class="text-lg font-bold text-[#202020] mb-2 font-display">Bộ Lọc Tiêu Chí Chuyên Sâu</h3>
            <p class="text-[#646464] text-sm leading-relaxed">
              Bộ lọc đa chiều: ưu tiên dồn lịch, chỉ học ca sáng hoặc ca chiều, né ngày cuối tuần, đảm bảo thời gian ăn trưa và hạn chế di chuyển giữa các cơ sở (Khu II, Hòa An).
            </p>
          </div>
        </div>

        <!-- Feature 3 -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 450, delay: 150, ease: [0.33, 1, 0.68, 1] } }"
          class="clickup-card p-6 flex flex-col justify-between hover-lift"
        >
          <div>
            <div class="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#f8f9fa] text-[#646464] border border-[#e8e8e8] text-[11px] font-semibold mb-3">
              Thời gian thực
            </div>
            <h3 class="text-lg font-bold text-[#202020] mb-2 font-display">Theo Dõi Biến Động Sĩ Số</h3>
            <p class="text-[#646464] text-sm leading-relaxed">
              Tự động cập nhật sĩ số của từng lớp học phần trực tiếp từ hệ thống MyCTU. Nhận biết tức thời lớp nào còn chỗ hoặc đã đầy để kịp thời chuyển đổi phương án dự phòng.
            </p>
          </div>
        </div>

        <!-- Feature 4 -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 450, delay: 200, ease: [0.33, 1, 0.68, 1] } }"
          class="clickup-card p-6 flex flex-col justify-between hover-lift"
        >
          <div>
            <div class="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#f8f9fa] text-[#646464] border border-[#e8e8e8] text-[11px] font-semibold mb-3">
              Đa phương án
            </div>
            <h3 class="text-lg font-bold text-[#202020] mb-2 font-display">Quản Lý &amp; So Sánh Lịch</h3>
            <p class="text-[#646464] text-sm leading-relaxed">
              Hỗ trợ quản lý, lưu trữ, tải lại và so sánh nhiều bộ thời khóa biểu song song. Sinh viên luôn chủ động sẵn sàng phương án thay thế khi cổng đăng ký mở.
            </p>
          </div>
        </div>

        <!-- Feature 5 (Spans 2 columns) -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 450, delay: 250, ease: [0.33, 1, 0.68, 1] } }"
          class="clickup-card p-6 md:col-span-2 flex flex-col justify-between border-l-4 border-l-[#6647f0] hover-lift"
        >
          <div>
            <div class="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#f5f3ff] text-[#6647f0] border border-[#ddd6fe] text-[11px] font-semibold mb-3">
              Bảo mật &amp; Ngoại tuyến
            </div>
            <h3 class="text-lg font-bold text-[#202020] mb-2 font-display">Bảo Mật Cục Bộ Tuyệt Đối &amp; Hỗ Trợ Offline</h3>
            <p class="text-[#646464] text-sm leading-relaxed">
              Hoạt động hoàn toàn trên máy tính cá nhân qua trình duyệt nhúng ngầm. Dữ liệu học phần và tài khoản MyCTU được mã hóa và bảo mật cục bộ, mật khẩu tự hủy sau khi phiên kết thúc. Sinh viên có thể tra cứu lịch học đã lưu mọi lúc mọi nơi ngay cả khi không có kết nối mạng Internet.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
