<template>
  <div class="page">
    <div class="center">
      <!-- Name & Header -->
      <Header />

      <!-- Body copy -->
      <Copy />

      <!-- Contact grid -->
      <ContactGrid />

      <!-- Facts grid -->
      <div class="facts-grid">
        <!-- Spotify -->
        <Spotify />

        <!-- Lifetime music stats -->
        <LastFMStats />

        <!-- Album of the Week -->
        <AOTW />

        <!-- Duolingo streak -->
        <Duolingo />

        <!-- Steps -->
        <Steps />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * This page loads a lot of data when rendering, but it uses ISR to make sure the user gets a fast experience.
 */
import chroma from 'chroma-js'

// Fetch hass data, used for the primary color and steps
const { data } = await useFetch('/api/hass')
const primaryColor = data.value?.color ?? '#000000'

// Create a color palette based on the primary color and the time of day
const color = chroma(primaryColor)
const backgroundColorLight = color.brighten(3).desaturate(2.5).hex()
const backgroundColorDark = color.darken(3).desaturate(1.5).hex()
const textColorLight = color.desaturate(1.5).darken(4).hex()
const textColorExtraContrastLight = chroma(textColorLight).darken(2).hex()
const textColorDark = color.brighten(4).desaturate(2).hex()
const textColorExtraContrastDark = chroma(textColorDark).brighten(2).hex()
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
const accentColorSemiTransparentLight = chroma(accentColorLight)
  .alpha(0.5)
  .rgba()
const accentColorSemiTransparentDark = chroma(accentColorDark).alpha(0.5).rgba()

// Now use useHead to set the --primary-color variable globally
useHead({
  title: 'Vic van Cooten',
  // Set lang attribute for accessibility
  htmlAttrs: {
    lang: 'en',
  },
  // Set the accent color to the theme color
  meta: [
    {
      name: 'theme-color',
      content: accentColorDark,
    },
    {
      name: 'description',
      content: 'Senior software engineer from Utrecht, the Netherlands.',
    },
  ],
  // Set the primary color as a CSS variable
  style: [
    {
      innerHTML: `:root { 
        --background-color: ${backgroundColorLight}; 
        --text-color: ${textColorLight}; 
        --text-color-extra-contrast: ${textColorExtraContrastLight};
        --accent-color: ${accentColorLight}; 
        --accent-color-mild: rgba(${accentColorMildLight});
        --accent-color-semi-transparent: rgba(${accentColorSemiTransparentLight});

        @media (prefers-color-scheme: dark) {
          --background-color: ${backgroundColorDark}; 
          --text-color: ${textColorDark}; 
          --text-color-extra-contrast: ${textColorExtraContrastDark};
          --accent-color: ${accentColorDark}; 
          --accent-color-mild: rgba(${accentColorMildNight});
          --accent-color-semi-transparent: rgba(${accentColorSemiTransparentDark});
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
  color: var(--text-color-extra-contrast);
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    color: var(--text-color);
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
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(3, auto);
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

          @media (max-width: 800px) {
            border-color: var(--accent-color-semi-transparent);
          }

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

          @media (max-width: 800px) {
            border-color: transparent;
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
      }

      // Make the grid responsive
      @media (max-width: 800px) {
        grid-template-columns: 1fr 1fr;
      }

      @media (max-width: 500px) {
        grid-template-columns: 1fr;
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
