export default defineEventHandler(async () => {
  // Fetch the current accent color
  const colorApi = await fetch(
    `${process.env.HASS_DOMAIN}/api/states/sensor.${process.env.HASS_ENTITY_COLOR}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.HASS_KEY}`,
        "content-type": "application/json",
      },
    }
  );
  const color = (await colorApi.json()).state ?? "#79ffe1";

  // Fetch steps
  const stepsApi = await fetch(
    `${process.env.HASS_DOMAIN}/api/states/sensor.${process.env.HASS_ENTITY_STEPS}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.HASS_KEY}`,
        "content-type": "application/json",
      },
    }
  );
  const steps = (await stepsApi.json()).state ?? 0;

  // Return the data
  return {
    color,
    steps,
  };
});
