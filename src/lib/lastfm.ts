import { cache } from 'react'

export interface LastFMResponseType {
  overall: {
    play_count?: number
    artist_count?: number
    album_count?: number
  }
  weekly: {
    artist?: string
    name?: string
    count?: number
    percentage?: number
    image?: string
  }
}

interface LastFMAlbumImageType {
  size: string
  '#text': string
}

export const getScrobbleCount: () => Promise<LastFMResponseType> = cache(
  async () => {
    // Fetch user info
    const overall_response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=Duveaux&api_key=${process.env.LASTFM_API_KEY}&format=json`
    )
    const overall = await overall_response.json()

    // Fetch top album
    const weekly_response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getWeeklyAlbumChart&user=Duveaux&api_key=${process.env.LASTFM_API_KEY}&format=json`
    )
    const weekly = await weekly_response.json()

    // Fetch info (images) for AOTW
    const aotw_response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=album.getInfo&mbid=${weekly?.weeklyalbumchart?.album?.[0]?.mbid}&&user=Duveaux&api_key=${process.env.LASTFM_API_KEY}&format=json`
    )
    const aotw = await aotw_response.json()

    // Structure & return
    return {
      overall: {
        play_count: +overall?.user?.playcount,
        artist_count: +overall?.user?.artist_count,
        album_count: +overall?.user?.album_count,
      },
      weekly: {
        artist: weekly?.weeklyalbumchart?.album?.[0]?.artist?.['#text'],
        name: weekly?.weeklyalbumchart?.album?.[0].name,
        count: +weekly?.weeklyalbumchart?.album?.[0].playcount,
        image: aotw?.album?.image.find(
          (a: LastFMAlbumImageType) => (a.size = 'medium')
        )?.['#text'],
        percentage:
          (+weekly?.weeklyalbumchart?.album?.[0].playcount /
            +aotw?.album.playcount) *
          100,
      },
    } as LastFMResponseType
  }
)
