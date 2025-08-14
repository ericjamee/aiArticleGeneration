// lib/affiliates.ts
export function injectAffiliateLinks(md: string, tag = process.env.AFFILIATE_TAG) {
  return md.replace(/\{\{AFFILIATE:\s*([^}]+)\}\}/g, (_, raw) => {
    const q = encodeURIComponent(String(raw).trim());
    const url = `https://www.amazon.com/s?k=${q}&tag=${tag}`;
    return `> **Recommended**: [${raw}](${url})`;
  });
}

export function extractRelatedTargets(md: string): string[] {
  const matches = [...md.matchAll(/\{\{RELATED:\s*([^}]+)\}\}/g)];
  return matches.map((m) => String(m[1]).trim());
}

export function stripRelatedMarkers(md: string): string {
  return md.replace(/\{\{RELATED:[^}]+\}\}/g, "");
}
