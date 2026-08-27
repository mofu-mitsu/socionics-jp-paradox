import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const runtime = 'nodejs';

export async function GET() {
  const imagePath = path.join(process.cwd(), 'public', 'ogp.png');
  const image = await readFile(imagePath);

  return new Response(image, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
