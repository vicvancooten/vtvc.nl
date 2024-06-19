export type ResponseType = {
  shopping_list_items: number
}

export default defineEventHandler(async () => {
  // Fetch steps
  const api = await fetch(
    `${process.env.HASS_DOMAIN}/api/states/${process.env.HASS_ENTITY_SHOPPING}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.HASS_KEY}`,
        'content-type': 'application/json',
      },
    },
  )

  const shopping_list_items = parseInt((await api.json()).state) ?? 0

  // Return the data
  return {
    shopping_list_items,
  } as ResponseType
})
