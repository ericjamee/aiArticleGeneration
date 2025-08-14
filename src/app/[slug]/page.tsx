// app/[slug]/page.tsx
import { getPost, listPosts } from "@/lib/store";
import { remark } from "remark";
import html from "remark-html";
import Link from "next/link";
import { Post } from "@/types/post";

export const dynamic = "force-dynamic";

export default async function Post({ params }: { params: { slug: string } }) {
  const meta = await getPost(params.slug);
  const processed = await remark().use(html).process(meta.content || "");

  // naive related: match keywords suggested by generator
  const all = await listPosts(100);
  const related = all
    .filter((p: Post) => p.slug !== params.slug)
    .filter((p: Post) =>
      (meta.relatedTargets || []).some((t: string) =>
        (p.keyword || "").toLowerCase().includes(t.toLowerCase())
      )
    )
    .slice(0, 3);

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">{meta.title}</h1>
      <div className="text-xs text-gray-500 mb-8">
        {new Date(meta.date).toLocaleDateString()}
      </div>

      <article
        className="prose"
        dangerouslySetInnerHTML={{ __html: processed.toString() }}
      />

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-3">Related reads</h2>
          <ul className="list-disc ml-6">
            {related.map((r: Post) => (
              <li key={r.slug}>
                <Link className="text-blue-600 hover:underline" href={`/${r.slug}`}>
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}