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
          Phần mềm mã nguồn mở phục vụ sinh viên Đại học Cần Thơ. Hỗ trợ đầy đủ
          Windows, macOS và Linux.
        </p>
        <div
          class="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-[#71717a]"
        >
          <span
            class="inline-flex items-center gap-1.5 font-medium tabular-nums"
          >
            <i
              class="fa-solid fa-download text-[11px] text-[#00529c]"
              aria-hidden="true"
            ></i>
            <span>{{ totalDownloads.toLocaleString("vi-VN") }} lượt tải</span>
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
        <!-- Mobile Device Notice (Tự động hiển thị khi khách truy cập bằng Android hoặc iOS) -->
        <motion.div
          v-if="isMobileUser"
          :initial="{ opacity: 0, y: -6 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }"
          class="p-4 rounded-xl bg-[#fffbeb] border border-[#fef3c7] text-[#92400e] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
        >
          <div class="space-y-0.5">
            <div class="font-bold text-[#78350f] flex items-center gap-1.5">
              <i
                class="fa-solid fa-circle-exclamation text-xs"
                aria-hidden="true"
              ></i>
              <span>Chưa hỗ trợ {{ detectedDeviceLabel }}</span>
            </div>
            <p class="text-[#92400e] text-[11px] leading-relaxed text-pretty">
              CTU Scheduler chạy trên môi trường máy tính (Windows, macOS,
              Linux). Hãy sao chép liên kết để mở tải về trên máy tính của bạn.
            </p>
          </div>

          <motion.button
            type="button"
            :whileHover="{ scale: 1.02 }"
            :whilePress="{ scale: 0.97 }"
            class="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white border border-[#fde68a] hover:bg-[#fef9c3] text-[#78350f] text-xs font-semibold cursor-pointer whitespace-nowrap self-stretch sm:self-auto justify-center transition-colors"
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
              linkCopied ? "Đã sao chép!" : "Chép link mở trên PC"
            }}</span>
          </motion.button>
        </motion.div>

        <!-- ======================================================== -->
        <!-- MASTER GRID WORKBENCH (Khung Grid Phân Khu Rõ Ràng)       -->
        <!-- ======================================================== -->
        <div
          class="rounded-2xl border border-[#e4e4e7] bg-white overflow-hidden shadow-2xs divide-y divide-[#e4e4e7]"
        >
          <!-- 1. TOP UTILITY HEADER: Device & Architecture Bar + Version Highlight -->
          <div
            class="px-5 sm:px-6 py-3.5 bg-[#f8f9fa] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs select-none"
          >
            <div class="flex items-center gap-2.5">
              <span class="w-2 h-2 rounded-full bg-[#00c07a] shrink-0"></span>
              <span class="text-[#71717a]"
                >Thiết bị &amp; Kiến trúc:</span
              >
              <strong class="text-[#18181b] font-semibold">{{
                currentDeviceFullLabel
              }}</strong>
            </div>

            <div class="flex items-center gap-2 text-xs">
              <span class="text-[#71717a]">Bản mới nhất:</span>
              <span
                class="px-2.5 py-0.5 rounded-full bg-[#00529c]/10 text-[#00529c] font-bold font-mono text-[11px] border border-[#00529c]/20"
              >
                {{ currentRelease.tag_name }}
              </span>
              <span class="hidden sm:inline text-[#d4d4d8]">·</span>
              <span class="hidden sm:inline text-[#71717a]"
                >Phát hành {{ formatDate(currentRelease.published_at) }}</span
              >
            </div>
          </div>

          <!-- 2. CORE WORKBENCH GRID: Left 3 OS Tabs + Right Content Canvas -->
          <div
            class="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#e4e4e7]"
          >
            <!-- ==================================================== -->
            <!-- LEFT COLUMN: 3 OS Navigation Tabs (Full Height Grid) -->
            <!-- ==================================================== -->
            <div
              class="lg:col-span-4 xl:col-span-3 bg-[#fafafa] flex flex-col justify-stretch"
            >
              <div
                class="relative grid grid-cols-3 lg:flex lg:flex-col lg:h-full divide-x lg:divide-x-0 lg:divide-y divide-[#e4e4e7] overflow-hidden"
              >
                <!-- Hardware-accelerated Gliding Active Indicator (Pill & Accent Bar) -->
                <div
                  class="absolute top-0 left-0 pointer-events-none z-0 transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] bg-white shadow-2xs"
                  :class="isDesktop ? 'w-full h-1/3' : 'w-1/3 h-full'"
                  :style="{
                    transform: isDesktop
                      ? `translate3d(0, ${activeOsIndex * 100}%, 0)`
                      : `translate3d(${activeOsIndex * 100}%, 0, 0)`,
                  }"
                  aria-hidden="true"
                ></div>

                <motion.button
                  v-for="tab in osTabs"
                  :key="tab.id"
                  type="button"
                  :whileHover="{ scale: 1.01 }"
                  :whilePress="{ scale: 0.98 }"
                  class="relative z-10 text-left p-4 sm:p-5 lg:p-6 lg:flex-1 flex flex-col justify-center transition-colors duration-200 cursor-pointer select-none group focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00529c]"
                  :class="
                    activeOsTab === tab.id
                      ? 'text-[#18181b] font-semibold'
                      : 'text-[#71717a] hover:text-[#18181b]'
                  "
                  @click="selectOsTab(tab.id)"
                >
                  <div
                    class="flex flex-col sm:flex-row items-center sm:items-start lg:items-center justify-between gap-2.5"
                  >
                    <div
                      class="flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-3 min-w-0 text-center sm:text-left"
                    >
                      <div
                        class="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 transition-colors duration-200"
                      >
                        <i :class="tab.icon" aria-hidden="true"></i>
                      </div>
                      <div class="min-w-0">
                        <div
                          class="flex items-center gap-1.5 justify-center sm:justify-start"
                        >
                          <span
                            class="font-bold text-xs sm:text-sm font-display truncate"
                          >
                            {{ tab.label }}
                          </span>
                        </div>
                        <p
                          class="hidden sm:block text-[11px] text-[#71717a] truncate mt-0.5 font-normal"
                        >
                          {{ tab.desc }}
                        </p>
                      </div>
                    </div>

                    <i
                      class="hidden lg:block fa-solid fa-chevron-right text-xs shrink-0 transition-all duration-200"
                      :class="
                        activeOsTab === tab.id
                          ? 'text-[#00529c] translate-x-1 opacity-100'
                          : 'text-[#d4d4d8] opacity-50 group-hover:text-[#71717a] group-hover:opacity-100 group-hover:translate-x-0.5'
                      "
                      aria-hidden="true"
                    ></i>
                  </div>
                </motion.button>
              </div>
            </div>

            <!-- ==================================================== -->
            <!-- RIGHT COLUMN: Content Canvas with 2 Separated Zones -->
            <!-- Fixed Height on Desktop for Zero-Jitter Motion       -->
            <!-- ==================================================== -->
            <div
              class="lg:col-span-8 xl:col-span-9 bg-white min-w-0 relative lg:h-[590px] overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <!-- ========================================== -->
                <!-- TAB 1: WINDOWS CANVAS                     -->
                <!-- ========================================== -->
                <motion.div
                  v-if="activeOsTab === 'windows'"
                  key="windows"
                  :initial="{ opacity: 0, x: 18 }"
                  :animate="{ opacity: 1, x: 0 }"
                  :exit="{ opacity: 0, x: -18 }"
                  :transition="{ duration: 0.22, ease: [0.33, 1, 0.68, 1] }"
                  class="w-full h-full flex flex-col divide-y divide-[#e4e4e7] justify-between"
                >
                  <!-- Zone A: Download Files & Options -->
                  <div
                    class="p-6 sm:p-7 lg:p-8 space-y-4 flex flex-col justify-between"
                  >
                    <div>
                      <h3
                        class="text-base sm:text-lg font-bold text-[#18181b] font-display"
                      >
                        Tải CTU Scheduler {{ currentRelease.tag_name }} cho Windows
                      </h3>
                      <p class="text-xs text-[#71717a] mt-0.5">
                        Tương thích Windows 10 &amp; Windows 11 ({{
                          userDevice.arch === ARCH.ARM64 ? 'ARM64' : '64-bit'
                        }}) · Chọn bản cài đặt hoặc bản chạy ngay
                      </p>
                    </div>

                    <!-- 2 Editions in clean grid -->
                    <div
                      class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 flex-1 items-stretch"
                    >
                      <!-- Setup Edition -->
                      <div
                        class="p-5 rounded-xl border border-[#e4e4e7] bg-[#fafafa]/50 flex flex-col justify-between space-y-3 hover:border-[#cbd5e1] transition-colors"
                      >
                        <div class="space-y-1.5">
                          <div
                            class="flex items-baseline justify-between gap-2"
                          >
                            <h4
                              class="text-sm sm:text-base font-bold text-[#18181b]"
                            >
                              Bản Cài Đặt (Setup)
                            </h4>
                            <span
                              class="text-[11px] text-[#00529c] font-semibold"
                              >Tự cập nhật</span
                            >
                          </div>
                          <p
                            class="text-xs text-[#52525b] leading-relaxed text-pretty"
                          >
                            Khuyên dùng cho máy tính cá nhân. Tự động kiểm tra
                            và nâng cấp phiên bản mới mỗi khi khởi chạy.
                          </p>
                          <div
                            class="text-[11px] text-[#71717a] pt-1 tabular-nums font-mono"
                          >
                            {{
                              formatBytes(
                                recommendedSetupAsset?.size || 78500000,
                              )
                            }}
                            ·
                            {{ setupTotalDownloads.toLocaleString("vi-VN") }}
                            lượt tải
                          </div>
                        </div>

                        <motion.a
                          :href="
                            recommendedSetupAsset?.browser_download_url ||
                            'https://github.com/d3nhatv0lam/CTU-Scheduler/releases/latest'
                          "
                          target="_blank"
                          :whileHover="{ scale: 1.02 }"
                          :whilePress="{ scale: 0.96 }"
                          class="btn-clickup-primary w-full text-center justify-center !py-2.5 !text-xs whitespace-nowrap"
                        >
                          <i
                            class="fa-brands fa-windows mr-1.5 shrink-0"
                            aria-hidden="true"
                          ></i>
                          <span>Tải Bản Cài Đặt (.exe)</span>
                        </motion.a>
                      </div>

                      <!-- Portable Edition -->
                      <div
                        class="p-5 rounded-xl border border-[#e4e4e7] bg-[#fafafa]/50 flex flex-col justify-between space-y-3 hover:border-[#cbd5e1] transition-colors"
                      >
                        <div class="space-y-1.5">
                          <div
                            class="flex items-baseline justify-between gap-2"
                          >
                            <h4
                              class="text-sm sm:text-base font-bold text-[#18181b]"
                            >
                              Bản Chạy Ngay (Portable)
                            </h4>
                            <span
                              class="text-[11px] text-[#71717a] font-semibold"
                              >Không cần Admin</span
                            >
                          </div>
                          <p
                            class="text-xs text-[#52525b] leading-relaxed text-pretty"
                          >
                            Chạy trực tiếp không cần quyền Administrator. Thích
                            hợp dùng trên máy phòng thực hành hoặc USB.
                          </p>
                          <div
                            class="text-[11px] text-[#71717a] pt-1 tabular-nums font-mono"
                          >
                            {{ formatBytes(portableAsset?.size || 82100000) }}
                            ·
                            {{ portableTotalDownloads.toLocaleString("vi-VN") }}
                            lượt tải
                          </div>
                        </div>

                        <motion.a
                          :href="
                            portableAsset?.browser_download_url ||
                            'https://github.com/d3nhatv0lam/CTU-Scheduler/releases/latest'
                          "
                          target="_blank"
                          :whileHover="{ scale: 1.02 }"
                          :whilePress="{ scale: 0.96 }"
                          class="btn-clickup-ghost w-full text-center justify-center !py-2.5 !text-xs hover:border-[#18181b] hover:text-[#18181b] whitespace-nowrap"
                        >
                          <i
                            class="fa-solid fa-file-zipper mr-1.5 shrink-0"
                            aria-hidden="true"
                          ></i>
                          <span>Tải Bản Portable (.zip)</span>
                        </motion.a>
                      </div>
                    </div>
                  </div>

                  <!-- Zone B: Notes theo phiên bản OS (Windows SmartScreen) -->
                  <div
                    class="p-6 sm:p-7 lg:p-8 bg-[#fcfcfd] space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <h4 class="text-xs sm:text-sm font-bold text-[#18181b]">
                        Lưu ý cài đặt &amp; Vượt cảnh báo Windows Defender
                        SmartScreen
                      </h4>
                      <p
                        class="text-xs text-[#52525b] leading-relaxed text-pretty mt-1"
                      >
                        Ứng dụng phi lợi nhuận cho sinh viên, chưa mua chứng chỉ
                        số Microsoft EV ($400+/năm) nên SmartScreen sẽ hiện cảnh
                        báo phòng ngừa. Toàn bộ mã nguồn được công khai minh bạch
                        trên GitHub để mọi người cùng kiểm chứng.
                      </p>
                    </div>

                    <div
                      class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1 flex-1 items-stretch"
                    >
                      <div
                        class="p-3.5 rounded-lg bg-white border border-[#e4e4e7] space-y-1 flex-1 flex flex-col justify-start"
                      >
                        <div
                          class="font-semibold text-[#18181b] flex items-center gap-1.5"
                        >
                          <span
                            class="w-4 h-4 rounded-full bg-[#e4e4e7] text-[#18181b] flex items-center justify-center text-[11px] font-bold shrink-0"
                            >1</span
                          >
                          <span>Màn hình SmartScreen</span>
                        </div>
                        <p
                          class="text-[#71717a] text-[11px] leading-relaxed pl-5.5 text-pretty"
                        >
                          Nếu thấy thông báo
                          <em>"Windows protected your PC"</em>, hãy bấm dòng
                          gạch chân <strong>"More info"</strong> (Thông tin
                          khác).
                        </p>
                      </div>
                      <div
                        class="p-3.5 rounded-lg bg-white border border-[#e4e4e7] space-y-1 flex-1 flex flex-col justify-start"
                      >
                        <div
                          class="font-semibold text-[#18181b] flex items-center gap-1.5"
                        >
                          <span
                            class="w-4 h-4 rounded-full bg-[#e4e4e7] text-[#18181b] flex items-center justify-center text-[11px] font-bold shrink-0"
                            >2</span
                          >
                          <span>Xác nhận khởi chạy</span>
                        </div>
                        <p
                          class="text-[#71717a] text-[11px] leading-relaxed pl-5.5 text-pretty"
                        >
                          Bấm nút <strong>"Run anyway"</strong> (Vẫn chạy) ở góc
                          dưới để bắt đầu sử dụng phần mềm.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <!-- ========================================== -->
                <!-- TAB 2: MACOS CANVAS                       -->
                <!-- ========================================== -->
                <motion.div
                  v-else-if="activeOsTab === 'macos'"
                  key="macos"
                  :initial="{ opacity: 0, x: 18 }"
                  :animate="{ opacity: 1, x: 0 }"
                  :exit="{ opacity: 0, x: -18 }"
                  :transition="{ duration: 0.22, ease: [0.33, 1, 0.68, 1] }"
                  class="w-full h-full flex flex-col divide-y divide-[#e4e4e7] justify-between"
                >
                  <!-- Zone A: macOS Download / Build -->
                  <div
                    class="p-6 sm:p-7 lg:p-8 space-y-4 flex flex-col justify-between"
                  >
                    <div>
                      <h3
                        class="text-base sm:text-lg font-bold text-[#18181b] font-display"
                      >
                        Tải CTU Scheduler {{ currentRelease.tag_name }} cho macOS
                      </h3>
                      <p class="text-xs text-[#71717a] mt-0.5">
                        Tương thích chip Apple Silicon (M1, M2, M3, M4) · Chọn gói cài đặt hoặc gói chạy ngay
                      </p>
                    </div>

                    <div
                      class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 flex-1 items-stretch text-xs"
                    >
                      <!-- Option 1: macOS Package Installer -->
                      <div
                        class="p-5 rounded-xl border border-[#e4e4e7] bg-[#fafafa]/50 flex flex-col justify-between space-y-3 hover:border-[#cbd5e1] transition-colors"
                      >
                        <div class="space-y-1.5">
                          <div
                            class="flex items-baseline justify-between gap-2"
                          >
                            <h4
                              class="text-sm sm:text-base font-bold text-[#18181b]"
                            >
                              Bản Cài Đặt (Setup)
                            </h4>
                            <span
                              class="text-[11px] text-[#00529c] font-semibold"
                              >Cài đặt tự động</span
                            >
                          </div>
                          <p
                            class="text-xs text-[#52525b] leading-relaxed text-pretty"
                          >
                            Bản cài đặt tự động (.pkg) tối ưu cho máy Mac chạy chip M1 đến M4. Mở file để cài đặt trực tiếp vào hệ thống.
                          </p>
                          <div
                            class="text-[11px] text-[#71717a] pt-1 tabular-nums font-mono"
                          >
                            {{ formatBytes(macSetupAsset?.size || 79200000) }}
                            ·
                            {{ macSetupDownloads.toLocaleString("vi-VN") }}
                            lượt tải
                          </div>
                        </div>

                        <motion.a
                          :href="
                            macSetupAsset?.browser_download_url ||
                            'https://github.com/d3nhatv0lam/CTU-Scheduler/releases/latest'
                          "
                          target="_blank"
                          :whileHover="{ scale: 1.02 }"
                          :whilePress="{ scale: 0.96 }"
                          class="btn-clickup-primary w-full text-center justify-center !py-2.5 !text-xs whitespace-nowrap"
                        >
                          <i
                            class="fa-brands fa-apple mr-1.5 shrink-0"
                            aria-hidden="true"
                          ></i>
                          <span>Tải Bản Cài Đặt (.pkg)</span>
                        </motion.a>
                      </div>

                      <!-- Option 2: macOS Portable Zip -->
                      <div
                        class="p-5 rounded-xl border border-[#e4e4e7] bg-[#fafafa]/50 flex flex-col justify-between space-y-3 hover:border-[#cbd5e1] transition-colors"
                      >
                        <div class="space-y-1.5">
                          <div
                            class="flex items-baseline justify-between gap-2"
                          >
                            <h4
                              class="text-sm sm:text-base font-bold text-[#18181b]"
                            >
                              Bản Chạy Ngay (Portable)
                            </h4>
                            <span
                              class="text-[11px] text-[#71717a] font-semibold"
                              >Giải nén dùng ngay</span
                            >
                          </div>
                          <p
                            class="text-xs text-[#52525b] leading-relaxed text-pretty"
                          >
                            Chứa trực tiếp ứng dụng CTU Scheduler. Tải về giải nén và kéo vào thư mục Applications để dùng ngay không cần cài đặt.
                          </p>
                          <div
                            class="text-[11px] text-[#71717a] pt-1 tabular-nums font-mono"
                          >
                            {{ formatBytes(macPortableAsset?.size || 83500000) }}
                            ·
                            {{ macPortableDownloads.toLocaleString("vi-VN") }}
                            lượt tải
                          </div>
                        </div>

                        <motion.a
                          :href="
                            macPortableAsset?.browser_download_url ||
                            'https://github.com/d3nhatv0lam/CTU-Scheduler/releases/latest'
                          "
                          target="_blank"
                          :whileHover="{ scale: 1.02 }"
                          :whilePress="{ scale: 0.96 }"
                          class="btn-clickup-ghost w-full text-center justify-center !py-2.5 !text-xs hover:border-[#18181b] hover:text-[#18181b] whitespace-nowrap"
                        >
                          <i
                            class="fa-solid fa-file-zipper mr-1.5 shrink-0"
                            aria-hidden="true"
                          ></i>
                          <span>Tải Bản Portable (.zip)</span>
                        </motion.a>
                      </div>
                    </div>
                  </div>

                  <!-- Zone B: macOS Gatekeeper Guidance (2 Balanced Step Cards) -->
                  <div
                    class="p-6 sm:p-7 lg:p-8 bg-[#fcfcfd] space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <h4 class="text-xs sm:text-sm font-bold text-[#18181b]">
                        Lưu ý khi mở ứng dụng lần đầu trên macOS
                      </h4>
                      <p
                        class="text-xs text-[#52525b] leading-relaxed text-pretty mt-1"
                      >
                        Do phần mềm phi lợi nhuận chưa mua chứng chỉ Apple Developer ($99/năm), macOS có thể hiển thị cảnh báo nhà phát triển chưa xác minh. Bạn mở app rất dễ dàng theo 2 cách:
                      </p>
                    </div>

                    <div
                      class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1 flex-1 items-stretch"
                    >
                      <div
                        class="p-3.5 rounded-lg bg-white border border-[#e4e4e7] space-y-1 flex-1 flex flex-col justify-start"
                      >
                        <div
                          class="font-semibold text-[#18181b] flex items-center gap-1.5"
                        >
                          <span
                            class="w-4 h-4 rounded-full bg-[#e4e4e7] text-[#18181b] flex items-center justify-center text-[11px] font-bold shrink-0"
                            >1</span
                          >
                          <span>Mở nhanh qua chuột phải</span>
                        </div>
                        <p
                          class="text-[#71717a] text-[11px] leading-relaxed pl-5.5 text-pretty"
                        >
                          Giữ phím <strong>Control</strong> &rarr; nhấp chuột vào file ứng dụng &rarr; chọn <strong>Open</strong> &rarr; bấm xác nhận <strong>Open</strong> ở hộp thoại hiện ra.
                        </p>
                      </div>
                      <div
                        class="p-3.5 rounded-lg bg-white border border-[#e4e4e7] space-y-1 flex-1 flex flex-col justify-start"
                      >
                        <div
                          class="font-semibold text-[#18181b] flex items-center gap-1.5"
                        >
                          <span
                            class="w-4 h-4 rounded-full bg-[#e4e4e7] text-[#18181b] flex items-center justify-center text-[11px] font-bold shrink-0"
                            >2</span
                          >
                          <span>Mở trong Cài đặt</span>
                        </div>
                        <p
                          class="text-[#71717a] text-[11px] leading-relaxed pl-5.5 text-pretty"
                        >
                          Vào <strong>System Settings (Cài đặt)</strong> &rarr;
                          <strong>Privacy &amp; Security (Bảo mật)</strong> &rarr; cuộn xuống bấm
                          <strong>Open Anyway (Vẫn mở)</strong>.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <!-- ========================================== -->
                <!-- TAB 3: LINUX CANVAS                       -->
                <!-- ========================================== -->
                <motion.div
                  v-else-if="activeOsTab === 'linux'"
                  key="linux"
                  :initial="{ opacity: 0, x: 18 }"
                  :animate="{ opacity: 1, x: 0 }"
                  :exit="{ opacity: 0, x: -18 }"
                  :transition="{ duration: 0.22, ease: [0.33, 1, 0.68, 1] }"
                  class="w-full h-full flex flex-col divide-y divide-[#e4e4e7] justify-between"
                >
                  <!-- Zone A: Linux Build & Download -->
                  <div
                    class="p-6 sm:p-7 lg:p-8 space-y-4 flex flex-col justify-between"
                  >
                    <div>
                      <h3
                        class="text-base sm:text-lg font-bold text-[#18181b] font-display"
                      >
                        Tải CTU Scheduler {{ currentRelease.tag_name }} cho Linux
                      </h3>
                      <p class="text-xs text-[#71717a] mt-0.5">
                        Tương thích Ubuntu, Debian, Fedora, Arch Linux ({{
                          userDevice.arch === ARCH.ARM64 ? 'ARM64' : 'x64'
                        }}) · Gói AppImage chạy ngay
                      </p>
                    </div>

                    <div
                      class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 flex-1 items-stretch text-xs"
                    >
                      <!-- Option 1: AppImage Package -->
                      <div
                        class="p-5 rounded-xl border border-[#e4e4e7] bg-[#fafafa]/50 flex flex-col justify-between space-y-3 hover:border-[#cbd5e1] transition-colors"
                      >
                        <div class="space-y-1.5">
                          <div
                            class="flex items-baseline justify-between gap-2"
                          >
                            <h4
                              class="text-sm sm:text-base font-bold text-[#18181b]"
                            >
                              Gói Chạy Ngay (AppImage)
                            </h4>
                            <span
                              class="text-[11px] text-[#00529c] font-semibold"
                              >Chạy ngay không cần cài</span
                            >
                          </div>
                          <p
                            class="text-xs text-[#52525b] leading-relaxed text-pretty"
                          >
                            Chạy trực tiếp trên hầu hết các bản phân phối Linux mà không cần cài đặt dependencies phức tạp.
                          </p>
                          <div
                            class="text-[11px] text-[#71717a] pt-1 tabular-nums font-mono"
                          >
                            {{ formatBytes(linuxAsset?.size || 81400000) }}
                            ·
                            {{ linuxTotalDownloads.toLocaleString("vi-VN") }}
                            lượt tải
                          </div>
                        </div>

                        <motion.a
                          :href="
                            linuxAsset?.browser_download_url ||
                            'https://github.com/d3nhatv0lam/CTU-Scheduler/releases/latest'
                          "
                          target="_blank"
                          :whileHover="{ scale: 1.02 }"
                          :whilePress="{ scale: 0.96 }"
                          class="btn-clickup-primary w-full text-center justify-center !py-2.5 !text-xs whitespace-nowrap"
                        >
                          <i
                            class="fa-brands fa-linux mr-1.5 shrink-0"
                            aria-hidden="true"
                          ></i>
                          <span>Tải Bản Linux (.AppImage)</span>
                        </motion.a>
                      </div>

                      <!-- Option 2: All GitHub Releases -->
                      <div
                        class="p-5 rounded-xl border border-[#e4e4e7] bg-[#fafafa]/50 flex flex-col justify-between space-y-3 hover:border-[#cbd5e1] transition-colors"
                      >
                        <div class="space-y-1.5">
                          <div
                            class="flex items-baseline justify-between gap-2"
                          >
                            <h4
                              class="text-sm sm:text-base font-bold text-[#18181b]"
                            >
                              Tất Cả Bản Phát Hành
                            </h4>
                            <span
                              class="text-[11px] text-[#71717a] font-semibold"
                              >GitHub Releases</span
                            >
                          </div>
                          <p
                            class="text-xs text-[#52525b] leading-relaxed text-pretty"
                          >
                            Xem toàn bộ các gói phát hành, ghi chú phiên bản, mã nguồn và lịch sử cập nhật trên GitHub.
                          </p>
                          <div class="text-[11px] text-[#71717a] pt-1">
                            Kho lưu trữ mã nguồn mở minh bạch trên GitHub
                          </div>
                        </div>

                        <motion.a
                          href="https://github.com/d3nhatv0lam/CTU-Scheduler/releases"
                          target="_blank"
                          rel="noopener noreferrer"
                          :whileHover="{ scale: 1.02 }"
                          :whilePress="{ scale: 0.96 }"
                          class="btn-clickup-ghost w-full text-center justify-center !py-2.5 !text-xs hover:border-[#18181b] hover:text-[#18181b] whitespace-nowrap"
                        >
                          <i
                            class="fa-brands fa-github mr-1.5 shrink-0"
                            aria-hidden="true"
                          ></i>
                          <span>Xem Trên GitHub Releases</span>
                        </motion.a>
                      </div>
                    </div>
                  </div>

                  <!-- Zone B: Linux Permission & FUSE Guidance -->
                  <div
                    class="p-6 sm:p-7 lg:p-8 bg-[#fcfcfd] space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <h4 class="text-xs sm:text-sm font-bold text-[#18181b]">
                        Cấp quyền thực thi &amp; Cài đặt FUSE trên Linux
                      </h4>
                      <p
                        class="text-xs text-[#52525b] leading-relaxed text-pretty mt-1"
                      >
                        Linux mặc định không tự cấp quyền chạy cho file tải từ
                        Internet; Ubuntu 22.04+ cần FUSE 2 để chạy AppImage:
                      </p>
                    </div>

                    <div
                      class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1 flex-1 items-stretch"
                    >
                      <div
                        class="p-3.5 rounded-lg bg-white border border-[#e4e4e7] space-y-1 flex-1 flex flex-col justify-start"
                      >
                        <div
                          class="font-semibold text-[#18181b] flex items-center gap-1.5"
                        >
                          <span
                            class="w-4 h-4 rounded-full bg-[#e4e4e7] text-[#18181b] flex items-center justify-center text-[11px] font-bold shrink-0"
                            >1</span
                          >
                          <span>Cấp quyền thực thi</span>
                        </div>
                        <p
                          class="text-[#71717a] text-[11px] leading-relaxed pl-5.5 text-pretty"
                        >
                          Chuột phải &rarr; Properties &rarr; Permissions &rarr;
                          Cho phép chạy, hoặc:
                          <code
                            class="text-[#18181b] font-mono bg-[#f4f4f5] px-1 py-0.5 rounded text-[11px]"
                            >chmod +x *.AppImage</code
                          >.
                        </p>
                      </div>
                      <div
                        class="p-3.5 rounded-lg bg-white border border-[#e4e4e7] space-y-1 flex-1 flex flex-col justify-start"
                      >
                        <div
                          class="font-semibold text-[#18181b] flex items-center gap-1.5"
                        >
                          <span
                            class="w-4 h-4 rounded-full bg-[#e4e4e7] text-[#18181b] flex items-center justify-center text-[11px] font-bold shrink-0"
                            >2</span
                          >
                          <span>Cài thư viện FUSE</span>
                        </div>
                        <p
                          class="text-[#71717a] text-[11px] leading-relaxed pl-5.5 text-pretty"
                        >
                          Nếu nhấp đúp không mở, mở Terminal chạy:
                          <code
                            class="text-[#18181b] font-mono bg-[#f4f4f5] px-1 py-0.5 rounded text-[11px]"
                            >sudo apt install libfuse2</code
                          >.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <!-- 3. BOTTOM DRAWER BAR: All Releases & Changelog -->
          <div class="px-5 sm:px-6 py-4 bg-[#f8f9fa] space-y-4">
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
                <span
                  >Ngày phát hành:
                  {{ formatDate(currentRelease.published_at) }}</span
                >
              </div>

              <div class="flex items-center gap-3 self-start sm:self-auto">
                <motion.button
                  type="button"
                  :whileHover="{ scale: 1.02 }"
                  :whilePress="{ scale: 0.96 }"
                  class="text-[#52525b] hover:text-[#00529c] font-semibold cursor-pointer flex items-center gap-1.5 transition-colors"
                  @click="showAllAssets = !showAllAssets"
                >
                  <i
                    :class="
                      showAllAssets
                        ? 'fa-solid fa-folder-open'
                        : 'fa-solid fa-folder'
                    "
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
                  class="text-[#52525b] hover:text-[#00529c] font-semibold cursor-pointer flex items-center gap-1.5 transition-colors"
                  @click="showChangelog = !showChangelog"
                >
                  <i
                    :class="
                      showChangelog
                        ? 'fa-solid fa-chevron-up'
                        : 'fa-solid fa-clock-rotate-left'
                    "
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
                :transition="{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }"
                class="overflow-hidden"
              >
                <div
                  class="p-4 sm:p-5 rounded-xl border border-[#e4e4e7] bg-white space-y-3 text-xs"
                >
                  <div class="font-bold text-[#18181b] flex items-center gap-2">
                    <i
                      class="fa-solid fa-box-open text-[#00529c]"
                      aria-hidden="true"
                    ></i>
                    <span
                      >Tất cả tập tin phát hành của phiên bản
                      {{ currentRelease.tag_name }}:</span
                    >
                  </div>
                  <div
                    class="divide-y divide-[#e4e4e7] bg-white border border-[#e4e4e7] rounded-lg overflow-hidden"
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
                          >({{ formatBytes(asset.size) }} ·
                          {{
                            (asset.download_count || 0).toLocaleString("vi-VN")
                          }}
                          lượt tải)</span
                        >
                      </div>
                      <a
                        :href="asset.browser_download_url"
                        target="_blank"
                        class="text-xs text-[#00529c] hover:underline font-semibold ml-2 shrink-0 flex items-center gap-1"
                      >
                        <span>Tải xuống</span>
                        <i
                          class="fa-solid fa-download text-[11px]"
                          aria-hidden="true"
                        ></i>
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
                :transition="{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }"
                class="overflow-hidden"
              >
                <div
                  class="p-5 sm:p-6 rounded-xl border border-[#e4e4e7] bg-white text-xs leading-relaxed overflow-x-auto markdown-prose space-y-3"
                >
                  <div
                    class="font-bold text-[#18181b] text-sm flex items-center gap-2 border-b border-[#e4e4e7] pb-2"
                  >
                    <i
                      class="fa-solid fa-scroll text-[#00529c]"
                      aria-hidden="true"
                    ></i>
                    <span
                      >Nhật ký phát hành phiên bản
                      {{ currentRelease.tag_name }}</span
                    >
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
                Mọi thao tác trích xuất và kết nối diễn ra trực tiếp giữa máy
                tính cá nhân của bạn và hệ thống MyCTU qua giao thức HTTPS bảo
                mật, không chuyển qua bất kỳ máy chủ trung gian nào của nhóm phát
                triển hay bên thứ ba. Mật khẩu không bao giờ bị ghi lại. Phần mềm
                phát hành phi lợi nhuận theo giấy phép MIT "AS IS".
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
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
const isDesktop = ref(false);

function updateIsDesktop() {
  if (typeof window !== "undefined") {
    isDesktop.value = window.innerWidth >= 1024;
  }
}

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
    desc: "Apple Silicon (M1–M4)",
    icon: "fa-brands fa-apple",
  },
  {
    id: "linux",
    osKey: OS.LINUX,
    label: "Linux",
    desc: "Gói AppImage chạy ngay",
    icon: "fa-brands fa-linux",
  },
];

const activeOsIndex = computed(() => {
  const idx = osTabs.findIndex((t) => t.id === activeOsTab.value);
  return idx >= 0 ? idx : 0;
});

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
  body: "### Thông tin phiên bản mới nhất\n- Tự động hóa xếp lịch học thông minh, loại trừ trùng lịch và hỗ trợ tối ưu theo tiêu chí cá nhân.\n- Kết nối MyCTU qua HTTPS bảo mật, đồng bộ dữ liệu lớp học phần và sĩ số trực tiếp.\n- Xem chi tiết toàn bộ các bản phát hành tại GitHub Releases.",
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
    {
      id: 3,
      name: "ctu-scheduler-win-arm64-Setup.exe",
      size: 74200000,
      download_count: 12,
      browser_download_url:
        "https://github.com/d3nhatv0lam/CTU-Scheduler/releases/latest",
    },
    {
      id: 4,
      name: "ctu-scheduler-win-arm64-Portable.zip",
      size: 77800000,
      download_count: 19,
      browser_download_url:
        "https://github.com/d3nhatv0lam/CTU-Scheduler/releases/latest",
    },
    {
      id: 5,
      name: "ctu-scheduler-osx-Setup.pkg",
      size: 79200000,
      download_count: 36,
      browser_download_url:
        "https://github.com/d3nhatv0lam/CTU-Scheduler/releases/latest",
    },
    {
      id: 6,
      name: "ctu-scheduler-osx-Portable.zip",
      size: 83500000,
      download_count: 28,
      browser_download_url:
        "https://github.com/d3nhatv0lam/CTU-Scheduler/releases/latest",
    },
    {
      id: 7,
      name: "ctu-scheduler-linux.AppImage",
      size: 81400000,
      download_count: 24,
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
  return 568;
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
          n.includes("setup") &&
          n.endsWith(".exe")
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
          n.includes("portable") &&
          n.endsWith(".zip")
        ) {
          count += a.download_count || 0;
        }
      }
    }
    if (count > 0) return count;
  }
  return portableAsset.value?.download_count || 401;
});

