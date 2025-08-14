// app/page.tsx
import Link from "next/link";
import { listPosts } from "@/lib/store";
import type { Post } from "@/types/post";

export const dynamic = "force-dynamic";

export default async function Home() {
  const posts = await listPosts(100);

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">{process.env.SITE_NAME}</h1>
      <p className="text-sm text-gray-600 mb-8">
        Apartment-friendly workouts & gear that actually fit your space.
      </p>

      <section className="mb-8 grid grid-cols-3 gap-4">
        <div className="rounded-lg border p-6 text-center">
          <div className="text-2xl font-semibold">{posts.length}</div>
          <div className="text-xs text-gray-600">Articles</div>
        </div>
        <div className="rounded-lg border p-6 text-center">
          <div className="text-2xl font-semibold">24/7</div>
          <div className="text-xs text-gray-600">Publishing</div>
        </div>
        <div className="rounded-lg border p-6 text-center">
          <div className="text-2xl font-semibold">100%</div>
          <div className="text-xs text-gray-600">Apartment-Friendly</div>
        </div>
      </section>

      <section className="rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Latest Articles</h2>
        {posts.length === 0 ? (
          <div className="text-center text-gray-600">
            No posts yet
            <div className="mt-4">
              <GenerateButton />
            </div>
          </div>
        ) : (
          <ul className="space-y-4">
            {posts.map((p: Post) => (
              <li key={p.slug}>
                <Link className="text-blue-600 hover:underline" href={`/${p.slug}`}>{p.title}</Link>
                <div className="text-xs text-gray-500">
                  {new Date(p.date).toLocaleDateString()}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer className="text-center text-sm text-gray-500 mt-10">
        Powered by AI • Built for apartment dwellers
      </footer>
    </main>
  );
}

function GenerateButton() {
  return (
    <form action="/api/generate" method="post">
      <button
        className="px-4 py-2 rounded bg-blue-600 text-white"
        type="submit"
      >
        Generate Article
      </button>
    </form>
  );
}