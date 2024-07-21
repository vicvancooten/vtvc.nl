<template>
  <div class="fact" v-if="state > 0">
    <header>
      <Icon name="ion:water" />
      Water intake
    </header>
    <div class="value">
      <div>
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
