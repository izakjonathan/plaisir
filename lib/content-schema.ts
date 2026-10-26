import definitions from './content-fields.json' with { type: 'json' };

export type ContentImageValue = { src: string; alt: string; width: number; height: number; x: number; y: number };
export type Field = { id: string; page: string; section: string; label: string; kind: 'text' | 'image' | 'link'; default: string | ContentImageValue; multiline?: boolean; hidden?: boolean };
export const fields = definitions as Field[];
export const fieldMap = new Map(fields.map(field => [field.id, field]));
export type ContentDocument = { text: Record<string, string>; images: Record<string, ContentImageValue> };
export const emptyDocument: ContentDocument = { text: {}, images: {} };
export function textValue(document: ContentDocument, id: string): string {
  if (id === 'experience.hero.title' && document.text[id] === undefined) {
    // Existing drafts and published history may still contain separate lines.
    return ['experience.hero.text2','experience.hero.text3','experience.hero.text4']
      .map(key => document.text[key] ?? String(fieldMap.get(key)?.default ?? '')).join('\n');
  }
  return document.text[id] ?? String(fieldMap.get(id)?.default ?? '');
}
export function imageValue(document: ContentDocument, id: string): ContentImageValue {
  return document.images[id] ?? fieldMap.get(id)?.default as ContentImageValue;
}
export function safeLink(value: string): boolean {
  return /^(\/(?!\/)|#[\w-]|https:\/\/|mailto:|tel:)/i.test(value) && !/[\x00-\x20\\]/.test(value);
}
export function validateDocument(input: unknown): ContentDocument {
  if (!input || typeof input !== 'object' || JSON.stringify(input).length > 300000) throw new Error('Content is too large or invalid.');
  const source = input as Record<string, unknown>;
  if (!source.text || !source.images || typeof source.text !== 'object' || typeof source.images !== 'object' || Array.isArray(source.text) || Array.isArray(source.images)) throw new Error('Invalid content document.');
  const clean: ContentDocument = { text: {}, images: {} };
  for (const [id, value] of Object.entries(source.text)) {
    const field = fieldMap.get(id);
    if (!field || field.kind === 'image' || typeof value !== 'string' || value.length > (field.kind === 'link' ? 500 : 12000)) throw new Error('Invalid text field.');
    if (field.kind === 'link' && !safeLink(value)) throw new Error('Use an internal link, https://, mailto: or tel: link.');
    clean.text[id] = value;
  }
  for (const [id, raw] of Object.entries(source.images)) {
    if (fieldMap.get(id)?.kind !== 'image' || !raw || typeof raw !== 'object') throw new Error('Invalid image field.');
    const v = raw as ContentImageValue;
    const isExisting = fields.some(field => field.kind === 'image' && (field.default as ContentImageValue).src === v.src);
    if (typeof v.src !== 'string' || (!isExisting && !/^\/media\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(v.src)) || typeof v.alt !== 'string' || v.alt.length > 500 || ![v.width, v.height].every(n => Number.isInteger(n) && n > 0 && n <= 12000) || ![v.x,v.y].every(n => Number.isFinite(n) && n >= 0 && n <= 100)) throw new Error('Invalid image source, dimensions or crop.');
    clean.images[id] = { src: v.src, alt: v.alt, width: v.width, height: v.height, x: v.x, y: v.y };
  }
  return clean;
}
export function requireRevision(value: unknown): number {
  if (!Number.isSafeInteger(value) || (value as number) < 0) throw new Error('Invalid revision.');
  return value as number;
}
