export default defineCachedEventHandler(
  async () => {
    const response = await fetch(`${process.env.HASS_DOMAIN}/api/states/sensor.${process.env.HASS_ENTITY_COLOR}`, {
      headers: {
        Authorization: `Bearer ${process.env.HASS_KEY}`,
        'content-type': 'application/json',    
      },
    });
    const data = await response.json();
        
    return {
      color: data.state,
    };
  },
  { maxAge: 15 }
);