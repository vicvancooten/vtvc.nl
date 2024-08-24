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
    </div>
  </div>
</template>

<script lang="ts" setup>
const { data } = await useFetch('/api/duolingo')
const success = data.value?.success
const streak = data.value?.streak ?? -1
</script>
