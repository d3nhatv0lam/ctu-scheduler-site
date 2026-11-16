<template>
  <section id="download" class="py-20 md:py-28 border-b border-[#e4e4e7] bg-white">
    <div class="container mx-auto max-w-clickup px-4 sm:px-6">
      <!-- Section Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 450, ease: [0.33, 1, 0.68, 1] } }"
        class="max-w-3xl mx-auto text-center mb-14"
      >
        <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f0f7ff] text-[#00529c] border border-[#bae0fd] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
          <span class="w-2 h-2 rounded-full bg-[#00529c]"></span>
          Bản Phát Hành Chính Thức
        </div>
        <h2 class="text-3xl sm:text-5xl font-extrabold tracking-[-0.035em] text-[#090c1d] mb-4 font-display">
          Tải phần mềm CTU Scheduler
        </h2>
        <p class="text-[#52525b] text-base sm:text-lg leading-relaxed">
          Tương thích tối ưu với hệ điều hành Windows 10 và Windows 11 (64-bit). Lựa chọn bản cài đặt tự động cập nhật hoặc bản Portable giải nén dùng ngay.
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="clickup-card text-center py-16">
        <div class="text-sm font-bold text-[#52525b] flex items-center justify-center gap-3">
          <span class="w-3 h-3 rounded-full bg-[#00529c] animate-ping"></span>
          Đang kết nối GitHub Releases để nạp danh sách tập tin mới nhất...
        </div>
      </div>

      <!-- Error / Fallback State -->
      <div v-else-if="error" class="clickup-card text-center py-12 space-y-4">
        <div class="text-base font-bold text-[#18181b] font-display">Không thể nạp trực tiếp từ máy chủ GitHub API</div>
        <p class="text-sm text-[#52525b] max-w-md mx-auto">
          Bạn có thể truy cập thẳng vào trang phát hành chính thức để tải bản cài đặt.
        </p>
        <div>
          <a
            href="https://github.com/d3nhatv0lam/CTU-Scheduler/releases"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-clickup-primary !text-xs"
          >
            Mở GitHub Releases
          </a>
        </div>
      </div>

      <!-- Main Release Showcase -->
      <div v-else-if="latestRelease" class="space-y-8">
        <!-- Release Overview Card -->
        <div class="clickup-card p-6 sm:p-8 hover-lift">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#e4e4e7]">
            <div>
              <div class="flex flex-wrap items-center gap-3">
                <span class="text-2xl font-extrabold text-[#090c1d] font-display">
                  {{ latestRelease.name || latestRelease.tag_name }}
                </span>
                <span class="text-xs px-3 py-1 rounded-full font-bold bg-[#f0f7ff] text-[#00529c] border border-[#bae0fd]">
                  {{ latestRelease.tag_name }}
                </span>
                <span class="text-xs px-3 py-1 rounded-full font-bold bg-[#ecfdf5] text-[#00c07a] border border-[#a7f3d0] flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#00c07a]"></span>
                  Mới nhất
                </span>
              </div>
              <p class="text-xs text-[#52525b] mt-2 font-medium">
                Ngày phát hành: {{ formatDate(latestRelease.published_at) }} · Hệ điều hành: Windows 10/11 x64 · Giấy phép: MIT (Miễn phí 100%)
              </p>
            </div>

            <!-- Primary Recommended Download CTA -->
            <div class="shrink-0">
              <a
                v-if="recommendedSetupAsset"
                :href="recommendedSetupAsset.browser_download_url"
                target="_blank"
                class="btn-clickup-primary !py-3 !px-6 !text-sm flex items-center gap-2.5 shadow-md hover:shadow-lg"
              >
                <i class="fa-solid fa-download text-sm" aria-hidden="true"></i>
                <span>Tải Bản Cài Đặt (Setup.exe)</span>
              </a>
            </div>
          </div>

          <!-- Categorized Download Cards (Phân Cấp Rõ Ràng) -->
          <div class="mt-8">
            <h3 class="text-sm font-bold text-[#18181b] uppercase tracking-wider mb-4 font-display">
              Phân loại tập tin cài đặt:
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <!-- Category 1: Windows Setup (Auto-Update) -->
              <div class="p-5 rounded-2xl border-2 border-[#bae0fd] bg-[#f0f7ff]/50 flex flex-col justify-between hover-lift">
                <div>
                  <div class="flex items-center justify-between mb-3">
                    <span class="px-2.5 py-0.5 text-xs font-bold rounded-full bg-[#ecfdf5] text-[#00c07a] border border-[#a7f3d0] flex items-center gap-1">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                      Khuyên Dùng Cho Máy Cá Nhân
                    </span>
                    <span class="text-xs font-bold text-[#00529c]">TỰ CẬP NHẬT</span>
                  </div>
                  <h4 class="text-base font-bold text-[#090c1d] mb-1 font-display">
                    Bản Cài Đặt Windows (Setup Installer)
                  </h4>
                  <p class="text-xs text-[#52525b] leading-relaxed mb-4">
                    Tự động tạo shortcut ngoài màn hình Desktop, tự động kiểm tra và nâng cấp lên phiên bản mới nhất khi có bản cập nhật từ nhóm phát triển.
                  </p>

                  <div v-if="recommendedSetupAsset" class="space-y-2 py-2">
                    <div class="text-xs font-bold text-[#18181b]">{{ recommendedSetupAsset.name }}</div>
                    <div class="text-xs text-[#52525b] flex items-center gap-3">
                      <span>Dung lượng: {{ formatBytes(recommendedSetupAsset.size) }}</span>
                      <span>·</span>
                      <span>{{ recommendedSetupAsset.download_count?.toLocaleString('vi-VN') || 0 }} lượt tải</span>
                    </div>
                  </div>
                </div>

                <div class="mt-4 pt-3 border-t border-[#bae0fd]">
                  <a
                    v-if="recommendedSetupAsset"
                    :href="recommendedSetupAsset.browser_download_url"
                    target="_blank"
                    class="btn-clickup-primary w-full text-center justify-center !py-2.5 !text-xs"
                  >
                    <i class="fa-brands fa-windows text-sm mr-1"></i>
                    Tải Bản Tự Động Cập Nhật
                  </a>
                </div>
              </div>

              <!-- Category 2: Portable Edition (No Install) -->
              <div class="p-5 rounded-2xl border border-[#e4e4e7] bg-[#f8f9fa] flex flex-col justify-between hover-lift">
                <div>
                  <div class="flex items-center justify-between mb-3">
                    <span class="px-2.5 py-0.5 text-xs font-bold rounded-full bg-white text-[#52525b] border border-[#e4e4e7]">
                      Không Cần Cài Đặt
                    </span>
                    <span class="text-xs font-bold text-[#52525b]">PORTABLE</span>
                  </div>
                  <h4 class="text-base font-bold text-[#090c1d] mb-1 font-display">
                    Bản Chạy Ngay (Portable Edition)
                  </h4>
                  <p class="text-xs text-[#52525b] leading-relaxed mb-4">
                    Chỉ cần tải về, giải nén và mở lên dùng ngay mà không cần quyền Administrator. Hoàn hảo để chép vào USB mang đi thực hành tại phòng máy trường.
                  </p>

                  <div v-if="portableAsset" class="space-y-2 py-2">
                    <div class="text-xs font-bold text-[#18181b]">{{ portableAsset.name }}</div>
                    <div class="text-xs text-[#52525b] flex items-center gap-3">
                      <span>Dung lượng: {{ formatBytes(portableAsset.size) }}</span>
                      <span>·</span>
                      <span>{{ portableAsset.download_count?.toLocaleString('vi-VN') || 0 }} lượt tải</span>
                    </div>
                  </div>
                </div>

                <div class="mt-4 pt-3 border-t border-[#e4e4e7]">
                  <a
                    v-if="portableAsset"
                    :href="portableAsset.browser_download_url"
                    target="_blank"
                    class="btn-clickup-ghost w-full text-center justify-center !py-2.5 !text-xs"
                  >
                    <i class="fa-solid fa-box-archive text-sm mr-1"></i>
                    Tải Bản Portable (.zip)
                  </a>
                </div>
              </div>
            </div>

            <!-- [P1 FIX] Windows SmartScreen Guidance Card -->
            <div class="mt-5 p-4 sm:p-5 rounded-2xl bg-[#eff6ff] border border-[#bfdbfe] text-xs text-[#1e3a8a] flex flex-col sm:flex-row items-start sm:items-center gap-3.5">
              <div class="w-9 h-9 rounded-full bg-[#dbeafe] text-[#1d4ed8] flex items-center justify-center text-base shrink-0 font-bold">
                <i class="fa-solid fa-shield-halved"></i>
              </div>
              <div class="flex-1 space-y-1">
                <div class="font-bold text-sm text-[#1e40af] flex items-center gap-2">
                  <span>Mẹo khởi chạy nếu gặp màn hình xanh bảo vệ Windows Defender (SmartScreen)</span>
                </div>
                <p class="text-xs text-[#1e3a8a] leading-relaxed">
                  Vì là ứng dụng mã nguồn mở sinh viên chưa đăng ký chứng chỉ thương mại đắt đỏ, nếu Windows hiển thị: <em>"Windows protected your PC / Unknown Publisher"</em>, bạn hãy bấm vào <strong>"More info"</strong> rồi chọn <strong>"Run anyway"</strong> để mở ứng dụng bình thường.
                </p>
              </div>
            </div>

            <!-- Other Assets / Source Code Accordion -->
            <div class="mt-6 pt-4 border-t border-[#e4e4e7]">
              <div class="text-xs font-bold text-[#52525b] uppercase tracking-wider mb-2">Tất cả tập tin bổ trợ &amp; mã nguồn:</div>
              <div class="divide-y divide-[#e4e4e7] border border-[#e4e4e7] rounded-xl overflow-hidden bg-white text-xs">
                <div
                  v-for="asset in validAssets"
                  :key="asset.id"
                  class="p-3.5 flex items-center justify-between hover:bg-[#f8f9fa] transition-colors"
                >
                  <div class="flex items-center gap-3 min-w-0">
                    <i :class="getAssetIcon(asset.name)" class="text-base text-[#00529c] shrink-0" aria-hidden="true"></i>
                    <div class="min-w-0">
                      <div class="font-bold text-[#18181b] truncate">{{ asset.name }}</div>
                      <div class="text-[#52525b] text-[11px] mt-0.5">
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
          </div>

          <!-- Markdown Rendered Changelog -->
          <div v-if="latestRelease.body" class="mt-8 pt-6 border-t border-[#e4e4e7]">
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
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f8f9fa] text-[#52525b] border border-[#e4e4e7] text-xs font-bold uppercase tracking-wider">
            Pháp Lý &amp; Điều Khoản Sử Dụng
          </div>
          <h3 class="text-lg font-bold text-[#090c1d] font-display">
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
const error = ref(false);
const latestRelease = ref(null);
const showChangelog = ref(false);
const userDevice = ref({ os: OS.WINDOWS, arch: ARCH.X64 });

const CACHE_KEY = 'ctu_release_data_v2';
const CACHE_TIME_KEY = 'ctu_release_timestamp';
const CACHE_DURATION = 10 * 60 * 1000;

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
  if (!latestRelease.value?.assets) return [];
  return latestRelease.value.assets.filter((a) => !isIgnoredAsset(a.name));
});

