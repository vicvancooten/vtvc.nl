export default defineCachedEventHandler(
  async () => {
    return {
      color: '#313131',
    };
  },
  { maxAge: 60 * 60 }
);