<template>
  <div class="fact">
    <header>
      <Icon name="mdi:fire" />
      Duolingo streak
    </header>
    <div class="value">
      <div>
        <strong>{{ streak }}</strong>
        days
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { data: duolingoData } = await useFetch('/api/duolingo')
const streak = duolingoData.value?.streak ?? 0
</script>
