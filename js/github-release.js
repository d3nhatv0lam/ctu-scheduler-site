// github-release.js

const REPO_OWNER = "d3nhatv0lam";
const REPO_NAME = "CTU-Scheduler";
const API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest`;
const CACHE_KEY_DATA = "ctu_release_data";
const CACHE_KEY_ETAG = "ctu_release_etag";
const CACHE_KEY_TIME = "ctu_release_timestamp";
const CACHE_DURATION = 10 * 60 * 1000; // 10 phút tính bằng mili-giây

function detectOS() {
  const userAgent = window.navigator.userAgent.toLowerCase();
  const platform = window.navigator.platform?.toLowerCase() || "";
  if (userAgent.indexOf("win") !== -1 || platform.indexOf("win") !== -1)
    return "Windows";
  if (userAgent.indexOf("mac") !== -1 || platform.indexOf("mac") !== -1)
    return "macOS";
  if (userAgent.indexOf("linux") !== -1 || platform.indexOf("linux") !== -1)
    return "Linux";
  return "Windows"; // Mặc định là Windows nếu không rõ
}

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
      renderRelease(releaseData);
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

function renderRelease(data) {
  const loadingEl = document.getElementById("download-loading");
  const errorEl = document.getElementById("download-error");
  const contentEl = document.getElementById("download-content");

  // Phát hiện OS của người dùng
  const userOS = detectOS();

  const assets = data.assets || [];
  let mainAsset = null;
  const otherAssets = [];

  // Định nghĩa các Regex để lọc tệp theo HDH
  const winInstallerPattern = /\.exe$/i;
  const winPortablePattern = /win.*\.zip$/i;
  const macPattern = /\.(dmg|pkg)$/i;
  const macZipPattern = /mac.*\.zip$/i;
  const linuxPattern = /\.(appimage|deb|rpm|tar\.gz)$/i;

  let winInstaller = null;
  let winPortable = null;
  let macAsset = null;
  let linuxAsset = null;

  // Phân loại tài nguyên tải xuống
  assets.forEach((asset) => {
    const name = asset.name.toLowerCase();
    if (winInstallerPattern.test(name)) {
      winInstaller = asset;
    } else if (winPortablePattern.test(name)) {
      winPortable = asset;
    } else if (macPattern.test(name) || macZipPattern.test(name)) {
      macAsset = asset;
    } else if (linuxPattern.test(name)) {
      linuxAsset = asset;
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

  // Lựa chọn file tải chính phù hợp với OS của user
  if (userOS === "Windows") {
    mainAsset = winInstaller || winPortable;
  } else if (userOS === "macOS") {
    mainAsset = macAsset;
  } else if (userOS === "Linux") {
    mainAsset = linuxAsset;
  }

  // Fallback mặc định nếu không khớp được file phù hợp
  if (!mainAsset) {
    mainAsset = winInstaller || winPortable || assets[0];
  }

  // Tạo danh sách "Các tùy chọn tải khác"
  const otherDownloadsList = [];

  if (winInstaller && winInstaller !== mainAsset) {
    otherDownloadsList.push({
      name: "Windows Installer (.exe)",
      filename: winInstaller.name,
      url: winInstaller.browser_download_url,
      size: winInstaller.size,
      downloads: winInstaller.download_count,
      icon: "fa-brands fa-windows text-blue-400",
    });
  }

  if (winPortable && winPortable !== mainAsset) {
    otherDownloadsList.push({
      name: "Windows Portable (.zip)",
      filename: winPortable.name,
      url: winPortable.browser_download_url,
      size: winPortable.size,
      downloads: winPortable.download_count,
      icon: "fa-brands fa-windows text-slate-400",
    });
  }

  if (macAsset && macAsset !== mainAsset) {
    otherDownloadsList.push({
      name: "macOS (.dmg / .zip)",
      filename: macAsset.name,
      url: macAsset.browser_download_url,
      size: macAsset.size,
      downloads: macAsset.download_count,
      icon: "fa-brands fa-apple text-white",
    });
  }

  if (linuxAsset && linuxAsset !== mainAsset) {
    otherDownloadsList.push({
      name: "Linux (.AppImage / .deb)",
      filename: linuxAsset.name,
      url: linuxAsset.browser_download_url,
      size: linuxAsset.size,
      downloads: linuxAsset.download_count,
      icon: "fa-brands fa-linux text-amber-400",
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

  // Bổ sung link Source Code
  if (data.zipball_url) {
    otherDownloadsList.push({
      name: "Mã nguồn dự án (zip)",
      filename: `${data.tag_name}.zip`,
      url: data.zipball_url,
      size: null,
      downloads: null,
      icon: "fa-solid fa-code text-gray-400",
    });
  }

  // Tính tổng số lượt tải
  const totalDownloads = assets.reduce(
    (sum, asset) => sum + (asset.download_count || 0),
    0,
  );

  // Xác định text và icon phù hợp cho nút chính
  let mainIcon = "fa-brands fa-windows";
  let mainOSName = "Windows";

  if (mainAsset === macAsset) {
    mainIcon = "fa-brands fa-apple";
    mainOSName = "macOS";
  } else if (mainAsset === linuxAsset) {
    mainIcon = "fa-brands fa-linux";
    mainOSName = "Linux";
  }

  const mainBtnLabel =
    mainAsset === winPortable
      ? `<i class="${mainIcon} text-xl"></i> Tải Cho ${mainOSName} (Portable)`
      : `<i class="${mainIcon} text-xl"></i> Tải Bản Mới Nhất Cho ${mainOSName}`;

  // Render HTML động
  contentEl.innerHTML = `
    <div class="glass-card reveal !p-8 border border-white/10 bg-slate-900/40 relative overflow-hidden active">
      <!-- Glow effect in card background -->
      <div class="absolute -top-12 -right-12 w-48 h-48 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

      <div class="flex flex-col md:flex-row gap-8 items-start justify-between relative z-10">
        <!-- Left content: Action buttons and details -->
        <div class="flex-grow space-y-4">
          <div class="flex flex-wrap items-center gap-3">
            <span class="px-3 py-1 text-xs font-semibold rounded-full bg-secondary/15 text-secondary border border-secondary/30">Phiên Bản Mới Nhất</span>
            <span class="text-white font-bold text-lg">${data.tag_name}</span>
            <span class="text-gray-400 text-sm">Cập nhật: ${formatDate(data.published_at)}</span>
          </div>
          
          <h3 class="text-3xl font-extrabold text-white tracking-tight">${data.name || `CTU Scheduler ${data.tag_name}`}</h3>
          
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
            <a href="${mainAsset ? mainAsset.browser_download_url : data.html_url}" target="_blank" class="btn-primary !px-8 !py-4 text-base shadow-xl shadow-secondary/10 w-full sm:w-auto">
              ${mainBtnLabel}
            </a>
            ${
              mainAsset
                ? `
              <div class="text-xs text-gray-400">
                <div class="font-medium text-slate-300">File: ${mainAsset.name} (${formatBytes(mainAsset.size)})</div>
                <div class="mt-0.5"><i class="fa-solid fa-download mr-1"></i> ${mainAsset.download_count.toLocaleString("vi-VN")} lượt tải bản này</div>
              </div>
            `
                : ""
            }
          </div>
          <p class="text-[11px] text-gray-500 mt-3">Bằng việc tải xuống và sử dụng CTU Scheduler, bạn đồng ý với <a href="https://github.com/d3nhatv0lam/CTU-Scheduler/blob/main/TERMS.md" target="_blank" class="text-secondary hover:underline">Điều khoản sử dụng & Miễn trừ trách nhiệm</a> của dự án.</p>
        </div>

        <!-- Right content: Stats widget -->
        <div class="w-full md:w-auto bg-white/5 border border-white/5 rounded-xl p-4 flex md:flex-col gap-4 justify-around md:justify-center items-center text-center self-stretch md:self-auto min-w-[150px]">
          <div>
            <div class="text-xs text-gray-400 uppercase tracking-wider">Tổng lượt tải</div>
            <div class="text-2xl font-bold text-secondary mt-0.5">${totalDownloads.toLocaleString("vi-VN")}</div>
          </div>
          <div class="hidden md:block border-t border-white/10 w-full"></div>
          <div>
            <div class="text-xs text-gray-400 uppercase tracking-wider">Trạng thái</div>
            <div class="text-sm font-semibold text-emerald-400 mt-0.5 flex items-center gap-1.5 justify-center">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> Hoạt động
            </div>
          </div>
        </div>
      </div>

      <!-- Separator -->
      <hr class="border-white/10 my-8">

      <!-- Secondary Downloads Section -->
      <div class="relative z-10">
        <h4 class="text-sm font-semibold uppercase tracking-wider text-secondary/80 mb-4"><i class="fa-solid fa-cubes mr-2"></i> Các Tùy Chọn Tải Khác</h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          ${otherDownloadsList
            .map(
              (asset) => `
            <a href="${asset.url}" target="_blank" class="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/15 transition-all duration-300 group">
              <div class="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300">
                <i class="${asset.icon}"></i>
              </div>
              <div class="min-w-0 flex-grow">
                <div class="text-sm font-bold text-white truncate">${asset.name}</div>
                <div class="text-xs text-gray-400 truncate mt-0.5">
                  ${asset.size ? formatBytes(asset.size) : "Mã nguồn"} 
                  ${asset.downloads !== null ? `• ${asset.downloads.toLocaleString("vi-VN")} tải` : ""}
                </div>
              </div>
              <div class="text-gray-500 group-hover:text-secondary transition-colors pl-2">
                <i class="fa-solid fa-arrow-down text-sm"></i>
              </div>
            </a>
          `,
            )
            .join("")}
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