// Cumulative downloads for macOS Setup (.pkg)
const macSetupDownloads = computed(() => {
  if (allReleases.value && allReleases.value.length > 0) {
    let count = 0;
    for (const rel of allReleases.value) {
      if (!rel.assets) continue;
      for (const a of rel.assets) {
        if (isIgnoredAsset(a.name)) continue;
        const n = a.name.toLowerCase();
        if (n.endsWith(".pkg") || (n.includes("setup") && n.includes("osx"))) {
          count += a.download_count || 0;
        }
      }
    }
    if (count > 0) return count;
  }
  return macSetupAsset.value?.download_count || 36;
});

// Cumulative downloads for macOS Portable (.zip)
const macPortableDownloads = computed(() => {
  if (allReleases.value && allReleases.value.length > 0) {
    let count = 0;
    for (const rel of allReleases.value) {
      if (!rel.assets) continue;
      for (const a of rel.assets) {
        if (isIgnoredAsset(a.name)) continue;
        const n = a.name.toLowerCase();
        if (
          n.includes("osx") &&
          (n.includes("portable") || n.endsWith(".zip")) &&
          !n.endsWith(".nupkg")
        ) {
          count += a.download_count || 0;
        }
      }
    }
    if (count > 0) return count;
  }
  return macPortableAsset.value?.download_count || 28;
});

