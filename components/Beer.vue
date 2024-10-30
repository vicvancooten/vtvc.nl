<template>
  <NuxtLink
    :to="`https://untappd.com/user/${username}`"
    class="fact"
    v-if="success"
    target="_blank"
  >
    <header>
      <Icon name="simple-icons:untappd" />
      Beer stats
    </header>

    <div class="value">
      <!-- Total beers -->

      <div>
        <Icon name="mdi:beer" />

        <strong>{{ totalBeers }}</strong>
        total
      </div>

      <div>
        <Icon name="ph:beer-bottle-fill" />

        <strong>{{ uniqueBeers }}</strong>
        unique
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import type { Response } from '~/server/api/beer.get'

// Fetch the data on the server, as well as keeping it up to date on the client

const { data, initialFetch } = useFetchData<Response>(
  '/api/beer', // Spotify endpoint
  30, // Update every 15 seconds
)

// This tells the server renderer to wait until the fetch is done. Without this, data would be null and the component wouldn't be rendered.
await initialFetch()

const success = data.value.success
const { username, totalBeers, uniqueBeers, badges } = data.value?.data ?? {}
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: none;
  }
}
.value {
  & > div {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .flag {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>
