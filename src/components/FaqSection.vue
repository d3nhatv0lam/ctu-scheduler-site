<template>
  <section id="faq" class="py-20 bg-plaster-band border-b border-[#e4e4e7]">
    <div class="container mx-auto max-w-clickup px-4 sm:px-6">
      <motion.div
        :initial="{ opacity: 0, y: 16 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :inViewOptions="{ once: true }"
        :transition="{ duration: 0.45, ease: [0.33, 1, 0.68, 1] }"
        class="max-w-2xl text-left mb-12"
      >
        <h2 class="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#090c1d] mb-3 font-display">
          Câu hỏi thường gặp
        </h2>
        <p class="text-[#52525b] text-base leading-relaxed">
          Giải đáp các thắc mắc phổ biến của sinh viên khi sử dụng và vận hành CTU Scheduler.
        </p>
      </motion.div>

      <motion.div
        :initial="{ opacity: 0, y: 20 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :inViewOptions="{ once: true }"
        :transition="{ duration: 0.45, delay: 0.1, ease: [0.33, 1, 0.68, 1] }"
        class="clickup-card-elevated !p-0 divide-y divide-[#e4e4e7] bg-white border border-[#e4e4e7] shadow-card overflow-hidden"
      >
        <div
          v-for="(item, index) in faqList"
          :key="index"
          class="transition-colors"
        >
          <button
            type="button"
            class="w-full p-4 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-[#f8f9fa] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00529c]/50 transition-colors"
            :aria-expanded="openIndex === index"
            @click="toggleFaq(index)"
          >
            <h3 class="font-bold text-[#090c1d] text-sm sm:text-base font-display flex items-center gap-2.5">
              <span class="w-2 h-2 rounded-full bg-[#00529c] shrink-0"></span>
              <span>{{ item.question }}</span>
            </h3>
            <motion.span
              class="w-7 h-7 rounded-full flex items-center justify-center shrink-0 origin-center transition-colors duration-200 transform-gpu"
              :class="openIndex === index ? 'bg-[#f0f7ff] text-[#00529c]' : 'bg-[#f4f4f5] text-[#52525b]'"
              :initial="false"
              :animate="{ rotate: openIndex === index ? 180 : 0 }"
              :transition="{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </motion.span>
          </button>

          <!-- Smooth Height Expansion + motion-v content transition -->
          <div
            class="grid transition-[grid-template-rows] duration-250 ease-[cubic-bezier(0.33,1,0.68,1)]"
            :class="openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
          >
            <div class="overflow-hidden">
              <motion.div
                :initial="false"
                :animate="{
                  opacity: openIndex === index ? 1 : 0,
                }"
                :transition="{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }"
                class="px-4 sm:px-6 pb-5 pt-0 text-[#52525b] text-xs sm:text-sm leading-relaxed pl-[28px] sm:pl-[34px] transform-gpu"
              >
                {{ item.answer }}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { motion, AnimatePresence } from 'motion-v';

const openIndex = ref(0);

const toggleFaq = (index) => {
  openIndex.value = openIndex.value === index ? -1 : index;
};

const faqList = [
  {
    question: 'Tại sao lại là ứng dụng Desktop mà không phải một trang Web?',
    answer: 'Ứng dụng Desktop giúp tận dụng tối đa tài nguyên máy tính cá nhân để chạy mượt mà thuật toán sinh tổ hợp lịch học phức tạp. Quan trọng hơn, nó bảo đảm tính riêng tư tuyệt đối cho tài khoản MyCTU của bạn (vì không gửi qua máy chủ trung gian) và cho phép bạn xem lại thời khóa biểu mọi lúc ngay cả khi mất mạng.'
  },
  {
    question: 'Nếu hệ thống trường đột ngột đổi giao diện hoặc cấu trúc dữ liệu thì sao?',
    answer: 'CTU Scheduler được thiết kế thông minh theo dạng mô-đun. Khi có thay đổi, nhóm chỉ cần cập nhật riêng mô-đun thu thập dữ liệu là ứng dụng có thể hoạt động bình thường mà không cần lập trình lại toàn bộ hệ thống.'
  },
  {
    question: 'Ứng dụng có phiên bản dành cho điện thoại di động (Mobile) không?',
    answer: 'Hiện tại dự án tập trung hoàn thiện phiên bản Desktop cho máy tính. Vì được xây dựng trên công nghệ đa nền tảng, một phiên bản thu gọn dành cho Mobile có thể được nhóm nghiên cứu phát triển trong tương lai nếu có đủ điều kiện.'
  },
  {
    question: 'Tại sao ứng dụng đôi khi bị chậm hoặc báo lỗi kết nối khi đăng nhập?',
    answer: 'Nguyên nhân chủ yếu do máy chủ MyCTU của trường bị quá tải vào giờ cao điểm đăng ký, hoặc đường truyền mạng chập chờn. Bạn nên kiểm tra lại kết nối mạng, hoàn thành xác thực Captcha trên cửa sổ trình duyệt ngầm nếu có yêu cầu, hoặc thử chuyển sang mạng 4G/5G / bật ứng dụng 1.1.1.1 để kết nối ổn định hơn.'
  },
  {
    question: 'Ứng dụng có tự động bấm đăng ký môn học thay cho sinh viên không?',
    answer: 'Không. CTU Scheduler tập trung hoàn toàn vào việc giúp sinh viên lên lịch học tối ưu, cá nhân hóa tiêu chí và theo dõi biến động sĩ số lớp học phần, không can thiệp vào hành động bấm nút đăng ký chính thức của bạn trên MyCTU.'
  }
];
</script>