// Setup Installer (Auto update)
const recommendedSetupAsset = computed(() => {
  if (!validAssets.value.length) return null;
  return validAssets.value.find((a) => {
    const n = a.name.toLowerCase();
    return n.includes('setup') && n.endsWith('.exe') && !n.includes('arm64');
  }) || validAssets.value.find((a) => a.name.endsWith('.exe'));
});

// Portable Edition (.zip or portable .exe)
const portableAsset = computed(() => {
  if (!validAssets.value.length) return null;
  return validAssets.value.find((a) => {
    const n = a.name.toLowerCase();
    return (n.endsWith('.zip') || n.includes('portable')) && !n.includes('setup');
  }) || validAssets.value[1] || validAssets.value[0];
});

// Parse release notes markdown with marked
const renderedMarkdownBody = computed(() => {
  if (!latestRelease.value?.body) return '';
  try {
    return marked.parse(latestRelease.value.body);
  } catch {
    return latestRelease.value.body;
  }
});

function getAssetIcon(filename) {
  const n = filename.toLowerCase();
  if (n.endsWith('.exe')) return 'fa-brands fa-windows';
  if (n.endsWith('.zip')) return 'fa-solid fa-box-archive';
  if (n.endsWith('.pkg') || n.endsWith('.dmg')) return 'fa-brands fa-apple';
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
  error.value = false;

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
    error.value = true;
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  userDevice.value = detectDevice();
  fetchReleases();
});
</script>
