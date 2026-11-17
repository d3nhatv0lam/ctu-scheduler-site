<template>
  <!-- Desktop Application Window Frame (CTU Scheduler Native App Replica) -->
  <div
    class="rounded-2xl border border-[#cbd5e1] bg-[#0a3156] shadow-float overflow-hidden text-left"
  >
    <!-- Native Window Header / Titlebar -->
    <div
      class="h-10 bg-[#072440] border-b border-[#051c33] px-4 flex items-center justify-between select-none"
    >
      <div class="flex items-center gap-3">
        <!-- Active View Tab -->
        <div
          class="flex items-center gap-1.5 text-xs font-bold text-white tracking-wide"
        >
          <span
            class="px-2.5 py-1 rounded-md bg-white/10 text-white border border-white/15"
          >
            Học phần
          </span>
        </div>
      </div>

      <!-- Window Controls (Minimize, Maximize, Close) -->
      <div class="flex items-center gap-3 text-xs text-white/70">
        <span
          class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00c07a]/20 text-[#6ee7b7] text-[11px] font-semibold border border-[#00c07a]/30"
        >
          <span
            class="w-1.5 h-1.5 rounded-full bg-[#6ee7b7] animate-pulse"
          ></span>
          Đồng bộ MyCTU thời gian thực
        </span>
        <div class="flex items-center gap-3 ml-2 text-white/60">
          <button
            type="button"
            class="hover:text-white transition-colors cursor-pointer text-sm"
            aria-label="Thu nhỏ"
          >
            ─
          </button>
          <button
            type="button"
            class="hover:text-white transition-colors cursor-pointer text-xs"
            aria-label="Phóng to"
          >
            □
          </button>
          <button
            type="button"
            class="hover:text-[#f87171] transition-colors cursor-pointer text-sm"
            aria-label="Đóng"
          >
            ✕
          </button>
        </div>
      </div>
    </div>

    <!-- Application Body with Sidebar Rail + Full-Width Timetable -->
    <div class="flex bg-[#0e3b68]">
      <!-- Left Sidebar Navigation Rail -->
      <div
        class="w-12 py-4 flex flex-col items-center justify-between bg-[#072440]/80 border-r border-[#051c33]/70 shrink-0 select-none"
      >
        <div class="flex flex-col items-center gap-3 text-white/60 text-xs">
          <button
            type="button"
            class="w-8 h-8 rounded-lg flex items-center justify-center hover:text-white hover:bg-white/10 transition-colors"
            title="Chương trình đào tạo"
          >
            <i
              class="fa-solid fa-graduation-cap text-sm"
              aria-hidden="true"
            ></i>
          </button>
          <button
            type="button"
            class="w-8 h-8 rounded-lg flex items-center justify-center hover:text-white hover:bg-white/10 transition-colors"
            title="Trang chủ"
          >
            <i class="fa-solid fa-house text-xs" aria-hidden="true"></i>
          </button>
          <button
            type="button"
            class="w-8 h-8 rounded-lg flex items-center justify-center bg-[#00529c] text-white shadow-sm"
            title="Thời khóa biểu (Đang mở)"
          >
            <i class="fa-solid fa-calendar-days text-xs" aria-hidden="true"></i>
          </button>
          <button
            type="button"
            class="w-8 h-8 rounded-lg flex items-center justify-center hover:text-white hover:bg-white/10 transition-colors"
            title="Thông báo học phần"
          >
            <i class="fa-regular fa-envelope text-xs" aria-hidden="true"></i>
          </button>
        </div>

        <div>
          <button
            type="button"
            class="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"
            title="Thoát"
          >
            <i
              class="fa-solid fa-arrow-right-from-bracket text-xs"
              aria-hidden="true"
            ></i>
          </button>
        </div>
      </div>

      <!-- Main Stage: Full-Width Spacious Timetable Canvas -->
      <div
        class="flex-1 p-4 xl:p-6 flex items-center justify-center bg-[#0c3156]/50 min-w-0"
      >
        <div
          class="w-full bg-white rounded-2xl border border-[#e2e8f0] shadow-2xl overflow-hidden flex flex-col"
        >
          <!-- Modal Top Bar -->
          <div
            class="px-5 py-2.5 border-b border-[#f1f5f9] flex items-center justify-between bg-white select-none"
          >
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#00529c]"></span>
              <span class="text-xs font-bold text-[#0f172a] font-display"
                >Hộp thoại sắp xếp thời khóa biểu tự động</span
              >
            </div>
            <button
              type="button"
              class="w-6 h-6 rounded-md flex items-center justify-center text-[#94a3b8] hover:text-[#0f172a] hover:bg-[#f1f5f9] transition-colors text-xs cursor-pointer"
              aria-label="Đóng"
            >
              ✕
            </button>
          </div>

          <!-- Top Interactive Control Bar (Selections Brought to the Top) -->
          <div class="p-4 sm:p-5 bg-white border-b border-[#e2e8f0] space-y-3">
            <!-- Row 1: Criteria Dropdown, Actions & Pagination -->
            <div class="flex flex-wrap items-center justify-between gap-3">
              <!-- Left: Title & Priority Criteria Dropdown -->
              <div class="flex flex-wrap items-center gap-3">
                <h3 class="text-base font-bold text-[#0f172a] font-display">
                  Thời Khóa Biểu
                </h3>

                <!-- Selection Dropdown -->
                <div class="relative">
                  <button
                    type="button"
                    class="px-3.5 py-1.5 rounded-xl border border-[#cbd5e1] bg-[#f8fafc] hover:bg-white hover:border-[#00529c] flex items-center gap-2 text-xs font-semibold text-[#1e293b] transition-all cursor-pointer shadow-2xs"
                    @click="isDropdownOpen = !isDropdownOpen"
                  >
                    <span class="text-[#64748b] font-normal">Tiêu chí:</span>
                    <span class="flex items-center gap-1.5">
                      <span>{{ activeCriteria.icon }}</span>
                      <span class="font-bold text-[#00529c]">{{
                        activeCriteria.label
                      }}</span>
                    </span>
                    <i
                      class="fa-solid fa-chevron-down text-[11px] text-[#94a3b8] ml-1 transition-transform duration-200"
                      :class="{ 'rotate-180': isDropdownOpen }"
                      aria-hidden="true"
                    ></i>
                  </button>

                  <!-- Dropdown Popover -->
                  <div
                    v-if="isDropdownOpen"
                    class="absolute top-full left-0 mt-1.5 z-30 w-64 bg-white border border-[#cbd5e1] rounded-xl shadow-lg overflow-hidden py-1 divide-y divide-[#f1f5f9]"
                  >
                    <button
                      v-for="item in criteriaList"
                      :key="item.id"
                      type="button"
                      class="w-full px-3.5 py-2 text-left text-xs flex items-center justify-between hover:bg-[#f8fafc] transition-colors cursor-pointer"
                      :class="
                        activeCriteria.id === item.id
                          ? 'bg-[#f0f7ff] text-[#00529c] font-bold'
                          : 'text-[#334155]'
                      "
                      @click="selectCriteria(item)"
                    >
                      <span class="flex items-center gap-2">
                        <span>{{ item.icon }}</span>
                        <span>{{ item.label }}</span>
                      </span>
                      <i
                        v-if="activeCriteria.id === item.id"
                        class="fa-solid fa-check text-[11px]"
                        aria-hidden="true"
                      ></i>
                    </button>
                  </div>
                </div>

                <!-- Secondary Rule Tags (Visible without eating space) -->
                <div
                  class="hidden xl:flex items-center gap-2 text-xs text-[#64748b]"
                >
                  <span
                    class="px-2 py-0.5 rounded-md bg-[#f1f5f9] text-[#475569] text-[11px] font-medium border border-[#e2e8f0]"
                  >
                    {{
                      activeCriteria.id === "deadline"
                        ? "5 môn dồn lịch"
                        : "CT112: Môn thay thế"
                    }}
                  </span>
                  <span
                    class="px-2 py-0.5 rounded-md bg-[#f1f5f9] text-[#475569] text-[11px] font-medium border border-[#e2e8f0]"
                  >
                    {{
                      activeCriteria.id === "deadline"
                        ? "Trống trọn vẹn T5, T6, T7"
                        : "CT179: Môn chính"
                    }}
                  </span>
                </div>
              </div>

              <!-- Right: Pagination & Generate Action Button -->
              <div class="flex items-center gap-3">
                <!-- Pagination Control -->
                <div
                  class="flex items-center gap-1.5 text-xs text-[#64748b] bg-[#f8fafc] border border-[#e2e8f0] rounded-lg px-2 py-1"
                >
                  <button
                    type="button"
                    class="w-5 h-5 rounded flex items-center justify-center hover:bg-white hover:text-[#0f172a] disabled:opacity-30 cursor-pointer transition-colors"
                    :disabled="currentPlanIndex <= 1"
                    @click="prevPlan"
                    title="Phương án trước"
                  >
                    <i
                      class="fa-solid fa-chevron-left text-[11px]"
                      aria-hidden="true"
                    ></i>
                  </button>
                  <span class="font-semibold text-[#0f172a] px-1 text-xs"
                    >{{ currentPlanIndex }} / {{ totalPlans }}</span
                  >
                  <button
                    type="button"
                    class="w-5 h-5 rounded flex items-center justify-center hover:bg-white hover:text-[#0f172a] disabled:opacity-30 cursor-pointer transition-colors"
                    :disabled="currentPlanIndex >= totalPlans"
                    @click="nextPlan"
                    title="Phương án tiếp theo"
                  >
                    <i
                      class="fa-solid fa-chevron-right text-[11px]"
                      aria-hidden="true"
                    ></i>
                  </button>
                </div>

                <!-- Button Tạo thời khóa biểu -->
                <button
                  type="button"
                  class="px-4 py-2 rounded-lg bg-[#00529c] text-white text-xs font-bold hover:bg-[#003b7a] transition-all flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-75"
                  :disabled="isGenerating"
                  @click="generateNewSchedule"
                >
                  <i
                    :class="
                      isGenerating
                        ? 'fa-solid fa-spinner fa-spin'
                        : 'fa-solid fa-plus'
                    "
                    class="text-[11px]"
                    aria-hidden="true"
                  ></i>
                  <span>{{
                    isGenerating ? "Đang tính toán..." : "Tạo thời khóa biểu"
                  }}</span>
                </button>
              </div>
            </div>

            <!-- Row 2: Metrics Ribbon -->
            <div
              class="p-2.5 rounded-xl border border-[#cbd5e1] bg-[#f8fafc] flex flex-wrap items-center justify-between gap-3 text-xs"
            >
              <div class="flex items-center gap-2">
                <label
                  class="flex items-center gap-1.5 cursor-pointer font-semibold text-[#0f172a]"
                >
                  <input
                    type="checkbox"
                    v-model="isSelected"
                    class="accent-[#00529c] w-3.5 h-3.5 rounded cursor-pointer"
                  />
                  <span>{{
                    isSelected ? "Đã chọn phương án này" : "Chưa chọn"
                  }}</span>
                </label>
              </div>
              <div
                class="flex flex-wrap items-center gap-3 sm:gap-4 text-[#475569] font-medium"
              >
                <span
                  >Số môn học:
                  <strong class="text-[#0f172a]"
                    >{{ activeSchedule.coursesCount }} môn</strong
                  ></span
                >
                <span>·</span>
                <span
                  >Số tín chỉ:
                  <strong class="text-[#0f172a]">{{
                    activeSchedule.credits
                  }}</strong></span
                >
                <span>·</span>
                <span
                  >Điểm đánh giá:
                  <strong class="text-[#e11d48] font-bold">{{
                    activeSchedule.score
                  }}</strong></span
                >
                <span>·</span>
                <span class="text-[#00529c] font-semibold">{{
                  activeSchedule.summaryText
                }}</span>
              </div>
            </div>
          </div>

          <!-- Full-Width Weekly Timetable Grid with Motion-V Transitions -->
          <div class="p-4 sm:p-5 bg-white">
            <AnimatePresence mode="wait">
              <motion.div
                :key="activeCriteria.id + '-' + currentPlanIndex"
                :initial="{ opacity: 0, y: 8 }"
                :animate="{ opacity: 1, y: 0 }"
                :exit="{ opacity: 0, y: -8 }"
                :transition="{ duration: 0.22, ease: [0.33, 1, 0.68, 1] }"
                class="overflow-x-auto rounded-xl border border-[#e2e8f0] bg-white shadow-2xs"
              >
                <table
                  class="w-full text-left border-collapse text-xs table-fixed min-w-[760px]"
                >
                  <thead>
                    <tr
                      class="border-b border-[#e2e8f0] bg-[#f8fafc] text-[#475569] font-bold text-center"
                    >
                      <th
                        class="p-2.5 border-r border-[#e2e8f0] font-semibold text-[11px] w-[85px] shrink-0"
                      >
                        Thời khóa biểu
                      </th>
                      <th
                        class="p-2.5 border-r border-[#e2e8f0] font-semibold text-[11px] w-[15.2%]"
                      >
                        Thứ 2
                      </th>
                      <th
                        class="p-2.5 border-r border-[#e2e8f0] font-semibold text-[11px] w-[15.2%]"
                      >
                        Thứ 3
                      </th>
                      <th
                        class="p-2.5 border-r border-[#e2e8f0] font-semibold text-[11px] w-[15.2%]"
                      >
                        Thứ 4
                      </th>
                      <th
                        class="p-2.5 border-r border-[#e2e8f0] font-semibold text-[11px] w-[15.2%]"
                      >
                        Thứ 5
                      </th>
                      <th
                        class="p-2.5 border-r border-[#e2e8f0] font-semibold text-[11px] w-[15.2%]"
                      >
                        Thứ 6
                      </th>
                      <th class="p-2.5 font-semibold text-[11px] w-[15.2%]">
                        Thứ 7
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- CA SÁNG: Tiết 1 -->
                    <tr class="border-b border-[#f1f5f9] h-[36px]">
                      <td
                        class="p-1 border-r border-[#e2e8f0] text-center text-[11px] font-semibold text-[#64748b] bg-[#fafafa]"
                      >
                        Tiết 1
                      </td>
                      <td class="border-r border-[#f1f5f9]"></td>
                      <td class="border-r border-[#f1f5f9]"></td>
                      <td class="border-r border-[#f1f5f9]"></td>
                      <td class="border-r border-[#f1f5f9]"></td>
                      <td class="border-r border-[#f1f5f9]"></td>
                      <td></td>
                    </tr>

                    <!-- CA SÁNG: Tiết 2 (Spans Tiết 2 - Tiết 4) -->
                    <tr class="border-b border-[#f1f5f9] h-[36px]">
                      <td
                        class="p-1 border-r border-[#e2e8f0] text-center text-[11px] font-semibold text-[#64748b] bg-[#fafafa]"
                      >
                        Tiết 2
                      </td>

                      <!-- THỨ 2: CT179 Sáng (Chill hoặc Deadline) -->
                      <td
                        v-if="activeSchedule.showMorningCT179"
                        rowspan="3"
                        class="p-1.5 border-r border-[#f1f5f9] align-top bg-[#fdf2f8]/40"
                      >
                        <div
                          class="h-full rounded-xl border border-[#fbcfe8] bg-[#fce7f3]/90 p-3 text-left space-y-1.5 shadow-2xs flex flex-col justify-between hover:shadow-xs transition-shadow"
                        >
                          <div class="space-y-1">
                            <span
                              class="inline-block px-2.5 py-0.5 rounded-full bg-[#0f172a] text-white font-extrabold text-[11px] tracking-wide"
                            >
                              CT179 • 3 TC
                            </span>
                            <div
                              class="text-[11px] text-[#64748b] font-medium leading-tight pt-0.5"
                            >
                              Nhóm H01 - P.203HA5
                            </div>
                            <div
                              class="text-xs sm:text-sm font-bold text-[#0f172a] leading-tight font-display"
                            >
                              Quản trị hệ thống
                            </div>
                            <div
                              class="text-[11px] text-[#475569] flex items-center gap-1.5 leading-tight pt-0.5"
                            >
                              <i
                                class="fa-regular fa-user text-[11px] text-[#64748b]"
                                aria-hidden="true"
                              ></i>
                              <span>ThS. Lê Huỳnh Quốc Bảo</span>
                            </div>
                          </div>
                          <!-- Sĩ số Bar -->
                          <div class="pt-2 space-y-1 border-t border-black/5">
                            <div
                              class="flex items-center justify-between text-[11px] text-[#475569]"
                            >
                              <span>Sĩ số</span>
                              <span class="font-bold text-[#0f172a]"
                                >15/40</span
                              >
                            </div>
                            <div
                              class="h-1.5 rounded-full bg-[#e2e8f0] overflow-hidden"
                            >
                              <div
                                class="h-full rounded-full bg-[#0f172a] w-[37.5%]"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td v-else class="border-r border-[#f1f5f9]"></td>

                      <!-- THỨ 3: CT179 Sáng (Chill hoặc Deadline) -->
                      <td
                        v-if="activeSchedule.showMorningCT179"
                        rowspan="3"
                        class="p-1.5 border-r border-[#f1f5f9] align-top bg-[#fdf2f8]/40"
                      >
                        <div
                          class="h-full rounded-xl border border-[#fbcfe8] bg-[#fce7f3]/90 p-3 text-left space-y-1.5 shadow-2xs flex flex-col justify-between hover:shadow-xs transition-shadow"
                        >
                          <div class="space-y-1">
                            <span
                              class="inline-block px-2.5 py-0.5 rounded-full bg-[#0f172a] text-white font-extrabold text-[11px] tracking-wide"
                            >
                              CT179 • 3 TC
                            </span>
                            <div
                              class="text-[11px] text-[#64748b] font-medium leading-tight pt-0.5"
                            >
                              Nhóm H01 - P.203HA5
                            </div>
                            <div
                              class="text-xs sm:text-sm font-bold text-[#0f172a] leading-tight font-display"
                            >
                              Quản trị hệ thống
                            </div>
                            <div
                              class="text-[11px] text-[#475569] flex items-center gap-1.5 leading-tight pt-0.5"
                            >
                              <i
                                class="fa-regular fa-user text-[11px] text-[#64748b]"
                                aria-hidden="true"
                              ></i>
                              <span>ThS. Lê Huỳnh Quốc Bảo</span>
                            </div>
                          </div>
                          <!-- Sĩ số Bar -->
                          <div class="pt-2 space-y-1 border-t border-black/5">
                            <div
                              class="flex items-center justify-between text-[11px] text-[#475569]"
                            >
                              <span>Sĩ số</span>
                              <span class="font-bold text-[#0f172a]"
                                >15/40</span
                              >
                            </div>
                            <div
                              class="h-1.5 rounded-full bg-[#e2e8f0] overflow-hidden"
                            >
                              <div
                                class="h-full rounded-full bg-[#0f172a] w-[37.5%]"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td v-else class="border-r border-[#f1f5f9]"></td>

                      <!-- THỨ 4: CT176 Sáng nếu Deadline -->
                      <td
                        v-if="activeSchedule.showWednesdayMorningCT176"
                        rowspan="3"
                        class="p-1.5 border-r border-[#f1f5f9] align-top bg-[#ecfdf5]/40"
                      >
                        <div
                          class="h-full rounded-xl border border-[#a7f3d0] bg-[#ecfdf5]/90 p-3 text-left space-y-1.5 shadow-2xs flex flex-col justify-between hover:shadow-xs transition-shadow"
                        >
                          <div class="space-y-1">
                            <span
                              class="inline-block px-2.5 py-0.5 rounded-full bg-[#065f46] text-white font-extrabold text-[11px] tracking-wide"
                            >
                              CT176 • 3 TC
                            </span>
                            <div
                              class="text-[11px] text-[#047857] font-medium leading-tight pt-0.5"
                            >
                              Nhóm 01 - P.002/DI
                            </div>
                            <div
                              class="text-xs sm:text-sm font-bold text-[#064e3b] leading-tight font-display"
                            >
                              Lập trình hướng đối tượng
                            </div>
                            <div
                              class="text-[11px] text-[#065f46] flex items-center gap-1.5 leading-tight pt-0.5"
                            >
                              <i
                                class="fa-regular fa-user text-[11px] text-[#047857]"
                                aria-hidden="true"
                              ></i>
                              <span>ThS. Phạm Minh Đương</span>
                            </div>
                          </div>
                          <!-- Sĩ số Bar -->
                          <div class="pt-2 space-y-1 border-t border-[#a7f3d0]/60">
                            <div
                              class="flex items-center justify-between text-[11px] text-[#065f46]"
                            >
                              <span>Sĩ số</span>
                              <span class="font-bold text-[#064e3b]"
                                >32/40</span
                              >
                            </div>
                            <div
                              class="h-1.5 rounded-full bg-[#a7f3d0] overflow-hidden"
                            >
                              <div
                                class="h-full rounded-full bg-[#059669] w-[80%]"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td v-else class="border-r border-[#f1f5f9]"></td>

                      <td class="border-r border-[#f1f5f9]"></td>
                      <td class="border-r border-[#f1f5f9]"></td>
                      <td></td>
                    </tr>

                    <!-- Tiết 3 -->
                    <tr class="border-b border-[#f1f5f9] h-[36px]">
                      <td
                        class="p-1 border-r border-[#e2e8f0] text-center text-[11px] font-semibold text-[#64748b] bg-[#fafafa]"
                      >
                        Tiết 3
                      </td>
                      <td
                        v-if="!activeSchedule.showMorningCT179"
                        class="border-r border-[#f1f5f9]"
                      ></td>
                      <td
                        v-if="!activeSchedule.showMorningCT179"
                        class="border-r border-[#f1f5f9]"
                      ></td>
                      <td
                        v-if="!activeSchedule.showWednesdayMorningCT176"
                        class="border-r border-[#f1f5f9]"
                      ></td>
                      <td class="border-r border-[#f1f5f9]"></td>
                      <td class="border-r border-[#f1f5f9]"></td>
                      <td></td>
                    </tr>

                    <!-- Tiết 4 -->
                    <tr class="border-b border-[#f1f5f9] h-[36px]">
                      <td
                        class="p-1 border-r border-[#e2e8f0] text-center text-[11px] font-semibold text-[#64748b] bg-[#fafafa]"
                      >
                        Tiết 4
                      </td>
                      <td
                        v-if="!activeSchedule.showMorningCT179"
                        class="border-r border-[#f1f5f9]"
                      ></td>
                      <td
                        v-if="!activeSchedule.showMorningCT179"
                        class="border-r border-[#f1f5f9]"
                      ></td>
                      <td
                        v-if="!activeSchedule.showWednesdayMorningCT176"
                        class="border-r border-[#f1f5f9]"
                      ></td>
                      <td class="border-r border-[#f1f5f9]"></td>
                      <td class="border-r border-[#f1f5f9]"></td>
                      <td></td>
                    </tr>

                    <!-- Tiết 5 -->
                    <tr class="border-b border-[#e2e8f0] h-[36px]">
                      <td
                        class="p-1 border-r border-[#e2e8f0] text-center text-[11px] font-semibold text-[#64748b] bg-[#fafafa]"
                      >
                        Tiết 5
                      </td>
                      <td class="border-r border-[#f1f5f9]"></td>
                      <td class="border-r border-[#f1f5f9]"></td>
                      <td class="border-r border-[#f1f5f9]"></td>
                      <td class="border-r border-[#f1f5f9]"></td>
                      <td class="border-r border-[#f1f5f9]"></td>
                      <td></td>
                    </tr>

                    <!-- DẢI PHÂN CÁCH TRƯA (Sáng / Chiều) -->
                    <tr class="h-2.5 bg-[#f1f5f9]/80 border-b border-[#e2e8f0]">
                      <td colspan="7" class="p-0"></td>
                    </tr>

                    <!-- CA CHIỀU: Tiết 6 -->
                    <tr class="border-b border-[#f1f5f9] h-[36px]">
                      <td
                        class="p-1 border-r border-[#e2e8f0] text-center text-[11px] font-semibold text-[#64748b] bg-[#fafafa]"
                      >
                        Tiết 6
                      </td>

                      <!-- THỨ 2 CHIỀU: CT103 nếu Deadline / CT179 nếu Né Ca Sáng -->
                      <!-- Deadline: CT103 Cấu trúc dữ liệu (Rowspan 4: Tiết 6 - Tiết 9) -->
                      <td
                        v-if="activeSchedule.showMondayAfternoonCT103"
                        rowspan="4"
                        class="p-1.5 border-r border-[#f1f5f9] align-top bg-[#f3e8ff]/40"
                      >
                        <div
                          class="h-full rounded-xl border border-[#d8b4fe] bg-[#f3e8ff]/90 p-3 text-left space-y-1.5 shadow-2xs flex flex-col justify-between hover:shadow-xs transition-shadow"
                        >
                          <div class="space-y-1">
                            <span
                              class="inline-block px-2.5 py-0.5 rounded-full bg-[#581c87] text-white font-extrabold text-[11px] tracking-wide"
                            >
                              CT103 • 4 TC
                            </span>
                            <div
                              class="text-[11px] text-[#6b21a8] font-medium leading-tight pt-0.5"
                            >
                              Nhóm 02 - P.101/DI
                            </div>
                            <div
                              class="text-xs sm:text-sm font-bold text-[#3b0764] leading-tight font-display"
                            >
                              Cấu trúc dữ liệu
                            </div>
                            <div
                              class="text-[11px] text-[#581c87] flex items-center gap-1.5 leading-tight pt-0.5"
                            >
                              <i
                                class="fa-regular fa-user text-[11px] text-[#7e22ce]"
                                aria-hidden="true"
                              ></i>
                              <span>TS. Trần Cao Đệ</span>
                            </div>
                          </div>
                          <div class="pt-2 space-y-1 border-t border-[#d8b4fe]/60">
                            <div
                              class="flex items-center justify-between text-[11px] text-[#581c87]"
                            >
                              <span>Sĩ số</span>
                              <span class="font-bold text-[#3b0764]"
                                >38/40</span
                              >
                            </div>
                            <div
                              class="h-1.5 rounded-full bg-[#d8b4fe] overflow-hidden"
                            >
                              <div
                                class="h-full rounded-full bg-[#7e22ce] w-[95%]"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>

                      <!-- Night Owl: CT179 Quản trị hệ thống (Rowspan 3: Tiết 6 - Tiết 8) -->
                      <td
                        v-else-if="activeSchedule.showAfternoonCT179"
                        rowspan="3"
                        class="p-1.5 border-r border-[#f1f5f9] align-top bg-[#fdf2f8]/40"
                      >
                        <div
                          class="h-full rounded-xl border border-[#fbcfe8] bg-[#fce7f3]/90 p-3 text-left space-y-1.5 shadow-2xs flex flex-col justify-between hover:shadow-xs transition-shadow"
                        >
                          <div class="space-y-1">
                            <span
                              class="inline-block px-2.5 py-0.5 rounded-full bg-[#0f172a] text-white font-extrabold text-[11px] tracking-wide"
                            >
                              CT179 • 3 TC
                            </span>
                            <div
                              class="text-[11px] text-[#64748b] font-medium leading-tight pt-0.5"
                            >
                              Nhóm H01 - P.203HA5
                            </div>
                            <div
                              class="text-xs sm:text-sm font-bold text-[#0f172a] leading-tight font-display"
                            >
                              Quản trị hệ thống
                            </div>
                            <div
                              class="text-[11px] text-[#475569] flex items-center gap-1.5 leading-tight pt-0.5"
                            >
                              <i
                                class="fa-regular fa-user text-[11px] text-[#64748b]"
                                aria-hidden="true"
                              ></i>
                              <span>ThS. Lê Huỳnh Quốc Bảo</span>
                            </div>
                          </div>
                          <div class="pt-2 space-y-1 border-t border-black/5">
                            <div
                              class="flex items-center justify-between text-[11px] text-[#475569]"
                            >
                              <span>Sĩ số</span>
                              <span class="font-bold text-[#0f172a]"
                                >15/40</span
                              >
                            </div>
                            <div
                              class="h-1.5 rounded-full bg-[#e2e8f0] overflow-hidden"
                            >
                              <div
                                class="h-full rounded-full bg-[#0f172a] w-[37.5%]"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td v-else class="border-r border-[#f1f5f9]"></td>

                      <!-- THỨ 3 CHIỀU: ML016 nếu Deadline / CT179 nếu Né Ca Sáng -->
                      <!-- Deadline: ML016 Kinh tế chính trị Mác - Lênin (Rowspan 3: Tiết 6 - Tiết 8) -->
                      <td
                        v-if="activeSchedule.showTuesdayAfternoonML016"
                        rowspan="3"
                        class="p-1.5 border-r border-[#f1f5f9] align-top bg-[#fef3c7]/40"
                      >
                        <div
                          class="h-full rounded-xl border border-[#fde68a] bg-[#fef3c7]/90 p-3 text-left space-y-1.5 shadow-2xs flex flex-col justify-between hover:shadow-xs transition-shadow"
                        >
                          <div class="space-y-1">
                            <span
                              class="inline-block px-2.5 py-0.5 rounded-full bg-[#78350f] text-white font-extrabold text-[11px] tracking-wide"
                            >
                              ML016 • 2 TC
                            </span>
                            <div
                              class="text-[11px] text-[#92400e] font-medium leading-tight pt-0.5"
                            >
                              Nhóm 05 - P.201/C1
                            </div>
                            <div
                              class="text-xs sm:text-sm font-bold text-[#451a03] leading-tight font-display"
                            >
                              Kinh tế chính trị M-L
                            </div>
                            <div
                              class="text-[11px] text-[#78350f] flex items-center gap-1.5 leading-tight pt-0.5"
                            >
                              <i
                                class="fa-regular fa-user text-[11px] text-[#b45309]"
                                aria-hidden="true"
                              ></i>
                              <span>TS. Trần Thị Bích</span>
                            </div>
                          </div>
                          <div class="pt-2 space-y-1 border-t border-[#fde68a]/60">
                            <div
                              class="flex items-center justify-between text-[11px] text-[#78350f]"
                            >
                              <span>Sĩ số</span>
                              <span class="font-bold text-[#451a03]"
                                >58/60</span
                              >
                            </div>
                            <div
                              class="h-1.5 rounded-full bg-[#fde68a] overflow-hidden"
                            >
                              <div
                                class="h-full rounded-full bg-[#b45309] w-[96.6%]"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>

                      <!-- Night Owl: CT179 Quản trị hệ thống (Rowspan 3) -->
                      <td
                        v-else-if="activeSchedule.showAfternoonCT179"
                        rowspan="3"
                        class="p-1.5 border-r border-[#f1f5f9] align-top bg-[#fdf2f8]/40"
                      >
                        <div
                          class="h-full rounded-xl border border-[#fbcfe8] bg-[#fce7f3]/90 p-3 text-left space-y-1.5 shadow-2xs flex flex-col justify-between hover:shadow-xs transition-shadow"
                        >
                          <div class="space-y-1">
                            <span
                              class="inline-block px-2.5 py-0.5 rounded-full bg-[#0f172a] text-white font-extrabold text-[11px] tracking-wide"
                            >
                              CT179 • 3 TC
                            </span>
                            <div
                              class="text-[11px] text-[#64748b] font-medium leading-tight pt-0.5"
                            >
                              Nhóm H01 - P.203HA5
                            </div>
                            <div
                              class="text-xs sm:text-sm font-bold text-[#0f172a] leading-tight font-display"
                            >
                              Quản trị hệ thống
                            </div>
                            <div
                              class="text-[11px] text-[#475569] flex items-center gap-1.5 leading-tight pt-0.5"
                            >
                              <i
                                class="fa-regular fa-user text-[11px] text-[#64748b]"
                                aria-hidden="true"
                              ></i>
                              <span>ThS. Lê Huỳnh Quốc Bảo</span>
                            </div>
                          </div>
                          <div class="pt-2 space-y-1 border-t border-black/5">
                            <div
                              class="flex items-center justify-between text-[11px] text-[#475569]"
                            >
                              <span>Sĩ số</span>
                              <span class="font-bold text-[#0f172a]"
                                >15/40</span
                              >
                            </div>
                            <div
                              class="h-1.5 rounded-full bg-[#e2e8f0] overflow-hidden"
                            >
                              <div
                                class="h-full rounded-full bg-[#0f172a] w-[37.5%]"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td v-else class="border-r border-[#f1f5f9]"></td>

                      <!-- THỨ 4 CHIỀU: CT112 nếu Deadline (Rowspan 4: Tiết 6 - Tiết 9) -->
                      <td
                        v-if="activeSchedule.showWednesdayAfternoonCT112"
                        rowspan="4"
                        class="p-1.5 border-r border-[#f1f5f9] align-top bg-[#f0f9ff]/50"
                      >
                        <div
                          class="h-full rounded-xl border border-[#bae6fd] bg-[#e0f2fe] p-3 text-left space-y-1.5 shadow-2xs flex flex-col justify-between hover:shadow-xs transition-shadow"
                        >
                          <div class="space-y-1">
                            <span
                              class="inline-block px-2.5 py-0.5 rounded-full bg-[#0f172a] text-white font-extrabold text-[11px] tracking-wide"
                            >
                              CT112 • 3 TC
                            </span>
                            <div
                              class="text-[11px] text-[#64748b] font-medium leading-tight pt-0.5"
                            >
                              Nhóm 01 - P.011/K3
                            </div>
                            <div
                              class="text-xs sm:text-sm font-bold text-[#0f172a] leading-tight font-display"
                            >
                              Mạng máy tính
                            </div>
                            <div
                              class="text-[11px] text-[#475569] flex items-center gap-1.5 leading-tight pt-0.5"
                            >
                              <i
                                class="fa-regular fa-user text-[11px] text-[#64748b]"
                                aria-hidden="true"
                              ></i>
                              <span>TS. Nguyễn Hữu Văn Long</span>
                            </div>
                          </div>
                          <div class="pt-2 space-y-1 border-t border-black/5">
                            <div
                              class="flex items-center justify-between text-[11px] text-[#475569]"
                            >
                              <span>Sĩ số</span>
                              <span class="font-bold text-[#0f172a]">3/40</span>
                            </div>
                            <div
                              class="h-1.5 rounded-full bg-[#cbd5e1] overflow-hidden"
                            >
                              <div
                                class="h-full rounded-full bg-[#0f172a] w-[7.5%]"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td v-else class="border-r border-[#f1f5f9]"></td>

                      <td class="border-r border-[#f1f5f9]"></td>

                      <!-- THỨ 6 CHIỀU: CT112 (Chill hoặc Cú đêm, Rowspan 4) -->
                      <td
                        v-if="activeSchedule.showFridayCT112"
                        rowspan="4"
                        class="p-1.5 border-r border-[#f1f5f9] align-top bg-[#f0f9ff]/50"
                      >
                        <div
                          class="h-full rounded-xl border border-[#bae6fd] bg-[#e0f2fe] p-3 text-left space-y-1.5 shadow-2xs flex flex-col justify-between hover:shadow-xs transition-shadow"
                        >
                          <div class="space-y-1">
                            <span
                              class="inline-block px-2.5 py-0.5 rounded-full bg-[#0f172a] text-white font-extrabold text-[11px] tracking-wide"
                            >
                              CT112 • 3 TC
                            </span>
                            <div
                              class="text-[11px] text-[#64748b] font-medium leading-tight pt-0.5"
                            >
                              Nhóm 01 - P.011/K3
                            </div>
                            <div
                              class="text-xs sm:text-sm font-bold text-[#0f172a] leading-tight font-display"
                            >
                              Mạng máy tính
                            </div>
                            <div
                              class="text-[11px] text-[#475569] flex items-center gap-1.5 leading-tight pt-0.5"
                            >
                              <i
                                class="fa-regular fa-user text-[11px] text-[#64748b]"
                                aria-hidden="true"
                              ></i>
                              <span>TS. Nguyễn Hữu Văn Long</span>
                            </div>
                          </div>
                          <div class="pt-2 space-y-1 border-t border-black/5">
                            <div
                              class="flex items-center justify-between text-[11px] text-[#475569]"
                            >
                              <span>Sĩ số</span>
                              <span class="font-bold text-[#0f172a]">3/40</span>
                            </div>
                            <div
                              class="h-1.5 rounded-full bg-[#cbd5e1] overflow-hidden"
                            >
                              <div
                                class="h-full rounded-full bg-[#0f172a] w-[7.5%]"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td v-else class="border-r border-[#f1f5f9]"></td>

                      <td></td>
                    </tr>

                    <!-- Tiết 7 -->
                    <tr class="border-b border-[#f1f5f9] h-[36px]">
                      <td
                        class="p-1 border-r border-[#e2e8f0] text-center text-[11px] font-semibold text-[#64748b] bg-[#fafafa]"
                      >
                        Tiết 7
                      </td>
                      <!-- Thứ 2: Chỉ hiển thị td trống nếu Chill (không có CT103 cũng không có CT179 chiều) -->
                      <td
                        v-if="
                          !activeSchedule.showMondayAfternoonCT103 &&
                          !activeSchedule.showAfternoonCT179
                        "
                        class="border-r border-[#f1f5f9]"
                      ></td>

                      <!-- Thứ 3: Chỉ hiển thị td trống nếu Chill -->
                      <td
                        v-if="
                          !activeSchedule.showTuesdayAfternoonML016 &&
                          !activeSchedule.showAfternoonCT179
                        "
                        class="border-r border-[#f1f5f9]"
                      ></td>

                      <!-- Thứ 4: Chỉ hiển thị td trống nếu không có CT112 chiều Thứ 4 -->
                      <td
                        v-if="!activeSchedule.showWednesdayAfternoonCT112"
                        class="border-r border-[#f1f5f9]"
                      ></td>

                      <td class="border-r border-[#f1f5f9]"></td>

                      <!-- Thứ 6: Chỉ hiển thị td trống nếu không có CT112 Thứ 6 -->
                      <td
                        v-if="!activeSchedule.showFridayCT112"
                        class="border-r border-[#f1f5f9]"
                      ></td>
                      <td></td>
                    </tr>

                    <!-- Tiết 8 -->
                    <tr class="border-b border-[#f1f5f9] h-[36px]">
                      <td
                        class="p-1 border-r border-[#e2e8f0] text-center text-[11px] font-semibold text-[#64748b] bg-[#fafafa]"
                      >
                        Tiết 8
                      </td>
                      <!-- Thứ 2: Chỉ hiển thị td trống nếu Chill -->
                      <td
                        v-if="
                          !activeSchedule.showMondayAfternoonCT103 &&
                          !activeSchedule.showAfternoonCT179
                        "
                        class="border-r border-[#f1f5f9]"
                      ></td>

                      <!-- Thứ 3: Chỉ hiển thị td trống nếu Chill -->
                      <td
                        v-if="
                          !activeSchedule.showTuesdayAfternoonML016 &&
                          !activeSchedule.showAfternoonCT179
                        "
                        class="border-r border-[#f1f5f9]"
                      ></td>

                      <!-- Thứ 4: Chỉ hiển thị td trống nếu không có CT112 chiều Thứ 4 -->
                      <td
                        v-if="!activeSchedule.showWednesdayAfternoonCT112"
                        class="border-r border-[#f1f5f9]"
                      ></td>

                      <td class="border-r border-[#f1f5f9]"></td>

                      <!-- Thứ 6: Chỉ hiển thị td trống nếu không có CT112 Thứ 6 -->
                      <td
                        v-if="!activeSchedule.showFridayCT112"
                        class="border-r border-[#f1f5f9]"
                      ></td>
                      <td></td>
                    </tr>

                    <!-- Tiết 9 -->
                    <tr class="h-[36px]">
                      <td
                        class="p-1 border-r border-[#e2e8f0] text-center text-[11px] font-semibold text-[#64748b] bg-[#fafafa]"
                      >
                        Tiết 9
                      </td>
                      <!-- Thứ 2: Nếu là Deadline (CT103 chiếm 4 tiết), span bao trùm tiết 9. Ngược lại có td trống -->
                      <td
                        v-if="!activeSchedule.showMondayAfternoonCT103"
                        class="border-r border-[#f1f5f9]"
                      ></td>

                      <!-- Thứ 3: Luôn có td trống vì ML016 hoặc CT179 chỉ học đến tiết 8 -->
                      <td class="border-r border-[#f1f5f9]"></td>

                      <!-- Thứ 4: Nếu là Deadline (CT112 chiếm 4 tiết), span bao trùm tiết 9. Ngược lại có td trống -->
                      <td
                        v-if="!activeSchedule.showWednesdayAfternoonCT112"
                        class="border-r border-[#f1f5f9]"
                      ></td>

                      <td class="border-r border-[#f1f5f9]"></td>

                      <!-- Thứ 6: Nếu có CT112 (chiếm 4 tiết), span bao trùm tiết 9. Nếu Deadline thì có td trống -->
                      <td
                        v-if="!activeSchedule.showFridayCT112"
                        class="border-r border-[#f1f5f9]"
                      ></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </motion.div>
            </AnimatePresence>

            <!-- Bottom Navigation Bar -->
            <div
              class="pt-4 border-t border-[#f1f5f9] flex items-center justify-between gap-3 text-xs"
            >
              <div class="flex items-center gap-2 text-[#64748b]">
                <span class="w-2 h-2 rounded-full bg-[#00c07a]"></span>
                <span class="hidden sm:inline"
                  >Thuật toán di truyền đã duyệt 1,420 phương án khả thi</span
                >
                <span class="sm:hidden">1,420 phương án</span>
              </div>

              <!-- Action Buttons -->
              <div class="flex items-center gap-2.5">
                <button
                  type="button"
                  class="px-4 py-1.5 rounded-lg border border-[#cbd5e1] bg-white text-[#475569] font-semibold hover:bg-[#f8fafc] transition-colors cursor-pointer"
                  @click="resetPlan"
                >
                  Quay lại
                </button>
                <button
                  type="button"
                  class="px-5 py-1.5 rounded-lg bg-[#00529c] text-white font-bold hover:bg-[#003b7a] transition-all cursor-pointer shadow-xs"
                  @click="handleComplete"
                >
                  <span v-if="isCompleted">✓ Đã lưu TKB</span>
                  <span v-else>Hoàn thành</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { motion, AnimatePresence } from "motion-v";

const isDropdownOpen = ref(false);
const isGenerating = ref(false);
const isSelected = ref(true);
const isCompleted = ref(false);

const currentPlanIndex = ref(1);
const totalPlans = ref(9);

const criteriaList = [
  {
    id: "chill-balance",
    label: "Chill và cân bằng",
    icon: "☕",
    score: "0.96",
    coursesCount: 2,
    credits: "6 TC",
    summaryText: "Rải đều các buổi, tối ưu thời gian nghỉ ngơi",
    showMorningCT179: true,
    showWednesdayMorningCT176: false,
    showMondayAfternoonCT103: false,
    showTuesdayAfternoonML016: false,
    showAfternoonCT179: false,
    showWednesdayAfternoonCT112: false,
    showFridayCT112: true,
  },
  {
    id: "night-owl",
    label: "Cú đêm lười biếng",
    icon: "🦉",
    score: "0.89",
    coursesCount: 2,
    credits: "6 TC",
    summaryText: "Né sạch ca sáng, 100% môn dời sang ca chiều",
    showMorningCT179: false,
    showWednesdayMorningCT176: false,
    showMondayAfternoonCT103: false,
    showTuesdayAfternoonML016: false,
    showAfternoonCT179: true,
    showWednesdayAfternoonCT112: false,
    showFridayCT112: true,
  },
  {
    id: "deadline",
    label: "Chiến thần deadline",
    icon: "🚀",
    score: "0.74",
    coursesCount: 5,
    credits: "15 TC",
    summaryText: "Dồn lịch cực đại T2-T4 (15 TC), trống 100% T5-T7",
    showMorningCT179: true,
    showWednesdayMorningCT176: true,
    showMondayAfternoonCT103: true,
    showTuesdayAfternoonML016: true,
    showAfternoonCT179: false,
    showWednesdayAfternoonCT112: true,
    showFridayCT112: false,
  },
];

const activeCriteria = ref(criteriaList[0]);

const activeSchedule = computed(() => {
  return activeCriteria.value;
});

function selectCriteria(item) {
  activeCriteria.value = item;
  isDropdownOpen.value = false;
}

function generateNewSchedule() {
  isGenerating.value = true;
  setTimeout(() => {
    isGenerating.value = false;
    if (currentPlanIndex.value < totalPlans.value) {
      currentPlanIndex.value += 1;
    } else {
      currentPlanIndex.value = 1;
    }
  }, 350);
}

function nextPlan() {
  if (currentPlanIndex.value < totalPlans.value) {
    currentPlanIndex.value += 1;
  }
}

function prevPlan() {
  if (currentPlanIndex.value > 1) {
    currentPlanIndex.value -= 1;
  }
}

function resetPlan() {
  currentPlanIndex.value = 1;
  activeCriteria.value = criteriaList[0];
}

function handleComplete() {
  isCompleted.value = true;
  setTimeout(() => {
    isCompleted.value = false;
  }, 2500);
}
</script>
