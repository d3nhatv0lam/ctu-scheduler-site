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
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[-0.03em] text-[#090c1d] mb-3 font-display text-balance">
          Câu hỏi thường gặp
        </h2>
        <p class="text-[#52525b] text-sm sm:text-base leading-relaxed text-pretty">
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
            class="w-full p-4 sm:p-6 text-left flex items-start sm:items-center justify-between gap-3 sm:gap-4 hover:bg-[#f8f9fa] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00529c]/50 transition-colors"
            :aria-expanded="openIndex === index"
            @click="toggleFaq(index)"
          >
            <h3 class="font-bold text-[#090c1d] text-sm sm:text-base font-display flex items-start sm:items-center gap-2.5 text-balance leading-snug">
              <span class="w-2 h-2 rounded-full bg-[#00529c] shrink-0 mt-1.5 sm:mt-0"></span>
              <span>{{ item.question }}</span>
            </h3>
            <motion.span
              class="w-7 h-7 rounded-full flex items-center justify-center shrink-0 origin-center transition-colors duration-200 mt-0.5 sm:mt-0 transform-gpu"
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
          <AnimatePresence :initial="false">
            <motion.div
              v-if="openIndex === index"
              :initial="{ height: 0, opacity: 0 }"
              :animate="{ height: 'auto', opacity: 1 }"
              :exit="{ height: 0, opacity: 0 }"
              :transition="{ duration: 0.28, ease: [0.33, 1, 0.68, 1] }"
              class="overflow-hidden"
            >
              <div
                class="px-4 sm:px-6 pb-5 pt-0 text-[#52525b] text-xs sm:text-sm leading-relaxed pl-[28px] sm:pl-[34px] text-pretty"
              >
                {{ item.answer }}
              </div>
            </motion.div>
          </AnimatePresence>
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
    question: 'Ứng dụng có lưu mật khẩu hoặc thông tin tài khoản của tôi không?',
    answer: 'Hoàn toàn không. Thông tin đăng nhập chỉ được lưu tạm thời trong bộ nhớ RAM trên máy tính của bạn trong lúc gửi yêu cầu xác thực trực tiếp đến MyCTU. Phần mềm không bao giờ ghi mật khẩu xuống đĩa cứng và tuyệt đối không gửi dữ liệu qua bất kỳ máy chủ trung gian nào của nhóm phát triển hay bên thứ ba.'
  },
  {
    question: 'Tại sao lại là ứng dụng máy tính mà không phải một trang web?',
    answer: 'Ứng dụng máy tính giúp tận dụng sức mạnh xử lý trên thiết bị của bạn để xếp lịch nhanh chóng. Quan trọng hơn, mọi kết nối đều diễn ra trực tiếp từ máy của bạn đến hệ thống MyCTU mà không qua máy chủ trung gian của nhóm phát triển hay bên thứ ba, bảo đảm an toàn dữ liệu và cho phép bạn xem lại lịch học bất cứ lúc nào khi cần.'
  },
  {
    question: 'Nếu hệ thống trường đột ngột đổi giao diện hoặc cấu trúc dữ liệu thì sao?',
    answer: 'CTU Scheduler được thiết kế theo dạng mô-đun độc lập. Khi có thay đổi từ phía trường, nhóm chỉ cần cập nhật mô-đun kết nối và phát hành phiên bản mới qua hệ thống cập nhật tự động của phần mềm.'
  },
  {
    question: 'Tại sao ứng dụng đôi khi bị chậm hoặc báo lỗi kết nối khi đăng nhập?',
    answer: 'Nguyên nhân chủ yếu do máy chủ MyCTU của trường thường bị quá tải vào các khung giờ cao điểm đăng ký học phần, hoặc đường truyền mạng chập chờn. Bạn có thể kiểm tra lại kết nối mạng, thử chuyển sang mạng 4G/5G hoặc kiên nhẫn thử lại sau vài phút.'
  },
  {
    question: 'Ứng dụng có tự động bấm đăng ký môn học thay cho sinh viên không?',
    answer: 'Không. CTU Scheduler tập trung vào việc giúp sinh viên chuẩn bị trước thời khóa biểu tối ưu và theo dõi tình trạng sĩ số lớp học phần. Ứng dụng không can thiệp hay tự động bấm đăng ký môn học thay bạn trên cổng trường.'
  },
  {
    question: 'Ứng dụng có phiên bản dành cho điện thoại di động không?',
    answer: 'Hiện tại dự án tập trung tối ưu trải nghiệm trên máy tính để phục vụ việc xem và xếp thời khóa biểu trực quan nhất. Bạn có thể sao chép liên kết tải về trên điện thoại để gửi qua laptop sử dụng.'
  }
];
</script>
