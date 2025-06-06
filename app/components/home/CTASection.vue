<template>
  <section
    class="relative z-10 bg-gradient-to-r from-green-900/50 to-blue-900/50 backdrop-blur-md border-t border-white/20"
  >
    <div class="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {{ $t("home.cta.title") }}
        </h2>
        <p class="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
          {{ $t("home.cta.description") }}
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <UButton
            size="xl"
            class="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
            :to="'/auth'"
          >
            {{ $t("buttons.getStarted") }}
          </UButton>
          <NuxtLink
            to="/dashboard"
            class="text-sm font-semibold leading-6 text-gray-300 hover:text-green-400 transition-colors"
          >
            {{ $t("buttons.learnMore") }} <span aria-hidden="true">→</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
