export function hexToRgb(hex: string) {
  const sanitized = hex.replace('#', '');
  const parsed = sanitized.length === 3
    ? sanitized.split('').map((char) => char + char).join('')
    : sanitized;

  const bigint = Number.parseInt(parsed, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

export function rgbToHex(r: number, g: number, b: number) {
  return '#' + [r, g, b].map((value) => value.toString(16).padStart(2, '0')).join('').toUpperCase();
}

export function getColorDistance(colorA: string, colorB: string) {
  const a = hexToRgb(colorA);
  const b = hexToRgb(colorB);
  const dr = a.r - b.r;
  const dg = a.g - b.g;
  const db = a.b - b.b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

export function sortMatches(baseColor: string, productList: { hex: string }[]) {
  return [...productList].sort((a, b) => getColorDistance(baseColor, a.hex) - getColorDistance(baseColor, b.hex));
}

export function getAverageColorFromImage(src: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Canvas not available'));
        return;
      }

      const width = 120;
      const height = 120;
      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(image, 0, 0, width, height);
      const imageData = ctx.getImageData(0, 0, width, height).data;

      let r = 0;
      let g = 0;
      let b = 0;
      let total = 0;

      for (let i = 0; i < imageData.length; i += 4) {
        const alpha = imageData[i + 3];
        if (alpha === 0) continue;
        r += imageData[i];
        g += imageData[i + 1];
        b += imageData[i + 2];
        total += 1;
      }

      if (!total) {
        reject(new Error('Image is empty'));
        return;
      }

      const averageR = Math.round(r / total);
      const averageG = Math.round(g / total);
      const averageB = Math.round(b / total);
      resolve(rgbToHex(averageR, averageG, averageB));
    };
    image.onerror = () => reject(new Error('Unable to process image'));
    image.src = src;
  });
}
