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
        <CountryFlag
          :country="language.language"
          size="small"
          :title="language.title"
        />
        <strong>{{ Intl.NumberFormat('nl-NL').format(language.xp) }}</strong>
        XP
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CountryFlag from 'vue-country-flag-next'
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

  .small-flag {
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
  }
}
</style>
