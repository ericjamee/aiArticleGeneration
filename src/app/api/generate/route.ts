import { NextResponse } from "next/server";
import keywords from "../../../data/keywords.json";
import { writeArticle } from "@/lib/ai";
import { injectAffiliateLinks, extractRelatedTargets, stripRelatedMarkers } from "@/lib/affiliates";
import { savePost, listPosts } from "@/lib/store";

export const runtime = "nodejs";

export async function POST() {
  const siteName = process.env.SITE_NAME || "My Niche Site";
  const siteUrl  = process.env.SITE_URL  || "http://localhost:3000";

  const existing = new Set((await listPosts(500)).map((p: any) => p.keyword));
  const topic = keywords.find((k) => !existing.has(k)) || keywords[0];

  const raw = await writeArticle({ topic, siteName, siteUrl });

  const withAff = injectAffiliateLinks(raw);
  const relatedTargets = extractRelatedTargets(withAff);
  const body = stripRelatedMarkers(withAff);

  const m = body.match(/^#\s+(.+)$/m);
  const title = m ? m[1].trim() : topic;
  const slugSafe = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const slug = `${new Date().toISOString().slice(0, 7)}-${slugSafe}`;

  const meta = { title, date: new Date().toISOString(), keyword: topic, relatedTargets };
  await savePost(slug, meta, body);

  return NextResponse.json({ ok: true, slug, title });
}