<script setup lang="ts">
const route = useRoute();
const {appName} = useApp();
const toastStore = useToastStore();
const { $t, $has } = useI18n();

useHead({
  titleTemplate(title) {
    return title ? `%s - ${appName.value}` : appName.value;
  },
});

useSeoMeta({
  title: $has(route.meta.title as string) ? $t(route.meta.title as string) : appName.value,
  description: $has(route.meta.description as string) ? getTranslation(route.meta.description as string) : getTranslation("layouts.description"),
})

watch(
  () => [...toastStore.bus], // Create a new array reference for watching
  (newBus) => {
    if (newBus.length > 0) {
      // Process the bus items safely
      const toProcess = [...newBus];
      toastStore.clearBus();
      toProcess.forEach((toastEl) => {
        const toast = useToast();
        toast.add(toastEl);
      });
    }
  }
);
</script>

<template>
  <NuxtLoadingIndicator />
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.slide-left-leave-active,
.slide-left-enter-active,
.slide-right-leave-active,
.slide-right-enter-active {
  transition: 0.3s ease;
  /* position: absolute;
  width: 100%; */
}

.slide-left-enter-from {
  transform: translateX(100%);
}
.slide-left-enter-to {
  transform: translateX(0);
}
/* .slide-left-leave-from {
  transform: translateX(0);
}
.slide-left-leave-to {
  transform: translateX(-100%);
} */

.slide-right-enter-from {
  transform: translateX(-100%);
}
.slide-right-enter-to {
  transform: translateX(0);
}
/* .slide-right-leave-from {
  transform: translateX(0);
}
.slide-right-leave-to {
  transform: translateX(100%);
} */
</style>
