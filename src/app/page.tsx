import Link from "next/link";
import { listPosts } from "@/lib/store";

export const dynamic = "force-dynamic"; // no static export

export default async function Home() {
  const posts = await listPosts(100);
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">{process.env.SITE_NAME || "MicroGym Living"}</h1>
      <section className="rounded border p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Latest Articles</h2>
        {posts.length === 0 ? (
          <div>No posts yet — <a className="text-blue-600 underline" href="/api/generate">generate one</a>.</div>
        ) : (
          <ul className="space-y-3">
            {posts.map((p: any) => (
              <li key={p.slug}>
                <Link className="text-blue-600 hover:underline" href={`/${p.slug}`}>{p.title}</Link>
                <div className="text-xs text-gray-500">{new Date(p.date).toLocaleDateString()}</div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}