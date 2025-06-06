<script setup lang="ts">
definePageMeta({
  title: "page.title",
  description: "page.description",
});

// Use Pinia store for features management
const featuresStore = useFeaturesStore();

// Get features and tech stack from store
const { features, techStack } = storeToRefs(featuresStore);

// Load features on component mount
onMounted(() => {
  featuresStore.fetchFeatures();
});
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden relative"
  >
    <!-- Background Chart/Graph Elements -->
    <HomeBackgroundChart />

    <!-- Navigation -->
    <HomeNavigation />

    <!-- Floating Feature Cards -->
    <HomeFloatingFeatureCard
      v-for="feature in features"
      :key="feature.name"
      :feature="feature"
    />

    <!-- Hero Section -->
    <HomeHeroSection />

    <!-- Features Section with Dark Theme -->
    <HomeFeaturesSection :features="features" />

    <!-- CTA Section with Dark Theme -->
    <HomeCTASection />

    <!-- Tech Stack Section -->
    <HomeTechStack :tech-stack="techStack" />

    <!-- Decorative Gradient Orbs -->
    <HomeDecorativeOrbs />

    <!-- Pinia Store Demo Component -->
    <HomePiniaDemo />
  </div>
</template>
