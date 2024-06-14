<template>
  <div
    class="fact now-playing"
    v-if="spotify.isPlaying"
    @click="resetSpotifyAnimation"
  >
    <header>
      <Icon name="bi:spotify" />
      Current jam
    </header>
    <div class="value">
      <div
        :style="{
          backgroundImage: `url(${spotify.albumImage})`,
          animationDuration: spotify.animationDuration,
        }"
        :class="['spotify', { animating: animateSpotify }]"
      >
        <Icon
          name="bi:spotify"
          :style="{ animationDuration: spotify.animationDuration }"
          :class="{ animating: animateSpotify }"
        />

        <div class="text">
          <div>
            Right now, I'm listening to
            <NuxtLink :href="spotify.trackUrl">
              {{ spotify.trackName }}
            </NuxtLink>
            by
            <NuxtLink :href="spotify.artistUrl">
              {{ spotify.artistName }}
            </NuxtLink>
            (from
            <NuxtLink :href="spotify.albumUrl">
              {{ spotify.albumName }}
            </NuxtLink>
            )
          </div>
        </div>

        <div class="space-filler" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { NowPlayingResponse } from '~/server/api/spotify.get'
const image = useImage()

// Fetch the data on the server, as well as keeping it up to date on the client
const { data, initialFetch } = useFetchData<NowPlayingResponse>(
  '/api/spotify', // Spotify endpoint
  15, // Update every 15 seconds
)

// This tells the server renderer to wait until the fetch is done. Without this, data would be null and the component wouldn't be rendered.
await initialFetch()

// Let's initialise some empty variables
const spotify = ref<{
  isPlaying: boolean
  trackName?: string
  trackUrl?: string
  albumName?: string
  albumUrl?: string
  artistName?: string
  artistUrl?: string
  animationDuration?: string
  albumImage?: string
}>({
  isPlaying: false,
})

// Now set the variables if the song is playing
watch(
  () => data.value,
  () => {
    if (data.value?.isPlaying) {
      const { track, artists, album } = data.value
      if (track && artists && album) {
        spotify.value = {
          isPlaying: true,
          trackName: track.name,
          trackUrl: track.url,
          albumName: album.name,
          albumUrl: album.url,
          artistName: artists[0].name,
          artistUrl: artists[0].url,
          animationDuration: `${(1 / track.beatsPerSecond) * track.timeSignature * 2}s`,
          albumImage: image(album.image, {
            blur: 10,
            width: 80,
            height: 80,
            formats: ['webp'],
          }),
        }
      }
    } else {
      spotify.value = { isPlaying: false }
    }
  },
  { immediate: true },
)

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
.now-playing {
  @media (min-width: 800px) {
    grid-row: 1 / span 2;
  }

  .value {
    margin: 0;
    padding: 0;
  }

  .spotify {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    font-size: 1.1rem;
    border-radius: 50%;
    aspect-ratio: 1;
    max-width: 15rem;
    min-height: 15rem;
    color: white;
    padding: 1rem;
    background: var(--accent-color-semi-transparent);
    background-position: center;
    background-size: cover;
    background-blend-mode: multiply;
    border: 0.3rem solid var(--accent-color-semi-transparent);

    svg {
      border-radius: 50%;
      transform: scale(1);
      padding: 0;
      margin: 0;
      color: #1db954;
      width: 1.5rem;
      height: 1.5rem;
    }

    .album-art {
      height: 5rem;
    }

    .text {
      flex: 1;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .space-filler {
      height: 1.5rem;
    }

    a {
      text-decoration: none;
      color: white;
      font-weight: 600;
    }
  }
}

.animating {
  animation: pulse 100s infinite;
}

// BPM animation
// Animation speed is used for matching this animation to the BPM of the currently playing song
/*@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0px rgba(29, 185, 84, 1);
    transform: scale(1);
  }
  25% {
    transform: scale(1.05);
  }
  50% {
    box-shadow: 0 0 0 1.25rem rgba(29, 185, 84, 0);
    transform: scale(1);
  }
  75% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}*/

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0px rgba(29, 185, 84, 1);
    transform: scale(1) rotate(0deg);
  }
  12% {
    transform: scale(1.05) rotate(0deg);
  }
  25% {
    transform: scale(1) rotate(0deg);
    box-shadow: 0 0 0 1.5rem rgba(29, 185, 84, 0);
  }
  37% {
    transform: scale(1.05) rotate(0deg);
  }
  50% {
    transform: scale(1);
  }
  62% {
    transform: scale(1.05);
  }
  75% {
    transform: scale(1);
  }
  87% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1) rotate(360deg);
  }
}
</style>
