# CTU Scheduler Website

<div align="center">
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="JavaScript" />
</div>

[Tiếng Việt](#tiếng-việt) | [English](#english)

---

## Tiếng Việt

Đây là trang web giới thiệu (landing page) chính thức cho ứng dụng **CTU Scheduler** - một công cụ đắc lực hỗ trợ sinh viên trường Đại học Cần Thơ (CTU) trong việc tự động hóa và tối ưu hóa quá trình xếp lịch học.

### Tính năng của trang web (SPA)
- **Trang chủ (Homepage):** Giới thiệu tóm tắt, danh sách tính năng và liên kết báo lỗi.
- **Tải xuống (Download):** Cung cấp đường dẫn tải trực tiếp, cùng với các Điều khoản & Miễn trừ trách nhiệm chi tiết.
- **Liên hệ (Contact):** Giới thiệu đội ngũ phát triển đằng sau dự án.

### Công nghệ sử dụng
- **Vite:** Công cụ build siêu tốc.
- **Tailwind CSS:** Framework CSS tiện lợi.
- **Vanilla JS:** Quản lý logic điều hướng SPA (Single Page Application) và hiệu ứng.

### Hướng dẫn chạy và triển khai (Deploy)

1. Cài đặt các thư viện cần thiết:
   ```bash
   npm install
   ```

2. Khởi chạy máy chủ lập trình (Development Server):
   ```bash
   npm run dev
   ```

3. Đóng gói cho môi trường thực tế (Build for Production):
   ```bash
   npm run build
   ```
   *Mã nguồn sau khi build sẽ nằm trong thư mục `dist/`.*

4. **Triển khai trên Vercel hoặc GitHub Pages:**
   - **Vercel:** Thêm dự án trên Vercel, framework preset chọn `Vite`, Vercel sẽ tự động build và deploy.
   - **GitHub Pages:** Có thể sử dụng GitHub Action để build nhánh `main` và deploy thư mục `dist/` lên `gh-pages`.

---

## English

This is the official landing page for the **CTU Scheduler** application - a powerful tool designed to assist Can Tho University (CTU) students in automating and optimizing their class scheduling process.

The website is designed with a modern approach, utilizing **Mesh Gradients** and **Glassmorphism**, delivering a vibrant and seamless visual experience.

### Website Features (SPA)
- **Homepage:** A brief introduction, feature list, and bug reporting link.
- **Download:** Provides direct download links, along with detailed Terms & Liability Disclaimers.
- **Contact:** Introduces the core development team behind the project.

### Tech Stack
- **Vite:** Blazing fast build tool.
- **Tailwind CSS:** Utility-first CSS framework.
- **JavaScript:** Handles SPA navigation logic and animations.

### Run & Deploy Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the Development Server:
   ```bash
   npm run dev
   ```

3. Build for Production:
   ```bash
   npm run build
   ```
   *The production-ready files will be located in the `dist/` folder.*

4. **Deploying to Vercel or GitHub Pages:**
   - **Vercel:** Import the project, set the framework preset to `Vite`, and Vercel will handle the build and deployment automatically.
   - **GitHub Pages:** You can use a GitHub Action to build the `main` branch and deploy the `dist/` directory to `gh-pages`.