import { cache } from 'react'

export const getScrobbleCount = cache(async () => {
  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=Duveaux&api_key=${process.env.LASTFM_API_KEY}&format=json`
  )

  const body = await response.json()

  return +body.user.playcount
})
