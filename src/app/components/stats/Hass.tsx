'use client'
import styles from './styles.module.scss'

import Icon from '@mdi/react'
import { mdiShoePrint } from '@mdi/js'

import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'

import { HassResponseType } from '@/lib/hass'
import { adjustContrast } from '@/lib/color'
import { useEffect } from 'react'

const Hass: React.FC<{ fallbackData: HassResponseType }> = ({
  fallbackData,
}) => {
  const { data } = useSWR<HassResponseType>('/api/hass', fetcher, {
    fallbackData,
    refreshInterval: 30000,
  })

  // Update the accent color based on the data.color, while also increasing the contrast for better readability
  useEffect(() => {
    if (data?.color) {
      const newColor = adjustContrast(data.color, 0.75)
      document.documentElement.style.setProperty('--accent-color', newColor)
    }
  }, [data])

  return (data?.steps ?? 0) > 2500 ? (
    <div className={styles.root}>
      <Icon path={mdiShoePrint} size={1} style={{ color: data!.color }} />
      <p>
        <strong>{Intl.NumberFormat('nl-NL').format(data!.steps ?? 0)}</strong>{' '}
        steps taken today
      </p>
    </div>
  ) : (
    <></>
  )
}

export default Hass
