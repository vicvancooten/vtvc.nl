<template>
  <div class="spotify" v-if="isPlaying" @click="resetSpotifyAnimation">
    <NuxtImg
      :src="albumImage"
      :style="{ animationDuration }"
      :class="['album-art', { animating: animateSpotify }]"
    />
    <div class="text">
      Right now, I'm listening to
      <NuxtLink :href="trackUrl">{{ trackName }}</NuxtLink>
      by
      <NuxtLink :href="artistUrl">
        {{ artistName }}
      </NuxtLink>
      (from
      <NuxtLink :href="albumUrl">{{ albumName }}</NuxtLink>
      )
    </div>
    <Icon
      name="bi:spotify"
      :style="{ animationDuration }"
      :class="{ animating: animateSpotify }"
    />
  </div>
</template>

<script lang="ts" setup>
import type { NowPlayingResponse } from '~/server/api/spotify.get'

// Fetch the data on the server, as well as keeping it up to date on the client
const { data, initialFetch } = useFetchData<NowPlayingResponse>(
  '/api/spotify', // Spotify endpoint
  15, // Update every 15 seconds
)

// This tells the server renderer to wait until the fetch is done. Without this, data would be null and the component wouldn't be rendered.
await initialFetch()

// Let's initialise some empty variables
let isPlaying = false
let trackName: string
let trackUrl: string
let albumName: string
let albumUrl: string
let artistName: string
let artistUrl: string
let albumImage: string
let animationDuration: string

// Quick access the variables
if (data.value?.isPlaying) {
  isPlaying = true
  const { track, artists, album } = data.value
  if (track && artists && album) {
    trackName = track.name
    trackUrl = track.url
    albumName = album.name
    albumUrl = album.url
    artistName = artists[0].name
    artistUrl = artists[0].url
    albumImage = album.image

    // Spotify BPM matching
    animationDuration = `${(1 / track!.beatsPerSecond) * track!.timeSignature}s`
  }
}

// Animation state
const animateSpotify = ref(true)
function resetSpotifyAnimation() {
  animateSpotify.value = false
  setTimeout(() => {
    animateSpotify.value = true
  }, 100)
}
</script>

<style scoped lang="scss">
.spotify {
  display: flex;
  gap: 1rem;
  align-items: center;
  font-size: 1.1rem;
  padding: 1rem;
  border: 1px solid #1db954;
  border-radius: 1rem;

  svg {
    border-radius: 50%;
    transform: scale(1);
    padding: 0;
    margin: 0;
    color: #1db954;
    width: 1.5rem;
    height: 1.5rem;
    &.animating {
      animation: pulse 100s infinite;
    }
  }

  .album-art {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    &.animating {
      animation: pulse 100s infinite;
    }
  }

  .text {
    flex: 1;
    text-align: center;
  }

  a {
    color: var(--accent-color);
    text-decoration: none;
    font-weight: 600;
  }
}

// BPM animation
// Animation speed is used for matching this animation to the BPM of the currently playing song
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0px rgba(29, 185, 84, 1);
    transform: scale(1);
  }
  25% {
    transform: scale(1.15);
  }
  50% {
    box-shadow: 0 0 0 0.7rem rgba(29, 185, 84, 0);
    transform: scale(1);
  }
  75% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
