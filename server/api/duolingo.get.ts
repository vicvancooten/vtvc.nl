/**
 * This endpoint fetches the current Duolingo streak for a user
 * It uses a proxy, because this website is based on the edge and functions are not the right place to run puppeteer
 * The proxy can be set in the environment variable DUOLINGO_STREAK_PROXY
 */
export default defineEventHandler(async (event) => {
  if (!process.env.DUOLINGO_STREAK_PROXY) {
    return { error: 'DUOLINGO_STREAK_PROXY environment variable not set' }
  }

  // Fetch result from proxy
  const response = await fetch(`${process.env.DUOLINGO_STREAK_PROXY}`)
  const data = await response.json()

  if (!data.streak) {
    return { error: 'Failed to fetch data from proxy' }
  }

  return data as { streak: string; cache: 'hit' | 'miss' }
})
