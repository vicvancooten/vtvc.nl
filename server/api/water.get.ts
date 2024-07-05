export type ResponseType = {
  state: number
}

export default defineEventHandler(async () => {
  // Fetch steps
  const api = await fetch(
    `${process.env.HASS_DOMAIN}/api/states/input_number.${process.env.HASS_ENTITY_WATER}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.HASS_KEY}`,
        'content-type': 'application/json',
      },
    },
  )
  const state = (await api.json()).state ?? 0

  // Return the data
  return {
    state: parseFloat(state),
  } as ResponseType
})
