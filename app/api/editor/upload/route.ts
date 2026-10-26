import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { ensureSchema, sql, mediaConfigured } from '../../../../lib/content-db';
import { editorError, readJSON, requireSameOrigin } from '../../../../lib/editor-request';
export const runtime = 'nodejs';
export async function POST(request: Request) {
  try {
    requireSameOrigin(request);
    if (!mediaConfigured()) throw new Error('Connect a private Vercel Blob store to enable image uploads.');
    const body = await readJSON(request) as HandleUploadBody;
    const result = await handleUpload({ request, body, onBeforeGenerateToken: async pathname => {
      const match = /^pending\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\.(jpg|png|webp)$/.exec(pathname);
      if (!match) throw new Error('Invalid upload name.');
      await ensureSchema();
      const db = sql();
      // A daily ceiling limits accidental repeated uploads in this no-login edition.
      const [row] = await db`SELECT count(*)::integer AS count FROM plaisir_uploads WHERE created_at>now()-interval '1 day'`;
      if (row.count >= 100) throw new Error('Too many uploads today. Try again tomorrow.');
      await db`INSERT INTO plaisir_uploads (id,pathname) VALUES (${match[1]},${pathname})`;
      return { allowedContentTypes:['image/jpeg','image/png','image/webp'], maximumSizeInBytes:25000000, validUntil:Date.now()+10*60*1000, addRandomSuffix:false, allowOverwrite:false };
    }});
    return Response.json(result);
  } catch (error) { return editorError(error); }
}
