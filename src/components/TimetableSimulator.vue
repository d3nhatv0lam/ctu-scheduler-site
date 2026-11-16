<template>
  <div class="clickup-card-elevated p-5 md:p-6 relative overflow-hidden bg-white border border-[#e8e8e8] shadow-card">
    <!-- Card Top Bar with Status Pulse -->
    <div class="flex items-center justify-between pb-3 mb-4 border-b border-[#e8e8e8]">
      <div class="flex items-center gap-2.5">
        <span class="relative flex h-2.5 w-2.5">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00c07a] opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00c07a]"></span>
        </span>
        <span class="text-xs font-bold text-[#202020] font-display">MÔ PHỎNG XẾP LỊCH TỰ ĐỘNG</span>
      </div>
      <span class="px-2.5 py-0.5 text-[11px] font-semibold rounded-full bg-[#f8f9fa] text-[#646464] border border-[#e8e8e8]">
        Học kỳ 1 · ĐH Cần Thơ
      </span>
    </div>

    <!-- Filter Pills (ClickUp 9999px pill selectors) -->
    <div class="mb-4">
      <div class="text-xs text-[#838383] mb-2 font-semibold uppercase tracking-wider">Tiêu chí ưu tiên:</div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        <button
          v-for="item in filterList"
          :key="item.key"
          type="button"
          class="pill-filter text-center justify-center font-medium"
          :class="{ active: currentFilter === item.key }"
          @click="currentFilter = item.key"
        >
          {{ item.label }}
        </button>
      </div>
    </div>

    <!-- Timetable Weekly Grid (Light Dashboard Table) -->
    <div class="overflow-x-auto rounded-lg border border-[#e8e8e8] bg-[#f8f9fa]/50">
      <table class="w-full text-left border-collapse text-[11px]">
        <thead>
          <tr class="border-b border-[#e8e8e8] bg-[#e9ebf0]/50 text-[#646464] font-semibold">
            <th class="p-2.5 w-14 text-center">Buổi</th>
            <th class="p-2.5 text-center">Thứ 2</th>
            <th class="p-2.5 text-center">Thứ 3</th>
            <th class="p-2.5 text-center">Thứ 4</th>
            <th class="p-2.5 text-center">Thứ 5</th>
            <th class="p-2.5 text-center">Thứ 6</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#e8e8e8] bg-white">
          <!-- Ca Sáng -->
          <tr>
            <td class="p-2 text-[#646464] text-center font-medium bg-[#f8f9fa]">
              Sáng<br /><span class="text-[10px] text-[#838383]">T1-5</span>
            </td>
            <td class="p-1.5">
              <div
                class="timetable-slot slot-course"
                :class="{ 'slot-dimmed': !isSlotActive('slot-ct176-m') }"
              >
                <div class="font-bold text-[#202020]">CT176</div>
                <div class="text-[10px] text-[#646464]">Lập trình HĐT</div>
              </div>
            </td>
            <td class="p-1.5"><div class="text-[#b3b3b3] text-center py-2 font-mono">-</div></td>
            <td class="p-1.5">
              <div
                class="timetable-slot slot-course"
                :class="{ 'slot-dimmed': !isSlotActive('slot-ct103-m') }"
              >
                <div class="font-bold text-[#202020]">CT103</div>
                <div class="text-[10px] text-[#646464]">Cấu trúc DL</div>
              </div>
            </td>
            <td class="p-1.5"><div class="text-[#b3b3b3] text-center py-2 font-mono">-</div></td>
            <td class="p-1.5"><div class="text-[#b3b3b3] text-center py-2 font-mono">-</div></td>
          </tr>
          <!-- Ca Chiều -->
          <tr>
            <td class="p-2 text-[#646464] text-center font-medium bg-[#f8f9fa]">
              Chiều<br /><span class="text-[10px] text-[#838383]">T6-10</span>
            </td>
            <td class="p-1.5"><div class="text-[#b3b3b3] text-center py-2 font-mono">-</div></td>
            <td class="p-1.5">
              <div
                class="timetable-slot slot-course"
                :class="{ 'slot-dimmed': !isSlotActive('slot-ct112-a') }"
              >
                <div class="font-bold text-[#202020]">CT112</div>
                <div class="text-[10px] text-[#646464]">Mạng máy tính</div>
              </div>
            </td>
            <td class="p-1.5">
              <div
                class="timetable-slot slot-course"
                :class="{ 'slot-dimmed': !isSlotActive('slot-ct178-a') }"
              >
                <div class="font-bold text-[#202020]">CT178</div>
                <div class="text-[10px] text-[#646464]">Hệ điều hành</div>
              </div>
            </td>
            <td class="p-1.5">
              <div
                class="timetable-slot slot-course"
                :class="{ 'slot-dimmed': !isSlotActive('slot-ml014-a') }"
              >
                <div class="font-bold text-[#202020]">ML014</div>
                <div class="text-[10px] text-[#646464]">Triết học MLN</div>
              </div>
            </td>
            <td class="p-1.5"><div class="text-[#b3b3b3] text-center py-2 font-mono">-</div></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Live Status Row -->
    <div class="mt-4 pt-3 border-t border-[#e8e8e8] text-xs">
      <div class="grid grid-cols-3 divide-x divide-[#e8e8e8] py-1 mb-2.5">
        <div class="pr-3">
          <span class="text-[#838383] block text-[10px] font-semibold">Trùng lịch</span>
          <span class="font-bold text-[#00c07a] flex items-center gap-1">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
            </svg>
            {{ currentStats.conflicts }}
          </span>
        </div>
        <div class="px-3">
          <span class="text-[#838383] block text-[10px] font-semibold">Sĩ số CT176</span>
          <span class="font-bold text-[#0091ff]">{{ currentStats.capacity }}</span>
        </div>
        <div class="pl-3">
          <span class="text-[#838383] block text-[10px] font-semibold">Ngày trống</span>
          <span class="font-bold text-[#202020]">{{ currentStats.freeDays }}</span>
        </div>
      </div>
      <p class="text-[#646464] text-[11px] leading-relaxed bg-[#f8f9fa] p-2.5 rounded-lg border border-[#e8e8e8]">
        {{ currentStats.statusText }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const filterList = [
  { key: 'all', label: 'Cân bằng' },
  { key: 'afternoon', label: 'Né ca sáng' },
  { key: 'condensed', label: 'Dồn lịch T6-7' },
  { key: 'campus', label: 'Chỉ Khu II' },
];

const currentFilter = ref('all');

const presets = {
  all: {
    activeSlots: ['slot-ct176-m', 'slot-ct112-a', 'slot-ct103-m', 'slot-ct178-a', 'slot-ml014-a'],
    conflicts: '0 môn trùng',
    freeDays: 'Chủ nhật',
    capacity: 'Còn 42/45 chỗ',
    statusText: 'Phương án cân bằng tiêu chuẩn: Rải đều các buổi sáng/chiều, tối ưu hóa giờ giải lao giữa các tiết.',
  },
  afternoon: {
    activeSlots: ['slot-ct112-a', 'slot-ct178-a', 'slot-ml014-a'],
    conflicts: '0 môn trùng',
    freeDays: 'Tất cả buổi sáng',
    capacity: 'Còn 38/40 chỗ',
    statusText: 'Đã né 100% ca sáng: Toàn bộ môn học chuyển sang tiết 6 - 10, sáng ngủ thoải mái.',
  },
  condensed: {
    activeSlots: ['slot-ct176-m', 'slot-ct112-a', 'slot-ct103-m', 'slot-ct178-a'],
    conflicts: '0 môn trùng',
    freeDays: 'Thứ 6 & Thứ 7',
    capacity: 'Còn 35/40 chỗ',
    statusText: 'Đã dồn lịch: Thứ 6 & Thứ 7 trống hoàn toàn, phù hợp đi thực tập hoặc làm thêm.',
  },
  campus: {
    activeSlots: ['slot-ct176-m', 'slot-ct112-a', 'slot-ct103-m', 'slot-ct178-a', 'slot-ml014-a'],
    conflicts: '0 môn trùng',
    freeDays: 'Chủ nhật',
    capacity: '100% Khu II',
    statusText: 'Đã khóa cơ sở: 0km di chuyển phát sinh, toàn bộ diễn ra tại Khu II ĐH Cần Thơ.',
  },
};

const currentStats = computed(() => presets[currentFilter.value] || presets.all);

function isSlotActive(slotId) {
  return currentStats.value.activeSlots.includes(slotId);
}
</script>
