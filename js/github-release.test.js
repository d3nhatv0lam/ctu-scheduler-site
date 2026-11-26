import { describe, it, expect } from "vitest";
import {
  ASSET_MATCHERS,
  countAssetDownloads,
  pickAsset,
} from "./github-release.js";
import { ARCH } from "./detector.js";

const makeAsset = (name, download_count = 0) => ({
  name,
  download_count,
  browser_download_url: `https://example.com/${name}`,
});

// Đặt các file osx đứng trước win (giống thứ tự chữ cái trên GitHub Release)
const fullReleaseAssets = [
  makeAsset("RELEASES", 5),
  makeAsset("ctu-scheduler-1.2.0-osx-full.nupkg", 99),
  makeAsset("ctu-scheduler-1.2.0-win-full.nupkg", 99),
  makeAsset("ctu-scheduler-linux-arm64.AppImage", 12),
  makeAsset("ctu-scheduler-linux.AppImage", 34),
  makeAsset("ctu-scheduler-osx-Portable.zip", 50),
  makeAsset("ctu-scheduler-osx-Setup.pkg", 40),
  makeAsset("ctu-scheduler-win-Portable.zip", 120),
  makeAsset("ctu-scheduler-win-Setup.exe", 300),
  makeAsset("ctu-scheduler-win-arm64-Portable.zip", 20),
  makeAsset("ctu-scheduler-win-arm64-Setup.exe", 30),
  makeAsset("releases.win.json", 10),
];