// Cumulative downloads for macOS across all releases
const macTotalDownloads = computed(() => {
  return macSetupDownloads.value + macPortableDownloads.value;
});

// Cumulative downloads for Linux across all releases
const linuxTotalDownloads = computed(() => {
  if (allReleases.value && allReleases.value.length > 0) {
    let count = 0;
    for (const rel of allReleases.value) {
      if (!rel.assets) continue;
      for (const a of rel.assets) {
        if (isIgnoredAsset(a.name)) continue;
        const n = a.name.toLowerCase();
        if (
          n.endsWith(".appimage") ||
          (n.includes("linux") && !n.endsWith(".nupkg")) ||
          n.endsWith(".deb")
        ) {
          count += a.download_count || 0;
        }
      }
    }
    if (count > 0) return count;
  }
  return linuxAsset.value?.download_count || 24;
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
  const isArm = userDevice.value.arch === ARCH.ARM64;
  if (isArm) {
    const armSetup = validAssets.value.find((a) => {
      const n = a.name.toLowerCase();
      return n.includes("setup") && n.endsWith(".exe") && n.includes("arm64");
    });
    if (armSetup) return armSetup;
  }
  return (
    validAssets.value.find((a) => {
      const n = a.name.toLowerCase();
      return n.includes("setup") && n.endsWith(".exe") && !n.includes("arm64");
    }) ||
    validAssets.value.find((a) => {
      const n = a.name.toLowerCase();
      return n.includes("setup") && n.endsWith(".exe");
    }) ||
    validAssets.value.find((a) => a.name.endsWith(".exe")) ||
    validAssets.value[0]
  );
});

