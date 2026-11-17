<template>
  <section
    id="download"
    class="py-20 md:py-24 border-b border-[#e4e4e7] bg-white"
  >
    <div class="container mx-auto max-w-clickup px-4 sm:px-6">
      <!-- Section Header -->
      <motion.div
        :initial="{ opacity: 0, y: 12 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :inViewOptions="{ once: true }"
        :transition="{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }"
        class="max-w-2xl mx-auto text-center mb-8 sm:mb-10"
      >
        <h2
          class="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#090c1d] mb-3 font-display text-balance"
        >
          Tải phần mềm CTU Scheduler
        </h2>
        <p
          class="text-[#52525b] text-sm sm:text-base leading-relaxed text-pretty"
        >
          Phần mềm mã nguồn mở phục vụ sinh viên Đại học Cần Thơ. Lựa chọn hệ
          điều hành và gói cài đặt phù hợp với thiết bị của bạn.
        </p>
        <div class="mt-4 flex items-center justify-center gap-2">
          <span
            class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#f0f7ff] text-[#00529c] border border-[#bae0fd] text-xs font-semibold tabular-nums whitespace-nowrap shadow-2xs"
          >
            <i
              class="fa-solid fa-download text-[11px] shrink-0"
              aria-hidden="true"
            ></i>
            <span
              >{{ totalDownloads.toLocaleString("vi-VN") }} lượt tải về</span
            >
          </span>
        </div>
      </motion.div>

      <!-- Loading Skeleton State -->
      <div v-if="loading" class="text-center py-16">
        <div
          class="text-xs font-semibold text-[#71717a] flex items-center justify-center gap-2.5"
        >
          <span class="w-2 h-2 rounded-full bg-[#00529c] animate-pulse"></span>
          Đang nạp thông tin phát hành từ GitHub...
        </div>
      </div>

      <!-- Main Master Download Container -->
      <div v-else class="max-w-5xl mx-auto space-y-6">
        <!-- Mobile Device Warning Card (Tự động hiển thị khi khách truy cập bằng Android hoặc iOS) -->
        <motion.div
          v-if="isMobileUser"
          :initial="{ opacity: 0, y: -8 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }"
          class="p-4 sm:p-5 rounded-2xl bg-[#fffbeb] border border-[#fef3c7] text-[#92400e] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs"
        >
          <div class="flex items-start gap-3">
            <div
              class="w-8 h-8 rounded-lg bg-[#fde68a] text-[#b45309] flex items-center justify-center shrink-0 text-sm mt-0.5"
            >
              <i
                class="fa-solid fa-mobile-screen-button"
                aria-hidden="true"
              ></i>
            </div>
            <div class="space-y-1">
              <div
                class="font-bold text-sm text-[#78350f] flex items-center gap-2"
              >
                <span>Chưa hỗ trợ thiết bị di động ({{ detectedDeviceLabel }})</span>
              </div>
              <p class="text-xs text-[#92400e] leading-relaxed text-pretty">
                CTU Scheduler hiện được thiết kế và tối ưu riêng cho môi trường
                máy tính (Windows, macOS, Linux) để phân tích ma trận lịch học.
                Bạn có thể sao chép liên kết để mở tải về trên máy tính.
              </p>
            </div>
          </div>

          <motion.button
            type="button"
            :whileHover="{ scale: 1.02 }"
            :whilePress="{ scale: 0.96 }"
            class="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#fde68a] hover:bg-[#fef9c3] text-[#78350f] text-xs font-semibold shadow-2xs transition-all cursor-pointer whitespace-nowrap self-stretch sm:self-auto justify-center"
            @click="copyDownloadLink"
          >
            <i
              :class="
                linkCopied
                  ? 'fa-solid fa-check text-[#16a34a]'
                  : 'fa-regular fa-copy'
              "
              aria-hidden="true"
            ></i>
            <span>{{
              linkCopied ? "Đã sao chép liên kết!" : "Chép link mở trên PC"
            }}</span>
          </motion.button>
        </motion.div>

        <!-- System Architecture & Current Device Detection Banner -->
        <div
          class="p-3.5 sm:p-4 rounded-2xl bg-[#f8f9fa] border border-[#e4e4e7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs select-none"
        >
          <div class="flex items-center gap-2.5">
            <span
              class="w-6 h-6 rounded-lg bg-white border border-[#e4e4e7] text-[#00529c] flex items-center justify-center text-xs shrink-0 shadow-2xs"
            >
              <i class="fa-solid fa-laptop-code" aria-hidden="true"></i>
            </span>
            <div class="text-[#52525b]">
              <span>Hệ thống nhận diện: </span>
              <strong class="text-[#18181b] font-bold">{{
                currentDeviceFullLabel
              }}</strong>
            </div>
          </div>

          <div
            class="text-[11px] text-[#71717a] flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-[#00c07a]"></span>
            <span>Tự động chọn hệ điều hành phù hợp</span>
          </div>
        </div>

        <!-- Master 2-Column Layout (Left: 3 OS Tabs Stack / Right: OS Content & Notes) -->
        <div
          class="flex flex-col lg:flex-row items-start gap-5 lg:gap-6"
        >
          <!-- ==================================================== -->
          <!-- LEFT COLUMN: 3 OS Navigation Tabs                   -->
          <!-- ==================================================== -->
          <!-- Desktop: Vertical stack / Mobile: 3-column top grid -->
          <div
            class="w-full lg:w-72 shrink-0 grid grid-cols-3 lg:flex lg:flex-col gap-2.5 sm:gap-3"
          >
            <motion.button
              v-for="tab in osTabs"
              :key="tab.id"
              type="button"
              :whileHover="{ scale: 1.01 }"
              :whilePress="{ scale: 0.98 }"
              class="relative w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col sm:flex-row lg:flex-row items-center sm:items-center justify-between gap-2.5 sm:gap-3 group select-none overflow-hidden"
              :class="
                activeOsTab === tab.id
                  ? 'border-[#00529c] bg-[#f0f7ff] text-[#00529c] shadow-xs ring-1 ring-[#00529c]/20'
                  : 'border-[#e4e4e7] bg-white hover:bg-[#f8f9fa] text-[#52525b] hover:border-[#cbd5e1]'
              "
              @click="selectOsTab(tab.id)"
            >
              <div class="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3.5 min-w-0 text-center sm:text-left">
                <div
                  class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-base sm:text-lg transition-colors shrink-0"
                  :class="
                    activeOsTab === tab.id
                      ? 'bg-[#00529c] text-white shadow-xs'
                      : 'bg-[#f4f4f5] text-[#52525b] group-hover:bg-[#e4e4e7] group-hover:text-[#18181b]'
                  "
                >
                  <i :class="tab.icon" aria-hidden="true"></i>
                </div>
                <div class="min-w-0">
                  <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-1.5">
                    <span
                      class="font-bold text-xs sm:text-sm font-display leading-tight truncate"
                      :class="
                        activeOsTab === tab.id
                          ? 'text-[#00529c]'
                          : 'text-[#18181b]'
                      "
                    >
                      {{ tab.label }}
                    </span>
                    <span
                      v-if="userDevice.os === tab.osKey"
                      class="text-[11px] font-semibold px-1.5 py-0.2 rounded-full bg-[#00c07a]/15 text-[#047857] border border-[#a7f3d0] whitespace-nowrap inline-block self-center"
                    >
                      Của bạn
                    </span>
                  </div>
                  <p
                    class="hidden sm:block text-[11px] truncate mt-0.5"
                    :class="
                      activeOsTab === tab.id
                        ? 'text-[#00529c]/80'
                        : 'text-[#71717a]'
                    "
                  >
                    {{ tab.desc }}
                  </p>
                </div>
              </div>

              <!-- Desktop Indicator Chevron -->
              <i
                class="hidden lg:block fa-solid fa-chevron-right text-xs transition-transform duration-200 shrink-0"
                :class="
                  activeOsTab === tab.id
                    ? 'text-[#00529c] translate-x-0.5'
                    : 'text-[#d4d4d8] group-hover:text-[#a1a1aa]'
                "
                aria-hidden="true"
              ></i>
            </motion.button>
          </div>

          <!-- ==================================================== -->
          <!-- RIGHT COLUMN: Active OS Content & Notes Panel       -->
          <!-- ==================================================== -->
          <div class="w-full flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <!-- ========================================== -->
              <!-- TAB 1: WINDOWS                            -->
              <!-- ========================================== -->
              <motion.div
                v-if="activeOsTab === 'windows'"
                key="windows"
                :initial="{ opacity: 0, y: 8 }"
                :animate="{ opacity: 1, y: 0 }"
                :exit="{ opacity: 0, y: -8 }"
                :transition="{ duration: 0.22, ease: [0.33, 1, 0.68, 1] }"
                class="space-y-5"
              >
                <!-- Windows Setup vs Portable Cards -->
                <div
                  class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-stretch"
                >
                  <!-- EDITION 1: Setup Installer (Khuyên dùng cá nhân) -->
                  <div
                    class="p-5 sm:p-6 rounded-2xl border border-[#e4e4e7] bg-white flex flex-col justify-between space-y-5 shadow-2xs hover:border-[#cbd5e1] transition-colors"
                  >
                    <div class="space-y-4">
                      <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2.5">
                          <span
                            class="w-7 h-7 rounded-lg bg-[#f0f7ff] text-[#00529c] flex items-center justify-center text-xs shrink-0"
                          >
                            <i
                              class="fa-solid fa-cloud-arrow-down"
                              aria-hidden="true"
                            ></i>
                          </span>
                          <h3
                            class="text-base font-bold text-[#18181b] font-display"
                          >
                            Bản Cài Đặt (Setup)
                          </h3>
                        </div>
                        <span
                          class="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#f0f7ff] text-[#00529c] border border-[#bae0fd] shrink-0 whitespace-nowrap"
                        >
                          Tự cập nhật
                        </span>
                      </div>

                      <p
                        class="text-xs text-[#52525b] leading-relaxed text-pretty"
                      >
                        Dành cho <strong>Laptop / Máy tính cá nhân</strong>. Tự
                        động kiểm tra và nâng cấp phiên bản mới khi có cập nhật.
                      </p>

                      <ul class="space-y-1.5 text-xs text-[#52525b] pt-1">
                        <li class="flex items-start gap-2">
                          <span
                            class="text-[#00529c] font-bold mt-0.5 shrink-0"
                            >•</span
                          >
                          <span>Tự động cập nhật phiên bản mới</span>
                        </li>
                        <li class="flex items-start gap-2">
                          <span
                            class="text-[#00529c] font-bold mt-0.5 shrink-0"
                            >•</span
                          >
                          <span>Tạo lối tắt Desktop &amp; Start Menu</span>
                        </li>
                        <li class="flex items-start gap-2">
                          <span
                            class="text-[#00529c] font-bold mt-0.5 shrink-0"
                            >•</span
                          >
                          <span>Lưu cấu hình và lịch học qua các kỳ</span>
                        </li>
                      </ul>
                    </div>

                    <div class="pt-2 space-y-3">
                      <div
                        class="text-[11px] text-[#71717a] flex flex-wrap items-center justify-between gap-1.5 tabular-nums"
                      >
                        <span class="truncate max-w-[130px] sm:max-w-[180px]">{{
                          recommendedSetupAsset?.name || "CTU-Scheduler-Setup.exe"
                        }}</span>
                        <span class="shrink-0 whitespace-nowrap"
                          >{{
                            formatBytes(recommendedSetupAsset?.size || 78500000)
                          }}
                          ·
                          {{
                            setupTotalDownloads.toLocaleString("vi-VN")
                          }}
                          lượt tải</span
                        >
                      </div>

                      <motion.a
                        :href="
                          recommendedSetupAsset?.browser_download_url ||
                          'https://github.com/d3nhatv0lam/CTU-Scheduler/releases/latest'
                        "
                        target="_blank"
                        :whileHover="{ scale: 1.01 }"
                        :whilePress="{ scale: 0.97 }"
                        class="btn-clickup-primary w-full text-center justify-center !py-2.5 !text-xs whitespace-nowrap shadow-xs"
                      >
                        <i
                          class="fa-brands fa-windows mr-1.5 shrink-0"
                          aria-hidden="true"
                        ></i>
                        <span>Tải Bản Cài Đặt (.exe)</span>
                      </motion.a>

                      <div
                        class="pt-2 text-[11px] text-[#71717a] flex items-center justify-between text-center border-t border-[#f4f4f5] gap-1"
                      >
                        <span class="whitespace-nowrap">1. Tải về</span>
                        <span class="text-[#d4d4d8] shrink-0">&rarr;</span>
                        <span class="whitespace-nowrap">2. Cài đặt (5s)</span>
                        <span class="text-[#d4d4d8] shrink-0">&rarr;</span>
                        <span class="whitespace-nowrap">3. Xếp lịch ngay</span>
                      </div>
                    </div>
                  </div>

                  <!-- EDITION 2: Portable Edition (Không cần Admin) -->
                  <div
                    class="p-5 sm:p-6 rounded-2xl border border-[#e4e4e7] bg-white flex flex-col justify-between space-y-5 shadow-2xs hover:border-[#cbd5e1] transition-colors"
                  >
                    <div class="space-y-4">
                      <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2.5">
                          <span
                            class="w-7 h-7 rounded-lg bg-[#f4f4f5] text-[#52525b] flex items-center justify-center text-xs shrink-0"
                          >
                            <i
                              class="fa-solid fa-box-archive"
                              aria-hidden="true"
                            ></i>
                          </span>
                          <h3
                            class="text-base font-bold text-[#18181b] font-display"
                          >
                            Bản Chạy Ngay (Portable)
                          </h3>
                        </div>
                        <span
                          class="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#f4f4f5] text-[#52525b] border border-[#e4e4e7] shrink-0 whitespace-nowrap"
                        >
                          Không cần Admin
                        </span>
                      </div>

                      <p
                        class="text-xs text-[#52525b] leading-relaxed text-pretty"
                      >
                        Dành cho <strong>máy phòng thực hành</strong> (Khu II,
                        Hòa An) hoặc máy bị giới hạn quyền Administrator.
                      </p>

                      <ul class="space-y-1.5 text-xs text-[#52525b] pt-1">
                        <li class="flex items-start gap-2">
                          <span
                            class="text-[#71717a] font-bold mt-0.5 shrink-0"
                            >•</span
                          >
                          <span>Chạy trực tiếp, không cần quyền Admin</span>
                        </li>
                        <li class="flex items-start gap-2">
                          <span
                            class="text-[#71717a] font-bold mt-0.5 shrink-0"
                            >•</span
                          >
                          <span>Không ghi Registry, xóa thư mục là sạch</span>
                        </li>
                        <li class="flex items-start gap-2">
                          <span
                            class="text-[#71717a] font-bold mt-0.5 shrink-0"
                            >•</span
                          >
                          <span>Chép vào USB dùng linh hoạt mọi máy</span>
                        </li>
                      </ul>
                    </div>

                    <div class="pt-2 space-y-3">
                      <div
                        class="text-[11px] text-[#71717a] flex flex-wrap items-center justify-between gap-1.5 tabular-nums"
                      >
                        <span class="truncate max-w-[130px] sm:max-w-[180px]">{{
                          portableAsset?.name || "CTU-Scheduler-Portable.zip"
                        }}</span>
                        <span class="shrink-0 whitespace-nowrap"
                          >{{
                            formatBytes(portableAsset?.size || 82100000)
                          }}
                          ·
                          {{
                            portableTotalDownloads.toLocaleString("vi-VN")
                          }}
                          lượt tải</span
                        >
                      </div>

                      <motion.a
                        :href="
                          portableAsset?.browser_download_url ||
                          'https://github.com/d3nhatv0lam/CTU-Scheduler/releases/latest'
                        "
                        target="_blank"
                        :whileHover="{ scale: 1.01 }"
                        :whilePress="{ scale: 0.97 }"
                        class="btn-clickup-ghost w-full text-center justify-center !py-2.5 !text-xs hover:border-[#18181b] hover:text-[#18181b] whitespace-nowrap shadow-2xs"
                      >
                        <i
                          class="fa-solid fa-file-zipper mr-1.5 shrink-0"
                          aria-hidden="true"
                        ></i>
                        <span>Tải Bản Portable (.zip)</span>
                      </motion.a>

                      <div
                        class="pt-2 text-[11px] text-[#71717a] flex items-center justify-between text-center border-t border-[#f4f4f5] gap-1"
                      >
                        <span class="whitespace-nowrap">1. Tải .zip</span>
                        <span class="text-[#d4d4d8] shrink-0">&rarr;</span>
                        <span class="whitespace-nowrap">2. Giải nén</span>
                        <span class="text-[#d4d4d8] shrink-0">&rarr;</span>
                        <span class="whitespace-nowrap">3. Mở chạy ngay</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Windows SmartScreen & Antivirus Guide Note -->
                <div
                  class="p-4 sm:p-5 rounded-2xl bg-[#f8f9fa] border border-[#e4e4e7] space-y-3.5"
                >
                  <div class="flex items-center gap-2.5">
                    <div>
                      <h4 class="text-xs sm:text-sm font-bold text-[#18181b]">
                        Hướng dẫn cài đặt &amp; Vượt cảnh báo bảo vệ Windows
                        SmartScreen
                      </h4>
                    </div>
                  </div>

                  <div
                    class="p-3 rounded-xl bg-white border border-[#e4e4e7] text-xs text-[#52525b] leading-relaxed space-y-1"
                  >
                    <div
                      class="font-semibold text-[#18181b] flex items-center gap-1.5"
                    >
                      <i
                        class="fa-solid fa-circle-info text-[#00529c] text-xs"
                      ></i>
                      <span>Vì sao có cảnh báo phần mềm lạ / virus?</span>
                    </div>
                    <p class="text-[11px] text-[#52525b] text-pretty">
                      CTU Scheduler là dự án mã nguồn mở phi lợi nhuận do sinh
                      viên phát triển, chưa mua chứng chỉ số doanh nghiệp (EV
                      Code Signing $400+/năm từ Microsoft). Do đó, Windows
                      Defender SmartScreen và một số trình diệt virus sẽ hiện
                      cảnh báo phòng ngừa (false-positive). Mã nguồn ứng dụng
                      hoàn toàn công khai 100% trên GitHub và tuyệt đối an toàn.
                    </p>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div
                      class="p-3 rounded-xl bg-white border border-[#e4e4e7] space-y-1"
                    >
                      <div
                        class="font-semibold text-[#18181b] flex items-center gap-1.5"
                      >
                        <span
                          class="w-5 h-5 rounded-full bg-[#f4f4f5] text-[#18181b] flex items-center justify-center text-[11px] font-bold shrink-0"
                          >1</span
                        >
                        <span>Màn hình SmartScreen</span>
                      </div>
                      <p
                        class="text-[#71717a] text-[11px] leading-relaxed pl-6.5 text-pretty"
                      >
                        Nếu thấy bảng xanh <em>"Windows protected your PC"</em>,
                        hãy bấm vào dòng chữ gạch chân <strong>"More info"</strong> (hoặc
                        <em>Thông tin khác</em>).
                      </p>
                    </div>

                    <div
                      class="p-3 rounded-xl bg-white border border-[#e4e4e7] space-y-1"
                    >
                      <div
                        class="font-semibold text-[#18181b] flex items-center gap-1.5"
                      >
                        <span
                          class="w-5 h-5 rounded-full bg-[#f4f4f5] text-[#18181b] flex items-center justify-center text-[11px] font-bold shrink-0"
                          >2</span
                        >
                        <span>Xác nhận khởi chạy</span>
                      </div>
                      <p
                        class="text-[#71717a] text-[11px] leading-relaxed pl-6.5 text-pretty"
                      >
                        Bấm nút <strong>"Run anyway"</strong> (hoặc <em>Vẫn chạy</em>)
                        xuất hiện ở góc dưới để bắt đầu sử dụng. Nếu dùng phần
                        mềm diệt virus bên thứ 3, hãy chọn <em>"Cho phép / Allow"</em>.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <!-- ========================================== -->
              <!-- TAB 2: MACOS                              -->
              <!-- ========================================== -->
              <motion.div
                v-else-if="activeOsTab === 'macos'"
                key="macos"
                :initial="{ opacity: 0, y: 8 }"
                :animate="{ opacity: 1, y: 0 }"
                :exit="{ opacity: 0, y: -8 }"
                :transition="{ duration: 0.22, ease: [0.33, 1, 0.68, 1] }"
                class="p-6 rounded-2xl border border-[#e4e4e7] bg-white space-y-5 shadow-2xs"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <span
                      class="w-9 h-9 rounded-xl bg-[#f4f4f5] text-[#18181b] flex items-center justify-center text-base shrink-0"
                    >
                      <i class="fa-brands fa-apple" aria-hidden="true"></i>
                    </span>
                    <div>
                      <h3
                        class="text-base font-bold text-[#18181b] font-display"
                      >
                        CTU Scheduler cho macOS
                      </h3>
                      <p class="text-xs text-[#71717a]">
                        Tương thích Apple Silicon (M1–M4) &amp; Intel 64-bit
                      </p>
                    </div>
                  </div>
                  <span
                    class="text-xs px-2.5 py-0.5 rounded-full bg-[#f4f4f5] text-[#52525b] border border-[#e4e4e7] font-medium"
                  >
                    Đang thử nghiệm
                  </span>
                </div>

                <p class="text-xs text-[#52525b] leading-relaxed">
                  Phiên bản macOS đang trong giai đoạn hoàn thiện chữ ký số. Sinh
                  viên dùng Mac có thể chạy trực tiếp từ mã nguồn hoặc thông qua
                  máy ảo Windows:
                </p>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                  <div
                    class="p-3.5 rounded-xl bg-[#f8f9fa] border border-[#e4e4e7] space-y-2"
                  >
                    <div class="font-semibold text-[#18181b]">
                      Cách 1: Chạy từ mã nguồn Node.js
                    </div>
                    <p class="text-[#71717a] text-[11px]">
                      Dành cho sinh viên ngành CNTT có cài sẵn Node.js:
                    </p>
                    <div
                      class="p-2 rounded bg-white border border-[#e4e4e7] text-[11px] font-sans space-y-0.5 text-[#27272a]"
                    >
                      <div>
                        <code
                          >git clone
                          https://github.com/d3nhatv0lam/CTU-Scheduler.git</code
                        >
                      </div>
                      <div><code>npm install &amp;&amp; npm start</code></div>
                    </div>
                  </div>

                  <div
                    class="p-3.5 rounded-xl bg-[#f8f9fa] border border-[#e4e4e7] space-y-2 flex flex-col justify-between"
                  >
                    <div>
                      <div class="font-semibold text-[#18181b]">
                        Cách 2: Máy ảo Windows trên Mac
                      </div>
                      <p class="text-[#71717a] text-[11px]">
                        Sử dụng VMware Fusion Pro (miễn phí) hoặc Parallels để
                        chạy file Setup của Windows.
                      </p>
                    </div>
                    <a
                      href="https://github.com/d3nhatv0lam/CTU-Scheduler/wiki"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-[#00529c] font-semibold text-[11px] hover:underline flex items-center gap-1"
                    >
                      <span>Xem hướng dẫn chi tiết</span>
                      <i class="fa-solid fa-arrow-right text-[11px]" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>

                <!-- macOS Gatekeeper Guidance Note -->
                <div
                  class="p-4 sm:p-5 rounded-2xl bg-[#f8f9fa] border border-[#e4e4e7] space-y-3.5 mt-2"
                >
                  <div class="flex items-center gap-2.5">
                    <div>
                      <h4 class="text-xs sm:text-sm font-bold text-[#18181b]">
                        Lưu ý bảo mật &amp; Vượt cảnh báo Apple Gatekeeper trên
                        macOS
                      </h4>
                      <p class="text-[11px] text-[#71717a]">
                        Xử lý cảnh báo "App cannot be opened because developer
                        cannot be verified" hoặc "is damaged"
                      </p>
                    </div>
                  </div>

                  <div
                    class="p-3 rounded-xl bg-white border border-[#e4e4e7] text-xs text-[#52525b] leading-relaxed space-y-1"
                  >
                    <div
                      class="font-semibold text-[#18181b] flex items-center gap-1.5"
                    >
                      <i
                        class="fa-solid fa-circle-info text-[#00529c] text-xs"
                      ></i>
                      <span>Vì sao macOS chặn mở ứng dụng?</span>
                    </div>
                    <p class="text-[11px] text-[#52525b] text-pretty">
                      Apple yêu cầu mọi phần mềm phải đăng ký chứng chỉ Apple
                      Developer ($99/năm) và qua quy trình công chứng
                      (Notarization). Là ứng dụng phi lợi nhuận cho sinh viên,
                      CTU Scheduler chưa mua chứng chỉ này nên hệ thống
                      Gatekeeper sẽ tự động chặn hoặc báo file hỏng. Mã nguồn
                      100% công khai và an toàn tuyệt đối.
                    </p>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div
                      class="p-3 rounded-xl bg-white border border-[#e4e4e7] space-y-1"
                    >
                      <div
                        class="font-semibold text-[#18181b] flex items-center gap-1.5"
                      >
                        <span
                          class="w-5 h-5 rounded-full bg-[#f4f4f5] text-[#18181b] flex items-center justify-center text-[11px] font-bold shrink-0"
                          >1</span
                        >
                        <span>Control + Click (Nhanh nhất)</span>
                      </div>
                      <p
                        class="text-[#71717a] text-[11px] leading-relaxed pl-6.5 text-pretty"
                      >
                        Nhấn giữ phím <strong>Control</strong> rồi click vào file app
                        &rarr; chọn <strong>Open</strong> &rarr; nhấn
                        <strong>Open</strong> tại hộp thoại xác nhận.
                      </p>
                    </div>

                    <div
                      class="p-3 rounded-xl bg-white border border-[#e4e4e7] space-y-1"
                    >
                      <div
                        class="font-semibold text-[#18181b] flex items-center gap-1.5"
                      >
                        <span
                          class="w-5 h-5 rounded-full bg-[#f4f4f5] text-[#18181b] flex items-center justify-center text-[11px] font-bold shrink-0"
                          >2</span
                        >
                        <span>Mở từ System Settings</span>
                      </div>
                      <p
                        class="text-[#71717a] text-[11px] leading-relaxed pl-6.5 text-pretty"
                      >
                        Vào <strong>Cài đặt hệ thống</strong> &rarr;
                        <strong>Quyền riêng tư &amp; Bảo mật</strong> &rarr;
                        cuộn xuống mục Bảo mật và bấm
                        <strong>Open Anyway</strong>.
                      </p>
                    </div>

                    <div
                      class="p-3 rounded-xl bg-white border border-[#e4e4e7] space-y-1"
                    >
                      <div
                        class="font-semibold text-[#18181b] flex items-center gap-1.5"
                      >
                        <span
                          class="w-5 h-5 rounded-full bg-[#f4f4f5] text-[#18181b] flex items-center justify-center text-[11px] font-bold shrink-0"
                          >3</span
                        >
                        <span>Lệnh Terminal (Gỡ cách ly)</span>
                      </div>
                      <p
                        class="text-[#71717a] text-[11px] leading-relaxed pl-6.5 text-pretty"
                      >
                        Nếu báo "is damaged", mở Terminal và chạy:
                        <code
                          class="text-[#090c1d] font-semibold bg-[#f4f4f5] px-1 py-0.5 rounded"
                          >xattr -cr /Applications/CTU-Scheduler.app</code
                        >.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <!-- ========================================== -->
              <!-- TAB 3: LINUX                              -->
              <!-- ========================================== -->
              <motion.div
                v-else-if="activeOsTab === 'linux'"
                key="linux"
                :initial="{ opacity: 0, y: 8 }"
                :animate="{ opacity: 1, y: 0 }"
                :exit="{ opacity: 0, y: -8 }"
                :transition="{ duration: 0.22, ease: [0.33, 1, 0.68, 1] }"
                class="p-6 rounded-2xl border border-[#e4e4e7] bg-white space-y-5 shadow-2xs"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <span
                      class="w-9 h-9 rounded-xl bg-[#f4f4f5] text-[#18181b] flex items-center justify-center text-base shrink-0"
                    >
                      <i class="fa-brands fa-linux" aria-hidden="true"></i>
                    </span>
                    <div>
                      <h3
                        class="text-base font-bold text-[#18181b] font-display"
                      >
                        CTU Scheduler cho Linux
                      </h3>
                      <p class="text-xs text-[#71717a]">
                        Tương thích Ubuntu, Debian, Fedora, Arch Linux
                      </p>
                    </div>
                  </div>
                </div>

                <p class="text-xs text-[#52525b] leading-relaxed">
                  Bạn có thể tự đóng gói bản <code>.AppImage</code> hoặc
                  <code>.deb</code> trực tiếp từ repository với các lệnh đơn
                  giản:
                </p>

                <div
                  class="p-3.5 rounded-xl bg-[#f8f9fa] border border-[#e4e4e7] space-y-2 text-xs"
                >
                  <div
                    class="p-2.5 rounded bg-white border border-[#e4e4e7] text-[11px] font-sans space-y-1 text-[#27272a]"
                  >
                    <div>
                      <code
                        >git clone
                        https://github.com/d3nhatv0lam/CTU-Scheduler.git</code
                      >
                    </div>
                    <div>
                      <code>cd CTU-Scheduler &amp;&amp; npm install</code>
                    </div>
                    <div><code>npm run build:linux</code></div>
                  </div>
                  <div class="pt-1">
                    <a
                      href="https://github.com/d3nhatv0lam/CTU-Scheduler"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="btn-clickup-ghost !py-1.5 !px-3 !text-xs inline-flex items-center gap-1.5"
                    >
                      <i
                        class="fa-brands fa-github text-xs"
                        aria-hidden="true"
                      ></i>
                      <span>Kho mã nguồn GitHub</span>
                    </a>
                  </div>
                </div>

                <!-- Linux Permission & FUSE Guidance Note -->
                <div
                  class="p-4 sm:p-5 rounded-2xl bg-[#f8f9fa] border border-[#e4e4e7] space-y-3.5 mt-2"
                >
                  <div class="flex items-center gap-2.5">
                    <div>
                      <h4 class="text-xs sm:text-sm font-bold text-[#18181b]">
                        Hướng dẫn cấp quyền thực thi &amp; Cài đặt FUSE trên Linux
                      </h4>
                      <p class="text-[11px] text-[#71717a]">
                        Khắc phục lỗi không mở được file .AppImage trên Ubuntu
                        22.04+, Debian, Fedora
                      </p>
                    </div>
                  </div>

                  <div
                    class="p-3 rounded-xl bg-white border border-[#e4e4e7] text-xs text-[#52525b] leading-relaxed space-y-1"
                  >
                    <div
                      class="font-semibold text-[#18181b] flex items-center gap-1.5"
                    >
                      <i
                        class="fa-solid fa-circle-info text-[#00529c] text-xs"
                      ></i>
                      <span>Vì sao file tải về không chạy khi double-click?</span>
                    </div>
                    <p class="text-[11px] text-[#52525b] text-pretty">
                      Linux mặc định không tự động cấp quyền thực thi (executable
                      bit) cho file tải từ Internet để bảo vệ người dùng, đồng
                      thời các bản phân phối mới (như Ubuntu 22.04 trở lên) chưa
                      cài sẵn thư viện FUSE 2 cần cho AppImage.
                    </p>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div
                      class="p-3 rounded-xl bg-white border border-[#e4e4e7] space-y-1"
                    >
                      <div
                        class="font-semibold text-[#18181b] flex items-center gap-1.5"
                      >
                        <span
                          class="w-5 h-5 rounded-full bg-[#f4f4f5] text-[#18181b] flex items-center justify-center text-[11px] font-bold shrink-0"
                          >1</span
                        >
                        <span>Cấp quyền chạy (Executable)</span>
                      </div>
                      <p
                        class="text-[#71717a] text-[11px] leading-relaxed pl-6.5 text-pretty"
                      >
                        Click chuột phải vào file &rarr;
                        <strong>Properties</strong> &rarr;
                        <strong>Permissions</strong> &rarr; Tích chọn
                        <em>"Allow executing file as program"</em>. Hoặc
                        Terminal:
                        <code
                          class="text-[#090c1d] font-semibold bg-[#f4f4f5] px-1 py-0.5 rounded"
                          >chmod +x CTU-Scheduler*.AppImage</code
                        >.
                      </p>
                    </div>

                    <div
                      class="p-3 rounded-xl bg-white border border-[#e4e4e7] space-y-1"
                    >
                      <div
                        class="font-semibold text-[#18181b] flex items-center gap-1.5"
                      >
                        <span
                          class="w-5 h-5 rounded-full bg-[#f4f4f5] text-[#18181b] flex items-center justify-center text-[11px] font-bold shrink-0"
                          >2</span
                        >
                        <span>Cài FUSE nếu không mở được</span>
                      </div>
                      <p
                        class="text-[#71717a] text-[11px] leading-relaxed pl-6.5 text-pretty"
                      >
                        Nếu nhấn đúp không mở, mở Terminal và chạy lệnh:
                        <code
                          class="text-[#090c1d] font-semibold bg-[#f4f4f5] px-1 py-0.5 rounded"
                          >sudo apt install libfuse2</code
                        >
                        (dành cho Ubuntu/Debian).
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <!-- ==================================================== -->
        <!-- BOTTOM DRAWER: All Releases & Changelog Updates      -->
        <!-- ==================================================== -->
        <div
          class="pt-5 border-t border-[#e4e4e7] space-y-4"
        >
          <div
            class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-[#71717a]"
          >
            <div class="flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <span>
                Phiên bản mới nhất:
                <strong class="text-[#18181b] font-bold">{{
                  currentRelease.tag_name
                }}</strong>
              </span>
              <span class="text-[#d4d4d8]">·</span>
              <span class="text-[#00529c] font-semibold tabular-nums"
                >{{ totalDownloads.toLocaleString("vi-VN") }} lượt tải</span
              >
              <span class="text-[#d4d4d8]">·</span>
              <span>Ngày phát hành: {{ formatDate(currentRelease.published_at) }}</span>
            </div>

            <div class="flex items-center gap-3 self-start sm:self-auto">
              <motion.button
                type="button"
                :whileHover="{ scale: 1.02 }"
                :whilePress="{ scale: 0.96 }"
                class="text-[#52525b] hover:text-[#00529c] font-semibold cursor-pointer flex items-center gap-1.5"
                @click="showAllAssets = !showAllAssets"
              >
                <i
                  :class="showAllAssets ? 'fa-solid fa-folder-open' : 'fa-solid fa-folder'"
                  class="text-[11px]"
                  aria-hidden="true"
                ></i>
                <span>{{
                  showAllAssets
                    ? "Đóng danh sách file"
                    : `Xem tất cả ${validAssets.length} file phát hành`
                }}</span>
              </motion.button>
              <span>·</span>
              <motion.button
                v-if="currentRelease.body"
                type="button"
                :whileHover="{ scale: 1.02 }"
                :whilePress="{ scale: 0.96 }"
                class="text-[#52525b] hover:text-[#00529c] font-semibold cursor-pointer flex items-center gap-1.5"
                @click="showChangelog = !showChangelog"
              >
                <i
                  :class="showChangelog ? 'fa-solid fa-chevron-up' : 'fa-solid fa-clock-rotate-left'"
                  class="text-[11px]"
                  aria-hidden="true"
                ></i>
                <span>{{
                  showChangelog
                    ? "Đóng nhật ký cập nhật"
                    : "Xem nhật ký cập nhật"
                }}</span>
              </motion.button>
            </div>
          </div>

          <!-- Collapsible All Files Drawer -->
          <AnimatePresence :initial="false">
            <motion.div
              v-if="showAllAssets"
              :initial="{ height: 0, opacity: 0 }"
              :animate="{ height: 'auto', opacity: 1 }"
              :exit="{ height: 0, opacity: 0 }"
              :transition="{ duration: 0.28, ease: [0.33, 1, 0.68, 1] }"
              class="overflow-hidden"
            >
              <div
                class="p-4 sm:p-5 rounded-2xl border border-[#e4e4e7] bg-[#f8f9fa] space-y-3 text-xs"
              >
                <div class="font-bold text-[#18181b] flex items-center gap-2">
                  <i class="fa-solid fa-box-open text-[#00529c]" aria-hidden="true"></i>
                  <span>Tất cả tập tin phát hành của phiên bản {{ currentRelease.tag_name }}:</span>
                </div>
                <div
                  class="divide-y divide-[#e4e4e7] bg-white border border-[#e4e4e7] rounded-xl overflow-hidden shadow-2xs"
                >
                  <div
                    v-for="asset in validAssets"
                    :key="asset.id"
                    class="p-3 px-4 flex items-center justify-between hover:bg-[#f8fafc] transition-colors"
                  >
                    <div class="flex items-center gap-3 min-w-0">
                      <i
                        :class="getAssetIcon(asset.name)"
                        class="text-sm text-[#71717a] shrink-0"
                        aria-hidden="true"
                      ></i>
                      <span
                        class="text-xs font-semibold text-[#18181b] truncate"
                        >{{ asset.name }}</span
                      >
                      <span
                        class="text-[11px] text-[#71717a] tabular-nums shrink-0"
                        >({{ formatBytes(asset.size) }} · {{ (asset.download_count || 0).toLocaleString("vi-VN") }} lượt tải)</span
                      >
                    </div>
                    <a
                      :href="asset.browser_download_url"
                      target="_blank"
                      class="text-xs text-[#00529c] hover:underline font-semibold ml-2 shrink-0 flex items-center gap-1"
                    >
                      <span>Tải xuống</span>
                      <i class="fa-solid fa-download text-[11px]" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <!-- Collapsible Markdown Changelog Drawer -->
          <AnimatePresence :initial="false">
            <motion.div
              v-if="showChangelog"
              :initial="{ height: 0, opacity: 0 }"
              :animate="{ height: 'auto', opacity: 1 }"
              :exit="{ height: 0, opacity: 0 }"
              :transition="{ duration: 0.28, ease: [0.33, 1, 0.68, 1] }"
              class="overflow-hidden"
            >
              <div
                class="p-5 sm:p-6 rounded-2xl border border-[#e4e4e7] bg-[#f8f9fa] text-xs leading-relaxed overflow-x-auto markdown-prose shadow-2xs space-y-3"
              >
                <div class="font-bold text-[#18181b] text-sm flex items-center gap-2 border-b border-[#e4e4e7] pb-2">
                  <i class="fa-solid fa-scroll text-[#00529c]" aria-hidden="true"></i>
                  <span>Nhật ký phát hành phiên bản {{ currentRelease.tag_name }}</span>
                </div>
                <div v-html="renderedMarkdownBody"></div>
              </div>
            </motion.div>
          </AnimatePresence>

          <!-- Security & Open Source Disclaimer -->
          <div
            class="pt-3 text-[11px] text-[#71717a] leading-relaxed border-t border-[#f4f4f5] space-y-1"
          >
            <p>
              <strong class="text-[#52525b]"
                >Bảo mật &amp; Miễn trừ trách nhiệm:</strong
              >
              Mọi thao tác trích xuất và kết nối diễn ra trực tiếp giữa máy tính
              cá nhân của bạn và hệ thống MyCTU qua giao thức HTTPS bảo mật,
              không chuyển qua bất kỳ máy chủ trung gian nào. Mật khẩu không bao
              giờ bị ghi lại. Phần mềm phát hành phi lợi nhuận theo giấy phép MIT
              "AS IS".
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { motion, AnimatePresence } from "motion-v";
import { marked } from "marked";
import { detectDevice, OS, ARCH } from "../../js/detector.js";

const loading = ref(true);
const latestRelease = ref(null);
const allReleases = ref([]);
const showChangelog = ref(false);
const showAllAssets = ref(false);
const activeOsTab = ref("windows");
const hasSwitchedTab = ref(false);
const userDevice = ref({ os: OS.WINDOWS, arch: ARCH.X64 });

const osTabs = [
  {
    id: "windows",
    osKey: OS.WINDOWS,
    label: "Windows",
    desc: "Bản Cài đặt & Portable",
    icon: "fa-brands fa-windows",
  },
  {
    id: "macos",
    osKey: OS.MACOS,
    label: "macOS",
    desc: "Apple Silicon & Intel",
    icon: "fa-brands fa-apple",
  },
  {
    id: "linux",
    osKey: OS.LINUX,
    label: "Linux",
    desc: "Mã nguồn & AppImage",
    icon: "fa-brands fa-linux",
  },
];

function selectOsTab(tab) {
  if (activeOsTab.value !== tab) {
    hasSwitchedTab.value = true;
    activeOsTab.value = tab;
  }
}

const CACHE_KEY = "ctu_release_data_v3";
const CACHE_TIME_KEY = "ctu_release_timestamp_v3";
const CACHE_DURATION = 10 * 60 * 1000;

// High-confidence fallback release if GitHub API is throttled/offline
const FALLBACK_RELEASE = {
  tag_name: "v1.2.0",
  name: "CTU Scheduler v1.2.0",
  published_at: "2026-11-08T00:00:00Z",
  body: "### Thông tin phiên bản mới nhất\n- Tự động hóa xếp lịch học thông minh, loại trừ 100% trùng tiết.\n- Tự động cập nhật sĩ số thời gian thực trực tiếp từ MyCTU.\n- Xem chi tiết toàn bộ các bản phát hành tại GitHub Releases.",
  assets: [
    {
      id: 1,
      name: "ctu-scheduler-win-Setup.exe",
      size: 78540000,
      download_count: 48,
      browser_download_url:
        "https://github.com/d3nhatv0lam/CTU-Scheduler/releases/latest",
    },
    {
      id: 2,
      name: "ctu-scheduler-win-Portable.zip",
      size: 82150000,
      download_count: 401,
      browser_download_url:
        "https://github.com/d3nhatv0lam/CTU-Scheduler/releases/latest",
    },
  ],
};

const currentRelease = computed(() => {
  return latestRelease.value || FALLBACK_RELEASE;
});

// Calculate total downloads across ALL releases (excluding internal auto-update manifests)
const totalDownloads = computed(() => {
  if (allReleases.value && allReleases.value.length > 0) {
    let count = 0;
    for (const rel of allReleases.value) {
      if (!rel.assets) continue;
      for (const a of rel.assets) {
        if (!isIgnoredAsset(a.name)) {
          count += a.download_count || 0;
        }
      }
    }
    if (count > 0) return count;
  }
  return 449;
});

// Cumulative downloads for Setup edition across all releases
const setupTotalDownloads = computed(() => {
  if (allReleases.value && allReleases.value.length > 0) {
    let count = 0;
    for (const rel of allReleases.value) {
      if (!rel.assets) continue;
      for (const a of rel.assets) {
        if (isIgnoredAsset(a.name)) continue;
        const n = a.name.toLowerCase();
        if (
          n.includes("setup") ||
          (n.endsWith(".exe") && !n.includes("portable")) ||
          n.endsWith(".pkg")
        ) {
          count += a.download_count || 0;
        }
      }
    }
    if (count > 0) return count;
  }
  return recommendedSetupAsset.value?.download_count || 48;
});

// Cumulative downloads for Portable / Archive edition across all releases
const portableTotalDownloads = computed(() => {
  if (allReleases.value && allReleases.value.length > 0) {
    let count = 0;
    for (const rel of allReleases.value) {
      if (!rel.assets) continue;
      for (const a of rel.assets) {
        if (isIgnoredAsset(a.name)) continue;
        const n = a.name.toLowerCase();
        if (
          n.includes("portable") ||
          n.endsWith(".zip") ||
          n.endsWith(".tar.gz") ||
          n.endsWith(".appimage")
        ) {
          count += a.download_count || 0;
        }
      }
    }
    if (count > 0) return count;
  }
  return portableAsset.value?.download_count || 401;
});

const detectedDeviceLabel = computed(() => {
  const os = userDevice.value.os;
  if (os === OS.WINDOWS) return "Windows";
  if (os === OS.MACOS) return "macOS";
  if (os === OS.LINUX) return "Linux";
  if (os === OS.ANDROID) return "Android";
  if (os === OS.IOS) return "iOS";
  return "Desktop";
});

const detectedArchLabel = computed(() => {
  const arch = userDevice.value.arch;
  if (arch === ARCH.X64) return "x86_64 (Intel & AMD)";
  if (arch === ARCH.ARM64) return "ARM64";
  return "64-bit";
});

const currentDeviceFullLabel = computed(() => {
  const os = userDevice.value.os;
  const arch = detectedArchLabel.value;
  if (os === OS.WINDOWS) return `Windows · ${arch}`;
  if (os === OS.MACOS) return `macOS · Apple Silicon & Intel 64-bit`;
  if (os === OS.LINUX) return `Linux · ${arch}`;
  if (os === OS.ANDROID) return `Android (Thiết bị di động)`;
  if (os === OS.IOS) return `iOS / iPadOS (Thiết bị di động)`;
  return `Máy tính · ${arch}`;
});

const isMobileUser = computed(() => {
  return userDevice.value.os === OS.ANDROID || userDevice.value.os === OS.IOS;
});

const linkCopied = ref(false);

async function copyDownloadLink() {
  const url = window.location.origin + window.location.pathname + "#download";
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(url);
    } else {
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }
    linkCopied.value = true;
    setTimeout(() => {
      linkCopied.value = false;
    }, 2500);
  } catch (err) {
    console.error("Không thể sao chép liên kết:", err);
  }
}

