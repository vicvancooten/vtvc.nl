export default defineEventHandler(async () => {
  const username = process.env.LASTFM_USER
  // Fetch top album
  const weekly_response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=user.getWeeklyAlbumChart&user=${username}&api_key=${process.env.LASTFM_API_KEY}&format=json`,
  )
  const weekly = await weekly_response.json()

  // Fetch info (images) for AOTW
  const album = weekly?.weeklyalbumchart?.album?.[0]
  let aotw_query = `mbid=${album?.mbid}`

  // If for some reason mbid was not provided by the previous request, let's look for it based on artist and album
  if (!album?.[0]?.mbid) {
    aotw_query = `artist=${album?.artist?.['#text']}&album=${album?.name}`
  }
  const aotw_response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=album.getInfo&${aotw_query}&user=${username}&api_key=${process.env.LASTFM_API_KEY}&format=json`,
  )

  const aotw = await aotw_response.json()

  // Structure & return
  return {
    artist: weekly?.weeklyalbumchart?.album?.[0]?.artist?.['#text'],
    name: weekly?.weeklyalbumchart?.album?.[0]?.name,
    count: +weekly?.weeklyalbumchart?.album?.[0].playcount,
    image: aotw?.album?.image.find(
      (a: { size: string }) => a.size === 'mega',
    )?.['#text'],
    percentage:
      (+weekly?.weeklyalbumchart?.album?.[0].playcount /
        +aotw?.album.playcount) *
      100,
  }
})
