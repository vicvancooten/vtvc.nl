import { cache } from 'react'
import { fetchUrl } from './fetcher'

export interface HassResponseType {
  steps: number
  color: string
}

export const invalidate = 55

export const getHassData: () => Promise<HassResponseType> = cache(async () => {
  const color = await fetchUrl(
    `${process.env.HASS_DOMAIN}/api/states/sensor.pixel_6a_accent_color`,
    {
      Authorization: `Bearer ${process.env.HASS_KEY}`,
      'content-type': 'application/json',
    }
  )
  const steps = await fetchUrl(
    `${process.env.HASS_DOMAIN}/api/states/sensor.pixel_6a_steps_sensor`,
    {
      Authorization: `Bearer ${process.env.HASS_KEY}`,
      'content-type': 'application/json',
    }
  )

  // Structure & return
  return {
    steps: +steps.state,
    color: color.state,
  } as HassResponseType
})