function isIgnoredAsset(filename) {
  const name = filename.toLowerCase();
  return (
    name.endsWith(".nupkg") ||
    name.endsWith(".json") ||
    name === "releases" ||
    name.endsWith(".blockmap")
  );
}

const validAssets = computed(() => {
  if (!currentRelease.value?.assets) return [];
  return currentRelease.value.assets.filter((a) => !isIgnoredAsset(a.name));
});

// Setup Installer (Auto update)
const recommendedSetupAsset = computed(() => {
  if (!validAssets.value.length) return null;
  return (
    validAssets.value.find((a) => {
      const n = a.name.toLowerCase();
      return n.includes("setup") && n.endsWith(".exe") && !n.includes("arm64");
    }) ||
    validAssets.value.find((a) => a.name.endsWith(".exe")) ||
    validAssets.value[0]
  );
});

// Portable Edition (.zip or portable .exe)
const portableAsset = computed(() => {
  if (!validAssets.value.length) return null;
  return (
    validAssets.value.find((a) => {
      const n = a.name.toLowerCase();
      return (
        (n.endsWith(".zip") || n.includes("portable")) && !n.includes("setup")
      );
    }) ||
    validAssets.value.find((a) => a.name.endsWith(".zip")) ||
    validAssets.value[1] ||
    validAssets.value[0]
  );
});

