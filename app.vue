<template>
  <div class="page">
    <div class="center">
      <!-- Name & Header -->
      <Header />

      <!-- Body copy -->
      <Copy />

      <!-- Spotify -->
      <Spotify />

      <!-- Facts grid -->
      <div class="facts-grid">
        <!-- Album of the Week -->
        <div class="fact aotw">
          <header>
            <Icon name="ph:vinyl-record-thin" />
            Album of the week
          </header>
          <div
            class="value"
            :style="{ backgroundImage: `url('${albumOfTheWeekImage}')` }"
          >
            <div class="overlay">
              <strong>{{ lastfmData?.weekly?.name }}</strong>
              by
              <strong>{{ lastfmData?.weekly?.artist }}</strong>
            </div>
          </div>
        </div>

        <!-- Duolingo streak -->
        <div class="fact">
          <header>
            <Icon name="mdi:fire" />
            Duolingo streak
          </header>
          <div class="value">
            <div>
              <strong>{{ streak }}</strong>
              days
            </div>
          </div>
        </div>

        <!-- Steps -->
        <div class="fact" v-if="steps > 999">
          <header>
            <Icon name="fa-solid:shoe-prints" />
            Steps today
          </header>
          <div class="value">
            <div>
              <strong>{{ Intl.NumberFormat('nl-NL').format(steps) }}</strong>
              steps
            </div>
          </div>
        </div>

        <!-- Lifetime music stats -->
        <div class="fact">
          <header>
            <Icon name="ion:trending-up-outline" />
            Lifetime music stats
          </header>
          <div class="value">
            <ul>
              <li>
                <strong>
                  {{
                    Intl.NumberFormat('nl-NL').format(
                      lastfmData?.overall.play_count,
                    )
                  }}
                </strong>
                plays
              </li>
              <li>
                <strong>
                  {{
                    Intl.NumberFormat('nl-NL').format(
                      lastfmData?.overall.album_count,
                    )
                  }}
                </strong>
                albums
              </li>
              <li>
                <strong>
                  {{
                    Intl.NumberFormat('nl-NL').format(
                      lastfmData?.overall.artist_count,
                    )
                  }}
                </strong>
                artists
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * This page loads a lot of data when rendering, but it uses ISR to make sure the user gets a fast experience.
 */
import chroma from 'chroma-js'
import moment from 'moment-timezone'
const img = useImage()

// Fetch hass data, used for the primary color and steps
const { data } = await useFetch('/api/hass')

const primaryColor = data.value?.color ?? '#000000'
const steps = data.value?.steps ?? 0

// Create a color palette based on the primary color and the time of day
const color = chroma(primaryColor)
const backgroundColorLight = color.brighten(3).desaturate(2.5).hex()
const backgroundColorDark = color.darken(3).desaturate(1.5).hex()
const textColorLight = color.desaturate(1.5).darken(4).hex()
const textColorDark = color.brighten(4).desaturate(2).hex()
const accentColorLight = color.darken(2).saturate(2).hex()
const accentColorDark = color.brighten(1.5).hex()
const accentColorMildLight = chroma(backgroundColorLight)
  .darken(2)
  .saturate(1)
  .alpha(0.95)
  .rgba()
const accentColorMildNight = chroma(backgroundColorDark)
  .brighten(2)
  .desaturate(2)
  .alpha(0.75)
  .rgba()

// Fetch lastfm data
const { data: lastfmData } = await useFetch('/api/lastfm')
// Preprocess and optimize the album of the week image
const albumOfTheWeekImage = img(`${lastfmData.value?.weekly?.image}`, {
  width: 160,
  height: 160,
})

// Duoling
const { data: duolingoData } = await useFetch('/api/duolingo')
const streak = duolingoData.value?.streak ?? 0

// Now use useHead to set the --primary-color variable globally
useHead({
  title: 'Vic van Cooten',
  // Set the accent color to the theme color
  meta: [
    {
      name: 'theme-color',
      content: accentColorLight,
    },
  ],
  // Set the primary color as a CSS variable
  style: [
    {
      innerHTML: `:root { 
        --background-color: ${backgroundColorLight}; 
        --text-color: ${textColorLight}; 
        --accent-color: ${accentColorLight}; 
        --accent-color-mild: rgba(${accentColorMildLight});

        @media (prefers-color-scheme: dark) {
          --background-color: ${backgroundColorDark}; 
          --text-color: ${textColorDark}; 
          --accent-color: ${accentColorDark}; 
          --accent-color-mild: rgba(${accentColorMildNight});
        }
      }`,
    },
  ],
})
</script>

<style lang="scss">
html,
body,
#__nuxt {
  margin: 0;
  padding: 0;
  font-family: 'Quicksand', sans-serif;
  font-weight: 300;
  font-size: 0.9rem;
  height: 100%;
  background-color: var(--background-color);
  color: var(--text-color);
}
::selection {
  background-color: var(--accent-color-mild);
  color: var(--text-color);
}

a {
  color: var(--accent-color);
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  font-weight: 300;

  &:hover {
    color: var(--accent-color-mild);
    text-decoration: underline;
  }
}

.rounded {
  border-radius: 50%;
}

* {
  box-sizing: border-box;
}

.page {
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .center {
    width: 100%;
    max-width: 70rem;

    cursor: default;

    .facts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, 15rem);
      gap: 2rem;
      margin: 2rem 0;
      align-content: normal;
      justify-content: center;
      align-items: start;
      justify-items: stretch;

      .fact {
        header {
          padding: 1rem;
          border-bottom: 1px solid var(--accent-color);
          color: var(--accent-color);
          font-weight: 600;
          text-transform: uppercase;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;

          .icon {
            width: 1.5rem;
            height: 1.5rem;
          }
        }

        .value {
          padding: 1rem;
          border-bottom: 1px solid var(--accent-color);
          color: var(--text-color);
          text-align: center;
          font-size: 1.05rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;

          strong {
            color: var(--accent-color);
          }

          ul {
            list-style: none;
            padding: 0;
            margin: 0;

            li {
              margin: 0.5rem 0;
            }
          }

          img {
            display: block;
          }
        }

        &.aotw {
          header {
            border: 0;
          }
          .value {
            border: 0;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            min-height: 14rem;
            justify-content: center;
            border-radius: 1rem;
            padding: 0;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: stretch;
            overflow: hidden;

            .overlay {
              padding: 0.5rem;
              color: var(--text-color);
              text-align: center;
              font-size: 1.15rem;
              font-weight: 600;
              backdrop-filter: blur(0.5rem);
              width: 100%;
              background-color: rgba(222, 222, 222, 0.6);
              border-top: 1px solid var(--accent-color-mild);

              strong {
                color: var(--text-color);
              }

              @media (prefers-color-scheme: dark) {
                background-color: rgba(0, 0, 0, 0.6);
              }
            }
          }
        }
      }

      // Mobile tweaks for facts grid
      @media (max-width: 45rem) {
        grid-template-columns: repeat(auto-fit, 13rem);
        justify-items: stretch;
        margin-top: 3rem;

        .fact {
          header {
            font-size: 1rem;
            border-bottom-color: transparent;
            color: var(--text-color);
            padding: 0;
            padding-bottom: 0.5rem;
            text-align: center;
            flex-direction: column;
          }

          .value {
            font-size: 1rem;
            border-bottom-color: transparent;
            padding: 0 0 1rem 0;
          }
        }
      }
    }
  }

  @media (max-width: 55rem) {
    padding: 1rem;
    justify-content: flex-start;
    align-items: flex-start;

    .center {
      header.main {
        flex-direction: column-reverse;
      }
    }
  }
}
</style>
