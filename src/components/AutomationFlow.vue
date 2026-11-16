<template>
  <section class="py-20 bg-plaster-band border-b border-[#e4e4e7]">
    <div class="container mx-auto max-w-clickup px-4 sm:px-6">
      <div
        v-motion
        :initial="{ opacity: 0, y: 16 }"
        :visibleOnce="{
          opacity: 1,
          y: 0,
          transition: { duration: 450, ease: [0.33, 1, 0.68, 1] },
        }"
        class="max-w-3xl mx-auto text-center mb-14"
      >
        <h2
          class="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-[-0.035em] text-[#090c1d] mb-4 font-display"
        >
          Từ cổng MyCTU đến Thời khóa biểu hoàn hảo.
        </h2>
        <p class="text-[#52525b] text-base sm:text-lg leading-relaxed">
          Mọi dữ liệu học phần được xử lý độc lập và chạy trên phần cứng máy
          tính của bạn — không rò rỉ cookie hay tài khoản.
        </p>
      </div>

      <!-- 3-Stage Diagram Flow -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        <!-- Stage 1 -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 16 }"
          :visibleOnce="{
            opacity: 1,
            y: 0,
            transition: { duration: 450, delay: 50, ease: [0.33, 1, 0.68, 1] },
          }"
          class="clickup-card p-6 sm:p-7 relative flex flex-col justify-between hover-lift"
        >
          <div>
            <div
              class="w-12 h-12 rounded-2xl bg-[#f0f7ff] text-[#00529c] border border-[#bae0fd] flex items-center justify-center text-xl mb-5 shadow-sm"
            >
              <i class="fa-solid fa-cloud-arrow-down" aria-hidden="true"></i>
            </div>
            <h3 class="text-lg font-bold text-[#18181b] mb-2 font-display">
              Trích Xuất Danh Sách MyCTU
            </h3>
            <p class="text-[#52525b] text-sm leading-relaxed">
              Mở phiên làm việc bảo mật ngầm để đọc mã lớp, danh sách học phần
              mở, phòng học và sĩ số thời gian thực từ Cổng thông tin sinh viên
              Đại học Cần Thơ.
            </p>
          </div>
          <div
            class="mt-6 pt-4 border-t border-[#e4e4e7] text-xs font-semibold text-[#00c07a] flex items-center gap-2"
          >
            <span class="w-2 h-2 rounded-full bg-[#00c07a]"></span>
            <span>Mật khẩu tự tiêu hủy sau phiên sử dụng</span>
          </div>
        </div>

        <!-- Stage 2 -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 16 }"
          :visibleOnce="{
            opacity: 1,
            y: 0,
            transition: { duration: 450, delay: 120, ease: [0.33, 1, 0.68, 1] },
          }"
          class="clickup-card p-6 sm:p-7 relative flex flex-col justify-between hover-lift"
        >
          <div>
            <div
              class="w-12 h-12 rounded-2xl bg-[#f0f7ff] text-[#00529c] border border-[#bae0fd] flex items-center justify-center text-xl mb-5 shadow-sm"
            >
              <i class="fa-solid fa-microchip" aria-hidden="true"></i>
            </div>
            <h3 class="text-lg font-bold text-[#18181b] mb-2 font-display">
              Thuật Toán Tổ Hợp Cục Bộ
            </h3>
            <p class="text-[#52525b] text-sm leading-relaxed">
              Duyệt qua hàng triệu nhánh tổ hợp lớp học phần, tự động gạt bỏ
              100% xung đột giờ học, trùng ngày thi và xếp lịch theo bộ tiêu
              chuẩn cá nhân hóa của bạn.
            </p>
          </div>
          <div
            class="mt-6 pt-4 border-t border-[#e4e4e7] text-xs font-semibold text-[#00529c] flex items-center gap-2"
          >
            <span class="w-2 h-2 rounded-full bg-[#00529c]"></span>
            <span>Tốc độ xử lý &lt; 0.5 giây</span>
          </div>
        </div>

        <!-- Stage 3 -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 16 }"
          :visibleOnce="{
            opacity: 1,
            y: 0,
            transition: { duration: 450, delay: 180, ease: [0.33, 1, 0.68, 1] },
          }"
          class="clickup-card p-6 sm:p-7 relative flex flex-col justify-between hover-lift"
        >
          <div>
            <div
              class="w-12 h-12 rounded-2xl bg-[#ecfdf5] text-[#00c07a] border border-[#a7f3d0] flex items-center justify-center text-xl mb-5 shadow-sm"
            >
              <i class="fa-solid fa-calendar-check" aria-hidden="true"></i>
            </div>
            <h3 class="text-lg font-bold text-[#18181b] mb-2 font-display">
              Đồng Bộ Lịch &amp; Xem Offline
            </h3>
            <p class="text-[#52525b] text-sm leading-relaxed">
              Xuất trực tiếp sang Google Calendar / Apple iCal (.ics), bảng tính
              Excel, hoặc lưu trữ để mở tra cứu ngoại tuyến mọi lúc mọi nơi mà
              không cần Internet.
            </p>
          </div>
          <div
            class="mt-6 pt-4 border-t border-[#e4e4e7] text-xs font-semibold text-[#00529c] flex items-center gap-2"
          >
            <span class="w-2 h-2 rounded-full bg-[#00529c]"></span>
            <span>Hỗ trợ đa định dạng 1-click</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
