export type LastfmStatsResponseType = {
  play_count: number
  artist_count: number
  album_count: number
}

export default defineEventHandler(async () => {
  const username = process.env.LASTFM_USER
  // Fetch user info
  const overall_response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${username}&api_key=${process.env.LASTFM_API_KEY}&format=json`,
  )
  const overall = await overall_response.json()

  // Structure & return
  return {
    play_count: +overall?.user?.playcount,
    artist_count: +overall?.user?.artist_count,
    album_count: +overall?.user?.album_count,
  } as LastfmStatsResponseType
})
