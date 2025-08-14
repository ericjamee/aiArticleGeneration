import { kv } from "@vercel/kv";

// Initialize KV with the correct environment variables
const kvConfig = {
  url: process.env.REDIS_URL,
  token: process.env.KV_REST_API_TOKEN,
};

export async function savePost(slug: string, meta: any, content: string) {
  await kv.hset(`post:${slug}`, { ...meta, content });
  await kv.zadd("posts:index", { score: Date.parse(meta.date), member: slug });
}

export async function listPosts(limit = 50, offset = 0) {
  const slugs = await kv.zrange("posts:index", offset, offset + limit - 1, { rev: true });
  const rows = await Promise.all(slugs.map((s) => kv.hgetall(`post:${String(s)}`)));
  return rows.map((r: any, i: number) => ({ ...r, slug: slugs[i] }));
}

export async function getPost(slug: string) {
  const r: any = await kv.hgetall(`post:${slug}`);
  if (!r || !r.title) throw new Error("Not found");
  return r;
}