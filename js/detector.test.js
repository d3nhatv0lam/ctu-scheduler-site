import { describe, it, expect, vi, afterEach } from 'vitest';
import { detectDevice, OS, ARCH } from './detector.js';

describe('detectDevice Unit Tests', () => {
  afterEach(() => {
    // Khôi phục các biến global đã stub sau mỗi test case
    vi.unstubAllGlobals();
  });

  // ==========================================
  // NHÓM WINDOWS
  // ==========================================

  it('1. Windows x64 (Có Client Hints đầy đủ)', async () => {
    const mockNavigator = {
      userAgentData: {
        platform: 'Windows',
        getHighEntropyValues: vi.fn().mockResolvedValue({
          architecture: 'x86',
          bitness: '64'
        })
      },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      platform: 'Win32'
    };
    vi.stubGlobal('navigator', mockNavigator);

    const result = await detectDevice();
    expect(result).toEqual({ os: OS.WINDOWS, arch: ARCH.X64 });
  });

  it('2. Windows ARM64 (Có Client Hints)', async () => {
    const mockNavigator = {
      userAgentData: {
        platform: 'Windows',
        getHighEntropyValues: vi.fn().mockResolvedValue({
          architecture: 'arm',
          bitness: '64'
        })
      },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; ARM64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      platform: 'Win32'
    };
    vi.stubGlobal('navigator', mockNavigator);

    const result = await detectDevice();
    expect(result).toEqual({ os: OS.WINDOWS, arch: ARCH.ARM64 });
  });

  it('3. Windows 32-bit/x86 (Không hỗ trợ, trả về unknown)', async () => {
    const mockNavigator = {
      userAgentData: {
        platform: 'Windows',
        getHighEntropyValues: vi.fn().mockResolvedValue({
          architecture: 'x86',
          bitness: '32'
        })
      },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win32; x86) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      platform: 'Win32'
    };
    vi.stubGlobal('navigator', mockNavigator);

    const result = await detectDevice();
    expect(result).toEqual({ os: OS.WINDOWS, arch: ARCH.UNKNOWN });
  });

  it('4. Windows x64 (Firefox - Fallback User Agent)', async () => {
    const mockNavigator = {
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0',
      platform: 'Win32'
    };
    vi.stubGlobal('navigator', mockNavigator);

    const result = await detectDevice();
    expect(result).toEqual({ os: OS.WINDOWS, arch: ARCH.X64 });
  });

  // ==========================================
  // NHÓM macOS
  // ==========================================

  it('5. macOS ARM64 (Có Client Hints)', async () => {
    const mockNavigator = {
      userAgentData: {
        platform: 'macOS',
        getHighEntropyValues: vi.fn().mockResolvedValue({
          architecture: 'arm',
          bitness: '64'
        })
      },
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      platform: 'MacIntel'
    };
    vi.stubGlobal('navigator', mockNavigator);

    const result = await detectDevice();
    expect(result).toEqual({ os: OS.MACOS, arch: ARCH.ARM64 });
  });

  it('6. macOS x64 (Có Client Hints)', async () => {
    const mockNavigator = {
      userAgentData: {
        platform: 'macOS',
        getHighEntropyValues: vi.fn().mockResolvedValue({
          architecture: 'x86',
          bitness: '64'
        })
      },
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      platform: 'MacIntel'
    };
    vi.stubGlobal('navigator', mockNavigator);

    const result = await detectDevice();
    expect(result).toEqual({ os: OS.MACOS, arch: ARCH.X64 });
  });

  it('7. macOS Apple Silicon (Safari - Không có Client Hints, UA giả mạo Intel)', async () => {
    const mockNavigator = {
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
      platform: 'MacIntel',
      maxTouchPoints: 0
    };
    vi.stubGlobal('navigator', mockNavigator);

    const result = await detectDevice();
    expect(result).toEqual({ os: OS.MACOS, arch: ARCH.UNKNOWN });
  });

  it('8. iPad Pro chạy chế độ Desktop Safari (Đọc platform MacIntel + Touch Points > 0)', async () => {
    const mockNavigator = {
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
      platform: 'MacIntel',
      maxTouchPoints: 5
    };
    vi.stubGlobal('navigator', mockNavigator);

    const result = await detectDevice();
    expect(result).toEqual({ os: OS.MACOS, arch: ARCH.ARM64 });
  });

  // ==========================================
  // NHÓM LINUX
  // ==========================================

  it('9. Linux x64 (Không có Client Hints, đọc UA truyền thống)', async () => {
    const mockNavigator = {
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      platform: 'Linux x86_64'
    };
    vi.stubGlobal('navigator', mockNavigator);

    const result = await detectDevice();
    expect(result).toEqual({ os: OS.LINUX, arch: ARCH.X64 });
  });

  it('10. Linux ARM64 (Không có Client Hints, UA chứa aarch64)', async () => {
    const mockNavigator = {
      userAgent: 'Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      platform: 'Linux aarch64'
    };
    vi.stubGlobal('navigator', mockNavigator);

    const result = await detectDevice();
    expect(result).toEqual({ os: OS.LINUX, arch: ARCH.ARM64 });
  });

  it('11. Linux 32-bit/i686 (Không hỗ trợ, trả về unknown)', async () => {
    const mockNavigator = {
      userAgent: 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      platform: 'Linux i686'
    };
    vi.stubGlobal('navigator', mockNavigator);

    const result = await detectDevice();
    expect(result).toEqual({ os: OS.LINUX, arch: ARCH.UNKNOWN });
  });

  // ==========================================
  // NHÓM DI ĐỘNG (ANDROID & iOS)
  // ==========================================

  it('12. Thiết bị di động Android', async () => {
    const mockNavigator = {
      userAgentData: {
        platform: 'Android',
        getHighEntropyValues: vi.fn().mockResolvedValue({
          architecture: 'arm',
          bitness: '64'
        })
      },
      userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-S901B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
      platform: 'Linux armv8l'
    };
    vi.stubGlobal('navigator', mockNavigator);

    const result = await detectDevice();
    expect(result).toEqual({ os: OS.ANDROID, arch: ARCH.ARM64 });
  });

  it('13. Thiết bị di động iPhone (Safari iOS)', async () => {
    const mockNavigator = {
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/605.1.15',
      platform: 'iPhone'
    };
    vi.stubGlobal('navigator', mockNavigator);

    const result = await detectDevice();
    expect(result).toEqual({ os: OS.IOS, arch: ARCH.UNKNOWN });
  });

  // ==========================================
  // NGOẠI LỆ & TRƯỜNG HỢP ĐẶC BIỆT (EDGE CASES)
  // ==========================================

  it('14. Client Hints bị chặn/ném ra lỗi (Throws Exception)', async () => {
    const mockNavigator = {
      userAgentData: {
        platform: 'Windows',
        getHighEntropyValues: vi.fn().mockRejectedValue(new Error('Permission Denied'))
      },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      platform: 'Win32'
    };
    vi.stubGlobal('navigator', mockNavigator);

    const result = await detectDevice();
    // Vẫn phải nhận dạng thành công nhờ fallback xuống đọc UA
    expect(result).toEqual({ os: OS.WINDOWS, arch: ARCH.X64 });
  });

  it('15. Client Hints trả về chuỗi rỗng (Empty / Undefined Values)', async () => {
    const mockNavigator = {
      userAgentData: {
        platform: 'Windows',
        getHighEntropyValues: vi.fn().mockResolvedValue({
          architecture: '',
          bitness: ''
        })
      },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      platform: 'Win32'
    };
    vi.stubGlobal('navigator', mockNavigator);

    const result = await detectDevice();
    // Vẫn nhận dạng thành công nhờ fallback xuống đọc UA
    expect(result).toEqual({ os: OS.WINDOWS, arch: ARCH.X64 });
  });

  it('16. Độ ưu tiên nhận diện (UA Android, Platform Win32) -> Kết quả Android', async () => {
    const mockNavigator = {
      userAgent: 'Mozilla/5.0 (Linux; Android 16; Pixel 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Mobile Safari/537.36',
      platform: 'Win32' // DevTools giả lập Android nhưng giữ platform Win32
    };
    vi.stubGlobal('navigator', mockNavigator);

    const result = await detectDevice();
    // UA có độ ưu tiên cao hơn và chỉ ra đây là Android
    expect(result.os).toEqual(OS.ANDROID);
  });

  it('17. Đảm bảo không phân biệt chữ hoa chữ thường (Case Insensitivity)', async () => {
    const mockNavigator = {
      userAgent: 'MOZILLA/5.0 (MACINTOSH; INTEL MAC OS X 10_15_7) APPLEWEBKIT/537.36 ...',
      platform: 'MACINTEL'
    };
    vi.stubGlobal('navigator', mockNavigator);

    const result = await detectDevice();
    expect(result.os).toEqual(OS.MACOS);
  });

  it('18. Hệ điều hành hoàn toàn không xác định (Ví dụ: PlayStation 5)', async () => {
    const mockNavigator = {
      userAgent: 'Mozilla/5.0 (PlayStation 5 4.00) AppleWebKit/605.1.15 (KHTML, like Gecko) NetFront/6.0',
      platform: 'PlayStation 5'
    };
    vi.stubGlobal('navigator', mockNavigator);

    const result = await detectDevice();
    expect(result).toEqual({ os: OS.UNKNOWN, arch: ARCH.UNKNOWN });
  });
});
