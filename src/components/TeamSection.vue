<template>
  <section id="team" class="py-20 border-b border-[#e4e4e7] bg-white">
    <div class="container mx-auto max-w-clickup px-4 sm:px-6">
      <motion.div
        :initial="{ opacity: 0, y: 16 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :inViewOptions="{ once: true }"
        :transition="{ duration: 0.45, ease: [0.33, 1, 0.68, 1] }"
        class="max-w-2xl text-left mb-12"
      >
        <h2 class="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#090c1d] mb-3 font-display">
          Đội ngũ phát triển
        </h2>
        <p class="text-[#52525b] text-base leading-relaxed">
          Nhóm sinh viên Khoa CNTT&amp;TT - Đại học Cần Thơ trực tiếp nghiên cứu, lập trình và duy trì dự án.
        </p>
      </motion.div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Member 1: Dương Minh Đức -->
        <motion.div
          :initial="{ opacity: 0, y: 16 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :inViewOptions="{ once: true }"
          :transition="{ duration: 0.45, delay: 0.05, ease: [0.33, 1, 0.68, 1] }"
          class="clickup-card p-6 text-center space-y-4"
        >
          <div class="w-20 h-20 mx-auto rounded-full bg-[#f8f9fa] overflow-hidden border-2 border-[#e4e4e7] shadow-subtle">
            <img
              src="https://avatars.githubusercontent.com/d3nhatv0lam?size=160"
              onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?name=Dương+Minh+Đức&background=00529c&color=fff&size=160';"
              alt="Dương Minh Đức"
              class="w-full h-full object-cover"
              loading="lazy"
              referrerpolicy="no-referrer"
              crossorigin="anonymous"
            />
          </div>
          <div>
            <h3 class="text-base font-bold text-[#090c1d] font-display">Dương Minh Đức</h3>
            <p class="text-xs font-semibold text-[#00529c] mt-0.5">Founder / Core Developer</p>
          </div>
          <div class="flex justify-center flex-wrap gap-1.5 pt-1 text-xs">
            <a href="https://github.com/d3nhatv0lam" target="_blank" rel="noopener noreferrer" class="pill-filter !py-1 !px-2.5 !text-[11px] flex items-center gap-1" title="GitHub">
              <i class="fa-brands fa-github text-xs"></i>
              <span>GitHub</span>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61591905747383" target="_blank" rel="noopener noreferrer" class="pill-filter !py-1 !px-2.5 !text-[11px] flex items-center gap-1" title="Facebook">
              <i class="fa-brands fa-facebook-f text-xs text-[#1877f2]"></i>
              <span>Facebook</span>
            </a>
            <a href="https://www.youtube.com/@ucduong9984" target="_blank" rel="noopener noreferrer" class="pill-filter !py-1 !px-2.5 !text-[11px] flex items-center gap-1" title="YouTube">
              <i class="fa-brands fa-youtube text-xs text-[#ff0000]"></i>
              <span>YouTube</span>
            </a>
          </div>
        </motion.div>

        <!-- Member 2: Nguyễn Phước Lộc -->
        <motion.div
          :initial="{ opacity: 0, y: 16 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :inViewOptions="{ once: true }"
          :transition="{ duration: 0.45, delay: 0.1, ease: [0.33, 1, 0.68, 1] }"
          class="clickup-card p-6 text-center space-y-4"
        >
          <div class="w-20 h-20 mx-auto rounded-full bg-[#f8f9fa] overflow-hidden border-2 border-[#e4e4e7] shadow-subtle">
            <img
              src="https://avatars.githubusercontent.com/lexipit3268?size=160"
              onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?name=Nguyễn+Phước+Lộc&background=00529c&color=fff&size=160';"
              alt="Nguyễn Phước Lộc"
              class="w-full h-full object-cover"
              loading="lazy"
              referrerpolicy="no-referrer"
              crossorigin="anonymous"
            />
          </div>
          <div>
            <h3 class="text-base font-bold text-[#090c1d] font-display">Nguyễn Phước Lộc</h3>
            <p class="text-xs font-semibold text-[#00529c] mt-0.5">Maintainer / Designer</p>
          </div>
          <div class="flex justify-center flex-wrap gap-1.5 pt-1 text-xs">
            <a href="https://github.com/lexipit3268" target="_blank" rel="noopener noreferrer" class="pill-filter !py-1 !px-2.5 !text-[11px] flex items-center gap-1" title="GitHub">
              <i class="fa-brands fa-github text-xs"></i>
              <span>GitHub</span>
            </a>
            <a href="https://www.facebook.com/lexipit3268" target="_blank" rel="noopener noreferrer" class="pill-filter !py-1 !px-2.5 !text-[11px] flex items-center gap-1" title="Facebook">
              <i class="fa-brands fa-facebook-f text-xs text-[#1877f2]"></i>
              <span>Facebook</span>
            </a>
            <a href="https://www.youtube.com/@lexipit3268" target="_blank" rel="noopener noreferrer" class="pill-filter !py-1 !px-2.5 !text-[11px] flex items-center gap-1" title="YouTube">
              <i class="fa-brands fa-youtube text-xs text-[#ff0000]"></i>
              <span>YouTube</span>
            </a>
          </div>
        </motion.div>

        <!-- Member 3: Trần Trọng Phúc -->
        <motion.div
          :initial="{ opacity: 0, y: 16 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :inViewOptions="{ once: true }"
          :transition="{ duration: 0.45, delay: 0.15, ease: [0.33, 1, 0.68, 1] }"
          class="clickup-card p-6 text-center space-y-4"
        >
          <div class="w-20 h-20 mx-auto rounded-full bg-[#f8f9fa] overflow-hidden border-2 border-[#e4e4e7] shadow-subtle">
            <img
              src="https://avatars.githubusercontent.com/phuctran1501?size=160"
              onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?name=Trần+Trọng+Phúc&background=00529c&color=fff&size=160';"
              alt="Trần Trọng Phúc"
              class="w-full h-full object-cover"
              loading="lazy"
              referrerpolicy="no-referrer"
              crossorigin="anonymous"
            />
          </div>
          <div>
            <h3 class="text-base font-bold text-[#090c1d] font-display">Trần Trọng Phúc</h3>
            <p class="text-xs font-semibold text-[#52525b] mt-0.5">Maintainer / QA Tester</p>
          </div>
          <div class="flex justify-center flex-wrap gap-1.5 pt-1 text-xs">
            <a href="https://github.com/phuctran1501" target="_blank" rel="noopener noreferrer" class="pill-filter !py-1 !px-2.5 !text-[11px] flex items-center gap-1" title="GitHub">
              <i class="fa-brands fa-github text-xs"></i>
              <span>GitHub</span>
            </a>
          </div>
        </motion.div>

        <!-- Member 4: Nguyễn Ngọc Đức Phát -->
        <motion.div
          :initial="{ opacity: 0, y: 16 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :inViewOptions="{ once: true }"
          :transition="{ duration: 0.45, delay: 0.2, ease: [0.33, 1, 0.68, 1] }"
          class="clickup-card p-6 text-center space-y-4"
        >
          <div class="w-20 h-20 mx-auto rounded-full bg-[#f8f9fa] overflow-hidden border-2 border-[#e4e4e7] shadow-subtle">
            <img
              src="https://avatars.githubusercontent.com/KimgionDev?size=160"
              onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?name=Nguyễn+Ngọc+Đức+Phát&background=00529c&color=fff&size=160';"
              alt="Nguyễn Ngọc Đức Phát"
              class="w-full h-full object-cover"
              loading="lazy"
              referrerpolicy="no-referrer"
              crossorigin="anonymous"
            />
          </div>
          <div>
            <h3 class="text-base font-bold text-[#090c1d] font-display">Nguyễn Ngọc Đức Phát</h3>
            <p class="text-xs font-semibold text-[#52525b] mt-0.5">Maintainer / Designer</p>
          </div>
          <div class="flex justify-center flex-wrap gap-1.5 pt-1 text-xs">
            <a href="https://github.com/KimgionDev" target="_blank" rel="noopener noreferrer" class="pill-filter !py-1 !px-2.5 !text-[11px] flex items-center gap-1" title="GitHub">
              <i class="fa-brands fa-github text-xs"></i>
              <span>GitHub</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { motion } from 'motion-v';
</script>
