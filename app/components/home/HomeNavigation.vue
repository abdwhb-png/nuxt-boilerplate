<script setup lang="ts">
const {appName} = useApp();
</script>

<template>
  <nav class="relative z-20 flex items-center justify-between p-6 lg:px-8">
    <div class="flex items-center">
      <ULink href="/" class="flex items-center space-x-2">
        <div
          class="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center"
        >
          <span class="text-white font-bold text-sm">{{ getFirstChar(appName) }}</span>
        </div>
        <span class="font-semibold text-lg">{{ appName }}</span>
      </ULink>
    </div>

    <div class="hidden md:flex items-center space-x-8">
      <a href="#" class="text-gray-300 hover:text-white transition-colors">
        Home
      </a>
      <a
        href="#features"
        class="text-gray-300 hover:text-white transition-colors"
      >
        Features
      </a>
      <a
        href="#components"
        class="text-gray-300 hover:text-white transition-colors"
      >
        Components
      </a>
      <a href="#docs" class="text-gray-300 hover:text-white transition-colors">
        Docs
      </a>
      <a
        href="#github"
        class="text-gray-300 hover:text-white transition-colors"
      >
        GitHub
      </a>
      <div class="flex items-center space-x-2">
        <span class="text-gray-300">v3.0</span>
        <div
          class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
        >
          <span class="text-white text-xs font-bold">✓</span>
        </div>
      </div>
    </div>

    <UButton
      variant="outline"
      class="hidden md:block border-white text-white hover:bg-white hover:text-black"
      :to="'/auth'"
    >
      Get Started
    </UButton>
  </nav>
</template>
