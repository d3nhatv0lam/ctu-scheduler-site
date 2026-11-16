<template>
  <section id="download" class="py-20 border-b border-[#1c1d22]">
    <div class="container mx-auto max-w-slash px-4">
      <div class="max-w-2xl text-left mb-12">
        <div class="copper-tag mb-2">Bản Phát Hành Chính Thức</div>
        <h2 class="text-3xl sm:text-4xl font-medium tracking-tight text-[#ffffff] mb-3">
          Tải CTU Scheduler
        </h2>
        <p class="text-[#9194a1] text-sm sm:text-base leading-relaxed">
          Ứng dụng tương thích tối ưu trên Windows x64. Tải xuống bản cài đặt tự động cập nhật hoặc bản chạy ngay Portable.
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="slash-card text-center py-12">
        <div class="text-xs text-[#9194a1] flex items-center justify-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-[#ae9357] animate-pulse"></span>
          Đang kiểm tra bản phát hành mới nhất từ GitHub Releases...
        </div>
      </div>

      <!-- Error / Fallback State -->
      <div v-else-if="error" class="slash-card text-center py-10 space-y-4">
        <div class="text-sm font-medium text-[#ffffff]">Không thể tải danh sách trực tiếp từ GitHub</div>
        <p class="text-xs text-[#9194a1] max-w-md mx-auto">
          Bạn có thể truy cập thẳng vào kho lưu trữ Releases chính thức để tải bản cài đặt.
        </p>
        <div>
          <a
            href="https://github.com/d3nhatv0lam/CTU-Scheduler/releases"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-pill-primary !text-xs"
          >
            Đi Tới GitHub Releases
          </a>
        </div>
      </div>

      <!-- Main Release Showcase -->
      <div v-else-if="latestRelease" class="space-y-6">
        <!-- Hero Release Header Card -->
        <div class="slash-card">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1c1d22]">
            <div>
              <div class="flex items-center gap-2.5">
                <span class="text-lg font-medium text-[#ffffff]">{{ latestRelease.name || latestRelease.tag_name }}</span>
                <span class="text-[11px] px-2 py-0.5 rounded-full border border-[#2e3038] text-[#ae9357] bg-[#121317]">
                  {{ latestRelease.tag_name }}
                </span>
              </div>
              <div class="text-xs text-[#9194a1] mt-1">
                Phát hành ngày {{ formatDate(latestRelease.published_at) }}
              </div>
            </div>

            <!-- Primary Recommended Download CTA -->
            <div>
              <a
                v-if="recommendedAsset"
                :href="recommendedAsset.browser_download_url"
                target="_blank"
                class="btn-pill-primary w-full sm:w-auto"
              >
                <i class="fa-solid fa-download text-xs" aria-hidden="true"></i>
                Tải {{ recommendedAsset.name }} (Khuyên Dùng)
              </a>
              <a
                v-else
                :href="latestRelease.html_url"
                target="_blank"
                class="btn-pill-primary w-full sm:w-auto"
              >
                Tải Bản Mới Nhất
              </a>
            </div>
          </div>

          <!-- All Available Asset Downloads (Financial Data Table Style) -->
          <div class="mt-4">
            <div class="text-xs font-semibold text-[#9194a1] mb-2">Tất cả tập tin cài đặt:</div>
            <div class="divide-y divide-[#1c1d22] border-t border-[#1c1d22]">
              <div
                v-for="asset in validAssets"
                :key="asset.id"
                class="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div class="flex items-center gap-3 min-w-0">
                  <div class="w-8 h-8 rounded-full bg-[#121317] border border-[#2e3038] flex items-center justify-center text-[#9194a1] shrink-0">
                    <i :class="getAssetIcon(asset.name)" aria-hidden="true"></i>
                  </div>
                  <div class="min-w-0">
                    <div class="font-medium text-[#ffffff] truncate">{{ asset.name }}</div>
                    <div class="text-[#5e616e] text-[11px] flex items-center gap-2 mt-0.5">
                      <span>{{ formatBytes(asset.size) }}</span>
                      <span class="w-1 h-1 rounded-full bg-[#2e3038]"></span>
                      <span>{{ asset.download_count?.toLocaleString('vi-VN') || 0 }} lượt tải</span>
                    </div>
                  </div>
                </div>

                <div class="flex items-center gap-2 shrink-0">
                  <a
                    :href="asset.browser_download_url"
                    target="_blank"
                    class="btn-pill-ghost !py-1 !px-3 !text-[11px]"
                  >
                    Tải Xuống
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Collapsible Changelog -->
          <div v-if="latestRelease.body" class="mt-6 pt-4 border-t border-[#1c1d22]">
            <button
              type="button"
              class="text-xs text-[#9194a1] hover:text-[#ffffff] flex items-center gap-2 focus:outline-none"
              @click="showChangelog = !showChangelog"
            >
              <span>{{ showChangelog ? 'Thu gọn nhật ký thay đổi' : 'Xem nhật ký thay đổi (Release Notes)' }}</span>
              <svg
                class="w-3.5 h-3.5 transition-transform"
                :class="{ 'rotate-180': showChangelog }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              v-show="showChangelog"
              class="mt-3 p-4 bg-[#08080a] rounded-[10px] border border-[#1c1d22] text-xs text-[#acafb9] leading-relaxed whitespace-pre-line"
            >
              {{ latestRelease.body }}
            </div>
          </div>
        </div>

        <!-- Terms of Use & Liability Disclaimers (Slash Editorial Legal Text) -->
        <div class="slash-card space-y-4">
          <div class="copper-tag">Pháp Lý &amp; Điều Khoản</div>
          <h3 class="text-base font-medium text-[#ffffff]">
            Điều Khoản Sử Dụng &amp; Miễn Trừ Trách Nhiệm
          </h3>
          <div class="space-y-3 text-xs text-[#acafb9] leading-relaxed">
            <div>
              <strong class="text-[#ffffff]">1. Quyền Riêng Tư &amp; Bảo Mật Dữ Liệu:</strong>
              <p class="text-[#9194a1] mt-1">
                Mọi thao tác đăng nhập và đồng bộ thời khóa biểu chỉ diễn ra cục bộ trên máy tính của bạn và giao tiếp thẳng với máy chủ MyCTU. Nhóm phát triển cam kết tuyệt đối không thu thập, không lưu trữ và không truyền tải thông tin đăng nhập của bạn đến bất kỳ bên thứ ba nào. Mật khẩu tự động bị tiêu hủy khỏi bộ nhớ đệm ngay khi kết thúc phiên.
              </p>
            </div>
            <div>
              <strong class="text-[#ffffff]">2. Miễn Trừ Trách Nhiệm (Disclaimer):</strong>
              <p class="text-[#9194a1] mt-1">
                Ứng dụng phát hành miễn phí theo Giấy phép mã nguồn mở MIT "AS IS" (Có sao dùng vậy). Nhóm phát triển không chịu trách nhiệm đối với các sự cố bất khả kháng như nghẽn mạng MyCTU vào giờ cao điểm, kẹt mã Captcha hoặc hệ thống cổng thông tin trường thay đổi đột ngột.
              </p>
            </div>
            <div>
              <strong class="text-[#ffffff]">3. Mục Đích &amp; Lưu Ý Vận Hành:</strong>
              <p class="text-[#9194a1] mt-1">
                Ứng dụng mở một trình duyệt ảo ngầm để lấy dữ liệu. Vui lòng không tắt cửa sổ ngầm này trong quá trình đồng bộ và tự giải Captcha nếu hệ thống MyCTU yêu cầu. Tuyệt đối nghiêm cấm việc dùng ứng dụng để gửi request liên tục làm quá tải máy chủ trường.
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

const recommendedAsset = computed(() => {
  if (!validAssets.value.length) return null;
  // Recommend Windows x64 Setup by default
  const setup = validAssets.value.find((a) => {
    const n = a.name.toLowerCase();
    return n.includes('setup') && n.endsWith('.exe') && !n.includes('arm64');
  });
  return setup || validAssets.value[0];
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

  // Check localStorage cache
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

