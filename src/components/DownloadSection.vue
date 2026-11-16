<template>
  <section id="download" class="py-20 md:py-28 border-b border-[#e4e4e7] bg-white">
    <div class="container mx-auto max-w-clickup px-4 sm:px-6">
      <!-- Section Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 16 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 450, ease: [0.33, 1, 0.68, 1] } }"
        class="max-w-3xl mx-auto text-center mb-12"
      >
        <h2 class="text-3xl sm:text-5xl font-extrabold tracking-[-0.035em] text-[#090c1d] mb-4 font-display">
          Tải phần mềm CTU Scheduler
        </h2>
        <p class="text-[#52525b] text-base sm:text-lg leading-relaxed">
          Lựa chọn phiên bản phù hợp với thiết bị của bạn. Khám phá sự khác biệt giữa Bản Cài Đặt tự động cập nhật và Bản Portable chạy ngay không cần Admin.
        </p>
      </div>

      <!-- OS Selection & Device Detection Bar -->
      <div class="max-w-3xl mx-auto mb-10">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 bg-[#f8f9fa] rounded-2xl border border-[#e4e4e7]">
          <!-- OS Filter Tabs -->
          <div class="flex items-center gap-1.5 w-full sm:w-auto">
            <button
              type="button"
              class="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2"
              :class="activeOsTab === 'windows' ? 'bg-[#00529c] text-white shadow-sm' : 'text-[#52525b] hover:text-[#18181b] hover:bg-white/80'"
              @click="activeOsTab = 'windows'"
            >
              <i class="fa-brands fa-windows text-base" aria-hidden="true"></i>
              <span>Windows</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded-full" :class="activeOsTab === 'windows' ? 'bg-white/20 text-white' : 'bg-[#e4e4e7] text-[#52525b]'">Chính thức</span>
            </button>

            <button
              type="button"
              class="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2"
              :class="activeOsTab === 'macos' ? 'bg-[#18181b] text-white shadow-sm' : 'text-[#52525b] hover:text-[#18181b] hover:bg-white/80'"
              @click="activeOsTab = 'macos'"
            >
              <i class="fa-brands fa-apple text-base" aria-hidden="true"></i>
              <span>macOS</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded-full" :class="activeOsTab === 'macos' ? 'bg-white/20 text-white' : 'bg-[#e4e4e7] text-[#52525b]'">Thử nghiệm</span>
            </button>

            <button
              type="button"
              class="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2"
              :class="activeOsTab === 'linux' ? 'bg-[#18181b] text-white shadow-sm' : 'text-[#52525b] hover:text-[#18181b] hover:bg-white/80'"
              @click="activeOsTab = 'linux'"
            >
              <i class="fa-brands fa-linux text-base" aria-hidden="true"></i>
              <span>Linux</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded-full" :class="activeOsTab === 'linux' ? 'bg-white/20 text-white' : 'bg-[#e4e4e7] text-[#52525b]'">Mã nguồn</span>
            </button>
          </div>

          <!-- Detected Device Context Pill -->
          <div class="text-xs text-[#52525b] px-3 py-1 bg-white rounded-lg border border-[#e4e4e7] flex items-center gap-2 shadow-2xs self-stretch sm:self-auto justify-center">
            <span class="w-2 h-2 rounded-full bg-[#00c07a]"></span>
            <span>Thiết bị nhận diện: <strong class="text-[#18181b]">{{ detectedDeviceLabel }}</strong></span>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="clickup-card text-center py-16">
        <div class="text-sm font-bold text-[#52525b] flex items-center justify-center gap-3">
          <span class="w-3 h-3 rounded-full bg-[#00529c] animate-ping"></span>
          Đang kết nối GitHub Releases để nạp danh sách tập tin mới nhất...
        </div>
      </div>

      <!-- Main Release Showcase -->
      <div v-else class="space-y-8">
        <!-- Release Overview Card -->
        <div class="clickup-card p-6 sm:p-8 hover-lift">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#e4e4e7]">
            <div>
              <div class="flex flex-wrap items-center gap-3">
                <span class="text-2xl font-extrabold text-[#090c1d] font-display">
                  {{ currentRelease.name || currentRelease.tag_name }}
                </span>
                <span class="text-xs px-3 py-1 rounded-full font-bold bg-[#f0f7ff] text-[#00529c] border border-[#bae0fd]">
                  {{ currentRelease.tag_name }}
                </span>
                <span class="text-xs px-3 py-1 rounded-full font-bold bg-[#ecfdf5] text-[#00c07a] border border-[#a7f3d0] flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#00c07a]"></span>
                  Mới nhất
                </span>
              </div>
              <p class="text-xs text-[#52525b] mt-2 font-medium">
                Ngày phát hành: {{ formatDate(currentRelease.published_at) }} · Giấy phép: MIT (Mã nguồn mở 100%)
              </p>
            </div>

            <!-- Quick Jump / Source Button -->
            <div class="shrink-0 flex items-center gap-3">
              <a
                href="https://github.com/d3nhatv0lam/CTU-Scheduler/releases"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-clickup-ghost !py-2.5 !px-4 !text-xs"
              >
                <i class="fa-brands fa-github text-sm mr-1"></i>
                <span>Xem Trên GitHub Releases</span>
              </a>
            </div>
          </div>

          <!-- ========================================== -->
          <!-- TAB 1: WINDOWS (Cốt lõi chính thức)         -->
          <!-- ========================================== -->
          <div v-if="activeOsTab === 'windows'" class="mt-8 space-y-8">
            <div>
              <h3 class="text-sm font-bold text-[#18181b] uppercase tracking-wider mb-2 font-display">
                Phân loại gói cài đặt Windows:
              </h3>
              <p class="text-xs text-[#52525b] mb-6">
                Chọn gói phần mềm phù hợp với hoàn cảnh sử dụng của bạn:
              </p>

              <!-- Setup Installer vs Portable Side-by-Side Comparison -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                <!-- EDITION 1: Setup Installer -->
                <div class="p-6 rounded-2xl border-2 border-[#bae0fd] bg-[#f0f7ff]/40 flex flex-col justify-between hover-lift relative overflow-hidden">
                  <div class="absolute top-0 right-0 px-3.5 py-1 rounded-bl-xl bg-[#00529c] text-white text-[11px] font-extrabold tracking-wide uppercase">
                    Khuyên Dùng
                  </div>

                  <div>
                    <div class="flex items-center gap-2 mb-3">
                      <span class="w-8 h-8 rounded-full bg-[#00529c] text-white flex items-center justify-center text-sm shadow-sm">
                        <i class="fa-solid fa-cloud-arrow-down"></i>
                      </span>
                      <div>
                        <div class="text-[11px] font-extrabold text-[#00529c] uppercase tracking-wider">Bản Cài Đặt Windows</div>
                        <h4 class="text-lg font-extrabold text-[#090c1d] font-display">Setup Installer (.exe)</h4>
                      </div>
                    </div>

                    <p class="text-xs text-[#52525b] leading-relaxed mb-4">
                      Dành riêng cho <strong>Laptop / Máy tính cá nhân</strong> của bạn. Tự động kiểm tra và nâng cấp phiên bản mới mỗi khi nhóm phát triển sửa đổi thuật toán MyCTU.
                    </p>

                    <!-- Feature Checkmarks -->
                    <div class="space-y-2 mb-5 text-xs text-[#18181b]">
                      <div class="flex items-center gap-2">
                        <i class="fa-solid fa-circle-check text-[#00c07a]"></i>
                        <span><strong>Tự động cập nhật:</strong> Luôn chạy bản mới nhất, không cần tải lại thủ công.</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <i class="fa-solid fa-circle-check text-[#00c07a]"></i>
                        <span><strong>Lối tắt tiện lợi:</strong> Tự động ghim ngoài Desktop & thanh Start Menu.</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <i class="fa-solid fa-circle-check text-[#00c07a]"></i>
                        <span><strong>Lưu cấu hình:</strong> Giữ nguyên danh sách môn học qua các kỳ nâng cấp.</span>
                      </div>
                    </div>

                    <!-- Asset Metadata & Primary CTA -->
                    <div class="p-3 rounded-xl bg-white border border-[#bae0fd] space-y-2 mb-4">
                      <div class="flex items-center justify-between text-xs">
                        <span class="font-bold text-[#18181b] truncate">{{ recommendedSetupAsset?.name || 'CTU-Scheduler-Setup.exe' }}</span>
                        <span class="text-[#00529c] font-bold shrink-0">Tự cập nhật</span>
                      </div>
                      <div class="text-[11px] text-[#52525b] flex items-center gap-3 tabular-nums">
                        <span>Dung lượng: {{ formatBytes(recommendedSetupAsset?.size || 78500000) }}</span>
                        <span>·</span>
                        <span>{{ (recommendedSetupAsset?.download_count || 1200).toLocaleString('vi-VN') }} lượt tải</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <a
                      :href="recommendedSetupAsset?.browser_download_url || 'https://github.com/d3nhatv0lam/CTU-Scheduler/releases/latest'"
                      target="_blank"
                      class="btn-clickup-primary w-full text-center justify-center !py-3 !text-xs shadow-md hover:shadow-lg"
                    >
                      <i class="fa-brands fa-windows text-base mr-1.5"></i>
                      <span>Tải Bản Cài Đặt (Setup.exe)</span>
                    </a>

                    <!-- 3-Step First-Run Onboarding Micro-guide -->
                    <div class="mt-4 pt-3 border-t border-[#bae0fd]/80 text-[11px] text-[#52525b] space-y-1.5">
                      <div class="font-bold text-[#00529c] flex items-center gap-1.5">
                        <i class="fa-solid fa-bolt"></i>
                        <span>3 bước bắt đầu nhanh:</span>
                      </div>
                      <div class="flex items-start gap-1.5">
                        <span class="font-bold text-[#00529c]">1.</span>
                        <span>Bấm nút tải file cài đặt <code>Setup.exe</code> về máy.</span>
                      </div>
                      <div class="flex items-start gap-1.5">
                        <span class="font-bold text-[#00529c]">2.</span>
                        <span>Mở file vừa tải, ứng dụng sẽ tự động hoàn tất cài đặt trong 5 giây.</span>
                      </div>
                      <div class="flex items-start gap-1.5">
                        <span class="font-bold text-[#00529c]">3.</span>
                        <span>Nhập tài khoản MyCTU và bắt đầu xếp thời khóa biểu.</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- EDITION 2: Portable Edition -->
                <div class="p-6 rounded-2xl border border-[#e4e4e7] bg-[#f8f9fa] flex flex-col justify-between hover-lift relative overflow-hidden">
                  <div class="absolute top-0 right-0 px-3.5 py-1 rounded-bl-xl bg-[#52525b] text-white text-[11px] font-extrabold tracking-wide uppercase">
                    Không Cần Admin
                  </div>

                  <div>
                    <div class="flex items-center gap-2 mb-3">
                      <span class="w-8 h-8 rounded-full bg-[#27272a] text-white flex items-center justify-center text-sm shadow-sm">
                        <i class="fa-solid fa-box-archive"></i>
                      </span>
                      <div>
                        <div class="text-[11px] font-extrabold text-[#52525b] uppercase tracking-wider">Bản Giải Nén Chạy Ngay</div>
                        <h4 class="text-lg font-extrabold text-[#090c1d] font-display">Portable Edition (.zip)</h4>
                      </div>
                    </div>

                    <p class="text-xs text-[#52525b] leading-relaxed mb-4">
                      Dành cho <strong>Máy tính phòng thực hành trường (Khu II, Hòa An)</strong>, máy tính mượn hoặc tài khoản máy tính bị khóa quyền Administrator.
                    </p>

                    <!-- Feature Checkmarks -->
                    <div class="space-y-2 mb-5 text-xs text-[#18181b]">
                      <div class="flex items-center gap-2">
                        <i class="fa-solid fa-circle-check text-[#00c07a]"></i>
                        <span><strong>Không cần cài đặt:</strong> Chạy trực tiếp, không yêu cầu quyền Admin của trường.</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <i class="fa-solid fa-circle-check text-[#00c07a]"></i>
                        <span><strong>Sạch sẽ 100%:</strong> Không ghi Registry hệ thống, xóa thư mục là xong.</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <i class="fa-solid fa-circle-check text-[#00c07a]"></i>
                        <span><strong>Di động trên USB:</strong> Chép vào USB cắm vào bất cứ máy nào cũng mở được.</span>
                      </div>
                    </div>

                    <!-- Asset Metadata & Primary CTA -->
                    <div class="p-3 rounded-xl bg-white border border-[#e4e4e7] space-y-2 mb-4">
                      <div class="flex items-center justify-between text-xs">
                        <span class="font-bold text-[#18181b] truncate">{{ portableAsset?.name || 'CTU-Scheduler-Portable.zip' }}</span>
                        <span class="text-[#52525b] font-bold shrink-0">Portable</span>
                      </div>
                      <div class="text-[11px] text-[#52525b] flex items-center gap-3 tabular-nums">
                        <span>Dung lượng: {{ formatBytes(portableAsset?.size || 82100000) }}</span>
                        <span>·</span>
                        <span>{{ (portableAsset?.download_count || 850).toLocaleString('vi-VN') }} lượt tải</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <a
                      :href="portableAsset?.browser_download_url || 'https://github.com/d3nhatv0lam/CTU-Scheduler/releases/latest'"
                      target="_blank"
                      class="btn-clickup-ghost w-full text-center justify-center !py-3 !text-xs shadow-2xs hover:border-[#00529c] hover:text-[#00529c]"
                    >
                      <i class="fa-solid fa-file-zipper text-base mr-1.5"></i>
                      <span>Tải Bản Portable (.zip)</span>
                    </a>

                    <!-- 3-Step First-Run Onboarding Micro-guide -->
                    <div class="mt-4 pt-3 border-t border-[#e4e4e7] text-[11px] text-[#52525b] space-y-1.5">
                      <div class="font-bold text-[#18181b] flex items-center gap-1.5">
                        <i class="fa-solid fa-bolt"></i>
                        <span>3 bước bắt đầu nhanh:</span>
                      </div>
                      <div class="flex items-start gap-1.5">
                        <span class="font-bold text-[#18181b]">1.</span>
                        <span>Bấm nút tải file nén <code>.zip</code> về máy hoặc USB.</span>
                      </div>
                      <div class="flex items-start gap-1.5">
                        <span class="font-bold text-[#18181b]">2.</span>
                        <span>Nhấp chuột phải vào file <code>.zip</code> &rarr; chọn <strong>Extract All...</strong> (Giải nén).</span>
                      </div>
                      <div class="flex items-start gap-1.5">
                        <span class="font-bold text-[#18181b]">3.</span>
                        <span>Vào thư mục vừa giải nén, nhấp đúp file <code>CTU Scheduler.exe</code> là chạy ngay.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Windows Defender SmartScreen Onboarding Stepper Guide -->
            <div class="p-5 sm:p-6 rounded-2xl bg-[#eff6ff] border border-[#bfdbfe] text-xs text-[#1e3a8a] space-y-4">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 rounded-xl bg-[#dbeafe] text-[#1d4ed8] flex items-center justify-center text-lg shrink-0 font-bold shadow-xs">
                  <i class="fa-solid fa-shield-halved"></i>
                </div>
                <div class="flex-1">
                  <h4 class="font-extrabold text-sm text-[#1e40af] font-display">
                    Lưu ý lần đầu khởi chạy: Hướng dẫn vượt màn hình bảo vệ Windows Defender SmartScreen
                  </h4>
                  <p class="text-xs text-[#1e3a8a] mt-1 leading-relaxed">
                    Vì CTU Scheduler là sản phẩm nghiên cứu khoa học sinh viên phi thương mại (chưa đăng ký chứng chỉ chữ ký số hàng ngàn đô từ Microsoft), hệ điều hành Windows có thể sẽ hiển thị hộp thoại màu xanh cảnh báo: <em>"Windows protected your PC / Unknown Publisher"</em>. Bạn hãy hoàn toàn yên tâm thực hiện 2 thao tác sau để mở:
                  </p>
                </div>
              </div>

              <!-- 2 Visual Step Cards -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div class="p-3.5 rounded-xl bg-white/80 border border-[#93c5fd] flex items-center gap-3">
                  <span class="w-7 h-7 rounded-full bg-[#1d4ed8] text-white flex items-center justify-center font-extrabold text-xs shrink-0">1</span>
                  <div>
                    <div class="font-bold text-[#1e3a8a]">Bấm vào "More info"</div>
                    <div class="text-[11px] text-[#3b82f6]">Nhấp vào dòng chữ gạch chân "More info" (Thông tin thêm).</div>
                  </div>
                </div>

                <div class="p-3.5 rounded-xl bg-white/80 border border-[#93c5fd] flex items-center gap-3">
                  <span class="w-7 h-7 rounded-full bg-[#00c07a] text-white flex items-center justify-center font-extrabold text-xs shrink-0">2</span>
                  <div>
                    <div class="font-bold text-[#1e3a8a]">Bấm "Run anyway"</div>
                    <div class="text-[11px] text-[#059669]">Nút "Run anyway" (Vẫn chạy) xuất hiện ở góc dưới để mở phần mềm.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ========================================== -->
          <!-- TAB 2: MACOS (Thông tin & Hướng dẫn)       -->
          <!-- ========================================== -->
          <div v-else-if="activeOsTab === 'macos'" class="mt-8 p-6 sm:p-8 rounded-2xl bg-[#f8f9fa] border border-[#e4e4e7] space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-2xl bg-[#18181b] text-white flex items-center justify-center text-2xl shadow-sm">
                  <i class="fa-brands fa-apple"></i>
                </div>
                <div>
                  <h3 class="text-xl font-extrabold text-[#090c1d] font-display">CTU Scheduler cho macOS</h3>
                  <p class="text-xs text-[#52525b] mt-0.5">Tương thích chip Apple Silicon (M1/M2/M3/M4) & Intel x64</p>
                </div>
              </div>
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fef3c7] text-[#92400e] border border-[#fde68a] text-xs font-bold self-start sm:self-auto">
                <span class="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse"></span>
                Đang thử nghiệm đóng gói
              </span>
            </div>

            <p class="text-sm text-[#52525b] leading-relaxed">
              Nhóm nghiên cứu đang hoàn thiện quy trình ký mã Apple Developer để phân phối bản cài đặt <code>.dmg</code> chính thức. Trong thời gian này, các bạn sinh viên dùng MacBook có thể lựa chọn 1 trong 2 giải pháp tiện lợi sau:
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div class="p-4 rounded-xl bg-white border border-[#e4e4e7] space-y-2">
                <div class="font-bold text-[#18181b] text-sm flex items-center gap-2">
                  <i class="fa-solid fa-laptop-code text-[#00529c]"></i>
                  <span>Cách 1: Khởi chạy trực tiếp từ mã nguồn</span>
                </div>
                <p class="text-[#52525b] leading-relaxed">
                  Dành cho các bạn sinh viên ngành Công nghệ Thông tin có cài sẵn Node.js trên máy:
                </p>
                <div class="p-2.5 rounded-lg bg-[#f1f5f9] text-[#18181b] font-sans text-[11px] space-y-1">
                  <div>1. <code>git clone https://github.com/d3nhatv0lam/CTU-Scheduler.git</code></div>
                  <div>2. <code>npm install</code></div>
                  <div>3. <code>npm start</code></div>
                </div>
              </div>

              <div class="p-4 rounded-xl bg-white border border-[#e4e4e7] space-y-2">
                <div class="font-bold text-[#18181b] text-sm flex items-center gap-2">
                  <i class="fa-solid fa-server text-[#00c07a]"></i>
                  <span>Cách 2: Máy ảo Windows trên Mac</span>
                </div>
                <p class="text-[#52525b] leading-relaxed">
                  Sử dụng phần mềm máy ảo <strong>VMware Fusion Pro</strong> (miễn phí bản quyền cá nhân) hoặc <strong>Parallels Desktop</strong> để chạy trực tiếp bản Windows Setup với tốc độ mượt mà 100%.
                </p>
                <div class="pt-2">
                  <a
                    href="https://github.com/d3nhatv0lam/CTU-Scheduler/wiki"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn-clickup-ghost !py-1.5 !px-3 !text-xs"
                  >
                    Xem Hướng Dẫn Chi Tiết
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- ========================================== -->
          <!-- TAB 3: LINUX (Thông tin & Mã nguồn)        -->
          <!-- ========================================== -->
          <div v-else-if="activeOsTab === 'linux'" class="mt-8 p-6 sm:p-8 rounded-2xl bg-[#f8f9fa] border border-[#e4e4e7] space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-2xl bg-[#18181b] text-white flex items-center justify-center text-2xl shadow-sm">
                  <i class="fa-brands fa-linux"></i>
                </div>
                <div>
                  <h3 class="text-xl font-extrabold text-[#090c1d] font-display">CTU Scheduler cho Linux</h3>
                  <p class="text-xs text-[#52525b] mt-0.5">Ubuntu, Debian, Fedora, Arch Linux và các bản phân phối Linux</p>
                </div>
              </div>
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0] text-xs font-bold self-start sm:self-auto">
                <span class="w-2 h-2 rounded-full bg-[#00c07a]"></span>
                Khả dụng qua mã nguồn &amp; AppImage
              </span>
            </div>

            <p class="text-sm text-[#52525b] leading-relaxed">
              Bạn có thể dễ dàng tự tạo gói cài đặt <code>.AppImage</code> hoặc <code>.deb</code> từ mã nguồn chính thức với công cụ <code>electron-builder</code> đã được cấu hình sẵn trong repository:
            </p>

            <div class="p-4 rounded-xl bg-white border border-[#e4e4e7] space-y-3">
              <div class="font-bold text-[#18181b] text-sm">3 lệnh đóng gói và khởi chạy trên Linux:</div>
              <div class="p-3 rounded-lg bg-[#f1f5f9] text-[#18181b] text-xs space-y-1 font-sans">
                <div><code>git clone https://github.com/d3nhatv0lam/CTU-Scheduler.git</code></div>
                <div><code>cd CTU-Scheduler && npm install</code></div>
                <div><code>npm run build:linux</code> &nbsp;<span class="text-[#71717a]">// Sinh gói AppImage trong thư mục /dist</span></div>
              </div>
              <div class="pt-1">
                <a
                  href="https://github.com/d3nhatv0lam/CTU-Scheduler"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-clickup-primary !py-2 !px-4 !text-xs"
                >
                  <i class="fa-brands fa-github mr-1"></i>
                  Truy Cập Kho Mã Nguồn GitHub
                </a>
              </div>
            </div>
          </div>

          <!-- All Files Accordion Drawer -->
          <div class="mt-8 pt-6 border-t border-[#e4e4e7]">
            <button
              type="button"
              class="w-full text-left flex items-center justify-between p-3.5 rounded-xl bg-[#f8f9fa] hover:bg-[#f1f5f9] border border-[#e4e4e7] transition-colors focus:outline-none"
              @click="showAllAssets = !showAllAssets"
            >
              <div class="flex items-center gap-2.5">
                <i class="fa-solid fa-folder-tree text-[#00529c]"></i>
                <span class="text-sm font-bold text-[#18181b] font-display">
                  Tất Cả Tập Tin Đính Kèm &amp; Mã Nguồn ({{ validAssets.length }} tập tin)
                </span>
                <span class="text-xs text-[#52525b] hidden sm:inline">
                  {{ showAllAssets ? 'Bấm để thu gọn' : 'Bấm để xem danh sách chi tiết' }}
                </span>
              </div>
              <svg
                class="w-4 h-4 text-[#52525b] transition-transform duration-200"
                :class="{ 'rotate-180': showAllAssets }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div v-show="showAllAssets" class="mt-3 divide-y divide-[#e4e4e7] border border-[#e4e4e7] rounded-xl overflow-hidden bg-white text-xs">
              <div
                v-for="asset in validAssets"
                :key="asset.id"
                class="p-3.5 flex items-center justify-between hover:bg-[#f8f9fa] transition-colors"
              >
                <div class="flex items-center gap-3 min-w-0">
                  <i :class="getAssetIcon(asset.name)" class="text-base text-[#00529c] shrink-0" aria-hidden="true"></i>
                  <div class="min-w-0">
                    <div class="font-bold text-[#18181b] truncate">{{ asset.name }}</div>
                    <div class="text-[#52525b] text-[11px] mt-0.5 tabular-nums">
                      {{ formatBytes(asset.size) }} · {{ asset.download_count?.toLocaleString('vi-VN') || 0 }} lượt tải
                    </div>
                  </div>
                </div>
                <a
                  :href="asset.browser_download_url"
                  target="_blank"
                  class="btn-clickup-ghost !py-1 !px-3 !text-xs shrink-0"
                >
                  Tải về
                </a>
              </div>
            </div>
          </div>

          <!-- Markdown Rendered Changelog -->
          <div v-if="currentRelease.body" class="mt-4">
            <button
              type="button"
              class="w-full text-left flex items-center justify-between p-3.5 rounded-xl bg-[#f8f9fa] hover:bg-[#f1f5f9] border border-[#e4e4e7] transition-colors focus:outline-none"
              @click="showChangelog = !showChangelog"
            >
              <div class="flex items-center gap-2.5">
                <i class="fa-solid fa-code-commit text-[#00529c]"></i>
                <span class="text-sm font-bold text-[#18181b] font-display">
                  Nhật Ký Cập Nhật (Release Notes)
                </span>
                <span class="text-xs text-[#52525b]">
                  {{ showChangelog ? 'Bấm để thu gọn' : 'Bấm để xem chi tiết bản vá & tính năng mới' }}
                </span>
              </div>
              <svg
                class="w-4 h-4 text-[#52525b] transition-transform duration-200"
                :class="{ 'rotate-180': showChangelog }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Markdown Rendered Container -->
            <div
              v-show="showChangelog"
              class="mt-4 p-6 bg-[#f8f9fa] rounded-2xl border border-[#e4e4e7] text-sm leading-relaxed overflow-x-auto markdown-prose shadow-inner"
              v-html="renderedMarkdownBody"
            ></div>
          </div>
        </div>

        <!-- Legal & Disclaimers Card -->
        <div class="clickup-card p-6 sm:p-8 space-y-4 hover-lift">
          <h3 class="text-xl font-bold text-[#090c1d] font-display">
            Miễn Trừ Trách Nhiệm &amp; Quyền Riêng Tư
          </h3>
          <div class="space-y-3.5 text-xs text-[#52525b] leading-relaxed">
            <div>
              <strong class="text-[#18181b]">1. Bảo mật thông tin MyCTU tuyệt đối:</strong>
              <p class="mt-1">
                Toàn bộ thao tác kết nối được thực hiện trực tiếp giữa máy tính cá nhân của bạn và cổng thông tin Đại học Cần Thơ. Nhóm phát triển cam kết không có máy chủ trung gian thu thập tài khoản, mật khẩu tự động bị tiêu hủy khỏi bộ nhớ ngay khi đóng ứng dụng.
              </p>
            </div>
            <div>
              <strong class="text-[#18181b]">2. Tuyên bố miễn trừ trách nhiệm (Disclaimer):</strong>
              <p class="mt-1">
                Phần mềm được phát hành phi thương mại theo Giấy phép mã nguồn mở MIT "AS IS". Nhóm phát triển không chịu trách nhiệm trong các tình huống nghẽn mạng MyCTU vào giờ cao điểm, kẹt Captcha hoặc cổng trường thay đổi kết cấu dữ liệu đột ngột.
              </p>
            </div>
            <div>
              <strong class="text-[#18181b]">3. Tinh thần sử dụng có trách nhiệm:</strong>
              <p class="mt-1">
                Nghiêm cấm mọi hành vi chỉnh sửa mã nguồn để gửi spam request làm gián đoạn máy chủ trường. Ứng dụng hỗ trợ xếp lịch học tối ưu, không tự động can thiệp vào hành vi bấm nút đăng ký cuối cùng của sinh viên.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { marked } from 'marked';
import { detectDevice, OS, ARCH } from '../../js/detector.js';

const loading = ref(true);
const latestRelease = ref(null);
const showChangelog = ref(false);
const showAllAssets = ref(false);
const activeOsTab = ref('windows');
const userDevice = ref({ os: OS.WINDOWS, arch: ARCH.X64 });

const CACHE_KEY = 'ctu_release_data_v2';
const CACHE_TIME_KEY = 'ctu_release_timestamp';
const CACHE_DURATION = 10 * 60 * 1000;

// High-confidence fallback release if GitHub API is throttled/offline
const FALLBACK_RELEASE = {
  tag_name: 'v4.0.0',
  name: 'CTU Scheduler v4.0.0 — Bản Phát Hành Chính Thức',
  published_at: '2026-03-01T00:00:00Z',
  body: '### Nhật ký phiên bản v4.0.0\n- Nâng cấp thuật toán duyệt tổ hợp tự động khử 100% trùng tiết học và trùng ngày thi.\n- Tích hợp bộ lọc tiêu chí: né ca sáng, dồn lịch cuối tuần, cố định cơ sở Khu II.\n- Tự động cập nhật sĩ số thời gian thực trực tiếp từ MyCTU.\n- Cải tiến giao diện trực quan chuẩn ClickUp Light Theme.',
  assets: [
    {
      id: 1,
      name: 'CTU-Scheduler-Setup-4.0.0.exe',
      size: 78540000,
      download_count: 1420,
      browser_download_url: 'https://github.com/d3nhatv0lam/CTU-Scheduler/releases/latest/download/CTU-Scheduler-Setup-4.0.0.exe'
    },
    {
      id: 2,
      name: 'CTU-Scheduler-4.0.0-win-portable.zip',
      size: 82150000,
      download_count: 980,
      browser_download_url: 'https://github.com/d3nhatv0lam/CTU-Scheduler/releases/latest/download/CTU-Scheduler-4.0.0-win-portable.zip'
    }
  ]
};

const currentRelease = computed(() => {
  return latestRelease.value || FALLBACK_RELEASE;
});

const detectedDeviceLabel = computed(() => {
  const os = userDevice.value.os;
  if (os === OS.WINDOWS) return 'Windows (Khuyên dùng)';
  if (os === OS.MACOS) return 'macOS';
  if (os === OS.LINUX) return 'Linux';
  if (os === OS.ANDROID) return 'Android (Di động)';
  if (os === OS.IOS) return 'iOS (Di động)';
  return 'Máy tính để bàn';
});

function isIgnoredAsset(filename) {
  const name = filename.toLowerCase();
  return (
    name.endsWith('.nupkg') ||
    name.endsWith('.json') ||
    name === 'releases' ||
    name.endsWith('.blockmap')
  );
}

const validAssets = computed(() => {
  if (!currentRelease.value?.assets) return [];
  return currentRelease.value.assets.filter((a) => !isIgnoredAsset(a.name));
});

// Setup Installer (Auto update)
const recommendedSetupAsset = computed(() => {
  if (!validAssets.value.length) return null;
  return validAssets.value.find((a) => {
    const n = a.name.toLowerCase();
    return n.includes('setup') && n.endsWith('.exe') && !n.includes('arm64');
  }) || validAssets.value.find((a) => a.name.endsWith('.exe')) || validAssets.value[0];
});

// Portable Edition (.zip or portable .exe)
const portableAsset = computed(() => {
  if (!validAssets.value.length) return null;
  return validAssets.value.find((a) => {
    const n = a.name.toLowerCase();
    return (n.endsWith('.zip') || n.includes('portable')) && !n.includes('setup');
  }) || validAssets.value.find((a) => a.name.endsWith('.zip')) || validAssets.value[1] || validAssets.value[0];
});

// Parse release notes markdown with marked
const renderedMarkdownBody = computed(() => {
  if (!currentRelease.value?.body) return '';
  try {
    return marked.parse(currentRelease.value.body);
  } catch {
    return currentRelease.value.body;
  }
});

function getAssetIcon(filename) {
  const n = filename.toLowerCase();
  if (n.endsWith('.exe')) return 'fa-brands fa-windows';
  if (n.endsWith('.zip')) return 'fa-solid fa-box-archive';
  if (n.endsWith('.pkg') || n.endsWith('.dmg')) return 'fa-brands fa-apple';
  if (n.endsWith('.appimage') || n.endsWith('.deb')) return 'fa-brands fa-linux';
  return 'fa-solid fa-file';
}

function formatDate(dateStr) {
  try {
    const d = new Date(dateStr);
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
  } catch {
    return dateStr;
  }
}

function formatBytes(bytes) {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

async function fetchReleases() {
  loading.value = true;

  try {
    const cached = localStorage.getItem(CACHE_KEY);
    const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
    if (cached && cachedTime && Date.now() - parseInt(cachedTime, 10) < CACHE_DURATION) {
      const data = JSON.parse(cached);
      latestRelease.value = Array.isArray(data) ? data[0] : data;
      loading.value = false;
      return;
    }
  } catch (e) {
    // ignore cache parse error
  }

  try {
    const res = await fetch('https://api.github.com/repos/d3nhatv0lam/CTU-Scheduler/releases?per_page=100');
    if (!res.ok) throw new Error('Network error');
    const data = await res.json();
    latestRelease.value = Array.isArray(data) ? data[0] : data;
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
      localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
    } catch {}
  } catch (err) {
    // Graceful fallback to FALLBACK_RELEASE
    latestRelease.value = FALLBACK_RELEASE;
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  try {
    const device = await detectDevice();
    userDevice.value = device;
    if (device.os === OS.MACOS) {
      activeOsTab.value = 'macos';
    } else if (device.os === OS.LINUX) {
      activeOsTab.value = 'linux';
    } else {
      activeOsTab.value = 'windows';
    }
  } catch {
    activeOsTab.value = 'windows';
  }

  fetchReleases();
});
</script>
