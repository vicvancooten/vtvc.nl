<template>
  <div class="fact" v-if="success">
    <header>
      <Icon name="simple-icons:duolingo" />
      Duolingo streak
    </header>
    <div class="value">
      <div>
        <Icon name="mdi:fire" />

        <strong>{{ streak }}</strong>
        days
      </div>

      <!-- Languages -->
      <div v-for="language in languages" :key="language.id">
        <NuxtImg
          :src="`https://aiclientportalprod.blob.core.windows.net/clientportal/static/flags/${language.language}.svg`"
          class="flag"
          :title="language.title"
        />
        <strong>{{ Intl.NumberFormat('nl-NL').format(language.xp) }}</strong>
        XP
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { data } = await useFetch('/api/duolingo')
const success = data.value?.success
const streak = data.value?.streak ?? -1
const languages = (data.value?.languages ?? []).slice(0, 2)
</script>

<style scoped lang="scss">
.value > div {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .flag {
    width: 1rem;
    height: 1rem;
  }
}
</style>
