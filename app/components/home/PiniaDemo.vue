<script setup lang="ts">
const featuresStore = useFeaturesStore();
const { activeFeatures, totalFeatures, averagePerformance, isLoading } =
  storeToRefs(featuresStore);

// Demo function to toggle a feature
const handleToggleFeature = (featureName: string) => {
  featuresStore.toggleFeature(featureName);
};

// Demo function to update feature stats
const handleUpdateStats = (featureName: string) => {
  const randomUsage = Math.floor(Math.random() * 100);
  const randomPerformance = Math.floor(Math.random() * 100);
  featuresStore.updateFeatureStats(featureName, {
    usage: randomUsage,
    performance: randomPerformance,
  });
};
</script>

<template>
  <div
    class="fixed top-4 right-4 bg-gray-900/90 backdrop-blur-md border border-gray-700/50 rounded-lg p-4 text-white text-sm max-w-xs z-50"
  >
    <h3 class="font-semibold mb-3 text-green-400">Pinia Store Demo</h3>

    <!-- Store Stats -->
    <div class="space-y-2 mb-4">
      <div class="flex justify-between">
        <span>Total Features:</span>
        <span class="text-green-400">{{ totalFeatures }}</span>
      </div>
      <div class="flex justify-between">
        <span>Active Features:</span>
        <span class="text-green-400">{{ activeFeatures.length }}</span>
      </div>
      <div class="flex justify-between">
        <span>Avg Performance:</span>
        <span class="text-green-400">{{ averagePerformance }}%</span>
      </div>
      <div class="flex justify-between">
        <span>Loading:</span>
        <span :class="isLoading ? 'text-yellow-400' : 'text-green-400'">
          {{ isLoading ? "Yes" : "No" }}
        </span>
      </div>
    </div>

    <!-- Feature Actions -->
    <div class="space-y-2">
      <div class="text-xs text-gray-400 mb-2">Demo Actions:</div>

      <button
        class="w-full text-xs bg-blue-600/80 hover:bg-blue-600 px-2 py-1 rounded transition-colors"
        @click="handleToggleFeature('typescript')"
      >
        Toggle TypeScript
      </button>

      <button
        class="w-full text-xs bg-purple-600/80 hover:bg-purple-600 px-2 py-1 rounded transition-colors"
        @click="handleUpdateStats('pinia')"
      >
        Update Pinia Stats
      </button>

      <button
        class="w-full text-xs bg-green-600/80 hover:bg-green-600 px-2 py-1 rounded transition-colors"
        @click="featuresStore.fetchFeatures()"
      >
        Refresh Features
      </button>
    </div>
    <!-- Loading Indicator -->
    <div v-if="isLoading" class="mt-3 flex items-center justify-center">
      <div
        class="animate-spin rounded-full h-4 w-4 border-b-2 border-green-400"
      />
      <span class="ml-2 text-xs text-gray-400">Loading...</span>
    </div>
  </div>
</template>

<style scoped>
/* Ensure it's above other elements */
.z-50 {
  z-index: 50;
}
</style>
