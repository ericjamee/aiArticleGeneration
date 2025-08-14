export function injectAffiliateLinks(md: string, tag = process.env.AFFILIATE_TAG) {
  return md.replace(/\{\{AFFILIATE:\s*([^}]+)\}\}/g, (_, raw) => {
    const q = encodeURIComponent(String(raw).trim());
    const base = `https://www.amazon.com/s?k=${q}`;
    const url = tag ? `${base}&tag=${tag}` : base; // safe fallback
    return `> **Recommended**: [${raw}](${url})`;
  });
}

export function extractRelatedTargets(md: string): string[] {
  const matches = md.match(/\{\{RELATED:\s*([^}]+)\}\}/g) || [];
  return matches.map(m => m.match(/\{\{RELATED:\s*([^}]+)\}\}/)![1].trim());
}

export function stripRelatedMarkers(md: string): string {
  return md.replace(/\{\{RELATED:\s*([^}]+)\}\}/g, "");
}