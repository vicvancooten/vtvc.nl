<template>
  <div class="fact aotw">
    <header>
      <Icon name="ph:vinyl-record-thin" />
      Album of the week
    </header>
    <div class="value">
      <div
        class="album-preview"
        :style="{ backgroundImage: `url('${albumOfTheWeekImage}')` }"
      >
        <div>
          <strong>{{ lastfmData?.name }}</strong>
          by
          <strong>{{ lastfmData?.artist }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const img = useImage()

const { data: lastfmData } = await useFetch('/api/aotw')
// Preprocess and optimize the album of the week image
const albumOfTheWeekImage = img(`${lastfmData.value?.image}`, {
  width: 160,
  height: 160,
})
</script>

<style lang="scss" scoped>
.album-preview {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  font-size: 1.1rem;
  border-radius: 1rem;
  width: 100%;
  aspect-ratio: 1;
  color: white;
  padding: 1rem;
  background: var(--accent-color-semi-transparent);
  background-position: center;
  background-size: cover;
  background-blend-mode: multiply;

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
</style>
