<template>
  <section id="ecosystem" class="py-16 border-b border-[#e4e4e7] bg-white">
    <div class="container mx-auto max-w-clickup px-4 sm:px-6">
      <div
        v-motion
        :initial="{ opacity: 0, y: 16 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 450, ease: [0.33, 1, 0.68, 1] } }"
        class="clickup-card p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-[#e4e4e7] bg-white hover-lift"
      >
        <div class="space-y-1.5">
          <h3 class="text-xl font-bold text-[#18181b] font-display">CTU Student's Tools (CTUST)</h3>
          <p class="text-[#52525b] text-sm max-w-2xl leading-relaxed">
            Bộ công cụ quy đổi điểm V-SAT, tính điểm xét tuyển học bạ, quản lý GPA và ước tính điểm học bổng dành riêng cho sinh viên Đại học Cần Thơ do thành viên Nguyễn Phước Lộc (Lexipit3268) phát triển.
          </p>
        </div>
        <a
          href="https://ctust.pages.dev/"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-clickup-blue !text-xs shrink-0 w-full sm:w-auto text-center"
        >
          <span>Ghé Thăm CTUST</span>
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>
