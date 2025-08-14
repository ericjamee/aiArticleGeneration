// app/sitemap.xml/route.ts
import { NextResponse } from "next/server";
import { listPosts } from "@/lib/store";

export async function GET() {
  const base = process.env.SITE_URL!;
  const posts = await listPosts(1000);
  const urls = posts.map(
    (p: any) => `<url><loc>${base}/${p.slug}</loc><lastmod>${p.date}</lastmod></url>`
  ).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
  return new NextResponse(xml, { headers: { "Content-Type": "application/xml" } });
}