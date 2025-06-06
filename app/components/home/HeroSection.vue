<script setup lang="ts">
const appStore = useAppStore();
const featuresStore = useFeaturesStore();
const { totalFeatures, averagePerformance, activeFeatures } =
  storeToRefs(featuresStore);
</script>

<template>
  <section
    class="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center"
  >
    <div class="max-w-4xl mx-auto">
      <!-- Build Amazing Apps Badge -->
      <div
        class="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-8 border border-white/20"
      >
        <Icon name="heroicons:rocket-launch" class="w-4 h-4 text-green-400" />
        <span class="text-sm">{{ $t("home.hero.features_title") }}</span>
        <Icon name="heroicons:arrow-right" class="w-4 h-4 text-gray-400" />
      </div>

      <h1 class="text-6xl lg:text-8xl font-bold mb-6 leading-tight">
        {{ $t("home.hero.title") }}
        <span
          class="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          {{ appStore.appName }}
        </span>
      </h1>

      <p
        class="text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
      >
        {{ $t("home.hero.subtitle") }}
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
        <UButton
          size="xl"
          class="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 text-lg"
          :to="'/auth'"
        >
          {{ $t("buttons.getStarted") }}
          <Icon name="heroicons:arrow-right" class="ml-2 w-5 h-5" />
        </UButton>
        <UButton
          variant="outline"
          size="xl"
          class="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg underline"
          :to="'/dashboard'"
        >
          {{ $t("buttons.learnMore") }}
        </UButton>
      </div>
    </div>
    <!-- Development Stats -->
    <div
      class="absolute bottom-20 right-8 bg-white/10 backdrop-blur-md rounded-lg px-4 py-3 border border-white/20 space-y-2"
    >
      <div class="text-sm font-semibold">
        Features: {{ activeFeatures.length }}/{{ totalFeatures }}
      </div>
      <div class="text-xs text-gray-300">
        Performance: {{ averagePerformance }}%
      </div>
      <div class="w-8 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 mt-1" />
    </div>
    <!-- Scroll Indicator -->
    <div
      class="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:flex items-center space-x-2 text-gray-400"
    >
      <span class="text-sm">01/03</span>
      <span class="text-sm">Scroll down</span>
      <Icon name="heroicons:chevron-down" class="w-4 h-4 animate-bounce" />
    </div>
  </section>
</template>
