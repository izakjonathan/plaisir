import { textValue, type ContentDocument } from './content-schema.ts';

export function brandColors(document: ContentDocument) {
  const color = (id: string, fallback: string) => {
    const value = textValue(document, id);
    return /^#[0-9a-f]{6}$/i.test(value) ? value : fallback;
  };
  return { green: color('brand.green', '#263D32'), gold: color('brand.gold', '#D8B15B') };
}

// Strict hex validation keeps stored values safe inside the server-rendered stylesheet.
export function brandStyle(document: ContentDocument) {
  const { green, gold } = brandColors(document);
  const rgb = [1, 3, 5].map(index => parseInt(green.slice(index, index + 2), 16)).join(' ');
  return `:root{--brand-green:${green};--brand-gold:${gold};--brand-green-rgb:${rgb};--brand-dark:color-mix(in srgb,${green} 66%,black);--brand-deep:color-mix(in srgb,${green} 78%,black);}`;
}
