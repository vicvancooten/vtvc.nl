import NodeCache from 'node-cache'

interface NowPlayingItemType {
  id: string
  name: string
  external_urls: { spotify: string }
  album: {
    name: string
    images: { url: string }[]
    external_urls: { spotify: string }
  }
  artists: { name: string; external_urls: { spotify: string } }[]
}

export interface NowPlayingResponse {
  isPlaying: boolean
  track?: {
    name: string
    url: string
    beatsPerSecond: number
    tempo: number
    timeSignature: number
  }
  album?: {
    name: string
    image: string
    url: string
  }
  artists?: { name: string; url: string }[]
}

const cache = new NodeCache({ stdTTL: 15 })

export default defineEventHandler(async () => {
  const { access_token } = await getAccessToken()

  // Check if the response is already cached
  const cachedResponse = cache.get('nowPlayingResponse')
  if (cachedResponse) {
    return { ...cachedResponse, cache: 'hit' }
  }

  // Fetch the now playing info
  let response
  let nowPlayingInfo
  try {
    response = await fetch(
      'https://api.spotify.com/v1/me/player/currently-playing',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    )
    nowPlayingInfo = await response.json()
  } catch (error) {
    return { isPlaying: false }
  }

  if (
    response.status === 204 ||
    response.status === 202 ||
    response.status > 400
  ) {
    return { isPlaying: false }
  }

  const item = nowPlayingInfo.item as NowPlayingItemType

  const nowPlayingResponse = {
    album: {
      name: item?.album?.name,
      image: item?.album?.images?.[0]?.url,
      url: item?.album?.external_urls?.spotify,
    },
    artists: (item?.artists ?? []).map(
      ({ name, external_urls: { spotify } }) => ({
        name,
        url: spotify,
      }),
    ),
    isPlaying: true,
    track: {
      name: item?.name,
      url: item?.external_urls?.spotify,
      ...(await getAudioFeatures(item?.id, access_token)),
    },
  } as NowPlayingResponse

  // Cache the response for 15 seconds
  cache.set('nowPlayingResponse', nowPlayingResponse)

  // Return the response
  return { ...nowPlayingResponse, cache: 'miss' }
})

export const getAccessToken = async () => {
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
      ).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    //@ts-ignore
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  })

  return await response.json()
}

export const getAudioFeatures = (id: string, providedAccessToken?: string) =>
  new Promise<{ beatsPerSecond: number; tempo: number; timeSignature: number }>(
    async (resolve) => {
      const access_token = providedAccessToken ?? (await getAccessToken())

      const response = await fetch(
        `https://api.spotify.com/v1/audio-features/${id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      )

      const features = await response.json()

      resolve({
        beatsPerSecond: (features.tempo / 60) as number,
        tempo: features.tempo as number,
        timeSignature: features.time_signature as number,
      })
    },
  )
