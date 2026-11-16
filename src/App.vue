<template>
  <div class="min-h-screen flex flex-col bg-white text-[#202020] font-sans">
    <Navbar />
    <main class="flex-grow">
      <Hero />
      <AutomationFlow />
      <Features />
      <AlgorithmBento />
      <Ecosystem />
      <DownloadSection />
      <FaqSection />
      <TeamSection />
      <AuroraCtaBanner />
      <FeedbackSection />
    </main>
    <FooterSection />
    <ScrollToTop />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import Hero from './components/Hero.vue';
import AutomationFlow from './components/AutomationFlow.vue';
import Features from './components/Features.vue';
import AlgorithmBento from './components/AlgorithmBento.vue';
import Ecosystem from './components/Ecosystem.vue';
import DownloadSection from './components/DownloadSection.vue';
import FaqSection from './components/FaqSection.vue';
import TeamSection from './components/TeamSection.vue';
import AuroraCtaBanner from './components/AuroraCtaBanner.vue';
import FeedbackSection from './components/FeedbackSection.vue';
import FooterSection from './components/FooterSection.vue';
import ScrollToTop from './components/ScrollToTop.vue';
</script>
