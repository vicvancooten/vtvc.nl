'use client'
import styles from './styles.module.scss'

import Icon from '@mdi/react'
import { mdiShoePrint } from '@mdi/js'

import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'

import { HassResponseType } from '@/lib/hass'

const Hass: React.FC<{ fallbackData: HassResponseType }> = ({
  fallbackData,
}) => {
  const { data } = useSWR<HassResponseType>('/api/hass', fetcher, {
    fallbackData,
    refreshInterval: 30000,
  })

  return data.steps > 2500 ? (
    <div className={styles.root}>
      <Icon path={mdiShoePrint} size={1} style={{ color: data.color }} />
      <p>
        <strong>{Intl.NumberFormat('nl-NL').format(data?.steps ?? 0)}</strong>{' '}
        steps taken today
      </p>
    </div>
  ) : (
    <></>
  )
}

export default Hass
