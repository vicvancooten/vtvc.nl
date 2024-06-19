<template>
  <div class="fact" v-if="shopping_list_items > 0">
    <header>
      <Icon name="mdi:basket" />
      Items on shopping list
    </header>
    <div class="value">
      <div>
        <strong>
          {{ Intl.NumberFormat('nl-NL').format(shopping_list_items) }}
        </strong>
        {{ shopping_list_items === 1 ? 'item' : 'items' }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ResponseType } from '~/server/api/shopping.get.ts'

const { data, initialFetch } = await useFetchData<ResponseType>(
  '/api/shopping',
  30,
)

await initialFetch()

const shopping_list_items = data.value?.shopping_list_items ?? 0
</script>
