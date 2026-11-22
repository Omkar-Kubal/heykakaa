import sharp from "sharp";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const assets = join(root, "public", "assets");
const apps = [
  {
    name: "SyncSpend",
    shortDescription: "Daily expense log",
    caption: "Record expenses, review spending, and optionally sync with Notion.",
    banner: "/assets/syncspend-banner.jpg",
    icon: "/assets/syncspend-icon.png",
    shareImage: "/assets/syncspend-social.webp",
    screenshotCrop: { left: 320, top: 0, width: 340, height: 330 },
  },
  {
    name: "SyncTasks",
    shortDescription: "Tasks & to-do planner",
    caption: "Plan today, set reminders, and organize tasks with lists.",
    banner: "/assets/synctasks-banner.jpg",
    icon: "/assets/synctasks-icon.png",
    shareImage: "/assets/synctasks-social.webp",
    screenshotCrop: { left: 350, top: 0, width: 260, height: 366 },
  },
];
const escapeXml = (value) => value.replace(/[&<>"']/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;",
})[character]);

function readEntry(filename) {
  const source = readFileSync(join(root, "content", "build-log", filename), "utf8");
  const { data } = matter(source);
  const kind = filename === "introduction.md" ? "introduction" : "day";
  return {
    ...data,
    kind,
    day: kind === "day" ? Number(data.day) : undefined,
    slug: kind === "introduction" ? "introduction" : `day-${Number(data.day)}`,
    coverImage: data.cover_image,
  };
}

function wrap(value, maxCharacters) {
  const lines = [];
  let line = "";
  for (const word of value.split(/\s+/)) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && candidate.length > maxCharacters) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function articleSvg({ title, summary, label }) {
  const titleLines = wrap(title, 23).slice(0, 3)
    .map((line, index) => `<tspan x="76" dy="${index ? 72 : 0}">${escapeXml(line)}</tspan>`).join("");
  const summaryLines = wrap(summary, 62).slice(0, 2)
    .map((line, index) => `<tspan x="76" dy="${index ? 29 : 0}">${escapeXml(line)}</tspan>`).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="675" viewBox="0 0 720 675">
    <defs><linearGradient id="fade" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#121720"/><stop offset="1" stop-color="#0a0a0a"/></linearGradient></defs>
    <rect width="720" height="675" fill="url(#fade)"/>
    <path d="M0 86H720M0 172H720M0 258H720M0 344H720M0 430H720M0 516H720M0 602H720M72 0V675M144 0V675M216 0V675M288 0V675M360 0V675M432 0V675M504 0V675M576 0V675M648 0V675" stroke="#ffffff" stroke-opacity=".035"/>
    <text x="76" y="112" fill="#a1a1a1" font-family="Arial,sans-serif" font-size="20" letter-spacing="3">HEY KAKAA / ANDROID</text>
    <circle cx="85" cy="177" r="6" fill="#3080ff"/>
    <text x="103" y="184" fill="#70a8ff" font-family="Arial,sans-serif" font-size="20" letter-spacing="2">${escapeXml(label.toUpperCase())}</text>
    <text x="76" y="284" fill="#fafafa" font-family="Arial,sans-serif" font-size="55" font-weight="700" letter-spacing="-2">${titleLines}</text>
    <text x="76" y="526" fill="#bdbdbd" font-family="Arial,sans-serif" font-size="19">${summaryLines}</text>
    <text x="76" y="630" fill="#70a8ff" font-family="Arial,sans-serif" font-size="19">www.heykakaa.com</text>
  </svg>`;
}

async function makeArticleImage({ source, output, title, summary, label }) {
  const sourcePath = join(root, "public", source.slice(1));
  const { width, height } = await sharp(sourcePath).metadata();
  const top = Math.min(650, Math.max(0, height - 950));
  const cropHeight = Math.min(1380, height - top);
  const portrait = await sharp(sourcePath)
    .extract({ left: 0, top, width, height: cropHeight })
    .resize(480, 675, { fit: "cover", position: "attention" })
    .jpeg({ quality: 88 })
    .toBuffer();
  const panel = Buffer.from(articleSvg({ title, summary, label }));

  await sharp({ create: { width: 1200, height: 675, channels: 3, background: "#0a0a0a" } })
    .composite([
      { input: portrait, left: 0, top: 0 },
      { input: panel, left: 480, top: 0 },
    ])
    .webp({ quality: 89 })
    .toFile(join(assets, output));
}

const entryFiles = readdirSync(join(root, "content", "build-log"))
  .filter((filename) => filename === "introduction.md" || /^day-\d+\.md$/.test(filename));
for (const filename of entryFiles) {
  const entry = readEntry(filename);
  if (entry.status !== "published" || !entry.coverImage) continue;
  const title = entry.kind === "introduction" ? entry.title : `${String(entry.day).padStart(2, "0")}: ${entry.title}`;
  await makeArticleImage({
    source: entry.coverImage,
    output: `build-log-${entry.slug}-og.webp`,
    title,
    summary: entry.summary,
    label: entry.kind === "introduction" ? "App #11 introduction" : `App #11 / Day ${String(entry.day).padStart(2, "0")}`,
  });
}

