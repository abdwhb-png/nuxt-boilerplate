<script setup lang="ts">
interface FeatureCardProps {
  feature: {
    name: string;
    icon: string;
    position: Record<string, string>;
  };
}

defineProps<FeatureCardProps>();
</script>

<template>
  <div
    class="absolute z-10 backdrop-blur-md bg-white/10 rounded-xl p-4 border border-white/20 shadow-xl hover:bg-white/20 transition-all duration-300"
    :style="feature.position"
  >
    <div class="flex items-center space-x-3">
      <div
        class="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center"
      >
        <Icon :name="feature.icon" class="w-5 h-5 text-white" />
      </div>
      <div>
        <div class="font-semibold text-sm">
          {{ $t(`home.features.${feature.name}.title`) }}
        </div>
        <div class="text-xs text-gray-300 max-w-32 truncate">
          {{ $t(`home.features.${feature.name}.description`) }}
        </div>
      </div>
    </div>
  </div>
</template>
