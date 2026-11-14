import { notFound } from "next/navigation";
import sharp from "sharp";
import { buildLogDirectory, findPublishedEntry } from "@/lib/build-log";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

function escapeXml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;",
  })[character] ?? character);
}

function wrapTitle(title: string, maxCharacters = 24) {
  const words = title.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && candidate.length > maxCharacters) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 2);
}

export default async function OpenGraphImage({ params }: { params: Promise<{ daySlug: string }> }) {
  const { daySlug } = await params;
  const match = /^day-([1-9]\d*)$/.exec(daySlug);
  const entry = match ? findPublishedEntry(buildLogDirectory, Number(match[1])) : undefined;
  if (!entry) notFound();

  const titleLines = wrapTitle(entry.title).map((line, index) => `<tspan x="96" dy="${index ? 94 : 0}">${escapeXml(line)}</tspan>`).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}" height="${size.height}" viewBox="0 0 ${size.width} ${size.height}">
    <rect width="1200" height="630" fill="#0a0a0a"/>
    <path d="M0 80H1200M0 176H1200M0 272H1200M0 368H1200M0 464H1200M0 560H1200M96 0V630M192 0V630M288 0V630M384 0V630M480 0V630M576 0V630M672 0V630M768 0V630M864 0V630M960 0V630M1056 0V630M1152 0V630" stroke="#ffffff" stroke-opacity=".055"/>
    <text x="96" y="110" fill="#a1a1a1" font-family="Arial,sans-serif" font-size="26" letter-spacing="4">HEY KAKAA / APP #11</text>
    <circle cx="108" cy="225" r="12" fill="#3080ff"/>
    <text x="142" y="236" fill="#3080ff" font-family="Arial,sans-serif" font-size="32" letter-spacing="2">DAY ${String(entry.day).padStart(2, "0")}</text>
    <text x="96" y="365" fill="#fafafa" font-family="Arial,sans-serif" font-size="84" font-weight="700" letter-spacing="-3">${titleLines}</text>
    <text x="96" y="564" fill="#a1a1a1" font-family="Arial,sans-serif" font-size="25">www.heykakaa.com/build-log/${entry.slug}</text>
  </svg>`;
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), { headers: { "Content-Type": contentType, "Cache-Control": "public, max-age=31536000, immutable" } });
}
