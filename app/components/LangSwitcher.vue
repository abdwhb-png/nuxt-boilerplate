<script setup lang="ts">
const { $t, $getLocale , $getLocales, $switchLocale } = useI18n()

const locale = $getLocale();
const locales = $getLocales()

// Language data with flags and names
const languageData = {
  en: {
    code: "en",
    name: "English",
    flag: "🇺🇸",
    nativeName: "English",
  },
  fr: {
    code: "fr",
    name: "Français",
    flag: "🇫🇷",
    nativeName: "Français",
  },
};

const isOpen = ref(false);

const currentLanguage = computed(
  () => languageData[locale as keyof typeof languageData]
);

const availableLanguages = computed(() =>
  locales.filter((loc) => loc.code !== locale)
);

const switchLanguage = (code: string) => {
  $switchLocale(code);
  isOpen.value = false;
};

// Close dropdown when clicking outside
onMounted(() => {
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (!target.closest(".lang-switcher")) {
      isOpen.value = false;
    }
  });
});
</script>

<template>
  <div class="lang-switcher fixed bottom-4 left-4 z-50">
    <!-- Main Button -->
    <div class="relative">
      <button
        class="group flex items-center gap-2 px-3 py-2 bg-gray-900/80 backdrop-blur-md border border-gray-700/50 rounded-lg text-white text-sm font-medium transition-all duration-200 hover:bg-gray-800/90 hover:border-gray-600/60 hover:scale-105 shadow-lg hover:shadow-xl"
        @click="isOpen = !isOpen"
      >
        <span class="text-lg">{{ currentLanguage.flag }}</span>
        <span class="hidden sm:inline">{{ currentLanguage.nativeName }}</span>
        <Icon
          name="heroicons:chevron-up"
          class="w-4 h-4 transition-transform duration-200"
          :class="{ 'rotate-180': isOpen }"
        />
      </button>

      <!-- Dropdown Menu -->
      <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 scale-95 translate-y-2"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 translate-y-2"
      >
        <div
          v-if="isOpen"
          class="absolute bottom-full left-0 mb-2 min-w-[140px] bg-gray-900/90 backdrop-blur-md border border-gray-700/50 rounded-lg shadow-xl overflow-hidden"
        >
          <button
            v-for="lang in availableLanguages"
            :key="lang.code"
            class="w-full flex items-center gap-3 px-3 py-2 text-white text-sm hover:bg-gray-800/60 transition-colors duration-150 border-b border-gray-700/30 last:border-b-0"
            @click="switchLanguage(lang.code)"
          >
            <span class="text-lg">{{
              languageData[lang.code as keyof typeof languageData].flag
            }}</span>
            <span>{{
              languageData[lang.code as keyof typeof languageData].nativeName
            }}</span>
          </button>
        </div>
      </Transition>
    </div>

    <!-- Accessibility Label -->
    <span class="sr-only">Change language</span>
  </div>
</template>

<style scoped>
.lang-switcher {
  /* Ensure it's above other fixed elements */
  z-index: 9999;
}
</style>
