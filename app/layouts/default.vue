<script setup lang="ts">
const appConfig = useAppConfig();
const mobileMenuOpen = ref(false);
</script>

<template>
  <div>
    <UContainer>
      <header class="py-4 mb-6 border-b">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="text-xl font-bold">
            {{ appConfig.appName }}
          </NuxtLink>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex space-x-4">
            <NuxtLink to="/" class="hover:text-primary-500 transition-colors"
              >Home</NuxtLink
            >
            <NuxtLink
              to="/about"
              class="hover:text-primary-500 transition-colors"
              >About</NuxtLink
            >
            <NuxtLink
              to="/contact"
              class="hover:text-primary-500 transition-colors"
              >Contact</NuxtLink
            >
          </nav>

          <!-- Mobile Menu Button -->
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden">
            <UIcon name="i-heroicons-bars-3" class="w-6 h-6" />
          </button>
        </div>

        <!-- Mobile Navigation -->
        <div v-if="mobileMenuOpen" class="md:hidden mt-4 space-y-2">
          <NuxtLink
            to="/"
            class="block py-2 hover:text-primary-500 transition-colors"
            >Home</NuxtLink
          >
          <NuxtLink
            to="/about"
            class="block py-2 hover:text-primary-500 transition-colors"
            >About</NuxtLink
          >
          <NuxtLink
            to="/contact"
            class="block py-2 hover:text-primary-500 transition-colors"
            >Contact</NuxtLink
          >
        </div>
      </header>

      <main class="min-h-[calc(100vh-200px)]">
        <slot />
      </main>

      <footer class="py-4 mt-8 border-t text-center text-sm text-gray-500">
        <p>
          &copy; {{ new Date().getFullYear() }} {{ appConfig.appName }}. All
          rights reserved.
        </p>
      </footer>
    </UContainer>
  </div>
</template>
