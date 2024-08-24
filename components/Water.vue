<template>
  <div class="fact" v-if="state > 0">
    <header>
      <Icon name="mdi:glass" />
      Water intake
    </header>
    <div class="value">
      <div>
        <Icon name="mdi:water" />

        <strong>
          {{
            Intl.NumberFormat('nl-NL', {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            }).format(state)
          }}
        </strong>
        L
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ResponseType } from '~/server/api/water.get'

const { data, initialFetch } = await useFetchData<ResponseType>(
  '/api/water',
  60,
)

await initialFetch()

const state = data.value?.state ?? 0
</script>

<style scoped lang="scss">
.value > div {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
