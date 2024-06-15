export interface HassResponseType {
  color: string
}

export default defineEventHandler(async () => {
  // Fetch the current accent color
  const colorApi = await fetch(
    `${process.env.HASS_DOMAIN}/api/states/sensor.${process.env.HASS_ENTITY_COLOR}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.HASS_KEY}`,
        'content-type': 'application/json',
      },
    },
  )
  const color = (await colorApi.json()).state ?? '#79ffe1'

  // Return the data
  return {
    color,
  } as HassResponseType
})
