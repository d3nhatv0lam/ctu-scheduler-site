<template>
  <section
    id="download"
    class="py-20 md:py-24 border-b border-[#e4e4e7] bg-white"
  >
    <div class="container mx-auto max-w-clickup px-4 sm:px-6">
      <!-- Section Header (Calm, Measured) -->
      <motion.div
        :initial="{ opacity: 0, y: 12 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :inViewOptions="{ once: true }"
        :transition="{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }"
        class="max-w-2xl mx-auto text-center mb-10"
      >
        <h2
          class="text-3xl sm:text-4xl font-bold tracking-tight text-[#090c1d] mb-3 font-display"
        >
          Tải phần mềm CTU Scheduler
        </h2>
        <p class="text-[#52525b] text-base leading-relaxed">
          Phần mềm mã nguồn mở phục vụ sinh viên Đại học Cần Thơ. Lựa chọn hệ
          điều hành và gói cài đặt phù hợp với thiết bị của bạn.
        </p>
        <div class="mt-4 flex items-center justify-center gap-2">
          <span
            class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#f0f7ff] text-[#00529c] border border-[#bae0fd] text-xs font-semibold tabular-nums"
          >
            <i class="fa-solid fa-download text-[11px]" aria-hidden="true"></i>
            <span
              >{{ totalDownloads.toLocaleString("vi-VN") }} lượt tải về</span
            >
          </span>
        </div>
      </motion.div>

      <!-- OS Switcher (Clean Segmented Control with Sliding Indicator) -->
      <div
        class="flex flex-col sm:flex-row items-center justify-between gap-3 max-w-3xl mx-auto mb-8"
      >
        <div
          class="relative grid grid-cols-3 p-1 bg-[#f4f4f5] rounded-full border border-[#e4e4e7] w-full max-w-[340px] select-none"
        >
          <!-- Sliding Background Indicator Pill (motion-v animated) -->
          <motion.div
            class="absolute top-1 bottom-1 left-1 rounded-full bg-white shadow-2xs pointer-events-none"
            :style="{ width: 'calc((100% - 8px) / 3)' }"
            :animate="{
              x:
                activeOsTab === 'windows'
                  ? '0%'
                  : activeOsTab === 'macos'
                    ? '100%'
                    : '200%',
            }"
            :transition="{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }"
          />

          <button
            type="button"
            class="relative z-10 py-1.5 px-3 rounded-full text-xs font-semibold transition-colors duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
            :class="
              activeOsTab === 'windows'
                ? 'text-[#18181b] font-bold'
                : 'text-[#71717a] hover:text-[#18181b]'
            "
            @click="selectOsTab('windows')"
          >
            <i class="fa-brands fa-windows text-sm" aria-hidden="true"></i>
            <span>Windows</span>
          </button>
          <button
            type="button"
            class="relative z-10 py-1.5 px-3 rounded-full text-xs font-semibold transition-colors duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
            :class="
              activeOsTab === 'macos'
                ? 'text-[#18181b] font-bold'
                : 'text-[#71717a] hover:text-[#18181b]'
            "
            @click="selectOsTab('macos')"
          >
            <i class="fa-brands fa-apple text-sm" aria-hidden="true"></i>
            <span>macOS</span>
          </button>
          <button
            type="button"
            class="relative z-10 py-1.5 px-3 rounded-full text-xs font-semibold transition-colors duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
            :class="
              activeOsTab === 'linux'
                ? 'text-[#18181b] font-bold'
                : 'text-[#71717a] hover:text-[#18181b]'
            "
            @click="selectOsTab('linux')"
          >
            <i class="fa-brands fa-linux text-sm" aria-hidden="true"></i>
            <span>Linux</span>
          </button>
        </div>

        <!-- Detected Device Context (Subtle text) -->
        <div
          class="text-[11px] sm:text-xs text-[#71717a] flex items-center gap-2"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-[#00529c]"></span>
          <span
            >Thiết bị hiện tại:
            <strong class="text-[#18181b] font-medium">{{
              detectedDeviceLabel
            }}</strong></span
          >
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div
          class="text-xs font-semibold text-[#71717a] flex items-center justify-center gap-2.5"
        >
          <span class="w-2 h-2 rounded-full bg-[#00529c] animate-pulse"></span>
          Đang nạp thông tin phát hành từ GitHub...
        </div>
      </div>

      <!-- Main Showcase Container -->
      <div v-else class="space-y-6 max-w-4xl mx-auto">
        <!-- ========================================== -->
        <!-- TAB 1: WINDOWS (Cốt lõi chính thức)         -->
        <!-- ========================================== -->
        <motion.div
          v-if="activeOsTab === 'windows'"
          key="windows"
          :initial="hasSwitchedTab ? { opacity: 0 } : false"
          :animate="{ opacity: 1 }"
          :transition="{ duration: 0.18, ease: 'easeOut' }"
          class="space-y-6 transform-gpu"
        >
            <!-- Setup vs Portable 2-Column Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
            <!-- EDITION 1: Setup Installer (Khuyên dùng cá nhân) -->
            <div
              class="p-6 rounded-2xl border border-[#e4e4e7] bg-white flex flex-col justify-between space-y-5"
            >
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2.5">
                    <span
                      class="w-7 h-7 rounded-lg bg-[#f0f7ff] text-[#00529c] flex items-center justify-center text-xs"
                    >
                      <i
                        class="fa-solid fa-cloud-arrow-down"
                        aria-hidden="true"
                      ></i>
                    </span>
                    <h3 class="text-base font-bold text-[#18181b] font-display">
                      Bản Cài Đặt (Setup)
                    </h3>
                  </div>
                  <span
                    class="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#f0f7ff] text-[#00529c] border border-[#bae0fd]"
                  >
                    Tự cập nhật
                  </span>
                </div>

                <p class="text-xs text-[#52525b] leading-relaxed">
                  Dành cho <strong>Laptop / Máy tính cá nhân</strong>. Tự động
                  kiểm tra và nâng cấp phiên bản mới.
                </p>

                <!-- Restrained Feature List -->
                <ul class="space-y-1.5 text-xs text-[#52525b] pt-1">
                  <li class="flex items-start gap-2">
                    <span class="text-[#00529c] font-bold mt-0.5">•</span>
                    <span>Tự động cập nhật phiên bản mới</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-[#00529c] font-bold mt-0.5">•</span>
                    <span>Tạo lối tắt Desktop &amp; Start Menu</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-[#00529c] font-bold mt-0.5">•</span>
                    <span>Lưu cấu hình và lịch học qua các kỳ</span>
                  </li>
                </ul>
              </div>

              <div class="pt-2 space-y-3">
                <div
                  class="text-[11px] text-[#71717a] flex items-center justify-between gap-2 tabular-nums"
                >
                  <span class="truncate max-w-[130px] sm:max-w-[180px]">{{
                    recommendedSetupAsset?.name || "CTU-Scheduler-Setup.exe"
                  }}</span>
                  <span class="shrink-0"
                    >{{ formatBytes(recommendedSetupAsset?.size || 78500000) }}
                    ·
                    {{
                      (
                        recommendedSetupAsset?.download_count || 264
                      ).toLocaleString("vi-VN")
                    }}
                    lượt tải</span
                  >
                </div>

                <a
                  :href="
                    recommendedSetupAsset?.browser_download_url ||
                    'https://github.com/d3nhatv0lam/CTU-Scheduler/releases/latest'
                  "
                  target="_blank"
                  class="btn-clickup-primary w-full text-center justify-center !py-2.5 !text-xs"
                >
                  <i class="fa-brands fa-windows mr-1.5" aria-hidden="true"></i>
                  <span>Tải Bản Cài Đặt (.exe)</span>
                </a>

                <!-- Calm Onboarding Timeline -->
                <div
                  class="pt-2 text-[11px] text-[#71717a] flex items-center justify-between text-center border-t border-[#f4f4f5]"
                >
                  <span>1. Tải về</span>
                  <span class="text-[#d4d4d8]">&rarr;</span>
                  <span>2. Cài đặt (5s)</span>
                  <span class="text-[#d4d4d8]">&rarr;</span>
                  <span>3. Xếp lịch ngay</span>
                </div>
              </div>
            </div>

            <!-- EDITION 2: Portable Edition (Không cần Admin) -->
            <div
              class="p-5 sm:p-6 rounded-2xl border border-[#e4e4e7] bg-white flex flex-col justify-between space-y-5"
            >
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2.5">
                    <span
                      class="w-7 h-7 rounded-lg bg-[#f4f4f5] text-[#52525b] flex items-center justify-center text-xs"
                    >
                      <i class="fa-solid fa-box-archive" aria-hidden="true"></i>
                    </span>
                    <h3 class="text-base font-bold text-[#18181b] font-display">
                      Bản Chạy Ngay (Portable)
                    </h3>
                  </div>
                  <span
                    class="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#f4f4f5] text-[#52525b] border border-[#e4e4e7]"
                  >
                    Không cần Admin
                  </span>
                </div>

                <p class="text-xs text-[#52525b] leading-relaxed">
                  Dành cho <strong>máy phòng thực hành</strong> (Khu II, Hòa An)
                  hoặc máy bị giới hạn quyền Admin.
                </p>

                <!-- Restrained Feature List -->
                <ul class="space-y-1.5 text-xs text-[#52525b] pt-1">
                  <li class="flex items-start gap-2">
                    <span class="text-[#71717a] font-bold mt-0.5">•</span>
                    <span>Chạy trực tiếp, không cần quyền Admin</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-[#71717a] font-bold mt-0.5">•</span>
                    <span>Không ghi Registry, xóa thư mục là sạch</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-[#71717a] font-bold mt-0.5">•</span>
                    <span>Chép vào USB dùng linh hoạt mọi máy</span>
                  </li>
                </ul>
              </div>

              <div class="pt-2 space-y-3">
                <div
                  class="text-[11px] text-[#71717a] flex items-center justify-between gap-2 tabular-nums"
                >
                  <span class="truncate max-w-[130px] sm:max-w-[180px]">{{
                    portableAsset?.name || "CTU-Scheduler-Portable.zip"
                  }}</span>
                  <span class="shrink-0"
                    >{{ formatBytes(portableAsset?.size || 82100000) }} ·
                    {{
                      (portableAsset?.download_count || 198).toLocaleString(
                        "vi-VN",
                      )
                    }}
                    lượt tải</span
                  >
                </div>

                <a
                  :href="
                    portableAsset?.browser_download_url ||
                    'https://github.com/d3nhatv0lam/CTU-Scheduler/releases/latest'
                  "
                  target="_blank"
                  class="btn-clickup-ghost w-full text-center justify-center !py-2.5 !text-xs hover:border-[#18181b] hover:text-[#18181b]"
                >
                  <i
                    class="fa-solid fa-file-zipper mr-1.5"
                    aria-hidden="true"
                  ></i>
                  <span>Tải Bản Portable (.zip)</span>
                </a>

                <!-- Calm Onboarding Timeline -->
                <div
                  class="pt-2 text-[11px] text-[#71717a] flex items-center justify-between text-center border-t border-[#f4f4f5]"
                >
                  <span>1. Tải .zip</span>
                  <span class="text-[#d4d4d8]">&rarr;</span>
                  <span>2. Giải nén</span>
                  <span class="text-[#d4d4d8]">&rarr;</span>
                  <span>3. Mở chạy ngay</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Windows SmartScreen Guide (Quiet, Compact Notice) -->
          <div
            class="p-3.5 sm:p-4 rounded-xl bg-[#f8f9fa] border border-[#e4e4e7] text-xs text-[#52525b] flex items-start gap-2.5"
          >
            <i
              class="fa-solid fa-shield-halved text-[#71717a] mt-0.5 shrink-0"
              aria-hidden="true"
            ></i>
            <div class="leading-relaxed">
              <strong class="text-[#18181b] font-semibold"
                >Lưu ý lần đầu:</strong
              >
              Nếu Windows hiển thị thông báo bảo vệ
              <em>"Windows protected your PC"</em>, bấm vào chữ
              <strong>"More info"</strong> rồi chọn
              <strong>"Run anyway"</strong> để mở.
            </div>
          </div>
        </motion.div>

        <!-- ========================================== -->
        <!-- TAB 2: MACOS (Thông tin & Giải pháp)        -->
        <!-- ========================================== -->
        <motion.div
          v-else-if="activeOsTab === 'macos'"
          key="macos"
          :initial="hasSwitchedTab ? { opacity: 0 } : false"
          :animate="{ opacity: 1 }"
          :transition="{ duration: 0.18, ease: 'easeOut' }"
          class="p-6 rounded-2xl border border-[#e4e4e7] bg-white space-y-4 transform-gpu"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span
                class="w-8 h-8 rounded-lg bg-[#f4f4f5] text-[#18181b] flex items-center justify-center text-sm"
              >
                <i class="fa-brands fa-apple" aria-hidden="true"></i>
              </span>
              <div>
                <h3 class="text-base font-bold text-[#18181b] font-display">
                  CTU Scheduler cho macOS
                </h3>
                <p class="text-xs text-[#71717a]">
                  Apple Silicon (M1–M4) &amp; Intel
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
            Phiên bản macOS đang trong giai đoạn đóng gói chữ ký số. Sinh viên
            dùng Mac có thể chạy trực tiếp từ mã nguồn hoặc thông qua máy ảo
            Windows:
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
            <div
              class="p-3.5 rounded-xl bg-[#f8f9fa] border border-[#e4e4e7] space-y-1.5"
            >
              <div class="font-semibold text-[#18181b]">
                Cách 1: Chạy từ mã nguồn Node.js
              </div>
              <p class="text-[#71717a] text-[11px]">
                Dành cho sinh viên ngành CNTT có cài Node.js:
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
              class="p-3.5 rounded-xl bg-[#f8f9fa] border border-[#e4e4e7] space-y-1.5 flex flex-col justify-between"
            >
              <div>
                <div class="font-semibold text-[#18181b]">
                  Cách 2: Máy ảo Windows trên Mac
                </div>
                <p class="text-[#71717a] text-[11px]">
                  Sử dụng VMware Fusion Pro (miễn phí) hoặc Parallels để chạy
                  file Setup của Windows.
                </p>
              </div>
              <a
                href="https://github.com/d3nhatv0lam/CTU-Scheduler/wiki"
                target="_blank"
                rel="noopener noreferrer"
                class="text-[#00529c] font-semibold text-[11px] hover:underline"
              >
                Xem hướng dẫn chi tiết &rarr;
              </a>
            </div>
          </div>
        </motion.div>

        <!-- ========================================== -->
        <!-- TAB 3: LINUX (Thông tin & Mã nguồn)        -->
        <!-- ========================================== -->
        <motion.div
          v-else-if="activeOsTab === 'linux'"
          key="linux"
          :initial="hasSwitchedTab ? { opacity: 0 } : false"
          :animate="{ opacity: 1 }"
          :transition="{ duration: 0.18, ease: 'easeOut' }"
          class="p-6 rounded-2xl border border-[#e4e4e7] bg-white space-y-4 transform-gpu"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span
                class="w-8 h-8 rounded-lg bg-[#f4f4f5] text-[#18181b] flex items-center justify-center text-sm"
              >
                <i class="fa-brands fa-linux" aria-hidden="true"></i>
              </span>
              <div>
                <h3 class="text-base font-bold text-[#18181b] font-display">
                  CTU Scheduler cho Linux
                </h3>
                <p class="text-xs text-[#71717a]">
                  Ubuntu, Debian, Fedora, Arch Linux
                </p>
              </div>
            </div>
            <span
              class="text-xs px-2.5 py-0.5 rounded-full bg-[#f4f4f5] text-[#52525b] border border-[#e4e4e7] font-medium"
            >
              Mã nguồn mở
            </span>
          </div>

          <p class="text-xs text-[#52525b] leading-relaxed">
            Bạn có thể tự đóng gói bản <code>.AppImage</code> hoặc
            <code>.deb</code> trực tiếp từ repository với các lệnh đơn giản:
          </p>

          <div
            class="p-3.5 rounded-xl bg-[#f8f9fa] border border-[#e4e4e7] space-y-2 text-xs"
          >
            <div
              class="p-2 rounded bg-white border border-[#e4e4e7] text-[11px] font-sans space-y-0.5 text-[#27272a]"
            >
              <div>
                <code
                  >git clone
                  https://github.com/d3nhatv0lam/CTU-Scheduler.git</code
                >
              </div>
              <div><code>cd CTU-Scheduler &amp;&amp; npm install</code></div>
              <div><code>npm run build:linux</code></div>
            </div>
            <div class="pt-1">
              <a
                href="https://github.com/d3nhatv0lam/CTU-Scheduler"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-clickup-ghost !py-1.5 !px-3 !text-xs inline-flex items-center gap-1.5"
              >
                <i class="fa-brands fa-github text-xs" aria-hidden="true"></i>
                <span>Kho mã nguồn GitHub</span>
              </a>
            </div>
          </div>
        </motion.div>

        <!-- Release Info & Secondary Drawers -->
        <div
          class="pt-3 border-t border-[#e4e4e7] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-[#71717a]"
        >
          <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span
              >Phiên bản:
              <strong class="text-[#18181b]">{{
                currentRelease.tag_name
              }}</strong></span
            >
            <span class="text-[#d4d4d8]">·</span>
            <span class="text-[#00529c] font-medium tabular-nums"
              >{{ totalDownloads.toLocaleString("vi-VN") }} lượt tải</span
            >
            <span class="text-[#d4d4d8]">·</span>
            <span>{{ formatDate(currentRelease.published_at) }}</span>
          </div>
          <div class="flex items-center gap-3 self-start sm:self-auto">
            <motion.button
              type="button"
              :whilePress="{ scale: 0.96 }"
              class="text-[#52525b] hover:text-[#00529c] font-medium cursor-pointer"
              @click="showAllAssets = !showAllAssets"
            >
              {{
                showAllAssets
                  ? "Đóng danh sách file"
                  : `Xem tất cả ${validAssets.length} file`
              }}
            </motion.button>
            <span>·</span>
            <motion.button
              v-if="currentRelease.body"
              type="button"
              :whilePress="{ scale: 0.96 }"
              class="text-[#52525b] hover:text-[#00529c] font-medium cursor-pointer"
              @click="showChangelog = !showChangelog"
            >
              {{
                showChangelog ? "Đóng nhật ký cập nhật" : "Xem nhật ký cập nhật"
              }}
            </motion.button>
          </div>
        </div>

        <!-- Collapsible All Files Drawer (Smooth expansion + motion-v content fade) -->
        <div
          class="grid transition-[grid-template-rows] duration-250 ease-[cubic-bezier(0.33,1,0.68,1)]"
          :class="showAllAssets ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
        >
          <div class="overflow-hidden">
            <motion.div
              :initial="false"
              :animate="{
                opacity: showAllAssets ? 1 : 0,
              }"
              :transition="{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }"
              class="p-4 rounded-xl border border-[#e4e4e7] bg-[#f8f9fa] space-y-2 text-xs transform-gpu"
            >
              <div class="font-semibold text-[#18181b] mb-1">
                Tất cả tập tin phát hành:
              </div>
              <div
                class="divide-y divide-[#e4e4e7] bg-white border border-[#e4e4e7] rounded-lg overflow-hidden"
              >
                <div
                  v-for="asset in validAssets"
                  :key="asset.id"
                  class="p-2.5 px-3 flex items-center justify-between hover:bg-[#f8f9fa] transition-colors"
                >
                  <div class="flex items-center gap-2.5 min-w-0">
                    <i
                      :class="getAssetIcon(asset.name)"
                      class="text-xs text-[#71717a]"
                      aria-hidden="true"
                    ></i>
                    <span class="text-xs font-medium text-[#18181b] truncate">{{
                      asset.name
                    }}</span>
                    <span
                      class="text-[11px] text-[#71717a] tabular-nums shrink-0"
                      >({{ formatBytes(asset.size) }})</span
                    >
                  </div>
                  <a
                    :href="asset.browser_download_url"
                    target="_blank"
                    class="text-xs text-[#00529c] hover:underline font-medium ml-2 shrink-0"
                  >
                    Tải xuống
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <!-- Collapsible Markdown Changelog Drawer (Smooth expansion + motion-v content fade) -->
        <div
          class="grid transition-[grid-template-rows] duration-250 ease-[cubic-bezier(0.33,1,0.68,1)]"
          :class="showChangelog ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
        >
          <div class="overflow-hidden">
            <motion.div
              :initial="false"
              :animate="{
                opacity: showChangelog ? 1 : 0,
              }"
              :transition="{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }"
              class="p-4 sm:p-5 rounded-xl border border-[#e4e4e7] bg-[#f8f9fa] text-xs leading-relaxed overflow-x-auto markdown-prose transform-gpu"
            >
              <div class="font-semibold text-[#18181b] text-sm mb-2">
                Nhật ký phiên bản {{ currentRelease.tag_name }}
              </div>
              <div v-html="renderedMarkdownBody"></div>
            </motion.div>
          </div>
        </div>

        <!-- Quiet Disclaimers (Collapsible / Concise) -->
        <div
          class="pt-4 text-[11px] text-[#71717a] leading-relaxed border-t border-[#e4e4e7] space-y-1"
        >
          <p>
            <strong class="text-[#52525b]"
              >Bảo mật &amp; Miễn trừ trách nhiệm:</strong
            >
            Mọi thao tác kết nối diễn ra trực tiếp giữa máy tính của bạn và hệ
            thống MyCTU, không gửi qua máy chủ trung gian. Mật khẩu không bao
            giờ được lưu trữ. Phần mềm phát hành phi lợi nhuận theo giấy phép
            MIT "AS IS".
          </p>
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
const showChangelog = ref(false);
const showAllAssets = ref(false);
const activeOsTab = ref("windows");
const hasSwitchedTab = ref(false);
const userDevice = ref({ os: OS.WINDOWS, arch: ARCH.X64 });

function selectOsTab(tab) {
  if (activeOsTab.value !== tab) {
    hasSwitchedTab.value = true;
    activeOsTab.value = tab;
  }
}

const CACHE_KEY = "ctu_release_data_v2";
const CACHE_TIME_KEY = "ctu_release_timestamp";
const CACHE_DURATION = 10 * 60 * 1000;

// High-confidence fallback release if GitHub API is throttled/offline
const FALLBACK_RELEASE = {
  tag_name: "v4.0.0",
  name: "CTU Scheduler v4.0.0",
  published_at: "2026-03-01T00:00:00Z",
  body: "### Nhật ký phiên bản v4.0.0\n- Nâng cấp thuật toán duyệt tổ hợp tự động khử 100% trùng tiết học và trùng ngày thi.\n- Tích hợp bộ lọc tiêu chí: né ca sáng, dồn lịch cuối tuần, cố định cơ sở Khu II.\n- Tự động cập nhật sĩ số thời gian thực trực tiếp từ MyCTU.\n- Cải tiến giao diện trực quan chuẩn ClickUp Light Theme.",
  assets: [
    {
      id: 1,
      name: "CTU-Scheduler-Setup-4.0.0.exe",
      size: 78540000,
      download_count: 265,
      browser_download_url:
        "https://github.com/d3nhatv0lam/CTU-Scheduler/releases/latest/download/CTU-Scheduler-Setup-4.0.0.exe",
    },
    {
      id: 2,
      name: "CTU-Scheduler-4.0.0-win-portable.zip",
      size: 82150000,
      download_count: 198,
      browser_download_url:
        "https://github.com/d3nhatv0lam/CTU-Scheduler/releases/latest/download/CTU-Scheduler-4.0.0-win-portable.zip",
    },
  ],
};

const currentRelease = computed(() => {
  return latestRelease.value || FALLBACK_RELEASE;
});

const totalDownloads = computed(() => {
  if (!validAssets.value.length) return 463;
  const count = validAssets.value.reduce(
    (sum, a) => sum + (a.download_count || 0),
    0,
  );
  return count > 0 ? count : 463;
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
      latestRelease.value = Array.isArray(data) ? data[0] : data;
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
    latestRelease.value = Array.isArray(data) ? data[0] : data;
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
      localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
    } catch {}
  } catch (err) {
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
