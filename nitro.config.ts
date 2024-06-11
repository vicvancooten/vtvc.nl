import { defineNitroConfig } from 'nitropack'

// This function can run for a maximum of 5 seconds
export default defineNitroConfig({
  vercel: {
    functions: {
      maxDuration: 60,
    },
  },
})
