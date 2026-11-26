// js/github-release.js
// Quản lý dữ liệu bản phát hành GitHub Release & Các tiện ích định dạng

const REPO_OWNER = "d3nhatv0lam";
const REPO_NAME = "CTU-Scheduler";
const API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases?per_page=100`;
const CACHE_KEY_DATA = "ctu_release_data_v2";
const CACHE_KEY_ETAG = "ctu_release_etag";
const CACHE_KEY_TIME = "ctu_release_timestamp";
const CACHE_DURATION = 10 * 60 * 1000; // 10 phút tính bằng mili-giây

let inFlightFetchPromise = null;

/**
 * Định dạng ngày phát hành DD/MM/YYYY
 */
export function formatDate(dateString) {
  if (!dateString) return "";
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}

/**
 * Định dạng dung lượng tệp theo chuẩn Base-1024 nhị phân (khớp chuẩn Windows Explorer)
 */
export function formatBytes(bytes) {
  if (!bytes || bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.min(Math.floor(Math.log2(bytes) / 10), units.length - 1);
  return `${parseFloat((bytes / (1 << (i * 10))).toFixed(1))} ${units[i]}`;
}

/**
 * Định dạng số lượt tải rút gọn (1.2K, 15.4K, 2.4M) bằng chuẩn Web Native Intl.NumberFormat
 */
export function formatDownloadCount(count) {
  if (count == null || isNaN(count)) return "0";
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(count);
}

/**
 * Kiểm tra các file nội bộ của Velopack cần loại trừ khỏi giao diện người dùng
 */
export function isIgnoredAsset(filename) {
  if (!filename) return false;
  const name = filename.toLowerCase();
  return (
    name.endsWith(".nupkg") ||
    name.endsWith(".json") ||
    name === "releases" ||
    name.endsWith(".blockmap")
  );
}

const WIN_TOKEN = /(?:^|[-_.])win(?:dows|64)?(?:[-_.]|$)/;
const MAC_TOKEN = /(?:^|[-_.])(?:osx|macos|mac|darwin)(?:[-_.]|$)/;

/**
 * Quy tắc nhận diện từng loại gói phát hành theo tên file (đã lowercase)
 */
export const ASSET_MATCHERS = {
  winSetup: (n) => WIN_TOKEN.test(n) && n.endsWith(".exe"),
  winPortable: (n) =>
    WIN_TOKEN.test(n) && n.includes("portable") && n.endsWith(".zip"),
  macSetup: (n) => n.endsWith(".pkg") || n.endsWith(".dmg"),
  macPortable: (n) =>
    MAC_TOKEN.test(n) && !n.includes("setup") && n.endsWith(".zip"),
  linux: (n) => n.endsWith(".appimage"),
};

function isArmAsset(filename) {
  const n = filename.toLowerCase();
  return n.includes("arm64") || n.includes("aarch64");
}

/**
 * Chọn asset phù hợp nhất theo matcher và kiến trúc CPU (không fallback chéo OS)
 */
export function pickAsset(
  assets,
  match,
  arch,
  { allowNonArmFallback = false } = {},
) {
  const list = (assets || []).filter(
    (a) => a?.name && !isIgnoredAsset(a.name) && match(a.name.toLowerCase()),
  );
  if (arch === "arm64") {
    return (
      list.find((a) => isArmAsset(a.name)) ??
      (allowNonArmFallback ? list.find((a) => !isArmAsset(a.name)) ?? null : null)
    );
  }
  return list.find((a) => !isArmAsset(a.name)) ?? null;
}

/**
 * Tính tổng lượt tải của các asset hợp lệ khớp matcher qua toàn bộ bản phát hành
 */
export function countAssetDownloads(releases, match = () => true) {
  let total = 0;
  for (const rel of releases || []) {
    for (const a of rel?.assets || []) {
      if (a?.name && !isIgnoredAsset(a.name) && match(a.name.toLowerCase())) {
        total += a.download_count || 0;
      }
    }
  }
  return total;
}

/**
 * Tải dữ liệu phát hành từ GitHub API (Hỗ trợ ETag 304, cache 10 phút và chống trùng request)
 */
export async function fetchReleaseData() {
  if (inFlightFetchPromise) {
    return inFlightFetchPromise;
  }

  inFlightFetchPromise = (async () => {
    try {
      const cachedData = localStorage.getItem(CACHE_KEY_DATA);
      const cachedEtag = localStorage.getItem(CACHE_KEY_ETAG);
      const cachedTime = localStorage.getItem(CACHE_KEY_TIME);
      const now = Date.now();

      let releaseData = null;

      if (
        cachedData &&
        cachedTime &&
        now - parseInt(cachedTime, 10) < CACHE_DURATION
      ) {
        try {
          releaseData = JSON.parse(cachedData);
        } catch {
          // ignore JSON parse error
        }
      }

      if (!releaseData) {
        const headers = {};
        if (cachedEtag) {
          headers["If-None-Match"] = cachedEtag;
        }

        try {
          const response = await fetch(API_URL, { headers });

          if (response.status === 304 && cachedData) {
            releaseData = JSON.parse(cachedData);
            localStorage.setItem(CACHE_KEY_TIME, now.toString());
          } else if (response.ok) {
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
          } else if (cachedData) {
            releaseData = JSON.parse(cachedData);
          }
        } catch (fetchErr) {
          if (cachedData) {
            try {
              releaseData = JSON.parse(cachedData);
            } catch {}
          }
        }
      }

      const allReleases = Array.isArray(releaseData)
        ? releaseData
        : releaseData
          ? [releaseData]
          : [];

      const latestRelease =
        allReleases.find((r) => !r.prerelease && !r.draft) || allReleases[0] || null;

      const releaseVersion = latestRelease?.tag_name || "";

      return {
        latestRelease,
        allReleases,
        releaseVersion,
      };
    } finally {
      inFlightFetchPromise = null;
    }
  })();

  return inFlightFetchPromise;
}
