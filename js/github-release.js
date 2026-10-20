// github-release.js
// Quản lý hiển thị bản phát hành GitHub Release & Tối ưu hóa cho Velopack

import { detectDevice, OS, ARCH } from './detector.js';

const REPO_OWNER = "d3nhatv0lam";
const REPO_NAME = "CTU-Scheduler";
const API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases?per_page=100`;
const CACHE_KEY_DATA = "ctu_release_data_v2";
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
  if (!bytes || bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

function formatDownloadCount(count) {
  if (count === null || count === undefined || isNaN(count)) return "0";
  
  if (count < 1000) {
    return count.toLocaleString("vi-VN");
  }
  
  if (count < 10000) {
    const value = count / 1000;
    const formatted = parseFloat(value.toFixed(1));
    return `${formatted}K+`;
  }
  
  if (count < 1000000) {
    const value = Math.floor(count / 1000);
    return `${value}K+`;
  }
  
  const value = count / 1000000;
  const formatted = value >= 10 ? Math.floor(value) : parseFloat(value.toFixed(1));
  return `${formatted}M+`;
}

/**
 * Kiểm tra các file nội bộ của Velopack cần loại trừ khỏi giao diện người dùng
 */
function isIgnoredAsset(filename) {
  const name = filename.toLowerCase();
  return (
    name.endsWith(".nupkg") ||
    name.endsWith(".json") ||
    name === "releases" ||
    name.endsWith(".blockmap")
  );
}

/**
 * Tạo HTML cho từng thẻ download card
 */
function generateAssetCardHtml(asset) {
  const isSetup = asset.type === "setup";
  const badgeHtml = isSetup
    ? `<span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 shrink-0"><i class="fa-solid fa-bolt text-[9px]"></i> Auto Update</span>`
    : `<span class="px-2 py-0.5 rounded text-[10px] font-medium bg-amber-500/10 text-amber-300/90 border border-amber-500/20 flex items-center gap-1 shrink-0"><i class="fa-solid fa-box-open text-[9px]"></i> Portable</span>`;

  return `
    <a href="${asset.url}" target="_blank" class="flex items-center gap-3.5 p-3.5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/15 transition-all duration-300 group">
      <div class="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shrink-0">
        <i class="${asset.icon} fa-fw text-xl"></i>
      </div>
      <div class="min-w-0 flex-grow">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div class="text-sm font-bold text-white break-words leading-snug group-hover:text-secondary transition-colors">${asset.name}</div>
          ${badgeHtml}
        </div>
        <div class="text-xs text-gray-400 mt-1 flex flex-wrap items-center gap-2">
          <span class="font-mono text-[11px] text-gray-300 break-all">${asset.filename}</span>
          <span class="w-1 h-1 rounded-full bg-gray-500"></span>
          <span>${asset.size ? formatBytes(asset.size) : "Mã nguồn"}</span>
          ${asset.downloads !== null && asset.downloads !== undefined ? `<span class="w-1 h-1 rounded-full bg-gray-500"></span> <span><i class="fa-solid fa-download text-[10px] mr-0.5"></i> ${asset.downloads.toLocaleString("vi-VN")}</span>` : ""}
        </div>
      </div>
      <div class="text-gray-500 group-hover:text-secondary transition-colors pl-1 shrink-0">
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
      if (Array.isArray(releaseData)) {
        // Tìm bản phát hành chính thức ổn định mới nhất (không phải pre-release hoặc nháp)
        const latestRelease = releaseData.find((r) => !r.prerelease && !r.draft) || releaseData[0];
        renderRelease(latestRelease, device, releaseData);
      } else {
        renderRelease(releaseData, device);
      }
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

/**
 * Hiển thị nút lựa chọn khi chưa xác định được kiến trúc CPU (x64 hay ARM64)
 */
function renderDownloadChooser(device, assetsInfo, data) {
  let buttonsHtml = "";
  let instructionsHtml = "";

  if (device.os === OS.MACOS) {
    const pkgUrl = assetsInfo.macSetup ? assetsInfo.macSetup.browser_download_url : data.html_url;
    buttonsHtml = `
      <a href="${pkgUrl}" target="_blank" class="btn-primary !px-6 !py-3 text-sm flex items-center justify-center gap-2 shadow-lg shadow-secondary/5 w-full sm:w-auto">
        <i class="fa-brands fa-apple text-lg"></i> Tải macOS Setup (.pkg)
      </a>
    `;
    instructionsHtml = `* Gói cài đặt chuẩn .pkg tương thích cho cả Mac Apple Silicon (M1/M2/M3) và Mac Intel Chip.`;
  } else if (device.os === OS.WINDOWS) {
    const x64Url = assetsInfo.winX64Setup ? assetsInfo.winX64Setup.browser_download_url : data.html_url;
    const armUrl = assetsInfo.winArm64Setup ? assetsInfo.winArm64Setup.browser_download_url : data.html_url;

    buttonsHtml = `
      <a href="${x64Url}" target="_blank" class="btn-primary !px-6 !py-3 text-sm flex items-center justify-center gap-2 shadow-lg shadow-secondary/5 w-full sm:w-auto">
        <i class="fa-brands fa-windows text-lg"></i> Windows (x64) - Khuyên dùng
      </a>
      <a href="${armUrl}" target="_blank" class="btn-primary !bg-slate-800 hover:!bg-slate-700 !text-slate-100 !px-6 !py-3 text-sm flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 transition-all duration-300 w-full sm:w-auto">
        <i class="fa-brands fa-windows text-lg"></i> Windows (ARM64)
      </a>
    `;
    instructionsHtml = `* Hầu hết máy tính Windows là bản <strong>x64</strong>. Xem loại cấu hình tại: Settings &gt; System &gt; About &gt; System type.`;
  } else if (device.os === OS.LINUX) {
    const x64Url = assetsInfo.linuxX64 ? assetsInfo.linuxX64.browser_download_url : data.html_url;
    const armUrl = assetsInfo.linuxArm64 ? assetsInfo.linuxArm64.browser_download_url : data.html_url;

    buttonsHtml = `
      <a href="${x64Url}" target="_blank" class="btn-primary !px-6 !py-3 text-sm flex items-center justify-center gap-2 shadow-lg shadow-secondary/5 w-full sm:w-auto">
        <i class="fa-brands fa-linux text-lg"></i> Linux (x64) - AppImage
      </a>
      <a href="${armUrl}" target="_blank" class="btn-primary !bg-slate-800 hover:!bg-slate-700 !text-slate-100 !px-6 !py-3 text-sm flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 transition-all duration-300 w-full sm:w-auto">
        <i class="fa-brands fa-linux text-lg"></i> Linux (ARM64)
      </a>
    `;
    instructionsHtml = `* Gõ lệnh <code>uname -m</code> trong terminal để kiểm tra kiến trúc CPU của bạn.`;
  }

  const osNameFormatted = device.os === OS.MACOS ? "macOS" : device.os === OS.WINDOWS ? "Windows" : "Linux";

  return `
    <div class="space-y-4 pt-1 w-full">
      <div class="text-xs text-gray-400 flex items-center gap-1.5">
        <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
        Nhận dạng thiết bị: <strong class="text-slate-200">${osNameFormatted}</strong> (Vui lòng chọn bản cài đặt phù hợp với máy của bạn)
      </div>
      <div class="flex flex-col sm:flex-row gap-3">
        ${buttonsHtml}
      </div>
      <p class="text-[11px] text-gray-400 italic">${instructionsHtml}</p>
    </div>
  `;
}

function renderRelease(data, device, allReleases) {
  const loadingEl = document.getElementById("download-loading");
  const errorEl = document.getElementById("download-error");
  const contentEl = document.getElementById("download-content");

  const assets = data.assets || [];

  // Phân loại các asset hợp lệ
  let winX64Setup = null;
  let winArm64Setup = null;
  let winX64Portable = null;
  let winArm64Portable = null;
  let macSetup = null;
  let macPortable = null;
  let linuxX64 = null;
  let linuxArm64 = null;
  const unknownAssets = [];

  assets.forEach((asset) => {
    const name = asset.name.toLowerCase();
    // Bỏ qua các file cấu hình và delta cập nhật nội bộ của Velopack
    if (isIgnoredAsset(name)) return;

    const isArm = name.includes("arm64") || name.includes("aarch64");
    const isPortable = name.includes("portable") || (name.endsWith(".zip") && !name.includes("setup"));

    // 1. Windows
    if (name.includes("win")) {
      if (isPortable) {
        if (isArm) winArm64Portable = asset;
        else winX64Portable = asset;
      } else {
        if (isArm) winArm64Setup = asset;
        else winX64Setup = asset;
      }
    }
    // 2. macOS
    else if (name.includes("osx") || name.includes("mac")) {
      if (isPortable) {
        macPortable = asset;
      } else {
        macSetup = asset;
      }
    }
    // 3. Linux
    else if (name.includes("linux") || name.endsWith(".appimage") || name.endsWith(".deb") || name.endsWith(".rpm")) {
      if (isArm) {
        linuxArm64 = asset;
      } else {
        linuxX64 = asset;
      }
    }
    // File khác
    else {
      unknownAssets.push(asset);
    }
  });

  // Lưu thông tin các gói cài đặt chính
  const assetsInfo = {
    winX64Setup,
    winArm64Setup,
    winX64Portable,
    winArm64Portable,
    macSetup,
    macPortable,
    linuxX64,
    linuxArm64,
  };

  // Chọn Main Asset (ƯU TIÊN BẢN SETUP CÓ AUTO UPDATE)
  let mainAsset = null;
  let detectedLabelOS = "Windows";
  let detectedLabelArch = "x64";
  let mainIcon = "fa-brands fa-windows";

  if (device.os === OS.WINDOWS) {
    mainIcon = "fa-brands fa-windows";
    detectedLabelOS = "Windows";
    if (device.arch === ARCH.ARM64) {
      detectedLabelArch = "ARM64";
      mainAsset = winArm64Setup || winArm64Portable || winX64Setup;
    } else if (device.arch === ARCH.X64) {
      detectedLabelArch = "x64";
      mainAsset = winX64Setup || winX64Portable || winArm64Setup;
    }
  } else if (device.os === OS.MACOS) {
    mainIcon = "fa-brands fa-apple";
    detectedLabelOS = "macOS";
    detectedLabelArch = "Universal";
    mainAsset = macSetup || macPortable;
  } else if (device.os === OS.LINUX) {
    mainIcon = "fa-brands fa-linux";
    detectedLabelOS = "Linux";
    if (device.arch === ARCH.ARM64) {
      detectedLabelArch = "ARM64";
      mainAsset = linuxArm64 || linuxX64;
    } else if (device.arch === ARCH.X64) {
      detectedLabelArch = "x64";
      mainAsset = linuxX64 || linuxArm64;
    }
  }

  // Fallback nếu không xác định được nhưng cần 1 file mặc định
  if (!mainAsset) {
    mainAsset = winX64Setup || macSetup || linuxX64 || winX64Portable || assets[0];
  }

  const isMobile = device.os === OS.ANDROID || device.os === OS.IOS;
  const isUnknownOS = device.os === OS.UNKNOWN;

  // Với macOS, vì gói .pkg là bản Universal hỗ trợ cả 2 dòng chip nên không bị ambiguous
  const isWinAmbiguous = device.os === OS.WINDOWS && device.arch === ARCH.UNKNOWN;
  const isLinuxAmbiguous = device.os === OS.LINUX && device.arch === ARCH.UNKNOWN;
  const isAmbiguousArch = isWinAmbiguous || isLinuxAmbiguous;

  // Điều kiện để render 1 nút download lớn tự động
  const isRenderingMainButton = !isMobile && !isUnknownOS && !isAmbiguousArch && mainAsset;

  // DANH SÁCH 1: BỘ CÀI ĐẶT CHÍNH THỨC (SETUP / INSTALLER)
  const setupDownloadsList = [];

  const addSetupItem = (asset, name, icon) => {
    if (!asset) return;
    // Nếu nút chính đã hiển thị file này thì không lặp lại ở mục tùy chọn khác
    if (isRenderingMainButton && asset === mainAsset) return;
    setupDownloadsList.push({
      name,
      filename: asset.name,
      url: asset.browser_download_url,
      size: asset.size,
      downloads: asset.download_count,
      icon,
      type: "setup",
    });
  };

  addSetupItem(winX64Setup, "Windows (x64) - Setup", "fa-brands fa-windows text-blue-400");
  addSetupItem(winArm64Setup, "Windows (ARM64) - Setup", "fa-brands fa-windows text-slate-300");
  addSetupItem(macSetup, "macOS - Setup (.pkg)", "fa-brands fa-apple text-white");
  addSetupItem(linuxX64, "Linux (x64) - AppImage", "fa-brands fa-linux text-amber-400");
  addSetupItem(linuxArm64, "Linux (ARM64) - AppImage", "fa-brands fa-linux text-orange-400");

  // DANH SÁCH 2: BẢN CHẠY NGAY (PORTABLE - KHÔNG AUTO UPDATE)
  const portableDownloadsList = [];

  const addPortableItem = (asset, name, icon) => {
    if (!asset) return;
    portableDownloadsList.push({
      name,
      filename: asset.name,
      url: asset.browser_download_url,
      size: asset.size,
      downloads: asset.download_count,
      icon,
      type: "portable",
    });
  };

  addPortableItem(winX64Portable, "Windows (x64) - Portable", "fa-brands fa-windows text-blue-300");
  addPortableItem(winArm64Portable, "Windows (ARM64) - Portable", "fa-brands fa-windows text-slate-400");
  addPortableItem(macPortable, "macOS - Portable (.zip)", "fa-brands fa-apple text-slate-300");

  // Gộp các file chưa phân loại khác vào danh sách phụ nếu có
  unknownAssets.forEach((asset) => {
    setupDownloadsList.push({
      name: asset.name,
      filename: asset.name,
      url: asset.browser_download_url,
      size: asset.size,
      downloads: asset.download_count,
      icon: "fa-regular fa-file-zipper text-gray-400",
      type: "other",
    });
  });

  // Tính tổng số lượt tải (tích lũy tất cả các bản phát hành)
  const totalDownloads = Array.isArray(allReleases)
    ? allReleases.reduce((sum, r) => sum + (r.assets ? r.assets.reduce((aSum, a) => aSum + (a.download_count || 0), 0) : 0), 0)
    : assets.reduce((sum, asset) => sum + (asset.download_count || 0), 0);

  // Tạo khối giao diện Tải xuống chính dựa trên OS & Arch
  let downloadAreaHtml = "";

  if (isMobile) {
    downloadAreaHtml = `
      <div class="p-5 rounded-xl border border-secondary/20 bg-secondary/5 text-sm space-y-2 mt-2">
        <div class="font-bold text-white flex items-center gap-2">
          <i class="fa-solid fa-laptop text-secondary text-base"></i> Ứng Dụng Dành Cho Máy Tính (Desktop)
        </div>
        <p class="text-gray-300 text-xs leading-relaxed">
          CTU Scheduler hiện hỗ trợ các hệ điều hành máy tính (Windows, macOS, Linux). 
          Vui lòng mở trang web này trên máy tính để cài đặt ứng dụng.
        </p>
        <div class="flex flex-wrap items-center gap-4 pt-1">
          <a href="${data.html_url}" target="_blank" class="text-xs text-secondary hover:underline font-medium flex items-center gap-1">
            Xem trên GitHub <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
          </a>
          <button id="show-mobile-downloads-btn" class="text-xs text-gray-400 hover:text-white underline focus:outline-none transition-colors">
            Vẫn hiển thị liên kết tải về
          </button>
        </div>
        <div id="mobile-downloads-container" class="hidden pt-4 border-t border-white/5 space-y-5">
          <p class="text-xs text-gray-400 italic">Chọn phiên bản máy tính bạn muốn tải về thiết bị di động:</p>
          ${setupDownloadsList.length > 0 ? `
            <div class="space-y-2">
              <div class="text-xs font-semibold text-secondary uppercase tracking-wider flex items-center gap-1.5">
                <i class="fa-solid fa-box-archive"></i> Bộ Cài Đặt (Setup - Có Auto-update)
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                ${setupDownloadsList.map(generateAssetCardHtml).join("")}
              </div>
            </div>
          ` : ""}
          ${portableDownloadsList.length > 0 ? `
            <div class="space-y-2 pt-2">
              <div class="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <i class="fa-solid fa-box-open"></i> Bản Portable (Không Auto-update)
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                ${portableDownloadsList.map(generateAssetCardHtml).join("")}
              </div>
            </div>
          ` : ""}
        </div>
      </div>
    `;
  } else if (isUnknownOS) {
    downloadAreaHtml = `
      <div class="p-5 rounded-xl border border-white/10 bg-white/5 space-y-3 mt-2">
        <div class="text-xs text-amber-400 font-semibold flex items-center gap-1.5">
          <i class="fa-solid fa-triangle-exclamation"></i> Không thể nhận dạng Hệ điều hành
        </div>
        <p class="text-xs text-gray-300 leading-relaxed">
          Chúng tôi không thể tự động phát hiện hệ điều hành của bạn. Vui lòng chọn tải xuống phiên bản cài đặt bên dưới:
        </p>
        <div class="flex flex-wrap gap-3 pt-1">
          ${winX64Setup ? `<a href="${winX64Setup.browser_download_url}" target="_blank" class="btn-primary !px-5 !py-2.5 !text-xs flex items-center gap-1.5"><i class="fa-brands fa-windows"></i> Windows x64</a>` : ""}
          ${macSetup ? `<a href="${macSetup.browser_download_url}" target="_blank" class="btn-primary !px-5 !py-2.5 !text-xs flex items-center gap-1.5"><i class="fa-brands fa-apple"></i> macOS (.pkg)</a>` : ""}
          ${linuxX64 ? `<a href="${linuxX64.browser_download_url}" target="_blank" class="btn-primary !px-5 !py-2.5 !text-xs flex items-center gap-1.5"><i class="fa-brands fa-linux"></i> Linux AppImage</a>` : ""}
        </div>
        <div class="pt-1">
          <a href="${data.html_url}" target="_blank" class="text-xs text-secondary hover:underline font-medium">
            Đi tới trang GitHub Releases chính thức <i class="fa-solid fa-chevron-right text-[9px]"></i>
          </a>
        </div>
      </div>
    `;
  } else if (isAmbiguousArch) {
    downloadAreaHtml = renderDownloadChooser(device, assetsInfo, data);
  } else {
    // NÚT DOWNLOAD LỚN TỰ ĐỘNG THEO THIẾT BỊ ĐƯỢC NHẬN DIỆN
    const mainBtnLabel = `Tải Cho ${detectedLabelOS} (${detectedLabelArch})`;

    downloadAreaHtml = `
      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
        <a href="${mainAsset ? mainAsset.browser_download_url : data.html_url}" target="_blank" class="btn-primary !px-8 !py-4 text-base shadow-xl shadow-secondary/10 w-full sm:w-auto">
          <i class="${mainIcon} text-xl"></i> ${mainBtnLabel}
        </a>
        ${
          mainAsset
            ? `
          <div class="text-xs space-y-1 text-gray-400">
            <div class="font-medium text-slate-200 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
              Đã nhận diện: <strong class="text-white">${detectedLabelOS} (${detectedLabelArch})</strong>
              <span class="text-gray-500">•</span>
              <span class="text-gray-400">${formatBytes(mainAsset.size)}</span>
            </div>
            <div class="flex flex-wrap items-center gap-2 text-[11px]">
              <span class="text-emerald-400 font-medium flex items-center gap-1">
                <i class="fa-solid fa-bolt text-[10px]"></i> Hỗ trợ tự động cập nhật
              </span>
              <span class="text-gray-500">•</span>
              <span><i class="fa-solid fa-download text-[10px] mr-0.5"></i> ${mainAsset.download_count.toLocaleString("vi-VN")} lượt tải</span>
            </div>
          </div>
        `
            : ""
        }
      </div>
    `;
  }

  // Render HTML toàn bộ giao diện Release
  contentEl.innerHTML = `
    <div class="glass-card reveal !p-8 border border-white/10 bg-slate-900/40 relative overflow-hidden active">
      <!-- Hiệu ứng Glow nền thẻ -->
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
        
        <!-- Widget thống kê: Tổng lượt tải & Trạng thái hoạt động -->
        <div class="flex gap-6 bg-white/5 border border-white/5 rounded-xl p-3 px-6 items-center text-center self-stretch sm:self-auto justify-around shrink-0">
          <div>
            <div class="text-[10px] text-gray-400 uppercase tracking-wider">Tổng lượt tải</div>
            <div class="text-xl font-bold text-secondary mt-0.5">${formatDownloadCount(totalDownloads)}</div>
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

      <!-- Khu vực nút tải chính -->
      <div class="relative z-10 space-y-4 mb-8">
        ${downloadAreaHtml}
        
        <p class="text-[11px] text-gray-500 mt-3">Bằng việc tải xuống và sử dụng CTU Scheduler, bạn đồng ý với <a href="https://github.com/d3nhatv0lam/CTU-Scheduler/blob/master/TERMS.md" target="_blank" class="text-secondary hover:underline">Điều khoản sử dụng & Miễn trừ trách nhiệm</a> của dự án.</p>
      </div>

      <!-- Khu vực các tùy chọn tải khác (Phân nhóm Setup vs Portable) -->
      <div class="relative z-10 space-y-8 ${isMobile ? 'hidden' : ''}">
        <!-- Nhóm 1: Bộ cài đặt chính thức (Setup) -->
        ${
          setupDownloadsList.length > 0
            ? `
          <div>
            <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
              <h4 class="text-sm font-semibold uppercase tracking-wider text-secondary flex items-center gap-2">
                <i class="fa-solid fa-box-archive text-secondary"></i> Bộ Cài Đặt (Setup / Installer)
              </h4>
              <span class="text-xs text-emerald-400 font-medium flex items-center gap-1 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                <i class="fa-solid fa-bolt text-[10px]"></i> Tự động cập nhật khi có bản mới
              </span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              ${setupDownloadsList.map(generateAssetCardHtml).join("")}
            </div>
          </div>
        `
            : ""
        }

        <!-- Nhóm 2: Bản Portable (Chạy ngay) -->
        ${
          portableDownloadsList.length > 0
            ? `
          <div class="pt-6 border-t border-white/10">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <h4 class="text-sm font-semibold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <i class="fa-solid fa-box-open text-amber-400"></i> Bản Chạy Ngay (Portable - .ZIP)
              </h4>
              <span class="text-xs text-amber-400/90 font-medium flex items-center gap-1 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                <i class="fa-solid fa-triangle-exclamation text-[10px]"></i> Không hỗ trợ tự động cập nhật
              </span>
            </div>
            <p class="text-xs text-gray-400 mb-4 leading-relaxed">
              Phù hợp khi dùng trên máy tính phòng máy của trường hoặc lưu trữ trong USB. Bạn sẽ cần tải thủ công bản mới khi có cập nhật.
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              ${portableDownloadsList.map(generateAssetCardHtml).join("")}
            </div>
          </div>
        `
            : ""
        }
      </div>

      <!-- Khu vực Changelog -->
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
