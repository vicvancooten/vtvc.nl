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

if (isPlaying) {
  const {
    track: { name: trackName, url: trackUrl },
    artists,
    album: { name: albumName, url: albumUrl },
  } = data.value
  const artistName = artists?.[0].name
  const artistUrl = artists?.[0].url

  // Spotify BPM matching
  const animationDuration = `${
    (1 / data.value.track!.beatsPerSecond) * data.value.track!.timeSignature
  }s`
  const animateSpotify = ref(true)
  function resetSpotifyAnimation() {
    animateSpotify.value = false
    setTimeout(() => {
      animateSpotify.value = true
    }, 100)
  }
}
</script>

<style scoped lang="scss">
.spotify {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 1.25rem;
  padding: 1rem 0;

  svg {
    border-radius: 50%;
    transform: scale(1);
    padding: 0;
    margin: 0;
    color: #1db954;
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
