export const truncateText = (input?: string, maxLength?: number) =>
  input
    ? input.length > (maxLength ?? 5)
      ? `${input.substring(0, maxLength ?? 5)}...`
      : input
    : ''
