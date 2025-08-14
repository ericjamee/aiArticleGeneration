// lib/ai.ts
import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function writeArticle(opts: {
  topic: string;
  siteName: string;
  siteUrl: string;
}) {
  const { topic, siteName, siteUrl } = opts;

  const system = `You are a fitness writer for a niche site called "${siteName}". 
Write clear, practical, trustworthy guides for people in small apartments.
Tone: friendly, concise, credible, with step-by-step tips.
Include 2–4 product recommendation sections where relevant, but do NOT invent brands—just use generic placeholders that we'll link afterward.`;

  const user = `Write a 1200–1600 word article on: "${topic}".
Structure: 
- H1 title
- short intro
- sections with H2s/H3s, bullet lists, and step-by-step tips
- a "What to Buy" section (bulleted), using generic names like "adjustable dumbbells", "walking pad", "non-slip yoga mat"
- a "Quick Routine" section with a 15–25 minute routine
- a "Storage Tips" section for small apartments
- a brief FAQ (3–5 Q&As)
- conclusion with a simple call to action.

Add 3 spots like: {{AFFILIATE: adjustable dumbbells}}, {{AFFILIATE: walking pad}}, {{AFFILIATE: non-slip yoga mat}}
Do not use markdown tables.
End with 3 related internal link suggestions as: 
{{RELATED: doorway pull-up bar safety}}, {{RELATED: apartment-friendly HIIT routine no jumping}}, etc.`;

  const resp = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [{ role: "system", content: system }, { role: "user", content: user }],
    temperature: 0.5,
  });

  const content = resp.choices[0]?.message?.content ?? "";
  return content;
}
