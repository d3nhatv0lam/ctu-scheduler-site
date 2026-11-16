<template>
  <section id="faq" class="py-20 border-b border-[#1c1d22] bg-[#040406]">
    <div class="container mx-auto max-w-slash px-4">
      <div class="max-w-2xl text-left mb-12">
        <div class="copper-tag mb-2">Hỏi Đáp</div>
        <h2 class="text-3xl sm:text-4xl font-medium tracking-tight text-[#ffffff] mb-3">
          Câu hỏi thường gặp
        </h2>
        <p class="text-[#9194a1] text-sm sm:text-base leading-relaxed">
          Giải đáp các thắc mắc phổ biến của sinh viên khi sử dụng CTU Scheduler.
        </p>
      </div>

      <div class="slash-card !p-0 divide-y divide-[#1c1d22] overflow-hidden">
        <div class="p-6 space-y-2">
          <h3 class="font-medium text-[#ffffff] text-base">
            Tại sao lại là ứng dụng Desktop mà không phải một trang Web?
          </h3>
          <p class="text-[#9194a1] text-sm leading-relaxed">
            Ứng dụng Desktop giúp tận dụng tối đa tài nguyên máy tính cá nhân để chạy mượt mà thuật toán sinh tổ hợp lịch học phức tạp. Quan trọng hơn, nó bảo đảm tính riêng tư tuyệt đối cho tài khoản MyCTU của bạn (vì không gửi qua máy chủ trung gian) và cho phép bạn xem lại thời khóa biểu mọi lúc ngay cả khi mất mạng.
          </p>
        </div>

        <div class="p-6 space-y-2">
          <h3 class="font-medium text-[#ffffff] text-base">
            Nếu hệ thống trường đột ngột đổi giao diện hoặc cấu trúc dữ liệu thì sao?
          </h3>
          <p class="text-[#9194a1] text-sm leading-relaxed">
            CTU Scheduler được thiết kế thông minh theo dạng mô-đun. Khi có thay đổi, nhóm chỉ cần cập nhật riêng mô-đun thu thập dữ liệu là ứng dụng có thể hoạt động bình thường mà không cần lập trình lại toàn bộ hệ thống.
          </p>
        </div>

        <div class="p-6 space-y-2">
          <h3 class="font-medium text-[#ffffff] text-base">
            Ứng dụng có phiên bản dành cho điện thoại di động (Mobile) không?
          </h3>
          <p class="text-[#9194a1] text-sm leading-relaxed">
            Hiện tại dự án tập trung hoàn thiện phiên bản Desktop cho máy tính. Vì được xây dựng trên công nghệ đa nền tảng, một phiên bản thu gọn dành cho Mobile có thể được nhóm nghiên cứu phát triển trong tương lai nếu có đủ điều kiện.
          </p>
        </div>

        <div class="p-6 space-y-2">
          <h3 class="font-medium text-[#ffffff] text-base">
            Tại sao ứng dụng đôi khi bị chậm hoặc báo lỗi kết nối khi đăng nhập?
          </h3>
          <p class="text-[#9194a1] text-sm leading-relaxed">
            Nguyên nhân chủ yếu do máy chủ MyCTU của trường bị quá tải vào giờ cao điểm đăng ký, hoặc đường truyền mạng chập chờn. Bạn nên kiểm tra lại kết nối mạng, hoàn thành xác thực Captcha trên cửa sổ trình duyệt ngầm nếu có yêu cầu, hoặc thử chuyển sang mạng 4G/5G / bật ứng dụng 1.1.1.1 để kết nối ổn định hơn.
          </p>
        </div>

        <div class="p-6 space-y-2">
          <h3 class="font-medium text-[#ffffff] text-base">
            Ứng dụng có tự động bấm đăng ký môn học thay cho sinh viên không?
          </h3>
          <p class="text-[#9194a1] text-sm leading-relaxed">
            Không. CTU Scheduler tập trung hoàn toàn vào việc giúp sinh viên lên lịch học tối ưu, cá nhân hóa tiêu chí và theo dõi biến động sĩ số lớp học phần, không can thiệp vào hành động bấm nút đăng ký chính thức của bạn trên MyCTU.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

