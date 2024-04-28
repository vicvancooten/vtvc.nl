export function adjustContrast(color: string, amount: number): string {
  // Convert color to RGB
  const rgb = hexToRgb(color)

  // Adjust contrast
  const contrast = amount > 0 ? (amount * 255) / (255 - amount) : amount
  const adjustedRgb = {
    r: Math.round((rgb.r - 128) * contrast + 128),
    g: Math.round((rgb.g - 128) * contrast + 128),
    b: Math.round((rgb.b - 128) * contrast + 128),
  }

  // Convert RGB back to hex
  const adjustedColor = rgbToHex(adjustedRgb.r, adjustedRgb.g, adjustedRgb.b)

  return adjustedColor
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 }
}

export function rgbToHex(r: number, g: number, b: number): string {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`
}

export function componentToHex(c: number): string {
  const hex = c.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}
