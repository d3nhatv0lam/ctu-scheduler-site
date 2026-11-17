<template>
  <div class="w-full">
    <!-- ============================================================== -->
    <!-- DESKTOP VIEW: FULL NATIVE APP CHROME + 2-COLUMN MODAL          -->
    <!-- (Visible on Large Screens lg:block, Hidden on Mobile)          -->
    <!-- ============================================================== -->
    <div class="hidden lg:block rounded-2xl border border-[#cbd5e1] bg-[#0a3156] shadow-float overflow-hidden">
      <!-- Native Window Header / Titlebar -->
      <div class="h-10 bg-[#072440] border-b border-[#051c33] px-4 flex items-center justify-between select-none">
        <div class="flex items-center gap-3">
          <!-- CTU Crest Badge -->
          <div class="flex items-center gap-2">
            <div class="w-5 h-5 rounded-md bg-[#00529c] flex items-center justify-center text-white text-[11px] font-bold shadow-xs">
              <i class="fa-solid fa-graduation-cap text-[11px]" aria-hidden="true"></i>
            </div>
            <span class="text-xs font-semibold text-white/90 font-display">Đại học Cần Thơ</span>
          </div>

          <span class="text-white/30 text-xs">|</span>

          <!-- Active View Tab -->
          <div class="flex items-center gap-1.5 text-xs font-bold text-white tracking-wide">
            <span class="px-2.5 py-1 rounded-md bg-white/10 text-white border border-white/15">
              Học phần
            </span>
          </div>
        </div>

        <!-- Window Controls (Minimize, Maximize, Close) -->
        <div class="flex items-center gap-3 text-xs text-white/70">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00c07a]/20 text-[#6ee7b7] text-[11px] font-semibold border border-[#00c07a]/30">
            <span class="w-1.5 h-1.5 rounded-full bg-[#6ee7b7] animate-pulse"></span>
            Đồng bộ MyCTU thời gian thực
          </span>
          <div class="flex items-center gap-3 ml-2 text-white/60">
            <button type="button" class="hover:text-white transition-colors cursor-pointer text-sm" aria-label="Thu nhỏ">─</button>
            <button type="button" class="hover:text-white transition-colors cursor-pointer text-xs" aria-label="Phóng to">□</button>
            <button type="button" class="hover:text-[#f87171] transition-colors cursor-pointer text-sm" aria-label="Đóng">✕</button>
          </div>
        </div>
      </div>

      <!-- Application Body with Sidebar Rail + Modal Area -->
      <div class="flex bg-[#0e3b68]">
        <!-- Left Sidebar Navigation Rail -->
        <div class="w-12 py-4 flex flex-col items-center justify-between bg-[#072440]/80 border-r border-[#051c33]/70 shrink-0 select-none">
          <div class="flex flex-col items-center gap-3 text-white/60 text-xs">
            <button type="button" class="w-8 h-8 rounded-lg flex items-center justify-center hover:text-white hover:bg-white/10 transition-colors" title="Chương trình đào tạo">
              <i class="fa-solid fa-graduation-cap text-sm" aria-hidden="true"></i>
            </button>
            <button type="button" class="w-8 h-8 rounded-lg flex items-center justify-center hover:text-white hover:bg-white/10 transition-colors" title="Trang chủ">
              <i class="fa-solid fa-house text-xs" aria-hidden="true"></i>
            </button>
            <button type="button" class="w-8 h-8 rounded-lg flex items-center justify-center bg-[#00529c] text-white shadow-sm" title="Thời khóa biểu (Đang mở)">
              <i class="fa-solid fa-calendar-days text-xs" aria-hidden="true"></i>
            </button>
            <button type="button" class="w-8 h-8 rounded-lg flex items-center justify-center hover:text-white hover:bg-white/10 transition-colors" title="Thông báo học phần">
              <i class="fa-regular fa-envelope text-xs" aria-hidden="true"></i>
            </button>
          </div>

          <div>
            <button type="button" class="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors" title="Thoát">
              <i class="fa-solid fa-arrow-right-from-bracket text-xs" aria-hidden="true"></i>
            </button>
          </div>
        </div>

        <!-- Main Stage: Centered Timetable Generation Modal -->
        <div class="flex-1 p-4 xl:p-6 flex items-center justify-center bg-[#0c3156]/50">
          <div class="w-full bg-white rounded-2xl border border-[#e2e8f0] shadow-2xl overflow-hidden text-left flex flex-col">
            <!-- Modal Top Bar -->
            <div class="px-4 py-2 border-b border-[#f1f5f9] flex items-center justify-between bg-white select-none">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-[#00529c]"></span>
                <span class="text-xs font-bold text-[#0f172a] font-display">Hộp thoại sắp xếp thời khóa biểu tự động</span>
              </div>
              <button
                type="button"
                class="w-6 h-6 rounded-md flex items-center justify-center text-[#94a3b8] hover:text-[#0f172a] hover:bg-[#f1f5f9] transition-colors text-xs"
                aria-label="Đóng"
              >
                ✕
              </button>
            </div>

            <!-- Modal 2-Column Content Layout (Left Column Fixed Width, Right Column Takes All Space) -->
            <div class="flex flex-row divide-x divide-[#e2e8f0]">
              <!-- ============================================== -->
              <!-- LEFT COLUMN: SẮP XẾP THỜI KHÓA BIỂU (w-[330px]) -->
              <!-- ============================================== -->
              <div class="w-[310px] xl:w-[330px] p-4 xl:p-5 space-y-4 bg-white shrink-0">
                <div>
                  <h3 class="text-base font-bold text-[#0f172a] font-display">
                    Sắp xếp thời khóa biểu
                  </h3>
                </div>

                <!-- Priority Criteria Dropdown Selector -->
                <div class="space-y-1.5 relative">
                  <label class="text-xs font-semibold text-[#64748b] block">
                    Tiêu chí ưu tiên
                  </label>
                  <button
                    type="button"
                    class="w-full p-2.5 rounded-xl border border-[#cbd5e1] bg-white flex items-center justify-between text-xs font-semibold text-[#1e293b] hover:border-[#00529c] focus:outline-none focus:ring-2 focus:ring-[#00529c]/20 transition-all cursor-pointer shadow-2xs"
                    @click="isDropdownOpen = !isDropdownOpen"
                  >
                    <span class="flex items-center gap-2 truncate">
                      <span>{{ activeCriteria.icon }}</span>
                      <span>{{ activeCriteria.label }}</span>
                    </span>
                    <i
                      class="fa-solid fa-chevron-down text-xs text-[#94a3b8] transition-transform duration-200"
                      :class="{ 'rotate-180': isDropdownOpen }"
                      aria-hidden="true"
                    ></i>
                  </button>

                  <!-- Dropdown Menu -->
                  <div
                    v-if="isDropdownOpen"
                    class="absolute top-full left-0 right-0 mt-1 z-30 bg-white border border-[#cbd5e1] rounded-xl shadow-lg overflow-hidden py-1 divide-y divide-[#f1f5f9]"
                  >
                    <button
                      v-for="item in criteriaList"
                      :key="item.id"
                      type="button"
                      class="w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-[#f8fafc] transition-colors cursor-pointer"
                      :class="activeCriteria.id === item.id ? 'bg-[#f0f7ff] text-[#00529c] font-bold' : 'text-[#334155]'"
                      @click="selectCriteria(item)"
                    >
                      <span class="flex items-center gap-2">
                        <span>{{ item.icon }}</span>
                        <span>{{ item.label }}</span>
                      </span>
                      <i v-if="activeCriteria.id === item.id" class="fa-solid fa-check text-[11px]" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>

                <!-- 3 Course Cards -->
                <div class="space-y-2.5">
                  <!-- Course 1: CT112 -->
                  <div class="p-3 rounded-xl border border-[#e2e8f0] bg-[#fafafa]/60 hover:bg-white hover:border-[#cbd5e1] transition-all space-y-2">
                    <div class="flex items-center justify-between">
                      <span class="font-bold text-xs text-[#0f172a] font-display">
                        CT112 - Mạng máy tính
                      </span>
                      <span class="px-2 py-0.5 rounded-md bg-[#f1f5f9] text-[#475569] font-bold text-[11px] border border-[#e2e8f0]">
                        3 TC
                      </span>
                    </div>
                    <div class="text-[11px] text-[#64748b]">
                      Số lượng nhóm đã chọn: 1
                    </div>
                    <div class="flex items-center gap-4 text-xs text-[#334155] font-medium">
                      <label class="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="course-ct112"
                          class="accent-[#00529c] cursor-pointer"
                          :checked="course1Type === 'main'"
                          @change="setCourse1Type('main')"
                        />
                        <span>Môn chính</span>
                      </label>
                      <label class="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="course-ct112"
                          class="accent-[#00529c] cursor-pointer"
                          :checked="course1Type === 'alt'"
                          @change="setCourse1Type('alt')"
                        />
                        <span class="font-semibold text-[#00529c]">Môn thay thế</span>
                      </label>
                    </div>

                    <!-- Alternative Subject Selector (Active when 'alt') -->
                    <div v-if="course1Type === 'alt'" class="pt-0.5 relative">
                      <button
                        type="button"
                        class="w-full px-2.5 py-1.5 rounded-lg border border-[#cbd5e1] bg-white text-xs text-[#334155] flex items-center justify-between shadow-2xs font-medium hover:border-[#00529c] cursor-pointer"
                        @click="isAltDropdownOpen = !isAltDropdownOpen"
                      >
                        <span class="truncate">{{ selectedAltCourse }}</span>
                        <i class="fa-solid fa-chevron-down text-[11px] text-[#94a3b8] shrink-0 ml-1" aria-hidden="true"></i>
                      </button>

                      <div
                        v-if="isAltDropdownOpen"
                        class="absolute top-full left-0 right-0 mt-1 z-30 bg-white border border-[#cbd5e1] rounded-lg shadow-md py-1 text-xs"
                      >
                        <button
                          v-for="alt in altCourseOptions"
                          :key="alt"
                          type="button"
                          class="w-full px-2.5 py-1.5 text-left hover:bg-[#f8fafc] text-[#334155]"
                          @click="selectAltCourse(alt)"
                        >
                          {{ alt }}
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Course 2: CT179 -->
                  <div class="p-3 rounded-xl border border-[#e2e8f0] bg-[#fafafa]/60 hover:bg-white hover:border-[#cbd5e1] transition-all space-y-2">
                    <div class="flex items-center justify-between">
                      <span class="font-bold text-xs text-[#0f172a] font-display">
                        CT179 - Quản trị hệ thống
                      </span>
                      <span class="px-2 py-0.5 rounded-md bg-[#f1f5f9] text-[#475569] font-bold text-[11px] border border-[#e2e8f0]">
                        3 TC
                      </span>
                    </div>
                    <div class="text-[11px] text-[#64748b]">
                      Số lượng nhóm đã chọn: 1
                    </div>
                    <div class="flex items-center gap-4 text-xs text-[#334155] font-medium">
                      <label class="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="course-ct179"
                          class="accent-[#00529c] cursor-pointer"
                          :checked="course2Type === 'main'"
                          @change="course2Type = 'main'"
                        />
                        <span class="font-semibold text-[#00529c]">Môn chính</span>
                      </label>
                      <label class="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="course-ct179"
                          class="accent-[#00529c] cursor-pointer"
                          :checked="course2Type === 'alt'"
                          @change="course2Type = 'alt'"
                        />
                        <span>Môn thay thế</span>
                      </label>
                    </div>
                  </div>

                  <!-- Course 3: ML016 -->
                  <div class="p-3 rounded-xl border border-[#e2e8f0] bg-[#fafafa]/60 hover:bg-white hover:border-[#cbd5e1] transition-all space-y-2">
                    <div class="flex items-center justify-between">
                      <span class="font-bold text-xs text-[#0f172a] font-display">
                        ML016 - Kinh tế chính trị Mác - Lênin
                      </span>
                      <span class="px-2 py-0.5 rounded-md bg-[#f1f5f9] text-[#475569] font-bold text-[11px] border border-[#e2e8f0]">
                        2 TC
                      </span>
                    </div>
                    <div class="text-[11px] text-[#64748b]">
                      Số lượng nhóm đã chọn: 1
                    </div>
                    <div class="flex items-center gap-4 text-xs text-[#334155] font-medium">
                      <label class="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="course-ml016"
                          class="accent-[#00529c] cursor-pointer"
                          :checked="course3Type === 'main'"
                          @change="course3Type = 'main'"
                        />
                        <span class="font-semibold text-[#00529c]">Môn chính</span>
                      </label>
                      <label class="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="course-ml016"
                          class="accent-[#00529c] cursor-pointer"
                          :checked="course3Type === 'alt'"
                          @change="course3Type = 'alt'"
                        />
                        <span>Môn thay thế</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <!-- ============================================== -->
              <!-- RIGHT COLUMN: LƯỚI THỜI KHÓA BIỂU RỘNG RÃI     -->
              <!-- (Takes all remaining width flex-1 min-w-0)     -->
              <!-- ============================================== -->
              <div class="flex-1 min-w-0 p-4 xl:p-5 space-y-3.5 bg-white flex flex-col justify-between">
                <!-- Top Row: Title, Counter & Action Button -->
                <div class="flex items-center justify-between gap-3 pb-2 border-b border-[#f1f5f9]">
                  <div>
                    <h3 class="text-base font-bold text-[#0f172a] font-display inline-block">
                      Thời Khóa Biểu
                    </h3>
                    <span class="text-xs text-[#64748b] font-medium ml-2">
                      Đã chọn {{ currentPlanIndex }}/{{ totalPlans }} thời khóa biểu
                    </span>
                  </div>
                  <button
                    type="button"
                    class="px-4 py-2 rounded-lg bg-[#00529c] text-white text-xs font-bold hover:bg-[#003b7a] transition-all flex items-center gap-1.5 shadow-sm shrink-0 cursor-pointer disabled:opacity-75"
                    :disabled="isGenerating"
                    @click="generateNewSchedule"
                  >
                    <i
                      :class="isGenerating ? 'fa-solid fa-spinner fa-spin' : 'fa-solid fa-plus'"
                      class="text-[11px]"
                      aria-hidden="true"
                    ></i>
                    <span>{{ isGenerating ? 'Đang tính toán...' : 'Tạo thời khóa biểu' }}</span>
                  </button>
                </div>

                <!-- Result Metrics Card Summary -->
                <div class="p-2.5 rounded-xl border border-[#cbd5e1] bg-[#f8fafc] flex items-center justify-between gap-3 text-xs">
                  <div class="flex items-center gap-2">
                    <label class="flex items-center gap-1.5 cursor-pointer font-semibold text-[#0f172a]">
                      <input
                        type="checkbox"
                        v-model="isSelected"
                        class="accent-[#00529c] w-3.5 h-3.5 rounded cursor-pointer"
                      />
                      <span>{{ isSelected ? 'Đã chọn' : 'Chưa chọn' }}</span>
                    </label>
                  </div>
                  <div class="flex items-center gap-4 text-[#475569] font-medium">
                    <span>Số môn học: <strong class="text-[#0f172a]">{{ activeSchedule.coursesCount }}</strong></span>
                    <span>·</span>
                    <span>Số tín chỉ: <strong class="text-[#0f172a]">{{ activeSchedule.credits }}</strong></span>
                    <span>·</span>
                    <span>Điểm đánh giá: <strong class="text-[#e11d48] font-bold">{{ activeSchedule.score }}</strong></span>
                  </div>
                </div>

                <!-- Full Weekly Timetable Grid (Spacious, Table-Fixed with Balanced Widths) -->
                <div class="overflow-x-auto rounded-xl border border-[#e2e8f0] bg-white shadow-2xs">
                  <table class="w-full text-left border-collapse text-xs table-fixed min-w-[700px]">
                    <thead>
                      <tr class="border-b border-[#e2e8f0] bg-[#f8fafc] text-[#475569] font-bold text-center">
                        <th class="p-2.5 border-r border-[#e2e8f0] font-semibold text-[11px] w-[75px] shrink-0">
                          Thời khóa biểu
                        </th>
                        <th class="p-2.5 border-r border-[#e2e8f0] font-semibold text-[11px] w-[15.4%]">Thứ 2</th>
                        <th class="p-2.5 border-r border-[#e2e8f0] font-semibold text-[11px] w-[15.4%]">Thứ 3</th>
                        <th class="p-2.5 border-r border-[#e2e8f0] font-semibold text-[11px] w-[15.4%]">Thứ 4</th>
                        <th class="p-2.5 border-r border-[#e2e8f0] font-semibold text-[11px] w-[15.4%]">Thứ 5</th>
                        <th class="p-2.5 border-r border-[#e2e8f0] font-semibold text-[11px] w-[15.4%]">Thứ 6</th>
                        <th class="p-2.5 font-semibold text-[11px] w-[15.4%]">Thứ 7</th>
                      </tr>
                    </thead>
                    <tbody>
                      <!-- CA SÁNG: Tiết 1 -->
                      <tr class="border-b border-[#f1f5f9] h-[34px]">
                        <td class="p-1 border-r border-[#e2e8f0] text-center text-[11px] font-semibold text-[#64748b] bg-[#fafafa]">
                          Tiết 1
                        </td>
                        <td class="border-r border-[#f1f5f9]"></td>
                        <td class="border-r border-[#f1f5f9]"></td>
                        <td class="border-r border-[#f1f5f9]"></td>
                        <td class="border-r border-[#f1f5f9]"></td>
                        <td class="border-r border-[#f1f5f9]"></td>
                        <td></td>
                      </tr>

                      <!-- CA SÁNG: Tiết 2 -->
                      <tr class="border-b border-[#f1f5f9] h-[34px]">
                        <td class="p-1 border-r border-[#e2e8f0] text-center text-[11px] font-semibold text-[#64748b] bg-[#fafafa]">
                          Tiết 2
                        </td>

                        <!-- THỨ 2 (CT179 Rowspan 3 on Morning) -->
                        <td v-if="activeSchedule.showMorningCT179" rowspan="3" class="p-1.5 border-r border-[#f1f5f9] align-top bg-[#fdf2f8]/40">
                          <div class="h-full rounded-xl border border-[#fbcfe8] bg-[#fce7f3]/90 p-2.5 text-left space-y-1.5 shadow-2xs flex flex-col justify-between">
                            <div class="space-y-1">
                              <span class="inline-block px-2 py-0.5 rounded-full bg-[#0f172a] text-white font-extrabold text-[11px] tracking-wide">
                                CT179 • 3 TC
                              </span>
                              <div class="text-[11px] text-[#64748b] font-medium leading-tight">
                                Nhóm H01 - P.203HA5
                              </div>
                              <div class="text-xs font-bold text-[#0f172a] leading-tight font-display">
                                Quản trị hệ thống
                              </div>
                              <div class="text-[11px] text-[#475569] flex items-center gap-1 leading-tight">
                                <i class="fa-regular fa-user text-[11px] text-[#64748b]" aria-hidden="true"></i>
                                <span>ThS. Lê Huỳnh Quốc Bảo</span>
                              </div>
                            </div>
                            <div class="pt-1 space-y-1">
                              <div class="flex items-center justify-between text-[11px] text-[#475569]">
                                <span>Sĩ số</span>
                                <span class="font-bold text-[#0f172a]">15/40</span>
                              </div>
                              <div class="h-1 rounded-full bg-[#e2e8f0] overflow-hidden">
                                <div class="h-full rounded-full bg-[#0f172a] w-[37.5%]"></div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td v-else class="border-r border-[#f1f5f9]"></td>

                        <!-- THỨ 3 (CT179 Rowspan 3 on Morning) -->
                        <td v-if="activeSchedule.showMorningCT179" rowspan="3" class="p-1.5 border-r border-[#f1f5f9] align-top bg-[#fdf2f8]/40">
                          <div class="h-full rounded-xl border border-[#fbcfe8] bg-[#fce7f3]/90 p-2.5 text-left space-y-1.5 shadow-2xs flex flex-col justify-between">
                            <div class="space-y-1">
                              <span class="inline-block px-2 py-0.5 rounded-full bg-[#0f172a] text-white font-extrabold text-[11px] tracking-wide">
                                CT179 • 3 TC
                              </span>
                              <div class="text-[11px] text-[#64748b] font-medium leading-tight">
                                Nhóm H01 - P.203HA5
                              </div>
                              <div class="text-xs font-bold text-[#0f172a] leading-tight font-display">
                                Quản trị hệ thống
                              </div>
                              <div class="text-[11px] text-[#475569] flex items-center gap-1 leading-tight">
                                <i class="fa-regular fa-user text-[11px] text-[#64748b]" aria-hidden="true"></i>
                                <span>ThS. Lê Huỳnh Quốc Bảo</span>
                              </div>
                            </div>
                            <div class="pt-1 space-y-1">
                              <div class="flex items-center justify-between text-[11px] text-[#475569]">
                                <span>Sĩ số</span>
                                <span class="font-bold text-[#0f172a]">15/40</span>
                              </div>
                              <div class="h-1 rounded-full bg-[#e2e8f0] overflow-hidden">
                                <div class="h-full rounded-full bg-[#0f172a] w-[37.5%]"></div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td v-else class="border-r border-[#f1f5f9]"></td>

                        <td class="border-r border-[#f1f5f9]"></td>
                        <td class="border-r border-[#f1f5f9]"></td>
                        <td class="border-r border-[#f1f5f9]"></td>
                        <td></td>
                      </tr>

                      <!-- Tiết 3 -->
                      <tr class="border-b border-[#f1f5f9] h-[34px]">
                        <td class="p-1 border-r border-[#e2e8f0] text-center text-[11px] font-semibold text-[#64748b] bg-[#fafafa]">
                          Tiết 3
                        </td>
                        <td v-if="!activeSchedule.showMorningCT179" class="border-r border-[#f1f5f9]"></td>
                        <td v-if="!activeSchedule.showMorningCT179" class="border-r border-[#f1f5f9]"></td>
                        <td class="border-r border-[#f1f5f9]"></td>
                        <td class="border-r border-[#f1f5f9]"></td>
                        <td class="border-r border-[#f1f5f9]"></td>
                        <td></td>
                      </tr>

                      <!-- Tiết 4 -->
                      <tr class="border-b border-[#f1f5f9] h-[34px]">
                        <td class="p-1 border-r border-[#e2e8f0] text-center text-[11px] font-semibold text-[#64748b] bg-[#fafafa]">
                          Tiết 4
                        </td>
                        <td v-if="!activeSchedule.showMorningCT179" class="border-r border-[#f1f5f9]"></td>
                        <td v-if="!activeSchedule.showMorningCT179" class="border-r border-[#f1f5f9]"></td>
                        <td class="border-r border-[#f1f5f9]"></td>
                        <td class="border-r border-[#f1f5f9]"></td>
                        <td class="border-r border-[#f1f5f9]"></td>
                        <td></td>
                      </tr>

                      <!-- Tiết 5 -->
                      <tr class="border-b border-[#e2e8f0] h-[34px]">
                        <td class="p-1 border-r border-[#e2e8f0] text-center text-[11px] font-semibold text-[#64748b] bg-[#fafafa]">
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
                      <tr class="border-b border-[#f1f5f9] h-[34px]">
                        <td class="p-1 border-r border-[#e2e8f0] text-center text-[11px] font-semibold text-[#64748b] bg-[#fafafa]">
                          Tiết 6
                        </td>

                        <!-- THỨ 2 (CT179 on Afternoon if Morning is avoided) -->
                        <td v-if="!activeSchedule.showMorningCT179" rowspan="3" class="p-1.5 border-r border-[#f1f5f9] align-top bg-[#fdf2f8]/40">
                          <div class="h-full rounded-xl border border-[#fbcfe8] bg-[#fce7f3]/90 p-2.5 text-left space-y-1.5 shadow-2xs flex flex-col justify-between">
                            <div class="space-y-1">
                              <span class="inline-block px-2 py-0.5 rounded-full bg-[#0f172a] text-white font-extrabold text-[11px] tracking-wide">
                                CT179 • 3 TC
                              </span>
                              <div class="text-[11px] text-[#64748b] font-medium leading-tight">
                                Nhóm H01 - P.203HA5
                              </div>
                              <div class="text-xs font-bold text-[#0f172a] leading-tight font-display">
                                Quản trị hệ thống
                              </div>
                              <div class="text-[11px] text-[#475569] flex items-center gap-1 leading-tight">
                                <i class="fa-regular fa-user text-[11px] text-[#64748b]" aria-hidden="true"></i>
                                <span>ThS. Lê Huỳnh Quốc Bảo</span>
                              </div>
                            </div>
                            <div class="pt-1 space-y-1">
                              <div class="flex items-center justify-between text-[11px] text-[#475569]">
                                <span>Sĩ số</span>
                                <span class="font-bold text-[#0f172a]">15/40</span>
                              </div>
                              <div class="h-1 rounded-full bg-[#e2e8f0] overflow-hidden">
                                <div class="h-full rounded-full bg-[#0f172a] w-[37.5%]"></div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td v-else class="border-r border-[#f1f5f9]"></td>

                        <!-- THỨ 3 (CT179 on Afternoon if Morning avoided) -->
                        <td v-if="!activeSchedule.showMorningCT179" rowspan="3" class="p-1.5 border-r border-[#f1f5f9] align-top bg-[#fdf2f8]/40">
                          <div class="h-full rounded-xl border border-[#fbcfe8] bg-[#fce7f3]/90 p-2.5 text-left space-y-1.5 shadow-2xs flex flex-col justify-between">
                            <div class="space-y-1">
                              <span class="inline-block px-2 py-0.5 rounded-full bg-[#0f172a] text-white font-extrabold text-[11px] tracking-wide">
                                CT179 • 3 TC
                              </span>
                              <div class="text-[11px] text-[#64748b] font-medium leading-tight">
                                Nhóm H01 - P.203HA5
                              </div>
                              <div class="text-xs font-bold text-[#0f172a] leading-tight font-display">
                                Quản trị hệ thống
                              </div>
                              <div class="text-[11px] text-[#475569] flex items-center gap-1 leading-tight">
                                <i class="fa-regular fa-user text-[11px] text-[#64748b]" aria-hidden="true"></i>
                                <span>ThS. Lê Huỳnh Quốc Bảo</span>
                              </div>
                            </div>
                            <div class="pt-1 space-y-1">
                              <div class="flex items-center justify-between text-[11px] text-[#475569]">
                                <span>Sĩ số</span>
                                <span class="font-bold text-[#0f172a]">15/40</span>
                              </div>
                              <div class="h-1 rounded-full bg-[#e2e8f0] overflow-hidden">
                                <div class="h-full rounded-full bg-[#0f172a] w-[37.5%]"></div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td v-else class="border-r border-[#f1f5f9]"></td>

                        <!-- THỨ 4 (CT112 if T6-T7 are freed) -->
                        <td v-if="activeSchedule.showWednesdayCT112" rowspan="4" class="p-1.5 border-r border-[#f1f5f9] align-top bg-[#f0f9ff]/50">
                          <div class="h-full rounded-xl border border-[#bae6fd] bg-[#e0f2fe] p-2.5 text-left space-y-1.5 shadow-2xs flex flex-col justify-between">
                            <div class="space-y-1">
                              <span class="inline-block px-2 py-0.5 rounded-full bg-[#0f172a] text-white font-extrabold text-[11px] tracking-wide">
                                CT112 • 3 TC
                              </span>
                              <div class="text-[11px] text-[#64748b] font-medium leading-tight">
                                Nhóm 01 - P.011/K3
                              </div>
                              <div class="text-xs font-bold text-[#0f172a] leading-tight font-display">
                                Mạng máy tính
                              </div>
                              <div class="text-[11px] text-[#475569] flex items-center gap-1 leading-tight">
                                <i class="fa-regular fa-user text-[11px] text-[#64748b]" aria-hidden="true"></i>
                                <span>TS. Nguyễn Hữu Văn Long</span>
                              </div>
                            </div>
                            <div class="pt-1 space-y-1">
                              <div class="flex items-center justify-between text-[11px] text-[#475569]">
                                <span>Sĩ số</span>
                                <span class="font-bold text-[#0f172a]">3/40</span>
                              </div>
                              <div class="h-1 rounded-full bg-[#cbd5e1] overflow-hidden">
                                <div class="h-full rounded-full bg-[#0f172a] w-[7.5%]"></div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td v-else class="border-r border-[#f1f5f9]"></td>

                        <td class="border-r border-[#f1f5f9]"></td>

                        <!-- THỨ 6: CT112 (Rowspan 4 on Friday) -->
                        <td v-if="activeSchedule.showFridayCT112" rowspan="4" class="p-1.5 border-r border-[#f1f5f9] align-top bg-[#f0f9ff]/50">
                          <div class="h-full rounded-xl border border-[#bae6fd] bg-[#e0f2fe] p-2.5 text-left space-y-1.5 shadow-2xs flex flex-col justify-between">
                            <div class="space-y-1">
                              <span class="inline-block px-2 py-0.5 rounded-full bg-[#0f172a] text-white font-extrabold text-[11px] tracking-wide">
                                CT112 • 3 TC
                              </span>
                              <div class="text-[11px] text-[#64748b] font-medium leading-tight">
                                Nhóm 01 - P.011/K3
                              </div>
                              <div class="text-xs font-bold text-[#0f172a] leading-tight font-display">
                                Mạng máy tính
                              </div>
                              <div class="text-[11px] text-[#475569] flex items-center gap-1 leading-tight">
                                <i class="fa-regular fa-user text-[11px] text-[#64748b]" aria-hidden="true"></i>
                                <span>TS. Nguyễn Hữu Văn Long</span>
                              </div>
                            </div>
                            <div class="pt-1 space-y-1">
                              <div class="flex items-center justify-between text-[11px] text-[#475569]">
                                <span>Sĩ số</span>
                                <span class="font-bold text-[#0f172a]">3/40</span>
                              </div>
                              <div class="h-1 rounded-full bg-[#cbd5e1] overflow-hidden">
                                <div class="h-full rounded-full bg-[#0f172a] w-[7.5%]"></div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td v-else class="border-r border-[#f1f5f9]"></td>

                        <td></td>
                      </tr>

                      <!-- Tiết 7 -->
                      <tr class="border-b border-[#f1f5f9] h-[34px]">
                        <td class="p-1 border-r border-[#e2e8f0] text-center text-[11px] font-semibold text-[#64748b] bg-[#fafafa]">
                          Tiết 7
                        </td>
                        <td v-if="activeSchedule.showMorningCT179" class="border-r border-[#f1f5f9]"></td>
                        <td v-if="activeSchedule.showMorningCT179" class="border-r border-[#f1f5f9]"></td>
                        <td v-if="!activeSchedule.showWednesdayCT112" class="border-r border-[#f1f5f9]"></td>
                        <td class="border-r border-[#f1f5f9]"></td>
                        <td v-if="!activeSchedule.showFridayCT112" class="border-r border-[#f1f5f9]"></td>
                        <td></td>
                      </tr>

                      <!-- Tiết 8 -->
                      <tr class="border-b border-[#f1f5f9] h-[34px]">
                        <td class="p-1 border-r border-[#e2e8f0] text-center text-[11px] font-semibold text-[#64748b] bg-[#fafafa]">
                          Tiết 8
                        </td>
                        <td v-if="activeSchedule.showMorningCT179" class="border-r border-[#f1f5f9]"></td>
                        <td v-if="activeSchedule.showMorningCT179" class="border-r border-[#f1f5f9]"></td>
                        <td v-if="!activeSchedule.showWednesdayCT112" class="border-r border-[#f1f5f9]"></td>
                        <td class="border-r border-[#f1f5f9]"></td>
                        <td v-if="!activeSchedule.showFridayCT112" class="border-r border-[#f1f5f9]"></td>
                        <td></td>
                      </tr>

                      <!-- Tiết 9 -->
                      <tr class="h-[34px]">
                        <td class="p-1 border-r border-[#e2e8f0] text-center text-[11px] font-semibold text-[#64748b] bg-[#fafafa]">
                          Tiết 9
                        </td>
                        <td class="border-r border-[#f1f5f9]"></td>
                        <td class="border-r border-[#f1f5f9]"></td>
                        <td v-if="!activeSchedule.showWednesdayCT112" class="border-r border-[#f1f5f9]"></td>
                        <td class="border-r border-[#f1f5f9]"></td>
                        <td v-if="!activeSchedule.showFridayCT112" class="border-r border-[#f1f5f9]"></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- Modal Bottom Navigation (Pagination & Actions) -->
                <div class="pt-3 border-t border-[#f1f5f9] flex items-center justify-between gap-3 text-xs">
                  <!-- Pagination Control -->
                  <div class="flex items-center gap-2 text-[#64748b]">
                    <button
                      type="button"
                      class="w-7 h-7 rounded-md border border-[#cbd5e1] flex items-center justify-center hover:bg-[#f8fafc] disabled:opacity-40 cursor-pointer"
                      :disabled="currentPlanIndex <= 1"
                      @click="prevPlan"
                    >
                      <i class="fa-solid fa-chevron-left text-[11px]" aria-hidden="true"></i>
                    </button>
                    <span class="font-semibold text-[#0f172a] px-1.5">{{ currentPlanIndex }} / {{ totalPlans }}</span>
                    <button
                      type="button"
                      class="w-7 h-7 rounded-md border border-[#cbd5e1] flex items-center justify-center hover:bg-[#f8fafc] disabled:opacity-40 cursor-pointer"
                      :disabled="currentPlanIndex >= totalPlans"
                      @click="nextPlan"
                    >
                      <i class="fa-solid fa-chevron-right text-[11px]" aria-hidden="true"></i>
                    </button>
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
    </div>

    <!-- ============================================================== -->
    <!-- MOBILE VIEW: THỜI KHÓA BIỂU HOÀN CHỈNH ĐÃ SẮP XẾP TỪ APP       -->
    <!-- (Visible on Mobile & Tablet lg:hidden, Replaces complex modal) -->
    <!-- ============================================================== -->
    <div class="block lg:hidden rounded-2xl border border-[#cbd5e1] bg-white shadow-card overflow-hidden text-left">
      <!-- Mobile Timetable Header -->
      <div class="p-4 sm:p-5 bg-gradient-to-r from-[#003b7a] to-[#00529c] text-white space-y-2">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-[#6ee7b7] animate-pulse"></span>
            <span class="text-xs font-semibold text-white/90 uppercase tracking-wider">Thời khóa biểu hoàn chỉnh</span>
          </div>
          <span class="px-2 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-bold">
            0 Trùng Lịch
          </span>
        </div>
        <h3 class="text-base sm:text-lg font-bold font-display text-white">
          Lịch học đã tối ưu từ CTU Scheduler
        </h3>
        <p class="text-xs text-white/80">
          Phương án tối ưu theo tiêu chí né ngày cuối tuần, tự động dồn lịch học gọn gàng.
        </p>
      </div>

      <!-- Quick Metrics Summary -->
      <div class="p-3 sm:p-4 bg-[#f8fafc] border-b border-[#e2e8f0] flex items-center justify-between text-xs text-[#475569]">
        <div>
          <span>Môn học: <strong class="text-[#0f172a]">2 môn</strong></span>
          <span class="mx-2">·</span>
          <span>Tín chỉ: <strong class="text-[#0f172a]">6 TC</strong></span>
        </div>
        <div>
          <span>Đánh giá: <strong class="text-[#00c07a] font-bold">0.95 (Rất tối ưu)</strong></span>
        </div>
      </div>

      <!-- Mobile Day Selector Pills -->
      <div class="p-3 border-b border-[#e2e8f0] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <button
          v-for="day in mobileDays"
          :key="day.id"
          type="button"
          class="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0"
          :class="activeMobileDay === day.id ? 'bg-[#00529c] text-white shadow-xs' : 'bg-[#f1f5f9] text-[#64748b] hover:text-[#0f172a]'"
          @click="activeMobileDay = day.id"
        >
          {{ day.label }}
          <span v-if="day.hasClasses" class="ml-1 inline-block w-1.5 h-1.5 rounded-full bg-[#f43f5e]"></span>
        </button>
      </div>

      <!-- Daily Schedule Card for Mobile -->
      <div class="p-4 sm:p-5 space-y-3 min-h-[180px]">
        <!-- If Day has Classes (Thứ 2, Thứ 3, Thứ 6) -->
        <template v-if="currentDayClasses.length > 0">
          <div
            v-for="item in currentDayClasses"
            :key="item.code"
            class="p-3.5 rounded-xl border transition-all"
            :class="item.colorClass"
          >
            <div class="flex items-center justify-between gap-2 mb-1.5">
              <span class="px-2 py-0.5 rounded-full bg-[#0f172a] text-white font-extrabold text-[11px]">
                {{ item.code }} • {{ item.credits }}
              </span>
              <span class="text-xs font-bold text-[#00529c] flex items-center gap-1">
                <i class="fa-regular fa-clock text-[11px]" aria-hidden="true"></i>
                <span>{{ item.time }}</span>
              </span>
            </div>
            <div class="text-sm font-bold text-[#0f172a] font-display">
              {{ item.name }}
            </div>
            <div class="text-xs text-[#64748b] mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>Phòng: <strong class="text-[#0f172a]">{{ item.room }}</strong></span>
              <span>Nhóm: {{ item.group }}</span>
              <span>GV: {{ item.lecturer }}</span>
            </div>
            <!-- Progress bar -->
            <div class="mt-2.5 pt-2 border-t border-black/5 flex items-center justify-between text-[11px] text-[#475569]">
              <span>Sĩ số lớp: <strong class="text-[#0f172a]">{{ item.capacity }}</strong></span>
              <span class="text-[#00c07a] font-semibold">Còn chỗ đăng ký</span>
            </div>
          </div>
        </template>

        <!-- Empty Day State (Thứ 4, Thứ 5, Thứ 7) -->
        <div v-else class="py-8 text-center space-y-2">
          <div class="w-10 h-10 rounded-full bg-[#f1f5f9] text-[#64748b] flex items-center justify-center mx-auto text-base">
            ☕
          </div>
          <div class="text-xs font-bold text-[#0f172a]">
            Trống lịch học vào {{ activeMobileDayLabel }}
          </div>
          <p class="text-[11px] text-[#64748b] max-w-xs mx-auto">
            Thuật toán đã tối ưu dồn lịch để bạn có trọn vẹn ngày này nghỉ ngơi hoặc đi làm thêm.
          </p>
        </div>
      </div>

      <!-- Mobile CTA Footer -->
      <div class="p-3 bg-[#f8fafc] border-t border-[#e2e8f0] flex items-center justify-between gap-2">
        <span class="text-[11px] text-[#64748b]">Ứng dụng xếp lịch cho sinh viên CTU</span>
        <a
          href="#download"
          class="px-3.5 py-1.5 rounded-lg bg-[#00529c] text-white text-xs font-bold hover:bg-[#003b7a] transition-colors"
        >
          Tải phần mềm
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Desktop Reactive State
const course1Type = ref('alt'); // Default: Môn thay thế
const course2Type = ref('main');
const course3Type = ref('main');

const isDropdownOpen = ref(false);
const isAltDropdownOpen = ref(false);
const isGenerating = ref(false);
const isSelected = ref(true);
const isCompleted = ref(false);

const currentPlanIndex = ref(1);
const totalPlans = ref(9);

const criteriaList = [
  {
    id: 'deadline',
    label: 'Chiến thần deadline',
    icon: '🚀',
    score: '0.71',
    coursesCount: 2,
    credits: '6 TC',
    showMorningCT179: true,
    showWednesdayCT112: false,
    showFridayCT112: true,
  },
  {
    id: 'morning',
    label: 'Né ca sáng 1-3',
    icon: '☕',
    score: '0.89',
    coursesCount: 2,
    credits: '6 TC',
    showMorningCT179: false,
    showWednesdayCT112: false,
    showFridayCT112: true,
  },
  {
    id: 'weekend',
    label: 'Dồn lịch trống T6-T7',
    icon: '🏖️',
    score: '0.93',
    coursesCount: 2,
    credits: '6 TC',
    showMorningCT179: true,
    showWednesdayCT112: true,
    showFridayCT112: false,
  },
  {
    id: 'balance',
    label: 'Cân bằng tiết học',
    icon: '⚡',
    score: '0.96',
    coursesCount: 2,
    credits: '6 TC',
    showMorningCT179: true,
    showWednesdayCT112: false,
    showFridayCT112: true,
  },
  {
    id: 'campus2',
    label: 'Chỉ học Khu II',
    icon: '📍',
    score: '0.92',
    coursesCount: 2,
    credits: '6 TC',
    showMorningCT179: true,
    showWednesdayCT112: false,
    showFridayCT112: true,
  },
];

const activeCriteria = ref(criteriaList[0]);

const selectedAltCourse = ref('ML016 - Kinh tế chính trị Mác - Lênin');
const altCourseOptions = [
  'ML016 - Kinh tế chính trị Mác - Lênin',
  'CT103 - Cấu trúc dữ liệu',
  'CT176 - Lập trình hướng đối tượng',
];

const activeSchedule = computed(() => {
  return activeCriteria.value;
});

function selectCriteria(item) {
  activeCriteria.value = item;
  isDropdownOpen.value = false;
}

function setCourse1Type(type) {
  course1Type.value = type;
  isAltDropdownOpen.value = false;
}

function selectAltCourse(alt) {
  selectedAltCourse.value = alt;
  isAltDropdownOpen.value = false;
}

function generateNewSchedule() {
  isGenerating.value = true;
  setTimeout(() => {
    isGenerating.value = false;
    // Advance to next plan
    if (currentPlanIndex.value < totalPlans.value) {
      currentPlanIndex.value += 1;
    } else {
      currentPlanIndex.value = 1;
    }
  }, 400);
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

// Mobile Reactive State
const activeMobileDay = ref('t2');

const mobileDays = [
  { id: 't2', label: 'Thứ 2', hasClasses: true },
  { id: 't3', label: 'Thứ 3', hasClasses: true },
  { id: 't4', label: 'Thứ 4', hasClasses: false },
  { id: 't5', label: 'Thứ 5', hasClasses: false },
  { id: 't6', label: 'Thứ 6', hasClasses: true },
  { id: 't7', label: 'Thứ 7', hasClasses: false },
];

const mobileScheduleData = {
  t2: [
    {
      code: 'CT179',
      credits: '3 TC',
      name: 'Quản trị hệ thống',
      time: 'Tiết 2 - 4 (07:50 - 10:25)',
      room: 'P.203HA5',
      group: 'H01',
      lecturer: 'ThS. Lê Huỳnh Quốc Bảo',
      capacity: '15/40',
      colorClass: 'border-[#fbcfe8] bg-[#fce7f3]/80',
    },
  ],
  t3: [
    {
      code: 'CT179',
      credits: '3 TC',
      name: 'Quản trị hệ thống',
      time: 'Tiết 2 - 4 (07:50 - 10:25)',
      room: 'P.203HA5',
      group: 'H01',
      lecturer: 'ThS. Lê Huỳnh Quốc Bảo',
      capacity: '15/40',
      colorClass: 'border-[#fbcfe8] bg-[#fce7f3]/80',
    },
  ],
  t4: [],
  t5: [],
  t6: [
    {
      code: 'CT112',
      credits: '3 TC',
      name: 'Mạng máy tính',
      time: 'Tiết 6 - 9 (13:30 - 17:00)',
      room: 'P.011/K3',
      group: '01',
      lecturer: 'TS. Nguyễn Hữu Văn Long',
      capacity: '3/40',
      colorClass: 'border-[#bae6fd] bg-[#e0f2fe]',
    },
  ],
  t7: [],
};

const currentDayClasses = computed(() => {
  return mobileScheduleData[activeMobileDay.value] || [];
});

const activeMobileDayLabel = computed(() => {
  const match = mobileDays.find((d) => d.id === activeMobileDay.value);
  return match ? match.label : '';
});
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
