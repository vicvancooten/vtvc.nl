<template>
  <div class="page"><div class="center">Well, hello there</div></div>
</template>

<script setup lang="ts">
// Default value
let primaryColor = "black";

const { data } = await useFetch("/api/hass");

primaryColor = data.value?.color ?? primaryColor;

// Now use useHead to set the --primary-color variable globally
useHead({
  style: [
    {
      innerHTML: `:root { --primary-color: ${primaryColor}; }`,
    },
  ],
});
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}

.page {
  background-color: var(--primary-color);
  transition: all 0.3s ease;
  height: 100vh;
  color: white;
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
}
</style>
