<template>
  <div class="fact">
    <header>
      <Icon name="ion:trending-up-outline" />
      Lifetime music stats
    </header>
    <div class="value">
      <div class="stats-grid">
        <!-- Plays -->
        <div class="stat">
          <Icon name="mdi:music" />
          <span>
            <strong>
              {{ Intl.NumberFormat('nl-NL').format(play_count) }}
            </strong>
            plays
          </span>
        </div>

        <!-- Albums -->
        <div class="stat">
          <Icon name="iconamoon:music-album" />
          <span>
            <strong>
              {{ Intl.NumberFormat('nl-NL').format(album_count) }}
            </strong>
            albums
          </span>
        </div>

        <!-- Artists -->
        <div class="stat">
          <Icon name="fluent:guitar-16-filled" />
          <span>
            <strong>
              {{ Intl.NumberFormat('nl-NL').format(artist_count) }}
            </strong>
            artists
          </span>
        </div>
      </div>
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

<style scoped lang="scss">
.stats-grid {
  display: flex;
  flex-direction: column;

  .stat {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }
}
</style>
