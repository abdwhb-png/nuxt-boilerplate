<script setup lang="ts">
const appConfig = useAppConfig();
</script>
<template>
  <div class="min-h-screen bg-gray-50">
    <div class="py-12 sm:py-24">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <h1
            class="text-4xl font-bold tracking-tight text-primary-800 sm:text-6xl"
          >
            {{ appConfig.appName }}
          </h1>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            A Nuxt 3 starter with Tailwind CSS.
            <br />
            This starter uses Nuxt 4 directory structure with compability
            version 4.
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              class="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Get started
            </a>
            <a href="#" class="text-sm font-semibold leading-6 text-gray-900">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
