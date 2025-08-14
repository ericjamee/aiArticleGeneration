// lib/store.ts
import { kv } from "@vercel/kv";

export async function savePost(slug: string, meta: any, content: string) {
  // store post body + meta in a hash
  await kv.hset(`post:${slug}`, { ...meta, content });
  // index by time for easy listing (newest first)
  await kv.zadd("posts:index", {
    score: Date.parse(meta.date),
    member: slug,
  });
}

export async function listPosts(limit = 50, offset = 0) {
  const slugs = await kv.zrevrange("posts:index", offset, offset + limit - 1);
  const rows = await Promise.all(slugs.map((s) => kv.hgetall(`post:${s}`)));
  return rows.map((r: any, i) => ({ ...r, slug: slugs[i] }));
}

export async function getPost(slug: string) {
  const r: any = await kv.hgetall(`post:${slug}`);
  if (!r || !r.title) throw new Error("Not found");
  return r;
}
