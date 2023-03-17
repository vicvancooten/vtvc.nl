'use client'
import styles from './styles.module.scss'

import Icon from '@mdi/react'
import { mdiSpotify } from '@mdi/js'

import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'
import { NowPlayingResponse } from '@/lib/spotify'

const Spotify: React.FC<{ fallback: NowPlayingResponse }> = ({ fallback }) => {
  const { data, error } = useSWR<NowPlayingResponse>(
    '/api/now-playing',
    fetcher,
    { fallback }
  )

  if (!data) return <></>

  const { isPlaying } = data
  if (!isPlaying) return <></>

  const { track, artists, album } = data
  return (
    <div className={`${styles.root} ${styles.spotify}`}>
      <Icon path={mdiSpotify} size={1} />
      <p>
        I&apos;m listening to{' '}
        <a href={track!.url} target="_blank">
          {track!.name}
        </a>{' '}
        by{' '}
        <a href={artists![0].url} target="_blank">
          {artists![0].name}
        </a>{' '}
        from{' '}
        <a href={album!.url} target="_blank">
          {album!.name}
        </a>
      </p>
    </div>
  )
}

export default Spotify
