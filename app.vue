<template>
  <div class="page">
    <div class="center">
      <header>
        <h1>Vic van Cooten</h1>
        <NuxtImg
          src="/me.jpg"
          :width="80"
          :height="80"
          :placeholder="[50, 25, 75, 5]"
          class="rounded"
          alt="Vic van Cooten"
        />
      </header>
      <main>
        <p>
          Hi. I&apos;m
          <strong>Vic</strong>
          , a senior full-stack software engineer working from
          <strong>Utrecht</strong>
          . I use a broad set of skills to build awesome products and to make
          technology and processes work simpler and better.
        </p>
        <p>
          I currently work at
          <a
            href="https://a-insights.eu"
            title="We provide SaaS benchmarking, strategy and monitoring solutions."
            target="_blank"
            rel="noopener"
            class="ai"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 527.44 303.83">
              <path
                d="M84.5 142.18a10.62 10.62 0 01-7.5-18.13L197.75 3.3a11.27 11.27 0 0115.92 0l47.43 47.42a10.62 10.62 0 01-15.02 15.02l-40.37-40.37L92 139.07a10.58 10.58 0 01-7.5 3.12"
                fill="#f47258"
              ></path>
              <path
                d="M446.35 1.04a10.62 10.62 0 017.5 18.12L334.7 138.33a11.27 11.27 0 01-15.92 0l-46.6-46.6a10.62 10.62 0 1115.01-15.02l39.55 39.55L438.84 4.15c2.08-2.08 4.8-3.11 7.51-3.11"
                fill="#00128a"
              ></path>
            </svg>
            A-Insights
          </a>
          in Amsterdam, where I am responsible for the software engineering team
          and the architecture of our SaaS-products.
        </p>
        <p>
          This page is as much a playground as it is a visiting card. Curious?
          <a
            href="https://github.com/Duveaux/vtvc.nl"
            rel="noopener"
            className="{styles.source}"
            target="_blank"
          >
            Check it out here
          </a>
          .
        </p>

        <div class="facts-grid">
          <!-- Album of the Week -->
          <div class="fact">
            <header>
              <Icon name="ph:vinyl-record-thin" />
              Album of the week
            </header>
            <div class="value">
              <strong>{{ lastfmData?.weekly.name }}</strong>
              by
              <strong>{{ lastfmData?.weekly.artist }}</strong>
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

          <!-- Steps -->
          <div class="fact">
            <header>
              <Icon name="fa-solid:shoe-prints" />
              Steps today
            </header>
            <div class="value">
              <strong>{{ Intl.NumberFormat('nl-NL').format(steps) }}</strong>
              steps
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * This page loads a lot of data when rendering, but it uses ISR to make sure the user gets a fast experience.
 */
import chroma from 'chroma-js'
import moment from 'moment-timezone'

// Fetch hass data, used for the primary color and steps
const { data } = await useFetch('/api/hass')

const primaryColor = data.value?.color ?? '#000000'
const steps = data.value?.steps ?? 0

// Create a color palette based on the primary color and the time of day
const hour = moment().tz('Europe/Amsterdam').hour()
const is_day = hour >= 6 && hour < 19
const color = chroma(primaryColor)
const backgroundColor = is_day
  ? color.brighten(3).desaturate(2.5).hex()
  : color.darken(3).desaturate(1.5).hex()
const textColor = is_day
  ? color.desaturate(1.5).darken(4).hex()
  : color.brighten(4).desaturate(2).hex()
const accentColor = is_day
  ? color.darken(2).saturate(2).hex()
  : color.brighten(1.5).hex()
const accentColorLight = is_day
  ? chroma(backgroundColor).darken(2).saturate(1).alpha(0.95).rgba()
  : chroma(accentColor).brighten(2).desaturate(2).alpha(0.75).rgba()

// Fetch lastfm data
const { data: lastfmData } = await useFetch('/api/lastfm')

// Now use useHead to set the --primary-color variable globally
useHead({
  title: 'Vic van Cooten',
  // Set the accent color to the theme color
  meta: [
    {
      name: 'theme-color',
      content: accentColor,
    },
  ],
  // Set the primary color as a CSS variable
  style: [
    {
      innerHTML: `:root { 
        --background-color: ${backgroundColor}; 
        --text-color: ${textColor}; 
        --accent-color: ${accentColor}; 
        --accent-color-light: rgba(${accentColorLight});
      }`,
    },
  ],
})
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  font-family: 'Quicksand', sans-serif;
  font-weight: 300;
  font-size: 0.9rem;
}
::selection {
  background-color: var(--accent-color-light);
  color: var(--text-color);
}

.rounded {
  border-radius: 50%;
}

.page {
  background-color: var(--background-color);
  color: var(--text-color);
  transition: all 0.3s ease;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .center {
    width: 100%;
    max-width: 55rem;

    header {
      display: flex;
      flex-direction: row;
      align-items: center;

      .rounded {
        margin-bottom: 1rem;
      }

      h1 {
        font-weight: 400;
        font-size: 3.5rem;
        margin: 0;
        padding: 0;
        cursor: default;
        flex: 1;
        color: var(--accent-color);
        text-align: center;
      }
    }

    main {
      cursor: default;

      p {
        font-size: 1.25rem;
        line-height: 1.5;
        margin: 1rem 0;
      }

      a {
        color: var(--accent-color);
        text-decoration: none;
        transition: all 0.3s ease;
        cursor: pointer;
        font-weight: 300;

        &:hover {
          color: var(--accent-color-light);
          text-decoration: underline;
        }

        svg {
          max-width: 1rem;
          max-height: 1rem;
        }
      }

      strong {
        color: var(--accent-color);
        font-weight: 600;
      }

      .facts-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, 15rem);
        gap: 1rem;
        margin: 2rem 0;
        align-content: normal;
        justify-content: center;
        align-items: start;
        justify-items: center;

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
          }
        }

        @media (max-width: 768px) {
          grid-template-columns: 1fr 1fr;
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    justify-content: flex-start;
    align-items: flex-start;

    .center {
      header {
        flex-direction: column-reverse;
      }
    }
  }
}
</style>
