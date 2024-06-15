<template>
  <div class="fact">
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
    </div>
  </div>
</template>

<script lang="ts" setup>
const { data: duolingoData } = await useFetch('/api/duolingo')
const streak = duolingoData.value?.streak ?? 0
</script>
