import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function GET() {
  await kv.set("kv:hello", "It works!");
  const val = await kv.get("kv:hello");
  return NextResponse.json({ ok: true, val });
}