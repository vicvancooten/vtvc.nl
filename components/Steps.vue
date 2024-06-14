<template>
  <div class="fact" v-if="steps > 999">
    <header>
      <Icon name="fa-solid:shoe-prints" />
      Steps today
    </header>
    <div class="value">
      <div>
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
