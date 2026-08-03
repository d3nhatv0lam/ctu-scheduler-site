// js/detector.js
// Bộ phát hiện Hệ điều hành và Kiến trúc CPU của thiết bị

export const OS = {
  WINDOWS: "windows",
  MACOS: "macos",
  LINUX: "linux",
  ANDROID: "android",
  IOS: "ios",
  UNKNOWN: "unknown"
};

export const ARCH = {
  X64: "x64",
  ARM64: "arm64",
  UNKNOWN: "unknown"
};

export async function detectDevice() {
  let os = OS.UNKNOWN;
  let arch = ARCH.UNKNOWN;
  let isReliable = false;

  // 1. Sử dụng User-Agent Client Hints khi khả dụng (Các trình duyệt nhân Chromium)
  if (navigator.userAgentData) {
    const platform = navigator.userAgentData.platform;
    if (platform === "Windows") os = OS.WINDOWS;
    else if (platform === "macOS") os = OS.MACOS;
    else if (platform === "Linux") os = OS.LINUX;
    else if (platform === "Android") os = OS.ANDROID;
    else if (platform === "iOS") os = OS.IOS;

    if (navigator.userAgentData.getHighEntropyValues) {
      try {
        const hints = await navigator.userAgentData.getHighEntropyValues(["architecture", "bitness"]);
        if (hints.architecture) {
          const archLower = hints.architecture.toLowerCase();
          if (hints.bitness === "32") {
            arch = ARCH.UNKNOWN; // Hệ điều hành 32-bit không được hỗ trợ
          } else if (archLower.includes("arm") || archLower.includes("aarch")) {
            arch = ARCH.ARM64;
          } else {
            arch = ARCH.X64;
          }
          isReliable = true;
        }
      } catch (e) {
        console.warn("Lỗi đọc Client Hints:", e);
      }
    }
  }

  // 2. Fallback sử dụng User Agent truyền thống cho Safari, Firefox hoặc khi Client Hints không hỗ trợ
  if (os === OS.UNKNOWN || !isReliable) {
    const userAgent = navigator.userAgent.toLowerCase();
    const platform = navigator.platform?.toLowerCase() || "";

    // Phát hiện Hệ điều hành (OS) dựa trên User Agent trước (độ chi tiết cao hơn)
    if (userAgent.includes("android")) {
      os = OS.ANDROID;
    } else if (userAgent.includes("iphone") || userAgent.includes("ipad") || userAgent.includes("ipod")) {
      os = OS.IOS;
    } else if (userAgent.includes("win")) {
      os = OS.WINDOWS;
    } else if (userAgent.includes("mac")) {
      os = OS.MACOS;
    } else if (userAgent.includes("linux")) {
      os = OS.LINUX;
    } 
    // Nếu không khớp chuỗi User Agent, dùng platform làm fallback cuối cùng
    else if (platform.includes("win")) {
      os = OS.WINDOWS;
    } else if (platform.includes("mac")) {
      os = OS.MACOS;
    } else if (platform.includes("linux")) {
      os = OS.LINUX;
    }

    // Phát hiện Kiến trúc CPU (Arch)
    if (os === OS.WINDOWS || os === OS.LINUX) {
      if (userAgent.includes("arm64") || userAgent.includes("aarch64") || platform.includes("arm64")) {
        arch = ARCH.ARM64;
      } else if (
        userAgent.includes("x86_64") || 
        userAgent.includes("win64") || 
        userAgent.includes("wow64") || 
        userAgent.includes("x64") || 
        userAgent.includes("amd64") || 
        platform.includes("x64") || 
        platform.includes("win64")
      ) {
        arch = ARCH.X64;
      } else {
        // Có thể là hệ điều hành 32-bit (x86)
        arch = ARCH.UNKNOWN;
      }
    } else if (os === OS.MACOS) {
      if (userAgent.includes("arm64") || userAgent.includes("aarch64")) {
        arch = ARCH.ARM64;
      } else if (navigator.maxTouchPoints > 0) {
        arch = ARCH.ARM64; // iPad Pro chạy chip M-series trong chế độ Safari Desktop
      } else {
        // macOS trên Safari/Firefox giả mạo thông tin chip Intel để tránh fingerprinting
        arch = ARCH.UNKNOWN;
      }
    }
  }

  return { os, arch };
}
