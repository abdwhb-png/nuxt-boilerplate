<script setup lang="ts">
interface Feature {
  name: string;
  icon: string;
  position: Record<string, string>;
}

interface FeaturesSectionProps {
  features: Feature[];
}

defineProps<FeaturesSectionProps>();
</script>

<template>
  <section
    class="relative z-10 bg-black/50 backdrop-blur-md py-24 sm:py-32 border-t border-white/20"
  >
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center mb-16">
        <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {{ $t("home.hero.features_title") }}
        </h2>
      </div>
      <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <dl
          class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3"
        >
          <div
            v-for="feature in features"
            :key="feature.name"
            class="flex flex-col items-start bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
          >
            <div
              class="rounded-md bg-gradient-to-r from-green-500/20 to-blue-500/20 p-3 ring-1 ring-white/20"
            >
              <Icon :name="feature.icon" class="h-6 w-6 text-green-400" />
            </div>
            <dt class="mt-4 font-semibold text-white">
              {{ $t(`home.features.${feature.name}.title`) }}
            </dt>
            <dd class="mt-2 leading-7 text-gray-300">
              {{ $t(`home.features.${feature.name}.description`) }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>
