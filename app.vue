<template>
  <div class="page">
    <div class="center">
      <header>
        <h1>Vic van Cooten</h1>
        <NuxtImg
          src="/me.jpg"
          :width="60"
          :height="60"
          :placeholder="[50, 25, 75, 5]"
          class="rounded"
          alt="Vic van Cooten"
        />
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

        <hr />
        <strong>Debug stats</strong>
        <ul>
          <strong>Steps:</strong>
          {{
            steps
          }}
        </ul>
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
// Find a constrasting color for the background
const backgroundColor = color.darken(1.5).desaturate(1.5).hex();
const textColor = color.brighten(3.5).desaturate(1.5).hex();
const accentColor = color.hex();

// Now use useHead to set the --primary-color variable globally
useHead({
  // Set the accent color to the theme color
  meta: [
    {
      name: "theme-color",
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
  font-family: "Quicksand", sans-serif;
  font-weight: 300;
}

.page {
  background-color: var(--background-color);
  color: var(--text-color);
  transition: all 0.3s ease;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  // Add mobile layout
  @media (max-width: 768px) {
    padding: 2.5rem;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .center {
    width: 100%;
    max-width: 40rem;

    header {
      display: flex;
      flex-direction: row;
      align-items: center;

      .rounded {
        border-radius: 50%;
        margin-bottom: 1rem;
      }

      h1 {
        font-weight: 600;
        font-size: 3rem;
        margin: 0;
        padding: 0;
        cursor: default;
        flex: 1;
        color: var(--accent-color);
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

      hr {
        margin: 2rem 0;
        border: 0;
        border-top: 1px solid var(--accent-color);
      }

      ul {
        color: var(--accent-color);
      }
    }
  }
}
</style>
