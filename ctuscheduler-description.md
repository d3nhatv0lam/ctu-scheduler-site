# Nội dung Website CTU Scheduler

## 1. Trang chủ

**Giới thiệu:** 
CTU Scheduler là ứng dụng Desktop hỗ trợ sinh viên trường Đại học Cần Thơ (CTU) giải quyết bài toán xếp lịch học mỗi đầu học kỳ. Nhằm loại bỏ hoàn toàn việc dò dẫm mã môn, xếp lịch thủ công trên giấy hay Excel, ứng dụng giúp tự động hóa quy trình trích xuất dữ liệu, lập thời khóa biểu mang tính cá nhân hóa cao và đặc biệt là theo dõi biến động sĩ số để đưa ra quyết định đăng ký môn học nhanh chóng.

**Mã nguồn mở (GitHub):** 
[https://github.com/d3nhatv0lam/CTU-Scheduler](https://github.com/d3nhatv0lam/CTU-Scheduler)

**Các tính năng nổi bật (Features):**

1. **Tự động sinh & Tối ưu hóa thời khóa biểu (Auto-Scheduling & Optimization)**
   - *Mô tả:* Tự động tính toán hàng ngàn tổ hợp lịch học và trả về hàng loạt phương án khả thi nhất, loại bỏ hoàn toàn tình trạng trùng lịch học.
   - *Demo:* Video/GIF ứng dụng đang tự động sinh ra danh sách các phương án thời khóa biểu.

2. **Cá nhân hóa lịch học chuyên sâu (High Customization)**
   - *Mô tả:* Không còn phải chấp nhận những lịch học chắp vá, ứng dụng cung cấp bộ lọc chuyên sâu cho phép sinh viên lọc theo mong muốn cá nhân: Ưu tiên dồn lịch (để đi làm thêm), chỉ học ca sáng/chiều, tránh ngày cuối tuần, đảm bảo thời gian nghỉ trưa, và tránh việc phải di chuyển qua lại giữa các cơ sở trong cùng 1 buổi.
   - *Demo:* Ảnh chụp màn hình các tùy chọn bộ lọc/tiêu chí xếp lịch.

3. **Cập nhật và Theo dõi biến động sĩ số (Capacity Tracking)**
   - *Mô tả:* Chấm dứt cảnh bất ngờ "xếp lịch trước, lúc chuẩn bị đăng ký thì lớp báo đầy". Ứng dụng tích hợp công cụ tự động theo dõi, cập nhật sĩ số của từng lớp học phần trực tiếp từ hệ thống MyCTU. Bạn sẽ nắm bắt tức thời lớp nào còn chỗ để kịp thời thay đổi phương án đăng ký.
   - *Demo:* Ảnh chụp giao diện quản lý học phần hiển thị sĩ số (đầy / còn trống).

4. **Quản lý đa phương án thời khóa biểu (Save/Load & Compare)**
   - *Mô tả:* Hỗ trợ quản lý, lưu trữ, tải lại và so sánh nhiều bộ thời khóa biểu khác nhau cùng lúc. Sinh viên có thể chuẩn bị sẵn các "phương án dự phòng" để sẵn sàng ứng biến trong ngày đăng ký môn học.

5. **Đồng bộ an toàn & Hỗ trợ Offline (Security & Offline Mode)**
   - *Mô tả:* Hoạt động hoàn toàn trên máy tính cá nhân (Local) thông qua trình duyệt ảo. Dữ liệu học phần và thông tin sinh viên được bảo mật tuyệt đối, tự động tiêu hủy thông tin đăng nhập sau khi xử lý. Đặc biệt, bạn có thể xem lại lịch học bất kỳ lúc nào ngay cả khi không có kết nối mạng internet.
   - *Demo:* Ảnh chụp giao diện Lưới lịch học trực quan (Grid) hoặc Dòng thời gian (Timeline).

---

## 2. Download & Điều khoản sử dụng

**Link tải ứng dụng:**
[Tải CTU-Scheduler Releases mới nhất](https://github.com/d3nhatv0lam/CTU-Scheduler/releases)

### Điều khoản sử dụng & Miễn trừ trách nhiệm

Bằng việc tải xuống và sử dụng **CTU Scheduler**, bạn đồng ý với các điều khoản sau:

**1. Bảo mật và Quyền riêng tư (Privacy & Security)**
- Ứng dụng hoạt động hoàn toàn cục bộ (local) trên thiết bị của bạn. 
- Mọi thông tin đăng nhập (Tài khoản, Mật khẩu hệ thống MyCTU) và dữ liệu cá nhân (Hồ sơ, Thời khóa biểu) chỉ được lưu trữ trên máy của bạn và trao đổi trực tiếp với hệ thống của trường.
- Đội ngũ phát triển **KHÔNG** thu thập, lưu trữ hay truyền tải bất kỳ dữ liệu cá nhân nào của bạn tới máy chủ bên thứ ba. Nhằm tăng tính bảo mật, dữ liệu đăng nhập sẽ được tiêu hủy sau khi xác thực thành công.

**2. Miễn trừ trách nhiệm (Disclaimer of Liability)**
- Ứng dụng được cung cấp dưới dạng "AS IS" (Có sao dùng vậy) theo Giấy phép mã nguồn mở MIT, không kèm theo bất kỳ cam kết hay bảo hành nào.
- Mặc dù hệ thống tính toán chính xác, đội ngũ phát triển **KHÔNG CHỊU TRÁCH NHIỆM** đối với các sự cố phát sinh ngoài ý muốn trong quá trình sử dụng. Các trường hợp miễn trừ bao gồm:
  - Sự cố rớt mạng, chậm trễ hệ thống hoặc lỗi không truy cập được ứng dụng vào giờ cao điểm trên hệ thống MyCTU.
  - Tài khoản bị khóa tạm thời do nhập sai thông tin hoặc kẹt xác thực Captcha.
  - Các thay đổi cấu trúc dữ liệu đột ngột từ phía hệ thống MyCTU làm ứng dụng tạm thời ngừng hoạt động.

**3. Mục đích sử dụng**
- CTU Scheduler được tạo ra với mục đích phi lợi nhuận, hỗ trợ sinh viên tối ưu hóa thời gian và công sức xếp lịch học.
- Tuyệt đối nghiêm cấm việc lạm dụng ứng dụng (như sử dụng chức năng cập nhật sĩ số để spam request, tấn công làm quá tải hệ thống máy chủ của trường) hoặc sử dụng với mục đích thương mại.

### Hướng dẫn & Lưu ý quan trọng

- Ứng dụng sẽ mở một trình duyệt ảo ngầm phía sau để thao tác lấy dữ liệu một cách hợp lệ. **Tuyệt đối không được tắt cửa sổ này**, nếu không ứng dụng sẽ ngừng hoạt động.
- Nếu hệ thống MyCTU bắt xác thực Captcha, hãy giải Captcha trên cửa sổ trình duyệt ngầm đó trước khi tiếp tục thao tác trên app. (Khuyến nghị sử dụng VPN như 1.1.1.1 nếu bị kẹt Captcha liên tục).
- Chờ hệ thống tải và đồng bộ xong thông tin sinh viên hoàn toàn rồi mới chuyển trang để ứng dụng hoạt động ổn định nhất.

---

## 3. Các câu hỏi thường gặp (FAQ)

**Q: Tại sao lại là app Desktop mà không phải là một trang Web?**
A: Việc chạy trên nền tảng Desktop giúp tận dụng tài nguyên máy tính cá nhân để xử lý mượt mà các thuật toán sắp xếp phức tạp. Quan trọng hơn, nó đảm bảo tính riêng tư tuyệt đối cho dữ liệu đăng nhập của bạn (vì không có server bên thứ ba nào lưu trữ cả) và cho phép bạn xem lại thời khóa biểu khi không có mạng (Offline).

**Q: Nếu hệ thống của trường đột ngột thay đổi (như giao diện, cấu trúc web) thì sao?**
A: CTU Scheduler được thiết kế thông minh, nhóm phát triển chỉ cần cập nhật lại duy nhất một "module thu thập dữ liệu" là ứng dụng có thể hoạt động bình thường mà không cần đập đi xây lại hệ thống.

**Q: Ứng dụng có hỗ trợ trên điện thoại di động không?**
A: Hiện tại thì chưa. Tuy nhiên, CTU Scheduler được xây dựng trên công nghệ đa nền tảng, do đó trong tương lai gần nếu dự án phát triển tốt, hoàn toàn có khả năng sẽ có một phiên bản nhỏ gọn dành riêng cho nền tảng Mobile.

---

## 4. Liên hệ (Developer Team)

**1. Dương Minh Đức (d3nhatv0lam / RxAmethyst)**
- **Vai trò:** Chủ nhiệm đề tài (Founder, Developer, Idea Provider)
- **Slogan/Bio:** *""*
- **Mạng xã hội:**
  - Facebook: [Dương Đức](https://www.facebook.com/profile.php?id=100088452777261)
  - YouTube: [ucduong9984](https://www.youtube.com/@ucduong9984)
  - GitHub: [d3nhatv0lam](https://github.com/d3nhatv0lam)

**2. Nguyễn Phước Lộc (Lexipit3268)**
- **Vai trò:** Maintainer (Designer, Tester)
- **Slogan/Bio:** *""*
- **Mạng xã hội:**
  - Facebook: [Nguyễn Lộc](https://www.facebook.com/lexipit3268)
  - YouTube: [Lexipit 3268](https://www.youtube.com/@lexipit3268)
  - GitHub: [lexipit3268](https://github.com/lexipit3268)

**3. Trần Trọng Phúc**
- **Vai trò:** Maintainer (Designer, Tester)
- **Slogan/Bio:** *""*
- **Mạng xã hội:**
  - GitHub: [phuctran1501](https://github.com/phuctran1501)

**4. Nguyễn Ngọc Đức Phát (Kimgion)**
- **Vai trò:** Maintainer (Designer)
- **Slogan/Bio:** *""*
- **Mạng xã hội:**
  - GitHub: [KimgionDev](https://github.com/KimgionDev)
