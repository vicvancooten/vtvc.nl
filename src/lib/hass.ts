import { cache } from 'react'
import { fetchUrl } from './fetcher'

export interface HassResponseType {
  steps?: number
  color?: string
}

export const invalidate = 55

export const getHassData: () => Promise<HassResponseType> = cache(async () => {
  const color = await fetchUrl(
    `${process.env.HASS_DOMAIN}/api/states/sensor.${process.env.HASS_ENTITY_COLOR}`,
    {
      Authorization: `Bearer ${process.env.HASS_KEY}`,
      'content-type': 'application/json',
    },
  )
  const steps = await fetchUrl(
    `${process.env.HASS_DOMAIN}/api/states/sensor.${process.env.HASS_ENTITY_STEPS}`,
    {
      Authorization: `Bearer ${process.env.HASS_KEY}`,
      'content-type': 'application/json',
    },
  )

  // Structure & return
  return {
    steps: +steps.state ?? 0,
    color: color.state ?? '#79ffe1',
  } as HassResponseType
})
