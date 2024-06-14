<template>
  <div class="fact">
    <header>
      <Icon name="ion:trending-up-outline" />
      Lifetime music stats
    </header>
    <div class="value">
      <ul>
        <li>
          <strong>
            {{ Intl.NumberFormat('nl-NL').format(play_count) }}
          </strong>
          plays
        </li>
        <li>
          <strong>
            {{ Intl.NumberFormat('nl-NL').format(album_count) }}
          </strong>
          albums
        </li>
        <li>
          <strong>
            {{ Intl.NumberFormat('nl-NL').format(artist_count) }}
          </strong>
          artists
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { LastfmStatsResponseType } from '~/server/api/lastfm-stats.get'

const { data, initialFetch } = await useFetchData<LastfmStatsResponseType>(
  '/api/lastfm-stats',
  30,
)

await initialFetch()

const { play_count, album_count, artist_count } = data.value ?? {
  play_count: 0,
  album_count: 0,
  artist_count: 0,
}
</script>
