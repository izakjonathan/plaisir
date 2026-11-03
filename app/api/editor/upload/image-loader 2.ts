interface ImageLoaderParams {
  src: string;
  width: number;
  quality?: number;
}

/**
 * Optimized Image Loader Utility for Plaisir Media Infrastructure.
 * Integrates directly with Next.js Image Optimization API on Vercel.
 */
export default function vercelImageLoader({ src, width, quality }: ImageLoaderParams): string {
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  
  const normalizedSrc = src.startsWith('/') ? src : `/${src}`;
  
  const params = new URLSearchParams({
    url: normalizedSrc,
    w: width.toString(),
    q: (quality || 75).toString(),
  });

  return `/_next/image?${params.toString()}`;
}