describe("pickAsset & ASSET_MATCHERS", () => {
  it("Windows x64 chọn đúng Setup và Portable của Windows (không lấy osx-Portable.zip)", () => {
    const setup = pickAsset(fullReleaseAssets, ASSET_MATCHERS.winSetup, ARCH.X64, {
      allowNonArmFallback: true,
    });
    const portable = pickAsset(
      fullReleaseAssets,
      ASSET_MATCHERS.winPortable,
      ARCH.X64,
      { allowNonArmFallback: true },
    );

    expect(setup?.name).toBe("ctu-scheduler-win-Setup.exe");
    expect(portable?.name).toBe("ctu-scheduler-win-Portable.zip");
  });

  it("Windows ARM64 ưu tiên bản win-arm64, thiếu thì fallback sang win x64", () => {
    const portableArm = pickAsset(
      fullReleaseAssets,
      ASSET_MATCHERS.winPortable,
      ARCH.ARM64,
      { allowNonArmFallback: true },
    );
    expect(portableArm?.name).toBe("ctu-scheduler-win-arm64-Portable.zip");

    const assetsWithoutWinArm = fullReleaseAssets.filter(
      (a) => !a.name.includes("win-arm64"),
    );
    const fallbackPortable = pickAsset(
      assetsWithoutWinArm,
      ASSET_MATCHERS.winPortable,
      ARCH.ARM64,
      { allowNonArmFallback: true },
    );
    expect(fallbackPortable?.name).toBe("ctu-scheduler-win-Portable.zip");
  });

  it("Windows trả về null khi không có gói Windows (không fallback sang macOS/Linux)", () => {
    const nonWinAssets = fullReleaseAssets.filter((a) => !a.name.includes("win"));
    const portable = pickAsset(
      nonWinAssets,
      ASSET_MATCHERS.winPortable,
      ARCH.X64,
      { allowNonArmFallback: true },
    );
    expect(portable).toBeNull();
  });

  it("Linux ARM64 chọn đúng linux-arm64 và trả về null khi thiếu (không fallback sang x64)", () => {
    const armLinux = pickAsset(
      fullReleaseAssets,
      ASSET_MATCHERS.linux,
      ARCH.ARM64,
    );
    expect(armLinux?.name).toBe("ctu-scheduler-linux-arm64.AppImage");

    const assetsWithoutLinuxArm = fullReleaseAssets.filter(
      (a) => !a.name.includes("linux-arm64"),
    );
    const missingArmLinux = pickAsset(
      assetsWithoutLinuxArm,
      ASSET_MATCHERS.linux,
      ARCH.ARM64,
    );
    expect(missingArmLinux).toBeNull();
  });

  it("Máy x64 không bao giờ chọn nhầm bản chỉ có arm64", () => {
    const armOnlyLinux = [makeAsset("ctu-scheduler-linux-arm64.AppImage", 10)];
    expect(
      pickAsset(armOnlyLinux, ASSET_MATCHERS.linux, ARCH.X64),
    ).toBeNull();
  });

  it("macOS trên Chrome (arm64) và Safari (unknown) đều chọn đúng .pkg và osx-Portable.zip", () => {
    for (const arch of [ARCH.ARM64, ARCH.UNKNOWN]) {
      const setup = pickAsset(fullReleaseAssets, ASSET_MATCHERS.macSetup, arch, {
        allowNonArmFallback: true,
      });
      const portable = pickAsset(
        fullReleaseAssets,
        ASSET_MATCHERS.macPortable,
        arch,
        { allowNonArmFallback: true },
      );
      expect(setup?.name).toBe("ctu-scheduler-osx-Setup.pkg");
      expect(portable?.name).toBe("ctu-scheduler-osx-Portable.zip");
    }
  });

  it("Khi trình duyệt ẩn arch (unknown), Windows và Linux chọn bản mặc định không phải arm64", () => {
    const winPort = pickAsset(
      fullReleaseAssets,
      ASSET_MATCHERS.winPortable,
      ARCH.UNKNOWN,
      { allowNonArmFallback: true },
    );
    const linuxApp = pickAsset(
      fullReleaseAssets,
      ASSET_MATCHERS.linux,
      ARCH.UNKNOWN,
    );

    expect(winPort?.name).toBe("ctu-scheduler-win-Portable.zip");
    expect(linuxApp?.name).toBe("ctu-scheduler-linux.AppImage");
  });

  it("Không khớp nhầm tên file chứa 'darwin' thành Windows", () => {
    const darwinAssets = [makeAsset("ctu-scheduler-darwin-Portable.zip", 15)];
    expect(
      pickAsset(darwinAssets, ASSET_MATCHERS.winPortable, ARCH.X64, {
        allowNonArmFallback: true,
      }),
    ).toBeNull();
    expect(
      pickAsset(darwinAssets, ASSET_MATCHERS.macPortable, ARCH.UNKNOWN, {
        allowNonArmFallback: true,
      })?.name,
    ).toBe("ctu-scheduler-darwin-Portable.zip");
  });
});

describe("countAssetDownloads", () => {
  const olderRelease = {
    assets: [
      makeAsset("ctu-scheduler-osx-Portable.zip", 10),
      makeAsset("ctu-scheduler-win-Portable.zip", 25),
      makeAsset("ctu-scheduler-1.1.0-win-full.nupkg", 999),
    ],
  };

  it("Đếm tách bạch lượt tải Windows Portable khỏi macOS Portable và bỏ qua file Velopack", () => {
    const releases = [{ assets: fullReleaseAssets }, olderRelease];

    expect(countAssetDownloads(releases, ASSET_MATCHERS.winPortable)).toBe(
      120 + 20 + 25,
    );
    expect(countAssetDownloads(releases, ASSET_MATCHERS.macPortable)).toBe(
      50 + 10,
    );
    expect(countAssetDownloads(releases, ASSET_MATCHERS.winSetup)).toBe(
      300 + 30,
    );
    expect(countAssetDownloads(releases, ASSET_MATCHERS.macSetup)).toBe(40);
    expect(countAssetDownloads(releases, ASSET_MATCHERS.linux)).toBe(12 + 34);
    expect(countAssetDownloads(releases)).toBe(
      12 + 34 + 50 + 40 + 120 + 300 + 20 + 30 + 10 + 25,
    );
  });
});
