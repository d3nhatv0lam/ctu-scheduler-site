<template>
  <section id="certification" class="py-20 bg-plaster-band border-b border-[#e4e4e7] relative">
    <div class="container mx-auto max-w-clickup px-4 sm:px-6">
      <!-- Section Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 16 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 450, ease: [0.33, 1, 0.68, 1] } }"
        class="max-w-2xl mx-auto text-center mb-14"
      >
        <h2 class="text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-[-0.03em] leading-[1.15] text-[#090c1d] mb-3.5 font-display text-balance">
          Sức mạnh công nghệ đằng sau từng phương án xếp lịch.
        </h2>
        <p class="text-[#52525b] text-base sm:text-lg leading-relaxed font-normal text-pretty">
          Đề tài Nghiên cứu Khoa học Sinh viên được Hội đồng khoa học Khoa Công nghệ Thông tin &amp; Truyền thông — Đại học Cần Thơ chính thức nghiệm thu và đánh giá xuất sắc.
        </p>
      </div>

      <!-- 2-Column Grid (Consistent with CTU Design System) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <!-- Col 1: Core Solver Capabilities (7 cols) -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 16 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 450, delay: 50, ease: [0.33, 1, 0.68, 1] } }"
          class="lg:col-span-7 clickup-card p-6 sm:p-8 flex flex-col justify-between"
        >
          <div>
            <div class="w-11 h-11 rounded-2xl bg-[#f0f7ff] text-[#00529c] border border-[#bae0fd] flex items-center justify-center text-lg mb-5 shadow-xs">
              <i class="fa-solid fa-microchip" aria-hidden="true"></i>
            </div>
            <h3 class="text-xl font-bold tracking-[-0.02em] leading-snug text-[#18181b] mb-2 font-display text-balance">
              Thuật toán duyệt tổ hợp &amp; Khử xung đột ma trận
            </h3>
            <p class="text-[#52525b] text-sm leading-relaxed mb-6 font-normal text-pretty">
              Thuật toán tự động sinh và kiểm tra hàng chục ngàn nhánh kết hợp giữa các nhóm học phần lý thuyết và thực hành, bảo đảm triệt tiêu hoàn toàn xung đột theo các ràng buộc:
            </p>

            <!-- Flat, Clean Constraint List (No Nested Cards) -->
            <div class="space-y-3 text-xs">
              <div class="flex items-center justify-between p-3.5 rounded-xl bg-[#f8f9fa] border border-[#e4e4e7] transition-colors">
                <div class="flex items-center gap-3">
                  <span class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[11px] shrink-0">
                    <i class="fa-solid fa-check" aria-hidden="true"></i>
                  </span>
                  <span class="font-medium text-[#18181b]">Khử <strong class="text-[#090c1d] font-semibold tabular-nums">100%</strong> trùng tiết học</span>
                </div>
                <span class="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                  Bắt buộc
                </span>
              </div>

              <div class="flex items-center justify-between p-3.5 rounded-xl bg-[#f8f9fa] border border-[#e4e4e7] transition-colors">
                <div class="flex items-center gap-3">
                  <span class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[11px] shrink-0">
                    <i class="fa-solid fa-check" aria-hidden="true"></i>
                  </span>
                  <span class="font-medium text-[#18181b]">Khử <strong class="text-[#090c1d] font-semibold tabular-nums">100%</strong> trùng ngày thi kết thúc</span>
                </div>
                <span class="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                  Bắt buộc
                </span>
              </div>

              <div class="flex items-center justify-between p-3.5 rounded-xl bg-[#f8f9fa] border border-[#e4e4e7] transition-colors">
                <div class="flex items-center gap-3">
                  <span class="w-5 h-5 rounded-full bg-blue-100 text-[#00529c] flex items-center justify-center text-[11px] shrink-0">
                    <i class="fa-solid fa-check" aria-hidden="true"></i>
                  </span>
                  <span class="font-medium text-[#18181b]">Tránh đổi cơ sở cùng buổi (Khu II – Hòa An)</span>
                </div>
                <span class="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-50 text-[#00529c] border border-blue-200 shrink-0">
                  Tối ưu
                </span>
              </div>

              <div class="flex items-center justify-between p-3.5 rounded-xl bg-[#f8f9fa] border border-[#e4e4e7] transition-colors">
                <div class="flex items-center gap-3">
                  <span class="w-5 h-5 rounded-full bg-blue-100 text-[#00529c] flex items-center justify-center text-[11px] shrink-0">
                    <i class="fa-solid fa-check" aria-hidden="true"></i>
                  </span>
                  <span class="font-medium text-[#18181b]">Cố định giờ nghỉ trưa &amp; ăn uống (11h00 – 13h00)</span>
                </div>
                <span class="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-50 text-[#00529c] border border-blue-200 shrink-0">
                  Tối ưu
                </span>
              </div>
            </div>
          </div>

          <div class="mt-8 pt-5 border-t border-[#e4e4e7] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#71717a]">
            <span>Kiểm nghiệm thực tế qua nhiều học kỳ tại ĐH Cần Thơ</span>
            <span class="text-emerald-700 font-semibold uppercase text-[11px] tracking-wide flex items-center gap-1.5 self-start sm:self-auto">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              Nghiệm thu chính thức
            </span>
          </div>
        </div>

        <!-- Col 2: Document Certification (5 cols) -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 16 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 450, delay: 120, ease: [0.33, 1, 0.68, 1] } }"
          class="lg:col-span-5 clickup-card p-6 sm:p-8 flex flex-col justify-between"
        >
          <div>
            <div class="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center text-lg mb-5 shadow-xs">
              <i class="fa-solid fa-award" aria-hidden="true"></i>
            </div>
            <h3 class="text-xl font-bold tracking-[-0.02em] leading-snug text-[#18181b] mb-2 font-display text-balance">
              Chứng Nhận Khoa CNTT&amp;TT
            </h3>
            <p class="text-[#52525b] text-sm leading-relaxed mb-5 font-normal text-pretty">
              Biên bản số 02/TB-CN&amp;CNTT-SV do Hội đồng khoa học thẩm định và công nhận tính khả thi cao:
            </p>

            <!-- Document Click-to-Modal Trigger -->
            <button
              type="button"
              @click="openModal"
              class="group relative w-full flex flex-col items-center justify-center p-4 rounded-xl border border-[#e4e4e7] bg-[#f8f9fa] hover:border-[#00529c] hover:bg-[#f0f7ff]/40 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00529c]/50"
              aria-haspopup="dialog"
              aria-label="Bấm để xem văn bản nghiệm thu trong modal thu phóng"
            >
              <div class="relative overflow-hidden rounded-lg border border-[#e4e4e7] shadow-sm max-w-[200px]">
                <img
                  src="/assets/images/02_TB Cong nghe va CNTT_SV_Bien ban_duoc duyet-images-48.webp"
                  alt="Biên bản nghiệm thu đề tài NCKH CTU Scheduler"
                  class="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-[#090c1d]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-white p-2">
                  <span class="w-9 h-9 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center mb-1">
                    <i class="fa-solid fa-magnifying-glass-plus text-sm" aria-hidden="true"></i>
                  </span>
                  <span class="text-xs font-semibold">Bấm để phóng to</span>
                </div>
              </div>
              <span class="mt-3 text-xs font-medium text-[#00529c] flex items-center gap-1.5 group-hover:underline">
                <i class="fa-solid fa-expand text-[11px]" aria-hidden="true"></i>
                Xem văn bản nghiệm thu kích thước lớn
              </span>
            </button>
          </div>

          <div class="mt-6 pt-5 border-t border-[#e4e4e7] flex items-center justify-center gap-2 text-xs text-[#52525b]">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0"></span>
            <span>Xếp loại: <strong class="text-[#090c1d] font-semibold">Xuất sắc</strong> <span class="text-[#a1a1aa]">•</span> Khoa CNTT&amp;TT — ĐH Cần Thơ</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Zoomable Modal for Document Inspection -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isModalOpen"
          class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#090c1d]/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-doc-title"
          @click.self="closeModal"
        >
          <div class="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-[#e4e4e7] overflow-hidden">
            <!-- Modal Header -->
            <div class="flex items-center justify-between px-5 py-3.5 border-b border-[#e4e4e7] bg-[#f8f9fa] shrink-0">
              <div class="flex items-center gap-2.5">
                <span class="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center text-xs">
                  <i class="fa-solid fa-award" aria-hidden="true"></i>
                </span>
                <div>
                  <h4 id="modal-doc-title" class="text-sm font-bold text-[#18181b] leading-tight">
                    Biên bản nghiệm thu đề tài NCKH Sinh viên
                  </h4>
                  <p class="text-[11px] text-[#71717a]">
                    Số 02/TB-CN&amp;CNTT-SV • Khoa Công nghệ Thông tin &amp; Truyền thông
                  </p>
                </div>
              </div>

              <!-- Controls & Close -->
              <div class="flex items-center gap-1.5 sm:gap-2">
                <!-- Zoom Controls -->
                <div class="flex items-center bg-white border border-[#e4e4e7] rounded-lg p-0.5 shadow-2xs">
                  <button
                    type="button"
                    @click="zoomOut"
                    class="w-7 h-7 flex items-center justify-center text-[#52525b] hover:text-[#090c1d] hover:bg-[#f1f5f9] rounded transition-colors"
                    title="Thu nhỏ (-)"
                    aria-label="Thu nhỏ"
                  >
                    <i class="fa-solid fa-minus text-xs" aria-hidden="true"></i>
                  </button>
                  <span class="px-2 text-xs font-semibold tabular-nums text-[#18181b]">
                    {{ Math.round(zoom * 100) }}%
                  </span>
                  <button
                    type="button"
                    @click="zoomIn"
                    class="w-7 h-7 flex items-center justify-center text-[#52525b] hover:text-[#090c1d] hover:bg-[#f1f5f9] rounded transition-colors"
                    title="Phóng to (+)"
                    aria-label="Phóng to"
                  >
                    <i class="fa-solid fa-plus text-xs" aria-hidden="true"></i>
                  </button>
                </div>

                <!-- Reset Zoom -->
                <button
                  type="button"
                  @click="resetZoom"
                  class="px-2.5 py-1 text-xs font-medium text-[#52525b] hover:text-[#090c1d] bg-white border border-[#e4e4e7] rounded-lg hover:bg-[#f1f5f9] transition-colors shadow-2xs hidden sm:inline-flex items-center gap-1"
                  title="Đặt lại kích thước chuẩn (0)"
                >
                  <i class="fa-solid fa-rotate-left text-[11px]" aria-hidden="true"></i>
                  <span>Vừa khung</span>
                </button>

                <!-- Close Button -->
                <button
                  type="button"
                  @click="closeModal"
                  class="w-8 h-8 flex items-center justify-center text-[#71717a] hover:text-[#090c1d] hover:bg-[#e4e4e7]/60 rounded-lg transition-colors ml-1"
                  title="Đóng (Esc)"
                  aria-label="Đóng cửa sổ"
                >
                  <i class="fa-solid fa-xmark text-sm" aria-hidden="true"></i>
                </button>
              </div>
            </div>

            <!-- Modal Viewer Canvas (Scrollable + Draggable + Wheel Zoom) -->
            <div
              class="relative flex-grow overflow-auto p-4 sm:p-6 bg-[#f1f5f9] flex items-center justify-center min-h-[420px] select-none"
              :class="{ 'cursor-grab': zoom > 1 && !isDragging, 'cursor-grabbing': isDragging }"
              @wheel.prevent="handleWheel"
              @mousedown="startDrag"
              @mousemove="onDrag"
              @mouseup="stopDrag"
              @mouseleave="stopDrag"
            >
              <div
                class="transition-transform duration-100 ease-out flex items-center justify-center origin-center"
                :style="{
                  transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`
                }"
              >
                <img
                  src="/assets/images/02_TB Cong nghe va CNTT_SV_Bien ban_duoc duyet-images-48.webp"
                  alt="Toàn văn biên bản nghiệm thu đề tài NCKH CTU Scheduler"
                  class="max-w-full max-h-[72vh] object-contain rounded-lg shadow-md border border-[#e4e4e7] bg-white pointer-events-none"
                  draggable="false"
                />
              </div>
            </div>

            <!-- Modal Footer Advice -->
            <div class="px-4 py-2 border-t border-[#e4e4e7] bg-[#f8f9fa] flex items-center justify-between text-[11px] text-[#71717a] shrink-0">
              <span>Mẹo: Dùng con lăn chuột để phóng to/thu nhỏ, kéo chuột để di chuyển ảnh.</span>
              <span class="hidden sm:inline">Nhấn phím <kbd class="px-1.5 py-0.5 rounded bg-white border border-[#e4e4e7] text-[#18181b] font-semibold text-[10px]">Esc</kbd> để đóng</span>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';

const isModalOpen = ref(false);
const zoom = ref(1);
const panOffset = ref({ x: 0, y: 0 });
const isDragging = ref(false);
const dragStart = ref({ x: 0, y: 0 });

const openModal = () => {
  isModalOpen.value = true;
  zoom.value = 1;
  panOffset.value = { x: 0, y: 0 };
};

const closeModal = () => {
  isModalOpen.value = false;
  zoom.value = 1;
  panOffset.value = { x: 0, y: 0 };
};

const zoomIn = () => {
  if (zoom.value < 3) {
    zoom.value = Number((zoom.value + 0.25).toFixed(2));
  }
};

const zoomOut = () => {
  if (zoom.value > 0.75) {
    zoom.value = Number((zoom.value - 0.25).toFixed(2));
    if (zoom.value <= 1) {
      panOffset.value = { x: 0, y: 0 };
    }
  }
};

const resetZoom = () => {
  zoom.value = 1;
  panOffset.value = { x: 0, y: 0 };
};

const handleWheel = (e) => {
  if (e.deltaY < 0) {
    zoomIn();
  } else {
    zoomOut();
  }
};

const startDrag = (e) => {
  if (zoom.value > 1) {
    isDragging.value = true;
    dragStart.value = {
      x: e.clientX - panOffset.value.x,
      y: e.clientY - panOffset.value.y
    };
  }
};

const onDrag = (e) => {
  if (isDragging.value && zoom.value > 1) {
    panOffset.value = {
      x: e.clientX - dragStart.value.x,
      y: e.clientY - dragStart.value.y
    };
  }
};

const stopDrag = () => {
  isDragging.value = false;
};

const handleKeyDown = (e) => {
  if (!isModalOpen.value) return;
  if (e.key === 'Escape') {
    closeModal();
  } else if (e.key === '+' || e.key === '=') {
    zoomIn();
  } else if (e.key === '-' || e.key === '_') {
    zoomOut();
  } else if (e.key === '0') {
    resetZoom();
  }
};

watch(isModalOpen, (open) => {
  if (open) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
  document.body.style.overflow = '';
});
</script>
