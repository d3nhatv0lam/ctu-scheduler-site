<template>
  <div class="min-h-screen flex flex-col bg-[#08080a] text-[#e2e3e9]">
    <Navbar />
    <main class="flex-grow">
      <Hero />
      <HowItWorks />
      <Features />
      <Certification />
      <Ecosystem />
      <DownloadSection />
      <FaqSection />
      <TeamSection />
      <FeedbackSection />
    </main>
    <FooterSection />
    <ScrollToTop />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import Hero from './components/Hero.vue';
import HowItWorks from './components/HowItWorks.vue';
import Features from './components/Features.vue';
import Certification from './components/Certification.vue';
import Ecosystem from './components/Ecosystem.vue';
import DownloadSection from './components/DownloadSection.vue';
import FaqSection from './components/FaqSection.vue';
import TeamSection from './components/TeamSection.vue';
import FeedbackSection from './components/FeedbackSection.vue';
import FooterSection from './components/FooterSection.vue';
import ScrollToTop from './components/ScrollToTop.vue';
</script>

