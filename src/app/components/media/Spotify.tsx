'use client'
import styles from './styles.module.scss'

import { NowPlayingResponse } from '@/lib/spotify'

import { truncateText } from '@/lib/display'
import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'

import Icon from '@mdi/react'
import { mdiSpotify } from '@mdi/js'

const Spotify: React.FC<{ fallbackData: NowPlayingResponse }> = ({
  fallbackData,
}) => {
  const { data } = useSWR<NowPlayingResponse>('/api/now-playing', fetcher, {
    fallbackData,
    refreshInterval: 10000,
  })

  if (!data) return <></>

  const { isPlaying } = data
  if (!isPlaying) return <></>

  const { track, artists, album } = data
  return (
    <div className={`${styles.root} ${styles.spotify}`}>
      <Icon path={mdiSpotify} size={1} />
      <p>
        I&apos;m listening to{' '}
        <a href={track!.url} target="_blank" title={track!.name}>
          {truncateText(track!.name, 35)}
        </a>{' '}
        by{' '}
        <a href={artists![0].url} target="_blank" title={artists![0].name}>
          {truncateText(artists![0].name, 25)}
        </a>{' '}
        from{' '}
        <a href={album!.url} target="_blank" title={album!.name}>
          {truncateText(album!.name, 25)}
        </a>
      </p>
    </div>
  )
}

export default Spotify
