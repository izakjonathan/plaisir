// Login is deliberately not required in this version. Add authorization here later.
export function requireSameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  const target = new URL(request.url);
  const forwardedHost = request.headers.get('x-forwarded-host');
  const expected = forwardedHost ? `${target.protocol}//${forwardedHost}` : target.origin;
  if (!origin || (origin !== target.origin && origin !== expected) || request.headers.get('sec-fetch-site') === 'cross-site') throw new Error('This request must come from the editor on this website.');
}
export async function readJSON(request: Request) {
  if (!request.headers.get('content-type')?.includes('application/json')) throw new Error('Expected JSON.');
  const text = await request.text();
  if (text.length > 320000) throw new Error('Request is too large.');
  return JSON.parse(text);
}
export function editorError(error: unknown) {
  const message = error instanceof Error ? error.message : 'The request could not be completed.';
  const known = /^(CONFLICT:|Invalid |Use |Content |An image |This request |Expected |Request |Connect |Upload |Choose |Image |Too many |No previous)/.test(message);
  return Response.json({ error: known ? message : 'Storage could not complete the request. Check the database and Blob connection in Vercel.' }, { status: message.startsWith('CONFLICT:') ? 409 : known ? 400 : 503, headers: { 'Cache-Control':'no-store' } });
}
