<template>
  <div class="spotify" v-if="isPlaying">
    <Icon
      name="bi:spotify"
      :style="{ animationDuration }"
      :class="{ animating: animateSpotify }"
      @click="resetSpotifyAnimation"
    />
    <div>
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
  </div>
</template>

<script lang="ts" setup>
const { data } = await useFetch('/api/spotify')

// Quick access the variables
const { isPlaying } = data.value

let trackName: string
let trackUrl: string
let artistName: string
let artistUrl: string
let albumName: string
let albumUrl: string
let animationDuration: string
const animateSpotify = ref(true)
function resetSpotifyAnimation() {
  animateSpotify.value = false
  setTimeout(() => {
    animateSpotify.value = true
  }, 100)
}

if (isPlaying) {
  const { track, album, artists } = data.value
  trackName = track!.name
  trackUrl = track!.url
  albumName = album!.name
  albumUrl = album!.url
  artistName = artists?.[0].name
  artistUrl = artists?.[0].url

  // Spotify BPM matching
  animationDuration = `${(1 / track!.beatsPerSecond) * track!.timeSignature}s`
}
</script>

<style scoped lang="scss">
.spotify {
  display: flex;
  gap: 1rem;
  align-items: center;
  font-size: 1.25rem;
  padding: 1rem;
  border: 1px solid var(--accent-color-mild);
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
