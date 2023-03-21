'use client'
import styles from './styles.module.scss'

import { NowPlayingResponse } from '@/lib/spotify'

import { truncateText } from '@/lib/display'
import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'

import Icon from '@mdi/react'
import { mdiSpotify } from '@mdi/js'
import { useState } from 'react'

const Spotify: React.FC<{ fallbackData: NowPlayingResponse }> = ({
  fallbackData,
}) => {
  const [animateSpotify, setAnimateSpotify] = useState(true)

  const { data } = useSWR<NowPlayingResponse>('/api/now-playing', fetcher, {
    fallbackData,
    refreshInterval: 10000,
  })

  if (!data) return <></>

  const { isPlaying } = data
  if (!isPlaying) return <></>

  const { track, artists, album } = data

  if (!track?.name) return <></>

  const animationDuration = `${
    (1 / data.track!.beatsPerSecond) * data.track!.timeSignature
  }s`

  return (
    <div className={`${styles.root} ${styles.spotify}`}>
      <div
        onClick={() => {
          setAnimateSpotify(false)
          setTimeout(() => setAnimateSpotify(true), 0)
        }}
      >
        <Icon
          path={mdiSpotify}
          size={1}
          style={{ animationDuration }}
          className={animateSpotify ? styles.animating : ''}
        />
      </div>
      <p>
        I&apos;m listening to{' '}
        <a href={track?.url} target="_blank" title={track?.name}>
          <strong>{truncateText(track?.name, 10000)}</strong>
        </a>{' '}
        by{' '}
        <a href={artists?.[0]?.url} target="_blank" title={artists?.[0]?.name}>
          <strong>{truncateText(artists?.[0]?.name, 10000)}</strong>
        </a>{' '}
        (from{' '}
        <a href={album?.url} target="_blank" title={album?.name}>
          {truncateText(album?.name, 10000)}
        </a>
        )
      </p>
    </div>
  )
}

export default Spotify
