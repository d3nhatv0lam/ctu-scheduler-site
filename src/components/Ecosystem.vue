<template>
  <section id="ecosystem" class="py-20 md:py-24 border-b border-[#e4e4e7] bg-[#f8f9fa]/50 relative overflow-hidden">
    <!-- Subtle Ambient Accent Glow Behind Card -->
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[360px] bg-gradient-to-r from-[#00529c]/5 via-[#0091ff]/5 to-[#00c07a]/5 blur-3xl pointer-events-none -z-10"
      aria-hidden="true"
    ></div>

    <div class="container mx-auto max-w-clickup px-4 sm:px-6">
      <!-- Section Header (Calm, High-Trust) -->
      <motion.div
        :initial="{ opacity: 0, y: 16 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :inViewOptions="{ once: true }"
        :transition="{ duration: 0.45, ease: [0.33, 1, 0.68, 1] }"
        class="max-w-2xl text-left mb-10"
      >
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[-0.03em] text-[#090c1d] mb-3 font-display text-balance">
          Hệ sinh thái CTU Student's Tools
        </h2>
        <p class="text-[#52525b] text-sm sm:text-base leading-relaxed text-pretty">
          Mở rộng tiện ích học tập cùng bộ công cụ ngoại khóa phát triển riêng cho sinh viên Đại học Cần Thơ — từ quy đổi điểm V-SAT, tính điểm xét tuyển học bạ đến quản lý GPA và ước lượng học bổng.
        </p>
      </motion.div>

      <!-- 3D Holographic Parallax Card Container -->
      <div class="relative w-full [perspective:1200px]">
        <motion.div
          ref="cardRef"
          :initial="{ opacity: 0, y: 24 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :inViewOptions="{ once: true }"
          :transition="{ duration: 0.5, delay: 0.1, ease: [0.33, 1, 0.68, 1] }"
          class="relative rounded-2xl bg-white border border-[#e4e4e7] shadow-card hover:shadow-float p-6 sm:p-8 lg:p-10 transition-shadow duration-300 transform-gpu [transform-style:preserve-3d] select-none"
          :style="cardTransformStyle"
          @mousemove="handleMouseMove"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
        >
          <!-- Dynamic Cursor Spotlight Overlay -->
          <div
            class="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
            :class="isHovered ? 'opacity-100' : 'opacity-0'"
            :style="{
              background: `radial-gradient(650px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 82, 156, 0.07), rgba(0, 192, 122, 0.04), transparent 65%)`
            }"
            aria-hidden="true"
          ></div>

          <!-- Dynamic Holographic Hairline Border Sheen -->
          <div
            class="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 border border-transparent"
            :class="isHovered ? 'opacity-100' : 'opacity-0'"
            :style="{
              background: `radial-gradient(420px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 145, 255, 0.45), rgba(0, 192, 122, 0.35), transparent 70%) border-box`,
              mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
              WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
              maskComposite: 'exclude',
              WebkitMaskComposite: 'xor',
              padding: '1px'
            }"
            aria-hidden="true"
          ></div>

          <!-- Layer 1: Card Header & Creator Badge (transform: translateZ) -->
          <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5 pb-6 border-b border-[#e4e4e7] [transform:translateZ(24px)]">
            <div class="flex items-start sm:items-center gap-3.5">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00529c] to-[#003b7a] text-white flex items-center justify-center shrink-0 shadow-md">
                <i class="fa-solid fa-screwdriver-wrench text-lg" aria-hidden="true"></i>
              </div>
              <div class="min-w-0">
                <div class="flex flex-wrap items-center gap-2">
                  <h3 class="text-xl sm:text-2xl font-extrabold text-[#090c1d] font-display tracking-tight">
                    CTU Student's Tools (CTUST)
                  </h3>
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#ecfdf5] text-[#00c07a] border border-[#a7f3d0] whitespace-nowrap">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#00c07a] animate-pulse"></span>
                    Trực tuyến & Miễn phí
                  </span>
                </div>
                <p class="text-xs sm:text-sm text-[#71717a] mt-0.5">
                  Phát triển bởi <strong class="text-[#18181b] font-semibold">Nguyễn Phước Lộc</strong> (<a href="https://github.com/Lexipit3268" target="_blank" rel="noopener noreferrer" class="text-[#00529c] hover:underline">@Lexipit3268</a>) · Sinh viên ĐH Cần Thơ
                </p>
              </div>
            </div>

            <!-- Header Quick Badge -->
            <div class="flex items-center gap-2 self-start md:self-auto shrink-0">
              <a
                href="https://github.com/Lexipit3268/CTUST"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-clickup-ghost !py-2 !px-3.5 !text-xs whitespace-nowrap flex items-center gap-1.5"
                title="Xem mã nguồn trên GitHub"
              >
                <i class="fa-brands fa-github text-sm" aria-hidden="true"></i>
                <span>Mã Nguồn</span>
              </a>
              <a
                href="https://ctust.pages.dev/"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-clickup-primary !py-2 !px-4 !text-xs whitespace-nowrap flex items-center gap-1.5 shadow-sm"
              >
                <span>Mở CTUST</span>
                <i class="fa-solid fa-arrow-up-right-from-square text-[11px]" aria-hidden="true"></i>
              </a>
            </div>
          </div>

          <!-- Layer 2: 4 Core Modules 3D Matrix (transform: translateZ) -->
          <div class="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-6 border-b border-[#e4e4e7] [transform:translateZ(36px)]">
            <!-- Module 1: V-SAT -->
            <div class="p-4 rounded-xl border border-[#e4e4e7] bg-[#f8f9fa] hover:bg-white hover:border-[#bae0fd] hover:shadow-sm transition-all duration-200 group">
              <div class="flex items-center justify-between mb-2.5">
                <span class="w-8 h-8 rounded-lg bg-[#f0f7ff] text-[#00529c] flex items-center justify-center text-xs group-hover:scale-105 transition-transform">
                  <i class="fa-solid fa-calculator" aria-hidden="true"></i>
                </span>
                <span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#f0f7ff] text-[#00529c] border border-[#bae0fd] whitespace-nowrap">
                  Tuyển Sinh CTU
                </span>
              </div>
              <h4 class="font-bold text-sm text-[#18181b] mb-1 font-display">
                Quy Đổi Điểm V-SAT
              </h4>
              <p class="text-xs text-[#52525b] leading-relaxed">
                Chuẩn hóa điểm thi đánh giá năng lực V-SAT sang thang 30 theo công thức đối sánh chính thức của ĐH Cần Thơ.
              </p>
            </div>

            <!-- Module 2: Học bạ THPT -->
            <div class="p-4 rounded-xl border border-[#e4e4e7] bg-[#f8f9fa] hover:bg-white hover:border-[#a7f3d0] hover:shadow-sm transition-all duration-200 group">
              <div class="flex items-center justify-between mb-2.5">
                <span class="w-8 h-8 rounded-lg bg-[#ecfdf5] text-[#00c07a] flex items-center justify-center text-xs group-hover:scale-105 transition-transform">
                  <i class="fa-solid fa-file-lines" aria-hidden="true"></i>
                </span>
                <span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#ecfdf5] text-[#00c07a] border border-[#a7f3d0] whitespace-nowrap">
                  Học Bạ THPT
                </span>
              </div>
              <h4 class="font-bold text-sm text-[#18181b] mb-1 font-display">
                Xét Tuyển Học Bạ 3 Môn
              </h4>
              <p class="text-xs text-[#52525b] leading-relaxed">
                Tính tổng điểm 3 môn tổ hợp lớp 12, tự động tích hợp điểm ưu tiên khu vực (KV1, KV2, KV2-NT) và đối tượng chính sách.
              </p>
            </div>

            <!-- Module 3: Quản lý GPA -->
            <div class="p-4 rounded-xl border border-[#e4e4e7] bg-[#f8f9fa] hover:bg-white hover:border-[#c7d2fe] hover:shadow-sm transition-all duration-200 group">
              <div class="flex items-center justify-between mb-2.5">
                <span class="w-8 h-8 rounded-lg bg-[#eef2ff] text-[#4f46e5] flex items-center justify-center text-xs group-hover:scale-105 transition-transform">
                  <i class="fa-solid fa-chart-line" aria-hidden="true"></i>
                </span>
                <span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#eef2ff] text-[#4f46e5] border border-[#c7d2fe] whitespace-nowrap">
                  Tiến Độ Học Tập
                </span>
              </div>
              <h4 class="font-bold text-sm text-[#18181b] mb-1 font-display">
                Tính GPA & Quản Lý Điểm
              </h4>
              <p class="text-xs text-[#52525b] leading-relaxed">
                Bảng điểm tính theo tín chỉ, tính toán CPA tích lũy toàn khóa, dự báo cải thiện điểm và cảnh báo học vụ kịp thời.
              </p>
            </div>

            <!-- Module 4: Học bổng KKHT -->
            <div class="p-4 rounded-xl border border-[#e4e4e7] bg-[#f8f9fa] hover:bg-white hover:border-[#fde68a] hover:shadow-sm transition-all duration-200 group">
              <div class="flex items-center justify-between mb-2.5">
                <span class="w-8 h-8 rounded-lg bg-[#fffbeb] text-[#d97706] flex items-center justify-center text-xs group-hover:scale-105 transition-transform">
                  <i class="fa-solid fa-award" aria-hidden="true"></i>
                </span>
                <span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#fffbeb] text-[#d97706] border border-[#fde68a] whitespace-nowrap">
                  Học Bổng CTU
                </span>
              </div>
              <h4 class="font-bold text-sm text-[#18181b] mb-1 font-display">
                Ước Lượng Học Bổng KKHT
              </h4>
              <p class="text-xs text-[#52525b] leading-relaxed">
                Tự động đối chiếu điểm GPA học kỳ cùng Điểm rèn luyện để xếp loại học bổng Xuất sắc / Giỏi / Khá theo quy chế CTU.
              </p>
            </div>
          </div>

          <!-- Layer 3: Trust Bar & Privacy Guarantees (transform: translateZ) -->
          <div class="relative z-10 pt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#71717a] [transform:translateZ(20px)]">
            <div class="flex flex-wrap items-center gap-x-4 gap-y-1.5">
              <span class="flex items-center gap-1.5">
                <i class="fa-solid fa-shield-halved text-[#00c07a]" aria-hidden="true"></i>
                <span>100% Client-side (Không gửi dữ liệu lên server)</span>
              </span>
              <span class="flex items-center gap-1.5">
                <i class="fa-solid fa-code-branch text-[#00529c]" aria-hidden="true"></i>
                <span>Mã nguồn mở phi lợi nhuận</span>
              </span>
              <span class="flex items-center gap-1.5">
                <i class="fa-solid fa-bolt text-[#0091ff]" aria-hidden="true"></i>
                <span>Cập nhật theo quy chế CTU</span>
              </span>
            </div>

            <div class="shrink-0">
              <a
                href="https://ctust.pages.dev/"
                target="_blank"
                rel="noopener noreferrer"
                class="font-semibold text-[#00529c] hover:underline flex items-center gap-1"
              >
                <span>ctust.pages.dev</span>
                <i class="fa-solid fa-arrow-right text-[11px]" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { motion } from 'motion-v';

const cardRef = ref(null);
const rotateX = ref(0);
const rotateY = ref(0);
const mouseX = ref(50);
const mouseY = ref(50);
const isHovered = ref(false);

const cardTransformStyle = computed(() => {
  return {
    transform: `perspective(1200px) rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg)`,
    transition: isHovered.value ? 'transform 0.12s ease-out' : 'transform 0.5s cubic-bezier(0.33, 1, 0.68, 1)',
    '--mouse-x': `${mouseX.value}%`,
    '--mouse-y': `${mouseY.value}%`,
  };
});

function handleMouseMove(e) {
  if (!cardRef.value) return;
  // Gracefully disable on touch/pointer coarse
  if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;

  const rect = cardRef.value.$el ? cardRef.value.$el.getBoundingClientRect() : cardRef.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  mouseX.value = Math.max(0, Math.min(100, (x / rect.width) * 100));
  mouseY.value = Math.max(0, Math.min(100, (y / rect.height) * 100));

  const normalizedX = (x / rect.width) - 0.5;
  const normalizedY = (y / rect.height) - 0.5;

  // Gentle, elegant tilt (max ±5.5 degrees)
  rotateX.value = -normalizedY * 7;
  rotateY.value = normalizedX * 7;
}

function handleMouseEnter() {
  if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;
  isHovered.value = true;
}

function handleMouseLeave() {
  isHovered.value = false;
  rotateX.value = 0;
  rotateY.value = 0;
  mouseX.value = 50;
  mouseY.value = 50;
}
</script>
