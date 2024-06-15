<template>
  <div class="contact">
    <h2>Contact me</h2>
    <div class="contact-grid">
      <!-- LinkedIn -->
      <NuxtLink
        to="https://www.linkedin.com/in/vtvc"
        target="_blank"
        class="contact-item"
      >
        <div class="channel-badge linkedin">
          <Icon name="mdi:linkedin" />
          <div class="label">Connect</div>
        </div>
      </NuxtLink>

      <!-- Email -->
      <NuxtLink to="mailto:hello@vtvc.nl" target="_blank" class="contact-item">
        <div class="channel-badge mail">
          <Icon name="mdi:email" />
          <div class="label">Email</div>
        </div>
      </NuxtLink>

      <!-- Github -->
      <NuxtLink :to="html_url" target="_blank" class="contact-item">
        <div class="channel-badge github">
          <Icon name="mdi:github" />
          <div class="label">{{ followers }} followers</div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { data: githubData } = await useFetch('/api/github')

const { followers, html_url } = githubData.value ?? {}
</script>

<style lang="scss" scoped>
h2 {
  font-size: 1.15rem;
  margin-bottom: 0.5rem;
}
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
      padding: 0.25rem 0.5rem;
      color: white;
      border-radius: 0.5rem;
      transition: all 0.3s eaae;

      .label {
        font-size: 1.1rem;
      }

      &.github {
        background-color: #24292e;
      }

      &.linkedin {
        background-color: #0077b5;
      }

      &.mail {
        background-color: var(--accent-color);
      }

      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>
