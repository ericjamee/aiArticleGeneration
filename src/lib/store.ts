// lib/store.ts
import { kv } from "@vercel/kv";

export async function savePost(slug: string, meta: any, content: string) {
  // store post body + meta in a hash
  await kv.hset(`post:${slug}`, { ...meta, content });
  // store in sorted set for time-based listing
  await kv.zadd("posts:index", { score: Date.parse(meta.date), member: slug });
}

export async function listPosts(limit = 50, offset = 0) {
  // Get all posts sorted by date (newest first)
  const slugs = await kv.zrange("posts:index", offset, offset + limit - 1, {
    rev: true // reverse order to get newest first
  });
  
  if (!slugs.length) return [];
  
  // Get post data for each slug
  const rows = await Promise.all(
    slugs.map(async (s) => {
      const data = await kv.hgetall(`post:${s}`);
      return { ...data, slug: s };
    })
  );
  
  return rows;
}

export async function getPost(slug: string) {
  const data = await kv.hgetall(`post:${slug}`);
  if (!data || !data.title) throw new Error("Post not found");
  return data;
}