const dayThree = readEntry("day-03.md");
await makeArticleImage({
  source: dayThree.coverImage,
  output: "guide-app-prd-srs-og.webp",
  title: "How to Write a PRD and SRS for an Android App",
  summary: "A practical guide with a reusable outline and an App #11 example.",
  label: "Practical Android app guide",
});

for (const app of apps) {
  const screenshot = await sharp(join(root, "public", app.banner.slice(1)))
    .extract(app.screenshotCrop)
    .resize(580, 675, { fit: "cover", position: "attention" })
    .toBuffer();
  const icon = await sharp(join(root, "public", app.icon.slice(1)))
    .resize(156, 156, { fit: "cover", kernel: "lanczos3" })
    .png()
    .toBuffer();
  const appLines = wrap(app.caption, 45).slice(0, 4)
    .map((line, index) => `<tspan x="72" dy="${index ? 31 : 0}">${escapeXml(line)}</tspan>`).join("");
  const appLabel = `<svg xmlns="http://www.w3.org/2000/svg" width="620" height="675" viewBox="0 0 620 675">
    <rect width="620" height="675" fill="#0a0a0a"/>
    <path d="M0 90H620M0 180H620M0 270H620M0 360H620M0 450H620M0 540H620M0 630H620M90 0V675M180 0V675M270 0V675M360 0V675M450 0V675M540 0V675" stroke="#ffffff" stroke-opacity=".04"/>
    <text x="72" y="76" fill="#a1a1a1" font-family="Arial,sans-serif" font-size="18" letter-spacing="3">HEY KAKAA / ANDROID APP</text>
    <text x="72" y="375" fill="#fafafa" font-family="Arial,sans-serif" font-size="54" font-weight="700" letter-spacing="-2">${escapeXml(app.name)}</text>
    <text x="72" y="422" fill="#70a8ff" font-family="Arial,sans-serif" font-size="25">${escapeXml(app.shortDescription)}</text>
    <text x="72" y="480" fill="#bdbdbd" font-family="Arial,sans-serif" font-size="20">${appLines}</text>
    <text x="72" y="622" fill="#70a8ff" font-family="Arial,sans-serif" font-size="20">Explore on Google Play</text>
  </svg>`;
  await sharp({ create: { width: 1200, height: 675, channels: 3, background: "#0a0a0a" } })
    .composite([
      { input: Buffer.from(appLabel), left: 0, top: 0 },
      { input: icon, left: 72, top: 132 },
      { input: screenshot, left: 620, top: 0 },
    ])
    .webp({ quality: 90 })
    .toFile(join(assets, app.shareImage.split("/").at(-1)));
}

console.log("Generated landscape share images for published articles, the guide, and both apps.");
