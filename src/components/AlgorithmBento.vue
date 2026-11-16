<template>
  <section id="certification" class="py-20 bg-plaster-band border-b border-[#e4e4e7] relative">
    <div class="container mx-auto max-w-clickup px-4 sm:px-6">
      <!-- Section Header -->
      <motion.div
        :initial="{ opacity: 0, y: 16 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :inViewOptions="{ once: true }"
        :transition="{ duration: 0.45, ease: [0.33, 1, 0.68, 1] }"
        class="max-w-2xl mx-auto text-center mb-14"
      >
        <h2 class="text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-[-0.03em] leading-[1.15] text-[#090c1d] mb-3.5 font-display text-balance">
          Sức mạnh công nghệ đằng sau từng phương án xếp lịch.
        </h2>
        <p class="text-[#52525b] text-base sm:text-lg leading-relaxed font-normal text-pretty">
          Đề tài Nghiên cứu Khoa học Sinh viên được Hội đồng khoa học Khoa Công nghệ Thông tin &amp; Truyền thông — Đại học Cần Thơ chính thức nghiệm thu và đánh giá xuất sắc.
        </p>
      </motion.div>

      <!-- 2-Column Grid (Consistent with CTU Design System) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <!-- Col 1: Core Solver Capabilities (7 cols) -->
        <motion.div
          :initial="{ opacity: 0, y: 16 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :inViewOptions="{ once: true }"
          :transition="{ duration: 0.45, delay: 0.05, ease: [0.33, 1, 0.68, 1] }"
          class="lg:col-span-7 clickup-card p-5 sm:p-7 flex flex-col justify-between"
        >
          <div>
            <h3 class="text-xl font-bold tracking-[-0.02em] leading-snug text-[#18181b] mb-2 font-display text-balance">
              Thuật toán duyệt tổ hợp &amp; Khử xung đột ma trận
            </h3>
            <p class="text-[#52525b] text-sm leading-relaxed mb-5 font-normal text-pretty">
              Tự động kiểm tra hàng chục ngàn tổ hợp môn học, giải quyết triệt để các ràng buộc đăng ký:
            </p>

            <!-- Flat, Clean Constraint List (No Icons, No Overflow on Mobile) -->
            <div class="space-y-2.5 text-xs sm:text-sm">
              <div class="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#f8f9fa] border border-[#e4e4e7]">
                <span class="font-medium text-[#18181b] leading-tight">Khử 100% trùng tiết học</span>
                <span class="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                  Bắt buộc
                </span>
              </div>

              <div class="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#f8f9fa] border border-[#e4e4e7]">
                <span class="font-medium text-[#18181b] leading-tight">Khử 100% trùng ngày thi</span>
                <span class="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                  Bắt buộc
                </span>
              </div>

              <div class="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#f8f9fa] border border-[#e4e4e7]">
                <span class="font-medium text-[#18181b] leading-tight">Tránh đổi cơ sở cùng buổi</span>
                <span class="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-[#00529c] border border-blue-200 shrink-0">
                  Tối ưu
                </span>
              </div>

              <div class="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#f8f9fa] border border-[#e4e4e7]">
                <span class="font-medium text-[#18181b] leading-tight">Bảo lưu giờ nghỉ trưa</span>
                <span class="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-[#00529c] border border-blue-200 shrink-0">
                  Tối ưu
                </span>
              </div>
            </div>
          </div>

          <div class="mt-6 pt-4 border-t border-[#e4e4e7] flex items-center justify-between gap-2 text-xs text-[#71717a]">
            <span>Thực nghiệm tại ĐH Cần Thơ</span>
            <span class="text-emerald-700 font-semibold uppercase text-[11px] tracking-wide shrink-0">
              Nghiệm thu chính thức
            </span>
          </div>
        </motion.div>

        <!-- Col 2: Document Certification (5 cols) -->
        <motion.div
          :initial="{ opacity: 0, y: 16 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :inViewOptions="{ once: true }"
          :transition="{ duration: 0.45, delay: 0.12, ease: [0.33, 1, 0.68, 1] }"
          class="lg:col-span-5 clickup-card p-5 sm:p-7 flex flex-col justify-between"
        >
          <div>
            <h3 class="text-xl font-bold tracking-[-0.02em] leading-snug text-[#18181b] mb-2 font-display text-balance">
              Chứng Nhận Khoa CNTT&amp;TT
            </h3>
            <p class="text-[#52525b] text-sm leading-relaxed mb-5 font-normal text-pretty">
              Biên bản số 02/TB-CN&amp;CNTT-SV do Hội đồng khoa học thẩm định và thông qua:
            </p>

            <!-- Document Click-to-Modal Trigger -->
            <motion.button
              type="button"
              :whilePress="{ scale: 0.98 }"
              @click="openModal"
              class="group relative w-full flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border border-[#e4e4e7] bg-[#f8f9fa] hover:border-[#00529c] hover:bg-[#f0f7ff]/40 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00529c]/50"
              aria-haspopup="dialog"
              aria-label="Xem biên bản nghiệm thu phóng to"
            >
              <div class="relative overflow-hidden rounded-lg border border-[#e4e4e7] shadow-xs max-w-[190px]">
                <img
                  src="/assets/images/02_TB Cong nghe va CNTT_SV_Bien ban_duoc duyet-images-48.webp"
                  alt="Biên bản nghiệm thu đề tài NCKH CTU Scheduler"
                  class="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-[#090c1d]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center text-white p-2">
                  <span class="text-xs font-semibold px-2.5 py-1 rounded bg-white/20 backdrop-blur-xs">Phóng to văn bản</span>
                </div>
              </div>
              <span class="mt-2.5 text-xs font-medium text-[#00529c] group-hover:underline">
                Xem toàn văn biên bản nghiệm thu
              </span>
            </motion.button>
          </div>

          <div class="mt-6 pt-4 border-t border-[#e4e4e7] flex items-center justify-center gap-1.5 text-xs text-[#52525b]">
            <span>Xếp loại: <strong class="text-[#090c1d] font-semibold">Xuất sắc</strong> • Khoa CNTT&amp;TT — ĐH Cần Thơ</span>
          </div>
        </motion.div>
      </div>
    </div>

    <!-- Zoomable Modal for Document Inspection (motion-v animated) -->
    <Teleport to="body">
      <AnimatePresence mode="wait">
        <motion.div
          v-if="isModalOpen"
          key="doc-modal-overlay"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
          :transition="{ duration: 0.18, ease: 'easeOut' }"
          class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#090c1d]/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-doc-title"
          @click.self="closeModal"
        >
          <motion.div
            :initial="{ scale: 0.96, opacity: 0 }"
            :animate="{ scale: 1, opacity: 1 }"
            :transition="{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }"
            class="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-[#e4e4e7] overflow-hidden"
          >
            <!-- Modal Header -->
            <div class="flex items-center justify-between px-5 py-3.5 border-b border-[#e4e4e7] bg-[#f8f9fa] shrink-0">
              <div>
                <h4 id="modal-doc-title" class="text-sm font-bold text-[#18181b] leading-tight">
                  Biên bản nghiệm thu đề tài NCKH Sinh viên
                </h4>
                <p class="text-[11px] text-[#71717a]">
                  Số 02/TB-CN&amp;CNTT-SV • Khoa Công nghệ Thông tin &amp; Truyền thông
                </p>
              </div>

              <!-- Controls & Close -->
              <div class="flex items-center gap-1.5 sm:gap-2">
                <!-- Zoom Controls -->
                <div class="flex items-center bg-white border border-[#e4e4e7] rounded-lg p-0.5 shadow-2xs">
                  <motion.button
                    type="button"
                    :whilePress="{ scale: 0.92 }"
                    @click="zoomOut"
                    class="w-7 h-7 flex items-center justify-center text-[#52525b] hover:text-[#090c1d] hover:bg-[#f1f5f9] rounded transition-colors cursor-pointer"
                    title="Thu nhỏ (-)"
                    aria-label="Thu nhỏ"
                  >
                    <i class="fa-solid fa-minus text-xs" aria-hidden="true"></i>
                  </motion.button>
                  <span class="px-2 text-xs font-semibold tabular-nums text-[#18181b]">
                    {{ Math.round(zoom * 100) }}%
                  </span>
                  <motion.button
                    type="button"
                    :whilePress="{ scale: 0.92 }"
                    @click="zoomIn"
                    class="w-7 h-7 flex items-center justify-center text-[#52525b] hover:text-[#090c1d] hover:bg-[#f1f5f9] rounded transition-colors cursor-pointer"
                    title="Phóng to (+)"
                    aria-label="Phóng to"
                  >
                    <i class="fa-solid fa-plus text-xs" aria-hidden="true"></i>
                  </motion.button>
                </div>

                <!-- Reset Zoom -->
                <motion.button
                  type="button"
                  :whilePress="{ scale: 0.95 }"
                  @click="resetZoom"
                  class="px-2.5 py-1 text-xs font-medium text-[#52525b] hover:text-[#090c1d] bg-white border border-[#e4e4e7] rounded-lg hover:bg-[#f1f5f9] transition-colors shadow-2xs hidden sm:inline-flex items-center gap-1 cursor-pointer"
                  title="Đặt lại kích thước chuẩn (0)"
                >
                  <i class="fa-solid fa-rotate-left text-[11px]" aria-hidden="true"></i>
                  <span>Vừa khung</span>
                </motion.button>

                <!-- Close Button -->
                <motion.button
                  type="button"
                  :whilePress="{ scale: 0.90 }"
                  @click="closeModal"
                  class="w-8 h-8 flex items-center justify-center text-[#71717a] hover:text-[#090c1d] hover:bg-[#e4e4e7]/60 rounded-lg transition-colors ml-1 cursor-pointer"
                  title="Đóng (Esc)"
                  aria-label="Đóng cửa sổ"
                >
                  <i class="fa-solid fa-xmark text-sm" aria-hidden="true"></i>
                </motion.button>
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
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { motion, AnimatePresence } from 'motion-v';

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
