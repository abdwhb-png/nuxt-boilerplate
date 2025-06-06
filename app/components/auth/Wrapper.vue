<script setup lang="ts">
import LoginForm from "./LoginForm.vue";
import RegisterForm from "./RegisterForm.vue";
const items = [
  {
    title: "login",
    component: LoginForm,
  },
  {
    title: "register",
    component: RegisterForm,
  },
];

// Default to login form
const currentComponent = ref(markRaw(items[0].component));

const handleChange = (title: string) => {
  const foundItem = items.find(
    (item) => item.title.toLowerCase() === title.toLowerCase()
  );
  if (foundItem) {
    currentComponent.value = markRaw(foundItem.component);
  } else {
    console.warn(`Component with title "${title}" not found.`);
  }
};
</script>

<template>
  <component :is="currentComponent" @change="handleChange" />
</template>
