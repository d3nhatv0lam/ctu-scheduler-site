// github-release.js
// 80% vibe - mình không giỏi web, đừng var mình huhu

import { detectDevice, OS, ARCH } from './detector.js';

const REPO_OWNER = "d3nhatv0lam";
const REPO_NAME = "CTU-Scheduler";
const API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest`;
const CACHE_KEY_DATA = "ctu_release_data";
const CACHE_KEY_ETAG = "ctu_release_etag";
const CACHE_KEY_TIME = "ctu_release_timestamp";
const CACHE_DURATION = 10 * 60 * 1000; // 10 phút tính bằng mili-giây

function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } catch (e) {
    return dateString;
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

function generateAssetCardHtml(asset) {
  return `
    <a href="${asset.url}" target="_blank" class="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/15 transition-all duration-300 group">
      <div class="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shrink-0">
        <i class="${asset.icon} fa-fw text-xl"></i>
      </div>
      <div class="min-w-0 flex-grow">
        <div class="text-sm font-bold text-white break-words">${asset.name}</div>
        <div class="text-xs text-gray-400 mt-1 flex flex-wrap items-center gap-2">
          <span>${asset.size ? formatBytes(asset.size) : "Mã nguồn"}</span>
          ${asset.downloads !== null ? `<span class="w-1 h-1 rounded-full bg-gray-500"></span> <span><i class="fa-solid fa-download text-[10px] mr-0.5"></i> ${asset.downloads.toLocaleString("vi-VN")} tải</span>` : ""}
        </div>
      </div>
      <div class="text-gray-500 group-hover:text-secondary transition-colors pl-2">
        <i class="fa-solid fa-arrow-down text-sm"></i>
      </div>
    </a>
  `;
}

function parseMarkdown(md) {
  if (!md) return "";

  // Tránh XSS bằng cách escape các thẻ HTML cơ bản trước
  let html = md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Render Headings
  html = html.replace(
    /^### (.*$)/gim,
    '<h4 class="font-bold text-white text-base mt-4 mb-2">$1</h4>',
  );
  html = html.replace(
    /^## (.*$)/gim,
    '<h3 class="font-bold text-white text-lg mt-5 mb-2">$1</h3>',
  );
  html = html.replace(
    /^# (.*$)/gim,
    '<h2 class="font-bold text-white text-xl mt-6 mb-3">$1</h2>',
  );

  // Render Bold: **text**
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Render Inline Code: `code`
  html = html.replace(
    /`(.*?)`/g,
    '<code class="bg-white/10 px-1.5 py-0.5 rounded text-xs text-secondary font-mono">$1</code>',
  );

  // Render Links: [text](url)
  html = html.replace(
    /\[(.*?)\]\((.*?)\)/g,
    '<a href="$2" target="_blank" class="text-secondary hover:underline">$1</a>',
  );

  // Render Lists and Paragraphs
  const lines = html.split("\n");
  let inList = false;
  let result = [];

  for (let line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      if (!inList) {
        result.push(
          '<ul class="list-disc pl-5 my-2 space-y-1 text-slate-300">',
        );
        inList = true;
      }
      const content = trimmed.substring(2);
      result.push(`<li>${content}</li>`);
    } else {
      if (inList) {
        result.push("</ul>");
        inList = false;
      }
      if (trimmed) {
        result.push(`<p class="my-1.5 text-slate-300">${line}</p>`);
      }
    }
  }
  if (inList) {
    result.push("</ul>");
  }

  return result.join("\n");
}

export async function initGithubRelease() {
  const loadingEl = document.getElementById("download-loading");
  const errorEl = document.getElementById("download-error");
  const contentEl = document.getElementById("download-content");

  if (!loadingEl || !errorEl || !contentEl) return;

  try {
    const cachedData = localStorage.getItem(CACHE_KEY_DATA);
    const cachedEtag = localStorage.getItem(CACHE_KEY_ETAG);
    const cachedTime = localStorage.getItem(CACHE_KEY_TIME);
    const now = Date.now();

    let releaseData = null;

    // Nếu cache còn hạn trong vòng 10 phút, sử dụng trực tiếp không gọi API mạng
    if (
      cachedData &&
      cachedTime &&
      now - parseInt(cachedTime) < CACHE_DURATION
    ) {
      releaseData = JSON.parse(cachedData);
    } else {
      // Thiết lập Header đính kèm ETag nếu có để yêu cầu trả về 304 khi không thay đổi
      const headers = {};
      if (cachedEtag) {
        headers["If-None-Match"] = cachedEtag;
      }

      const response = await fetch(API_URL, { headers });

      if (response.status === 304 && cachedData) {
        // Dữ liệu trên server chưa thay đổi (304 Not Modified), dùng lại cache cũ và gia hạn cache
        releaseData = JSON.parse(cachedData);
        localStorage.setItem(CACHE_KEY_TIME, now.toString());
      } else if (response.status === 200) {
        // Có dữ liệu mới từ Server
        const data = await response.json();
        const etag = response.headers.get("etag");

        localStorage.setItem(CACHE_KEY_DATA, JSON.stringify(data));
        localStorage.setItem(CACHE_KEY_TIME, now.toString());
        if (etag) {
          localStorage.setItem(CACHE_KEY_ETAG, etag);
        } else {
          localStorage.removeItem(CACHE_KEY_ETAG);
        }
        releaseData = data;
      } else {
        // Nếu lỗi mạng/quá rate limit mà trước đó đã từng có cache, ta dùng tạm cache cũ (cho dù hết hạn)
        if (cachedData) {
          releaseData = JSON.parse(cachedData);
        } else {
          throw new Error(`Lỗi fetch GitHub API: Status ${response.status}`);
        }
      }
    }

    if (releaseData) {
      const device = await detectDevice();
      renderRelease(releaseData, device);
    } else {
      throw new Error("Không thể tải dữ liệu phát hành");
    }
  } catch (error) {
    console.error("Lỗi khi fetch thông tin release mới nhất:", error);
    loadingEl.classList.add("hidden");
    errorEl.classList.remove("hidden");
    contentEl.classList.add("hidden");
  }
}

function renderDownloadChooser(device, assetsInfo, data) {
  let buttonsHtml = "";
  let instructionsHtml = "";

  if (device.os === OS.MACOS) {
    const armUrl = assetsInfo.macArm64 ? assetsInfo.macArm64.browser_download_url : data.html_url;
    const intelUrl = assetsInfo.macX64 ? assetsInfo.macX64.browser_download_url : data.html_url;
    
    buttonsHtml = `
      <a href="${armUrl}" target="_blank" class="btn-primary !px-6 !py-3 text-sm flex items-center justify-center gap-2 shadow-lg shadow-secondary/5 w-full sm:w-auto">
        <i class="fa-brands fa-apple text-lg"></i> Mac Apple Silicon (ARM64)
      </a>
      <a href="${intelUrl}" target="_blank" class="btn-primary !bg-slate-800 hover:!bg-slate-700 !text-slate-100 !px-6 !py-3 text-sm flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 transition-all duration-300 w-full sm:w-auto">
        <i class="fa-brands fa-apple text-lg"></i> Mac Intel Chip (x64)
      </a>
    `;
    instructionsHtml = `
      * Xem loại chip của bạn tại: Menu <i class="fa-brands fa-apple"></i> ở góc trái màn hình &gt; Giới thiệu về máy Mac này (About This Mac).
    `;
  } else if (device.os === OS.WINDOWS) {
    const x64Url = assetsInfo.winX64 ? assetsInfo.winX64.browser_download_url : data.html_url;
    const armUrl = assetsInfo.winArm64 ? assetsInfo.winArm64.browser_download_url : data.html_url;

    buttonsHtml = `
      <a href="${x64Url}" target="_blank" class="btn-primary !px-6 !py-3 text-sm flex items-center justify-center gap-2 shadow-lg shadow-secondary/5 w-full sm:w-auto">
        <i class="fa-brands fa-windows text-lg"></i> Windows (x64)
      </a>
      <a href="${armUrl}" target="_blank" class="btn-primary !bg-slate-800 hover:!bg-slate-700 !text-slate-100 !px-6 !py-3 text-sm flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 transition-all duration-300 w-full sm:w-auto">
        <i class="fa-brands fa-windows text-lg"></i> Windows (ARM64)
      </a>
    `;
    instructionsHtml = `
      * Xem loại cấu hình máy tại: Settings (Cài đặt) &gt; System (Hệ thống) &gt; About (Giới thiệu) &gt; System type.
    `;
  } else if (device.os === OS.LINUX) {
    const x64Url = assetsInfo.linuxX64 ? assetsInfo.linuxX64.browser_download_url : data.html_url;
    const armUrl = assetsInfo.linuxArm64 ? assetsInfo.linuxArm64.browser_download_url : data.html_url;

    buttonsHtml = `
      <a href="${x64Url}" target="_blank" class="btn-primary !px-6 !py-3 text-sm flex items-center justify-center gap-2 shadow-lg shadow-secondary/5 w-full sm:w-auto">
        <i class="fa-brands fa-linux text-lg"></i> Linux (x64)
      </a>
      <a href="${armUrl}" target="_blank" class="btn-primary !bg-slate-800 hover:!bg-slate-700 !text-slate-100 !px-6 !py-3 text-sm flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 transition-all duration-300 w-full sm:w-auto">
        <i class="fa-brands fa-linux text-lg"></i> Linux (ARM64)
      </a>
    `;
    instructionsHtml = `
      * Gõ lệnh <code>uname -m</code> hoặc <code>lscpu</code> trong terminal để kiểm tra kiến trúc CPU của bạn.
    `;
  }

  const osNameFormatted = device.os === OS.MACOS ? "macOS" : device.os === OS.WINDOWS ? "Windows" : "Linux";

  return `
    <div class="space-y-4 pt-1 w-full">
      <div class="text-xs text-gray-400 flex items-center gap-1.5">
        <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
        Nhận dạng thiết bị: <strong class="text-slate-200">${osNameFormatted}</strong> (Chưa xác định được kiến trúc CPU)
      </div>
      <div class="flex flex-col sm:flex-row gap-3">
        ${buttonsHtml}
      </div>
      <p class="text-[11px] text-gray-400 italic">${instructionsHtml}</p>
    </div>
  `;
}

function renderRelease(data, device) {
  const loadingEl = document.getElementById("download-loading");
  const errorEl = document.getElementById("download-error");
  const contentEl = document.getElementById("download-content");

  const assets = data.assets || [];
  let mainAsset = null;
  const otherAssets = [];

  // Định nghĩa các Regex để lọc tệp theo HDH & Kiến trúc
  const winX64Pattern = /win.*x64/i;
  const winArm64Pattern = /win.*(arm64|aarch64)/i;
  const macX64Pattern = /(mac|osx).*x64/i;
  const macArm64Pattern = /(mac|osx).*(arm64|aarch64)/i;
  const linuxX64Pattern = /linux.*x64/i;
  const linuxArm64Pattern = /linux.*(arm64|aarch64)/i;

  let winX64 = null;
  let winArm64 = null;
  let macX64 = null;
  let macArm64 = null;
  let linuxX64 = null;
  let linuxArm64 = null;

  // Phân loại tài nguyên tải xuống
  assets.forEach((asset) => {
    const name = asset.name.toLowerCase();
    if (winX64Pattern.test(name)) {
      winX64 = asset;
    } else if (winArm64Pattern.test(name)) {
      winArm64 = asset;
    } else if (macX64Pattern.test(name)) {
      macX64 = asset;
    } else if (macArm64Pattern.test(name)) {
      macArm64 = asset;
    } else if (linuxX64Pattern.test(name)) {
      linuxX64 = asset;
    } else if (linuxArm64Pattern.test(name)) {
      linuxArm64 = asset;
    } else {
      otherAssets.push({
        name: asset.name,
        url: asset.browser_download_url,
        size: asset.size,
        downloads: asset.download_count,
        icon: "fa-regular fa-file-zipper text-gray-400",
      });
    }
  });

  // Lựa chọn file tải chính phù hợp với OS và Arch của user
  if (device.os === OS.WINDOWS) {
    mainAsset = device.arch === ARCH.ARM64 ? (winArm64 || winX64) : (winX64 || winArm64);
  } else if (device.os === OS.MACOS) {
    mainAsset = device.arch === ARCH.ARM64 ? (macArm64 || macX64) : (macX64 || macArm64);
  } else if (device.os === OS.LINUX) {
    mainAsset = device.arch === ARCH.ARM64 ? (linuxArm64 || linuxX64) : (linuxX64 || linuxArm64);
  }

  // Fallback mặc định nếu không khớp được file phù hợp
  if (!mainAsset) {
    mainAsset = winX64 || winArm64 || macArm64 || macX64 || linuxX64 || linuxArm64 || assets[0];
  }

  // Lưu thông tin các file chính
  const assetsInfo = {
    winX64, winArm64, macX64, macArm64, linuxX64, linuxArm64
  };

  const isMobile = device.os === OS.ANDROID || device.os === OS.IOS;
  const isUnknownOS = device.os === OS.UNKNOWN;

  const isMacAmbiguous = device.os === OS.MACOS && device.arch === ARCH.UNKNOWN;
  const isWinAmbiguous = device.os === OS.WINDOWS && device.arch === ARCH.UNKNOWN;
  const isLinuxAmbiguous = device.os === OS.LINUX && device.arch === ARCH.UNKNOWN;

  const isRenderingMainButton = !isMobile && !isUnknownOS && device.arch !== ARCH.UNKNOWN;

  // Tạo danh sách "Các tùy chọn tải khác"
  const otherDownloadsList = [];

  if (winX64 && (winX64 !== mainAsset || !isRenderingMainButton) && !isWinAmbiguous) {
    otherDownloadsList.push({
      name: "Windows (x64) - Portable",
      filename: winX64.name,
      url: winX64.browser_download_url,
      size: winX64.size,
      downloads: winX64.download_count,
      icon: "fa-brands fa-windows text-blue-400",
    });
  }

  if (winArm64 && (winArm64 !== mainAsset || !isRenderingMainButton) && !isWinAmbiguous) {
    otherDownloadsList.push({
      name: "Windows (ARM64) - Portable",
      filename: winArm64.name,
      url: winArm64.browser_download_url,
      size: winArm64.size,
      downloads: winArm64.download_count,
      icon: "fa-brands fa-windows text-slate-400",
    });
  }

  if (macArm64 && (macArm64 !== mainAsset || !isRenderingMainButton) && !isMacAmbiguous) {
    otherDownloadsList.push({
      name: "macOS (Apple Silicon / ARM64)",
      filename: macArm64.name,
      url: macArm64.browser_download_url,
      size: macArm64.size,
      downloads: macArm64.download_count,
      icon: "fa-brands fa-apple text-white",
    });
  }

  if (macX64 && (macX64 !== mainAsset || !isRenderingMainButton) && !isMacAmbiguous) {
    otherDownloadsList.push({
      name: "macOS (Intel / x64)",
      filename: macX64.name,
      url: macX64.browser_download_url,
      size: macX64.size,
      downloads: macX64.download_count,
      icon: "fa-brands fa-apple text-slate-400",
    });
  }

  if (linuxX64 && (linuxX64 !== mainAsset || !isRenderingMainButton) && !isLinuxAmbiguous) {
    otherDownloadsList.push({
      name: "Linux (x64)",
      filename: linuxX64.name,
      url: linuxX64.browser_download_url,
      size: linuxX64.size,
      downloads: linuxX64.download_count,
      icon: "fa-brands fa-linux text-amber-400",
    });
  }

  if (linuxArm64 && (linuxArm64 !== mainAsset || !isRenderingMainButton) && !isLinuxAmbiguous) {
    otherDownloadsList.push({
      name: "Linux (ARM64)",
      filename: linuxArm64.name,
      url: linuxArm64.browser_download_url,
      size: linuxArm64.size,
      downloads: linuxArm64.download_count,
      icon: "fa-brands fa-linux text-orange-400",
    });
  }

  // Gộp các file chưa phân loại khác
  otherAssets.forEach((asset) => {
    otherDownloadsList.push({
      name: asset.name,
      filename: asset.name,
      url: asset.url,
      size: asset.size,
      downloads: asset.downloads,
      icon: "fa-regular fa-file-zipper text-gray-400",
    });
  });

  // Tính tổng số lượt tải
  const totalDownloads = assets.reduce(
    (sum, asset) => sum + (asset.download_count || 0),
    0,
  );

  // Tạo khối giao diện Tải xuống dựa trên OS & Arch của người dùng
  let downloadAreaHtml = "";

  if (device.os === OS.ANDROID || device.os === OS.IOS) {
    downloadAreaHtml = `
      <div class="p-5 rounded-xl border border-secondary/20 bg-secondary/5 text-sm space-y-2 mt-2">
        <div class="font-bold text-white flex items-center gap-2">
          <i class="fa-solid fa-laptop text-secondary text-base"></i> Ứng Dụng Dành Cho Máy Tính
        </div>
        <p class="text-gray-300 text-xs leading-relaxed">
          CTU Scheduler hiện chỉ hỗ trợ các hệ điều hành máy tính (Windows, macOS, Linux). 
          Vui lòng mở trang web này trên máy tính của bạn để tải ứng dụng.
        </p>
        <div class="flex flex-wrap items-center gap-4 pt-1">
          <a href="${data.html_url}" target="_blank" class="text-xs text-secondary hover:underline font-medium flex items-center gap-1">
            Xem trên GitHub <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
          </a>
          <button id="show-mobile-downloads-btn" class="text-xs text-gray-400 hover:text-white underline focus:outline-none transition-colors">
            Vẫn hiển thị liên kết tải về
          </button>
        </div>
        <div id="mobile-downloads-container" class="hidden pt-4 border-t border-white/5 space-y-3">
          <p class="text-xs text-gray-400 italic">Chọn phiên bản máy tính bạn muốn tải về thiết bị di động:</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            ${otherDownloadsList.map(generateAssetCardHtml).join("")}
          </div>
        </div>
      </div>
    `;
  } else if (device.os === OS.UNKNOWN) {
    downloadAreaHtml = `
      <div class="p-5 rounded-xl border border-white/10 bg-white/5 space-y-3 mt-2">
        <div class="text-xs text-amber-400 font-semibold flex items-center gap-1.5">
          <i class="fa-solid fa-triangle-exclamation"></i> Không thể nhận dạng Hệ điều hành
        </div>
        <p class="text-xs text-gray-300 leading-relaxed">
          Chúng tôi không thể tự động phát hiện hệ điều hành của bạn. Vui lòng tải xuống thủ công:
        </p>
        <div class="flex flex-wrap gap-3 pt-1">
          ${winX64 ? `<a href="${winX64.browser_download_url}" target="_blank" class="btn-primary !px-5 !py-2.5 !text-xs flex items-center gap-1.5"><i class="fa-brands fa-windows"></i> Windows x64</a>` : ""}
          ${macArm64 ? `<a href="${macArm64.browser_download_url}" target="_blank" class="btn-primary !px-5 !py-2.5 !text-xs flex items-center gap-1.5"><i class="fa-brands fa-apple"></i> macOS ARM64</a>` : ""}
          ${linuxX64 ? `<a href="${linuxX64.browser_download_url}" target="_blank" class="btn-primary !px-5 !py-2.5 !text-xs flex items-center gap-1.5"><i class="fa-brands fa-linux"></i> Linux x64</a>` : ""}
        </div>
        <div class="pt-1">
          <a href="${data.html_url}" target="_blank" class="text-xs text-secondary hover:underline font-medium">
            Đi tới trang GitHub Releases chính thức <i class="fa-solid fa-chevron-right text-[9px]"></i>
          </a>
        </div>
      </div>
    `;
  } else if (device.arch === ARCH.UNKNOWN) {
    downloadAreaHtml = renderDownloadChooser(device, assetsInfo, data);
  } else {
    // Xác định text và icon phù hợp cho nút chính
    let mainIcon = "fa-brands fa-windows";
    let mainOSName = "Windows";

    if (device.os === OS.MACOS) {
      mainIcon = "fa-brands fa-apple";
      mainOSName = "macOS";
    } else if (device.os === OS.LINUX) {
      mainIcon = "fa-brands fa-linux";
      mainOSName = "Linux";
    }

    const isPortable = mainAsset.name.toLowerCase().endsWith(".zip") || mainAsset.name.toLowerCase().endsWith(".tar.gz");
    const mainAssetArch = device.arch === ARCH.ARM64 ? "ARM64" : "x64";
    const mainBtnLabel = `<i class="${mainIcon} text-xl"></i> Tải Cho ${mainOSName} (${mainAssetArch}${isPortable ? " - Portable" : ""})`;

    downloadAreaHtml = `
      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
        <a href="${mainAsset ? mainAsset.browser_download_url : data.html_url}" target="_blank" class="btn-primary !px-8 !py-4 text-base shadow-xl shadow-secondary/10 w-full sm:w-auto">
          ${mainBtnLabel}
        </a>
        ${
          mainAsset
            ? `
          <div class="text-xs text-gray-400">
            <div class="font-medium text-slate-300">✓ Detected: ${mainOSName} (${mainAssetArch})</div>
            <div class="mt-0.5"><i class="fa-solid fa-download mr-1"></i> ${mainAsset.download_count.toLocaleString("vi-VN")} lượt tải bản này</div>
          </div>
        `
            : ""
        }
      </div>
    `;
  }

  // Render HTML động
  contentEl.innerHTML = `
    <div class="glass-card reveal !p-8 border border-white/10 bg-slate-900/40 relative overflow-hidden active">
      <!-- Glow effect in card background -->
      <div class="absolute -top-12 -right-12 w-48 h-48 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

      <div class="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between pb-6 border-b border-white/10 mb-6 relative z-10">
        <div class="space-y-3">
          <div class="flex flex-wrap items-center gap-3">
            <span class="px-3 py-1 text-xs font-semibold rounded-full bg-secondary/15 text-secondary border border-secondary/30">Phiên Bản Mới Nhất</span>
            <span class="text-white font-bold text-lg">${data.tag_name}</span>
            <span class="text-gray-400 text-sm">Cập nhật: ${formatDate(data.published_at)}</span>
          </div>
          <h3 class="text-3xl font-extrabold text-white tracking-tight">${data.name || `CTU Scheduler ${data.tag_name}`}</h3>
        </div>
        
        <!-- Stats widget: Tổng lượt tải & Trạng thái hoạt động -->
        <div class="flex gap-6 bg-white/5 border border-white/5 rounded-xl p-3 px-6 items-center text-center self-stretch sm:self-auto justify-around shrink-0">
          <div>
            <div class="text-[10px] text-gray-400 uppercase tracking-wider">Tổng lượt tải</div>
            <div class="text-xl font-bold text-secondary mt-0.5">${totalDownloads.toLocaleString("vi-VN")}</div>
          </div>
          <div class="border-l border-white/10 h-8"></div>
          <div>
            <div class="text-[10px] text-gray-400 uppercase tracking-wider">Trạng thái</div>
            <div class="text-xs font-semibold text-emerald-400 mt-0.5 flex items-center gap-1.5 justify-center">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> Hoạt động
            </div>
          </div>
        </div>
      </div>

      <div class="relative z-10 space-y-4 mb-8">
        ${downloadAreaHtml}
        
        <p class="text-[11px] text-gray-500 mt-3">Bằng việc tải xuống và sử dụng CTU Scheduler, bạn đồng ý với <a href="https://github.com/d3nhatv0lam/TERMS.md" target="_blank" class="text-secondary hover:underline">Điều khoản sử dụng & Miễn trừ trách nhiệm</a> của dự án.</p>
      </div>

      <!-- Secondary Downloads Section -->
      <div class="relative z-10 ${isMobile ? 'hidden' : ''}">
        <h4 class="text-sm font-semibold uppercase tracking-wider text-secondary/80 mb-4"><i class="fa-solid fa-cubes mr-2"></i> Các Tùy Chọn Tải Khác</h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          ${otherDownloadsList.map(generateAssetCardHtml).join("")}
        </div>
      </div>

      <!-- Changelog Section -->
      ${
        data.body
          ? `
        <div class="mt-8 pt-8 border-t border-white/10 relative z-10">
          <button id="changelog-toggle-btn" class="flex items-center justify-between w-full text-left text-white font-semibold text-base py-2 hover:text-secondary transition-colors group">
            <span class="flex items-center gap-2">
              <i class="fa-solid fa-clock-rotate-left text-secondary"></i> Nhật Ký Cập Nhật (Changelog)
            </span>
            <i id="changelog-chevron" class="fa-solid fa-chevron-down transition-transform duration-300"></i>
          </button>
          <div id="changelog-content" class="mt-4 hidden p-5 bg-white/5 rounded-xl border border-white/5 max-h-96 overflow-y-auto custom-scrollbar leading-relaxed">
            ${parseMarkdown(data.body)}
          </div>
        </div>
      `
          : ""
      }

    </div>
  `;

  // Gắn sự kiện ẩn/hiện Changelog
  const toggleBtn = document.getElementById("changelog-toggle-btn");
  const changelogContent = document.getElementById("changelog-content");
  const chevron = document.getElementById("changelog-chevron");

  if (toggleBtn && changelogContent && chevron) {
    toggleBtn.addEventListener("click", () => {
      const isHidden = changelogContent.classList.contains("hidden");
      if (isHidden) {
        changelogContent.classList.remove("hidden");
        chevron.classList.add("rotate-180");
      } else {
        changelogContent.classList.add("hidden");
        chevron.classList.remove("rotate-180");
      }
    });
  }

  // Gắn sự kiện hiển thị link tải trên mobile
  const showMobileBtn = document.getElementById("show-mobile-downloads-btn");
  const mobileDownloadsContainer = document.getElementById("mobile-downloads-container");
  if (showMobileBtn && mobileDownloadsContainer) {
    showMobileBtn.addEventListener("click", () => {
      const isHidden = mobileDownloadsContainer.classList.contains("hidden");
      if (isHidden) {
        mobileDownloadsContainer.classList.remove("hidden");
        showMobileBtn.textContent = "Ẩn liên kết tải về";
      } else {
        mobileDownloadsContainer.classList.add("hidden");
        showMobileBtn.textContent = "Vẫn hiển thị liên kết tải về";
      }
    });
  }

  // Ẩn loading/error và hiển thị content
  loadingEl.classList.add("hidden");
  errorEl.classList.add("hidden");
  contentEl.classList.remove("hidden");

  // Kích hoạt animation reveal cho các thành phần vừa thêm
  setTimeout(() => {
    contentEl
      .querySelectorAll(".reveal")
      .forEach((el) => el.classList.add("active"));
  }, 50);
}
