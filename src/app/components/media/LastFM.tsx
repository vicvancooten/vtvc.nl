'use client'
import styles from './styles.module.scss'

import Icon from '@mdi/react'
import { mdiFinance } from '@mdi/js'

import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'

const LastFM: React.FC<{ fallbackData: number }> = ({ fallbackData }) => {
  const { data } = useSWR<number>('/api/lastfm', fetcher, {
    fallbackData,
    refreshInterval: 100000,
  })

  return (
    <div className={`${styles.root} ${styles['track-count']}`}>
      <Icon path={mdiFinance} size={1} />
      <p>{Intl.NumberFormat('nl-NL').format(data)} recorded plays.</p>
    </div>
  )
}

export default LastFM