// Portable Edition (.zip or portable .exe)
const portableAsset = computed(() => {
  if (!validAssets.value.length) return null;
  const isArm = userDevice.value.arch === ARCH.ARM64;
  if (isArm) {
    const armPort = validAssets.value.find((a) => {
      const n = a.name.toLowerCase();
      return (
        (n.endsWith(".zip") || n.includes("portable")) &&
        !n.includes("setup") &&
        n.includes("arm64")
      );
    });
    if (armPort) return armPort;
  }
  return (
    validAssets.value.find((a) => {
      const n = a.name.toLowerCase();
      return (
        (n.endsWith(".zip") || n.includes("portable")) &&
        !n.includes("setup") &&
        !n.includes("arm64")
      );
    }) ||
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

// macOS Setup Installer (.pkg)
const macSetupAsset = computed(() => {
  if (!validAssets.value.length) return null;
  return (
    validAssets.value.find((a) => {
      const n = a.name.toLowerCase();
      return n.endsWith(".pkg") || (n.includes("setup") && n.includes("osx"));
    }) ||
    validAssets.value.find((a) => a.name.toLowerCase().endsWith(".pkg")) ||
    validAssets.value.find((a) => a.name.toLowerCase().endsWith(".dmg"))
  );
});

// macOS Portable Edition (.zip)
const macPortableAsset = computed(() => {
  if (!validAssets.value.length) return null;
  return (
    validAssets.value.find((a) => {
      const n = a.name.toLowerCase();
      return (
        n.includes("osx") &&
        (n.includes("portable") || n.endsWith(".zip")) &&
        !n.endsWith(".nupkg")
      );
    }) ||
    validAssets.value.find((a) => {
      const n = a.name.toLowerCase();
      return n.includes("osx") && n.endsWith(".zip");
    })
  );
});

// Alias for general macOS asset reference
const macAsset = computed(() => macSetupAsset.value);

// Linux AppImage (.AppImage or linux asset)
const linuxAsset = computed(() => {
  if (!validAssets.value.length) return null;
  const isArm = userDevice.value.arch === ARCH.ARM64;
  if (isArm) {
    const armApp = validAssets.value.find((a) => {
      const n = a.name.toLowerCase();
      return (
        (n.endsWith(".appimage") || n.includes("linux")) &&
        !n.endsWith(".nupkg") &&
        n.includes("arm64")
      );
    });
    if (armApp) return armApp;
  }
  return (
    validAssets.value.find((a) => {
      const n = a.name.toLowerCase();
      return (
        (n.endsWith(".appimage") || n.includes("linux")) &&
        !n.endsWith(".nupkg") &&
        !n.includes("arm64")
      );
    }) ||
    validAssets.value.find((a) => a.name.toLowerCase().endsWith(".appimage")) ||
    validAssets.value.find(
      (a) =>
        a.name.toLowerCase().includes("linux") && !a.name.endsWith(".nupkg"),
    )
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
  updateIsDesktop();
  if (typeof window !== "undefined") {
    window.addEventListener("resize", updateIsDesktop, { passive: true });
  }

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

onUnmounted(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener("resize", updateIsDesktop);
  }
});
</script>
