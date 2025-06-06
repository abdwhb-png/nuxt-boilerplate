<script setup lang="ts">
interface TechItem {
  name: string;
  logo: string;
}

interface TechStackProps {
  techStack: TechItem[];
}

defineProps<TechStackProps>();
</script>

<template>
  <section
    class="absolute bottom-0 left-0 right-0 z-10 bg-black/70 backdrop-blur-md border-t border-white/20 py-6"
  >
    <div class="max-w-6xl mx-auto px-6">
      <div class="flex items-center justify-center space-x-12 opacity-60">
        <div
          v-for="tech in techStack"
          :key="tech.name"
          class="flex items-center space-x-2"
        >
          <Icon :name="tech.logo" class="w-6 h-6 text-white" />
          <span class="text-sm text-gray-300">{{ tech.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
