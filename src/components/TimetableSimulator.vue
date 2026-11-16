<template>
  <div class="slash-card !p-5 relative overflow-hidden">
    <!-- Card Header with Subtle Gilded Accent -->
    <div class="flex items-center justify-between pb-3 mb-4 border-b border-[#1c1d22]">
      <div class="flex items-center gap-2">
        <span class="w-1.5 h-1.5 rounded-full bg-[#ae9357]"></span>
        <span class="text-xs font-medium text-[#ffffff]">Mô phỏng xếp lịch tự động</span>
      </div>
      <span class="text-[11px] text-[#9194a1]">Học kỳ 1 / CTU</span>
    </div>

    <!-- Filter Pills (Slash 9999px pill buttons) -->
    <div class="mb-4">
      <div class="text-xs text-[#9194a1] mb-2 font-medium">Tiêu chí ưu tiên:</div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
        <button
          v-for="item in filterList"
          :key="item.key"
          type="button"
          class="pill-filter text-center"
          :class="{ active: currentFilter === item.key }"
          @click="currentFilter = item.key"
        >
          {{ item.label }}
        </button>
      </div>
    </div>

    <!-- Timetable Weekly Grid -->
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse text-[11px]">
        <thead>
          <tr class="border-b border-[#1c1d22] text-[#9194a1]">
            <th class="p-2 w-14 text-center">Buổi</th>
            <th class="p-2 text-center">Thứ 2</th>
            <th class="p-2 text-center">Thứ 3</th>
            <th class="p-2 text-center">Thứ 4</th>
            <th class="p-2 text-center">Thứ 5</th>
            <th class="p-2 text-center">Thứ 6</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#1c1d22]/80">
          <!-- Ca Sáng -->
          <tr>
            <td class="p-2 text-[#9194a1] text-center bg-[#08080a]">
              Sáng<br /><span class="text-[10px] text-[#5e616e]">T1-5</span>
            </td>
            <td class="p-1">
              <div
                class="timetable-slot slot-course"
                :class="{ 'slot-dimmed': !isSlotActive('slot-ct176-m') }"
              >
                <div class="font-semibold text-[#ffffff]">CT176</div>
                <div class="text-[10px] text-[#9194a1]">Lập trình HĐT</div>
              </div>
            </td>
            <td class="p-1"><div class="text-[#464853] text-center py-2">-</div></td>
            <td class="p-1">
              <div
                class="timetable-slot slot-course"
                :class="{ 'slot-dimmed': !isSlotActive('slot-ct103-m') }"
              >
                <div class="font-semibold text-[#ffffff]">CT103</div>
                <div class="text-[10px] text-[#9194a1]">Cấu trúc DL</div>
              </div>
            </td>
            <td class="p-1"><div class="text-[#464853] text-center py-2">-</div></td>
            <td class="p-1"><div class="text-[#464853] text-center py-2">-</div></td>
          </tr>
          <!-- Ca Chiều -->
          <tr>
            <td class="p-2 text-[#9194a1] text-center bg-[#08080a]">
              Chiều<br /><span class="text-[10px] text-[#5e616e]">T6-10</span>
            </td>
            <td class="p-1"><div class="text-[#464853] text-center py-2">-</div></td>
            <td class="p-1">
              <div
                class="timetable-slot slot-course"
                :class="{ 'slot-dimmed': !isSlotActive('slot-ct112-a') }"
              >
                <div class="font-semibold text-[#ffffff]">CT112</div>
                <div class="text-[10px] text-[#9194a1]">Mạng máy tính</div>
              </div>
            </td>
            <td class="p-1">
              <div
                class="timetable-slot slot-course"
                :class="{ 'slot-dimmed': !isSlotActive('slot-ct178-a') }"
              >
                <div class="font-semibold text-[#ffffff]">CT178</div>
                <div class="text-[10px] text-[#9194a1]">Hệ điều hành</div>
              </div>
            </td>
            <td class="p-1">
              <div
                class="timetable-slot slot-course"
                :class="{ 'slot-dimmed': !isSlotActive('slot-ml014-a') }"
              >
                <div class="font-semibold text-[#ffffff]">ML014</div>
                <div class="text-[10px] text-[#9194a1]">Triết học MLN</div>
              </div>
            </td>
            <td class="p-1"><div class="text-[#464853] text-center py-2">-</div></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Live Ledger Status Row -->
    <div class="mt-4 pt-3 border-t border-[#1c1d22] text-xs">
      <div class="grid grid-cols-3 divide-x divide-[#1c1d22] py-1 mb-2">
        <div class="pr-3">
          <span class="text-[#5e616e] block text-[10px]">Trùng lịch</span>
          <span class="font-medium text-[#ffffff]">{{ currentStats.conflicts }}</span>
        </div>
        <div class="px-3">
          <span class="text-[#5e616e] block text-[10px]">Sĩ số CT176</span>
          <span class="font-medium text-[#ae9357]">{{ currentStats.capacity }}</span>
        </div>
        <div class="pl-3">
          <span class="text-[#5e616e] block text-[10px]">Ngày trống</span>
          <span class="font-medium text-[#e2e3e9]">{{ currentStats.freeDays }}</span>
        </div>
      </div>
      <p class="text-[#9194a1] text-[11px] leading-relaxed">
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
    statusText: 'Phương án cân bằng tiêu chuẩn: Rải đều các buổi sáng/chiều.',
  },
  afternoon: {
    activeSlots: ['slot-ct112-a', 'slot-ct178-a', 'slot-ml014-a'],
    conflicts: '0 môn trùng',
    freeDays: 'Tất cả buổi sáng',
    capacity: 'Còn 38/40 chỗ',
    statusText: 'Đã né 100% ca sáng: Toàn bộ lịch học chuyển sang tiết 6 - 10.',
  },
  condensed: {
    activeSlots: ['slot-ct176-m', 'slot-ct112-a', 'slot-ct103-m', 'slot-ct178-a'],
    conflicts: '0 môn trùng',
    freeDays: 'Thứ 6 & Thứ 7',
    capacity: 'Còn 35/40 chỗ',
    statusText: 'Đã dồn lịch: Thứ 6 & Thứ 7 trống hoàn toàn để đi làm thêm.',
  },
  campus: {
    activeSlots: ['slot-ct176-m', 'slot-ct112-a', 'slot-ct103-m', 'slot-ct178-a', 'slot-ml014-a'],
    conflicts: '0 môn trùng',
    freeDays: 'Chủ nhật',
    capacity: '100% Khu II',
    statusText: 'Đã khóa cơ sở: 0km di chuyển, toàn bộ diễn ra tại Khu II ĐH Cần Thơ.',
  },
};

const currentStats = computed(() => presets[currentFilter.value] || presets.all);

function isSlotActive(slotId) {
  return currentStats.value.activeSlots.includes(slotId);
}
</script>

