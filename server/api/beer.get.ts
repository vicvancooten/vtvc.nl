/**
 * This endpoint fetches the current Untappd data for a user
 * Rather than relying on the untappd API it uses a proxy that scrapes the data from the public profile
 * The proxy can be set in the environment variable UNTAPPD_PROXY
 */
export default defineEventHandler(async (event) => {
  if (!process.env.UNTAPPD_PROXY) {
    return {
      success: false,
      error: 'UNTAPPD_PROXY environment variable not set',
      streak: -1,
      languages: [],
    }
  }

  const res = await fetch(process.env.UNTAPPD_PROXY)
  const data = await res.json()

  return { ...data, success: true }
})
