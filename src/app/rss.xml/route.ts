// app/rss.xml/route.ts
import { NextResponse } from "next/server";
import { listPosts } from "@/lib/store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const base = process.env.SITE_URL!;
  const posts = await listPosts(100);
  const items = posts.map((p) => `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${base}/${p.slug}</link>
      <guid>${base}/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description><![CDATA[${p.title}]]></description>
    </item>`).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0"><channel>
    <title>Feed - ${process.env.SITE_NAME}</title>
    <link>${base}</link>
    <description>${process.env.SITE_NAME}</description>
    ${items}
  </channel></rss>`;
  return new NextResponse(xml, { headers: { "Content-Type": "application/xml" } });
}