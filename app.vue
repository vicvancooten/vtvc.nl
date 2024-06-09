<template>
  <div class="page">
    <div class="center">
      <header>
        <NuxtImg
          src="/me.jpg"
          :width="200"
          :height="200"
          :placeholder="[50, 25, 75, 5]"
        />
        <h1>Vic van Cooten</h1>
      </header>
      <main>
        <p>
          Hi. I&apos;m <strong>Vic</strong>, a senior full-stack software engineer
          from<strong> Utrecht </strong>. I use a broad set of skills to build awesome
          products and to make technology and processes work simpler and better.
        </p>
        <p>
          I currently work at
          <a
            href="https://a-insights.eu"
            title="We provide SaaS benchmarking, strategy and monitoring solutions."
            target="_blank"
            rel="noopener"
            className="{styles.ai}"
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
          in Amsterdam, where I am responsible for the software engineering team and the
          architecture of our products.
        </p>
        <p>
          Curious about what&apos;s going on behind the scenes on this totally
          overengineered page?
          <a
            href="https://github.com/Duveaux/vtvc.nl"
            rel="noopener"
            className="{styles.source}"
            target="_blank"
          >
            Check out the source.
          </a>
        </p>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import chroma from "chroma-js";

// Fetch hass data, used for the primary color and steps
const { data } = await useFetch("/api/hass");

const primaryColor = data.value?.color ?? "#000000";
const steps = data.value?.steps ?? 0;

// Create a color palette based on the primary color
const color = chroma(primaryColor);
// Background color needs to be a soft, subtle, darkened version of the primary color
const backgroundColor = color.darken(1.25).saturate(0.1).hex();
// Text color needs to be a contrasting color to the primary color, but still be based on it
const textColor =
  color.luminance() > 0.5 ? color.darken(4).hex() : color.brighten(4).hex();
// Accent color needs to be a contrasting color to the primary color
const accentColor =
  color.luminance() > 0.5 ? color.darken(1.5).hex() : color.brighten(1.5).hex();

// Now use useHead to set the --primary-color variable globally
useHead({
  style: [
    {
      innerHTML: `:root { 
        --background-color: ${backgroundColor}; 
        --text-color: ${textColor}; 
        --accent-color: ${accentColor}; 
      }`,
    },
  ],
});
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  font-family: Roboto, sans-serif;
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
    max-width: 40rem;

    header {
      h1 {
        font-family: "Nunito", sans-serif;
        font-size: 3rem;
        margin: 0;
        padding: 0;
        cursor: default;
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

        svg {
          max-width: 1rem;
          max-height: 1rem;
        }
      }
    }
  }
}
</style>
