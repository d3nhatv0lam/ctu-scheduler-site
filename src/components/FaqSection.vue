<template>
  <section id="faq" class="py-20 bg-plaster-band">
    <div class="container mx-auto max-w-clickup px-4 sm:px-6">
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 450, ease: [0.33, 1, 0.68, 1] } }"
        class="max-w-2xl text-left mb-12"
      >
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#6647f0] border border-[#e8e8e8] text-xs font-bold tracking-wider uppercase mb-3">
          <span class="w-1.5 h-1.5 rounded-full bg-[#6647f0]"></span>
          Hỏi Đáp &amp; Thắc Mắc
        </div>
        <h2 class="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#090c1d] mb-3 font-display">
          Câu hỏi thường gặp
        </h2>
        <p class="text-[#646464] text-base leading-relaxed">
          Giải đáp các thắc mắc phổ biến của sinh viên khi sử dụng và vận hành CTU Scheduler.
        </p>
      </div>

      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 450, delay: 100, ease: [0.33, 1, 0.68, 1] } }"
        class="clickup-card-elevated !p-0 divide-y divide-[#e8e8e8] bg-white border border-[#e8e8e8] shadow-card overflow-hidden"
      >
        <div class="p-6 sm:p-7 space-y-2 hover:bg-[#f8f9fa] transition-colors">
          <h3 class="font-bold text-[#090c1d] text-base font-display flex items-center gap-2.5">
            <span class="w-2 h-2 rounded-full bg-[#6647f0]"></span>
            Tại sao lại là ứng dụng Desktop mà không phải một trang Web?
          </h3>
          <p class="text-[#646464] text-sm leading-relaxed pl-4.5">
            Ứng dụng Desktop giúp tận dụng tối đa tài nguyên máy tính cá nhân để chạy mượt mà thuật toán sinh tổ hợp lịch học phức tạp. Quan trọng hơn, nó bảo đảm tính riêng tư tuyệt đối cho tài khoản MyCTU của bạn (vì không gửi qua máy chủ trung gian) và cho phép bạn xem lại thời khóa biểu mọi lúc ngay cả khi mất mạng.
          </p>
        </div>

        <div class="p-6 sm:p-7 space-y-2 hover:bg-[#f8f9fa] transition-colors">
          <h3 class="font-bold text-[#090c1d] text-base font-display flex items-center gap-2.5">
            <span class="w-2 h-2 rounded-full bg-[#6647f0]"></span>
            Nếu hệ thống trường đột ngột đổi giao diện hoặc cấu trúc dữ liệu thì sao?
          </h3>
          <p class="text-[#646464] text-sm leading-relaxed pl-4.5">
            CTU Scheduler được thiết kế thông minh theo dạng mô-đun. Khi có thay đổi, nhóm chỉ cần cập nhật riêng mô-đun thu thập dữ liệu là ứng dụng có thể hoạt động bình thường mà không cần lập trình lại toàn bộ hệ thống.
          </p>
        </div>

        <div class="p-6 sm:p-7 space-y-2 hover:bg-[#f8f9fa] transition-colors">
          <h3 class="font-bold text-[#090c1d] text-base font-display flex items-center gap-2.5">
            <span class="w-2 h-2 rounded-full bg-[#6647f0]"></span>
            Ứng dụng có phiên bản dành cho điện thoại di động (Mobile) không?
          </h3>
          <p class="text-[#646464] text-sm leading-relaxed pl-4.5">
            Hiện tại dự án tập trung hoàn thiện phiên bản Desktop cho máy tính. Vì được xây dựng trên công nghệ đa nền tảng, một phiên bản thu gọn dành cho Mobile có thể được nhóm nghiên cứu phát triển trong tương lai nếu có đủ điều kiện.
          </p>
        </div>

        <div class="p-6 sm:p-7 space-y-2 hover:bg-[#f8f9fa] transition-colors">
          <h3 class="font-bold text-[#090c1d] text-base font-display flex items-center gap-2.5">
            <span class="w-2 h-2 rounded-full bg-[#6647f0]"></span>
            Tại sao ứng dụng đôi khi bị chậm hoặc báo lỗi kết nối khi đăng nhập?
          </h3>
          <p class="text-[#646464] text-sm leading-relaxed pl-4.5">
            Nguyên nhân chủ yếu do máy chủ MyCTU của trường bị quá tải vào giờ cao điểm đăng ký, hoặc đường truyền mạng chập chờn. Bạn nên kiểm tra lại kết nối mạng, hoàn thành xác thực Captcha trên cửa sổ trình duyệt ngầm nếu có yêu cầu, hoặc thử chuyển sang mạng 4G/5G / bật ứng dụng 1.1.1.1 để kết nối ổn định hơn.
          </p>
        </div>

        <div class="p-6 sm:p-7 space-y-2 hover:bg-[#f8f9fa] transition-colors">
          <h3 class="font-bold text-[#090c1d] text-base font-display flex items-center gap-2.5">
            <span class="w-2 h-2 rounded-full bg-[#6647f0]"></span>
            Ứng dụng có tự động bấm đăng ký môn học thay cho sinh viên không?
          </h3>
          <p class="text-[#646464] text-sm leading-relaxed pl-4.5">
            Không. CTU Scheduler tập trung hoàn toàn vào việc giúp sinh viên lên lịch học tối ưu, cá nhân hóa tiêu chí và theo dõi biến động sĩ số lớp học phần, không can thiệp vào hành động bấm nút đăng ký chính thức của bạn trên MyCTU.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