// Parse release notes markdown with marked
const renderedMarkdownBody = computed(() => {
  if (!currentRelease.value?.body) return "";
  try {
    return marked.parse(currentRelease.value.body);
  } catch {
    return currentRelease.value.body;
  }
});

function getAssetIcon(filename) {
  const n = filename.toLowerCase();
  if (n.endsWith(".exe")) return "fa-brands fa-windows";
  if (n.endsWith(".zip")) return "fa-solid fa-box-archive";
  if (n.endsWith(".pkg") || n.endsWith(".dmg")) return "fa-brands fa-apple";
  if (n.endsWith(".appimage") || n.endsWith(".deb"))
    return "fa-brands fa-linux";
  return "fa-solid fa-file";
}

function formatDate(dateStr) {
  try {
    const d = new Date(dateStr);
    return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
  } catch {
    return dateStr;
  }
}

function formatBytes(bytes) {
  if (!bytes) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

async function fetchReleases() {
  loading.value = true;

  try {
    const cached = localStorage.getItem(CACHE_KEY);
    const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
    if (
      cached &&
      cachedTime &&
      Date.now() - parseInt(cachedTime, 10) < CACHE_DURATION
    ) {
      const data = JSON.parse(cached);
      if (Array.isArray(data)) {
        allReleases.value = data;
        latestRelease.value = data[0];
      } else {
        allReleases.value = [data];
        latestRelease.value = data;
      }
      loading.value = false;
      return;
    }
  } catch (e) {
    // ignore cache parse error
  }

  try {
    const res = await fetch(
      "https://api.github.com/repos/d3nhatv0lam/CTU-Scheduler/releases?per_page=100",
    );
    if (!res.ok) throw new Error("Network error");
    const data = await res.json();
    if (Array.isArray(data)) {
      allReleases.value = data;
      latestRelease.value = data[0];
    } else {
      allReleases.value = [data];
      latestRelease.value = data;
    }
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
      localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
    } catch {}
  } catch (err) {
    latestRelease.value = FALLBACK_RELEASE;
    allReleases.value = [FALLBACK_RELEASE];
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  try {
    const device = await detectDevice();
    userDevice.value = device;
    if (device.os === OS.MACOS) {
      activeOsTab.value = "macos";
    } else if (device.os === OS.LINUX) {
      activeOsTab.value = "linux";
    } else {
      activeOsTab.value = "windows";
    }
  } catch {
    activeOsTab.value = "windows";
  }

  fetchReleases();
});
</script>
