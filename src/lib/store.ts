// lib/store.ts
import { kv } from "@vercel/kv";
import type { Post, PostMeta } from "@/types/post";

function isPostMeta(data: unknown): data is PostMeta {
  if (!data || typeof data !== 'object') return false;
  const d = data as Record<string, unknown>;
  return typeof d.title === 'string' &&
         typeof d.date === 'string' &&
         typeof d.keyword === 'string' &&
         typeof d.content === 'string' &&
         Array.isArray(d.relatedTargets);
}

// In-memory store for local development
const localStore = new Map<string, PostMeta>();
const localIndex: { score: number; member: string }[] = [];

function getStore() {
  const hasKV = process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN;
  if (hasKV) return kv;

  // Local implementation
  return {
    async hset(key: string, data: Record<string, any>) {
      localStore.set(key, data as PostMeta);
      return 1;
    },
    async hgetall(key: string) {
      return localStore.get(key.replace('post:', '')) || null;
    },
    async zadd(key: string, data: { score: number; member: string }) {
      localIndex.push(data);
      localIndex.sort((a, b) => b.score - a.score); // Keep sorted by score desc
      return 1;
    },
    async zrange(key: string, start: number, end: number, opts?: { rev: boolean }) {
      const items = opts?.rev ? localIndex : [...localIndex].reverse();
      return items.slice(start, end + 1).map(item => item.member);
    }
  };
}

export async function savePost(slug: string, meta: Omit<PostMeta, 'content'>, content: string) {
  const store = getStore();
  // store post body + meta in a hash
  await store.hset(`post:${slug}`, { ...meta, content });
  // store in sorted set for time-based listing
  await store.zadd("posts:index", { score: Date.parse(meta.date), member: slug });
}

export async function listPosts(limit = 50, offset = 0): Promise<Post[]> {
  const store = getStore();
  // Get all posts sorted by date (newest first)
  const slugs = await store.zrange("posts:index", offset, offset + limit - 1, {
    rev: true // reverse order to get newest first
  }) as string[];
  
  if (!slugs.length) return [];
  
  // Get post data for each slug
  const rows = await Promise.all(
    slugs.map(async (slug) => {
      const data = await store.hgetall(`post:${slug}`);
      if (!isPostMeta(data)) {
        throw new Error(`Invalid post data for slug: ${slug}`);
      }
      return { ...data, slug } as Post;
    })
  );
  
  return rows;
}

export async function getPost(slug: string): Promise<PostMeta> {
  const store = getStore();
  const data = await store.hgetall(`post:${slug}`);
  if (!isPostMeta(data)) {
    throw new Error("Post not found or invalid data");
  }
  return data;
}