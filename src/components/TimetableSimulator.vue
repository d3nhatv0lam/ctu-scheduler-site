<template>
  <div class="space-y-4">
    <!-- View Switcher Tabs (ClickUp Style) -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e8e8e8]">
      <div class="flex items-center gap-1.5 p-1 bg-[#f8f9fa] rounded-full border border-[#e8e8e8] self-start">
        <button
          type="button"
          class="px-3.5 py-1 text-xs font-bold rounded-full transition-all"
          :class="activeView === 'calendar' ? 'bg-[#202020] text-white shadow-sm' : 'text-[#646464] hover:text-[#202020]'"
          @click="activeView = 'calendar'"
        >
          Lịch Tuần (Weekly)
        </button>
        <button
          type="button"
          class="px-3.5 py-1 text-xs font-bold rounded-full transition-all"
          :class="activeView === 'list' ? 'bg-[#202020] text-white shadow-sm' : 'text-[#646464] hover:text-[#202020]'"
          @click="activeView = 'list'"
        >
          Danh Sách Môn (List)
        </button>
      </div>

      <!-- Quick Criteria Filters (ClickUp 9999px Pill Filters) -->
      <div class="flex flex-wrap items-center gap-1.5">
        <span class="text-xs text-[#838383] font-semibold mr-1">Tiêu chí:</span>
        <button
          v-for="item in filterList"
          :key="item.key"
          type="button"
          class="pill-filter !py-1 !px-3 !text-xs"
          :class="{ active: currentFilter === item.key }"
          @click="currentFilter = item.key"
        >
          {{ item.label }}
        </button>
      </div>
    </div>

    <!-- Calendar View -->
    <div v-if="activeView === 'calendar'" class="overflow-x-auto rounded-xl border border-[#e8e8e8] bg-[#f8f9fa]/40 tabular-nums">
      <table class="w-full text-left border-collapse text-xs">
        <thead>
          <tr class="border-b border-[#e8e8e8] bg-[#e9ebf0]/50 text-[#646464] font-bold">
            <th class="p-2.5 w-16 text-center">Buổi</th>
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
            <td class="p-3 text-[#646464] text-center font-bold bg-[#f8f9fa] border-r border-[#e8e8e8]">
              Sáng<br /><span class="text-[10px] text-[#838383] font-normal">Tiết 1-5</span>
            </td>
            <td class="p-2 border-r border-[#e8e8e8]">
              <div
                class="timetable-slot slot-course p-2.5 rounded-lg border border-[#e8e8e8] transition-colors"
                :class="{ 'slot-dimmed': !isSlotActive('slot-ct176-m') }"
              >
                <div class="flex items-center justify-between">
                  <span class="font-extrabold text-[#202020]">CT176</span>
                  <span class="text-[10px] font-bold px-1.5 py-0.2 bg-[#f0f7ff] text-[#00529c] rounded">3TC</span>
                </div>
                <div class="text-[11px] text-[#646464] mt-0.5">Lập trình HĐT</div>
                <div class="text-[10px] text-[#838383] mt-1">Phòng 102/DI · Khu II</div>
              </div>
            </td>
            <td class="p-2 border-r border-[#e8e8e8]"><div class="text-[#cbd5e1] text-center py-4 font-sans">-</div></td>
            <td class="p-2 border-r border-[#e8e8e8]">
              <div
                class="timetable-slot slot-course p-2.5 rounded-lg border border-[#e8e8e8] transition-colors"
                :class="{ 'slot-dimmed': !isSlotActive('slot-ct103-m') }"
              >
                <div class="flex items-center justify-between">
                  <span class="font-extrabold text-[#202020]">CT103</span>
                  <span class="text-[10px] font-bold px-1.5 py-0.2 bg-[#f0f7ff] text-[#00529c] rounded">4TC</span>
                </div>
                <div class="text-[11px] text-[#646464] mt-0.5">Cấu trúc Dữ Liệu</div>
                <div class="text-[10px] text-[#838383] mt-1">Phòng 204/DI · Khu II</div>
              </div>
            </td>
            <td class="p-2 border-r border-[#e8e8e8]"><div class="text-[#cbd5e1] text-center py-4 font-sans">-</div></td>
            <td class="p-2"><div class="text-[#cbd5e1] text-center py-4 font-sans">-</div></td>
          </tr>
          <!-- Ca Chiều -->
          <tr>
            <td class="p-3 text-[#646464] text-center font-bold bg-[#f8f9fa] border-r border-[#e8e8e8]">
              Chiều<br /><span class="text-[10px] text-[#838383] font-normal">Tiết 6-10</span>
            </td>
            <td class="p-2 border-r border-[#e8e8e8]"><div class="text-[#cbd5e1] text-center py-4 font-sans">-</div></td>
            <td class="p-2 border-r border-[#e8e8e8]">
              <div
                class="timetable-slot slot-course p-2.5 rounded-lg border border-[#e8e8e8] transition-colors"
                :class="{ 'slot-dimmed': !isSlotActive('slot-ct112-a') }"
              >
                <div class="flex items-center justify-between">
                  <span class="font-extrabold text-[#202020]">CT112</span>
                  <span class="text-[10px] font-bold px-1.5 py-0.2 bg-[#e6f4ff] text-[#0091ff] rounded">3TC</span>
                </div>
                <div class="text-[11px] text-[#646464] mt-0.5">Mạng Máy Tính</div>
                <div class="text-[10px] text-[#838383] mt-1">Phòng 301/DI · Khu II</div>
              </div>
            </td>
            <td class="p-2 border-r border-[#e8e8e8]">
              <div
                class="timetable-slot slot-course p-2.5 rounded-lg border border-[#e8e8e8] transition-colors"
                :class="{ 'slot-dimmed': !isSlotActive('slot-ct178-a') }"
              >
                <div class="flex items-center justify-between">
                  <span class="font-extrabold text-[#202020]">CT178</span>
                  <span class="text-[10px] font-bold px-1.5 py-0.2 bg-[#e6f4ff] text-[#0091ff] rounded">3TC</span>
                </div>
                <div class="text-[11px] text-[#646464] mt-0.5">Nguyên Lý HĐH</div>
                <div class="text-[10px] text-[#838383] mt-1">Phòng 105/DI · Khu II</div>
              </div>
            </td>
            <td class="p-2 border-r border-[#e8e8e8]">
              <div
                class="timetable-slot slot-course p-2.5 rounded-lg border border-[#e8e8e8] transition-colors"
                :class="{ 'slot-dimmed': !isSlotActive('slot-ml014-a') }"
              >
                <div class="flex items-center justify-between">
                  <span class="font-extrabold text-[#202020]">ML014</span>
                  <span class="text-[10px] font-bold px-1.5 py-0.2 bg-[#ecfdf5] text-[#00c07a] rounded">2TC</span>
                </div>
                <div class="text-[11px] text-[#646464] mt-0.5">Triết Học MLN</div>
                <div class="text-[10px] text-[#838383] mt-1">Phòng 101/Khoa Luật</div>
              </div>
            </td>
            <td class="p-2"><div class="text-[#cbd5e1] text-center py-4 font-sans">-</div></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- List View -->
    <div v-else class="rounded-xl border border-[#e8e8e8] overflow-hidden divide-y divide-[#e8e8e8] bg-white text-xs tabular-nums">
      <div
        v-for="course in courseList"
        :key="course.code"
        class="p-3.5 flex items-center justify-between hover:bg-[#f8f9fa] transition-colors"
      >
        <div class="flex items-center gap-3">
          <span class="w-8 h-8 rounded-full bg-[#f0f7ff] text-[#00529c] font-extrabold flex items-center justify-center text-xs">
            {{ course.credits }}
          </span>
          <div>
            <div class="font-bold text-[#202020] text-sm">{{ course.code }} — {{ course.name }}</div>
            <div class="text-xs text-[#838383] mt-0.5">Lớp: {{ course.classGroup }} · Giảng viên: {{ course.lecturer }} · Phòng: {{ course.room }}</div>
          </div>
        </div>
        <div class="text-right">
          <span class="px-2 py-0.5 text-[11px] font-bold rounded-full bg-[#ecfdf5] text-[#00c07a] border border-[#a7f3d0]">
            Còn {{ course.slots }}
          </span>
        </div>
      </div>
    </div>

    <!-- Live Status Toolbar (Hairline Divider Row) -->
    <div class="pt-3 border-t border-[#e8e8e8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
      <div class="grid grid-cols-3 divide-x divide-[#e8e8e8] text-center sm:text-left flex-1">
        <div class="pr-3">
          <span class="text-[#838383] block text-[10px] font-bold uppercase">Trùng Lịch</span>
          <span class="font-extrabold text-[#00c07a] flex items-center gap-1 justify-center sm:justify-start">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
            {{ currentStats.conflicts }}
          </span>
        </div>
        <div class="px-3">
          <span class="text-[#838383] block text-[10px] font-bold uppercase">Sĩ Số CT176</span>
          <span class="font-extrabold text-[#0091ff]">{{ currentStats.capacity }}</span>
        </div>
        <div class="pl-3">
          <span class="text-[#838383] block text-[10px] font-bold uppercase">Ngày Trống</span>
          <span class="font-extrabold text-[#202020]">{{ currentStats.freeDays }}</span>
        </div>
      </div>

      <div class="text-xs text-[#646464] bg-[#f8f9fa] px-3.5 py-2 rounded-lg border border-[#e8e8e8] flex-1">
        <span class="font-bold text-[#202020]">Đánh giá phương án: </span>
        {{ currentStats.statusText }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const activeView = ref('calendar');

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

const courseList = [
  { code: 'CT176', name: 'Lập trình Hướng đối tượng', credits: '3TC', classGroup: '01', lecturer: 'TS. Nguyễn Văn A', room: '102/DI', slots: '42/45' },
  { code: 'CT103', name: 'Cấu trúc Dữ liệu', credits: '4TC', classGroup: '02', lecturer: 'ThS. Trần Thị B', room: '204/DI', slots: '39/40' },
  { code: 'CT112', name: 'Mạng Máy Tính', credits: '3TC', classGroup: '01', lecturer: 'TS. Lê Hoàng C', room: '301/DI', slots: '41/45' },
  { code: 'CT178', name: 'Nguyên Lý Hệ Điều Hành', credits: '3TC', classGroup: '03', lecturer: 'ThS. Phạm Văn D', room: '105/DI', slots: '35/40' },
  { code: 'ML014', name: 'Triết Học Mác - Lênin', credits: '2TC', classGroup: '05', lecturer: 'GVC. Vũ Thị E', room: '101/Khoa Luật', slots: '65/70' },
];

const currentStats = computed(() => presets[currentFilter.value] || presets.all);

function isSlotActive(slotId) {
  return currentStats.value.activeSlots.includes(slotId);
}
</script>
