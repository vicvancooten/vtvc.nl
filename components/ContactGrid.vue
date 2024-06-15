<template>
  <div class="contact">
    <h3>Contact me</h3>
    <div class="contact-grid">
      <!-- Github -->
      <NuxtLink :to="html_url" target="_blank" class="contact-item">
        <div class="channel-badge">
          <Icon name="mdi:github" />
          <div class="label">{{ followers }}</div>
        </div>
      </NuxtLink>

      <!-- LinkedIn -->
    </div>
  </div>
</template>

<script lang="ts" setup>
const { data: githubData } = await useFetch('/api/github')

const { followers, html_url } = githubData.value ?? {}
</script>

<style lang="scss" scoped>
.contact-grid {
  display: flex;
  gap: 0.5rem;

  .contact-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;

    .channel-badge {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background-color: var(--accent-color-semi-transparent);
      padding: 0.25rem;
      color: white;
      border-radius: 0.5rem;

      .label {
        font-size: 1.1rem;
      }
    }
  }
}
</style>
