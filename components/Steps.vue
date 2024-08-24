<template>
  <div class="fact" v-if="steps > 999">
    <header>
      <Icon name="gis:hiker" />
      Steps today
    </header>
    <div class="value">
      <div>
        <Icon name="fa-solid:shoe-prints" />

        <strong>{{ Intl.NumberFormat('nl-NL').format(steps) }}</strong>
        steps
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { StepsResponseType } from '~/server/api/steps.get'

const { data, initialFetch } = await useFetchData<StepsResponseType>(
  '/api/steps',
  30,
)

await initialFetch()

const steps = data.value?.steps ?? 0
</script>

<style scoped lang="scss">
.value > div {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
