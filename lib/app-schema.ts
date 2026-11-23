import type { AndroidApp } from "./android-apps";

export function createSoftwareApplicationSchema(app: AndroidApp) {
  const slug = app.name.toLowerCase().replace(/\s+/g, "");

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.name,
    description: app.description,
    applicationCategory: app.applicationCategory,
    operatingSystem: "Android",
    image: `https://www.heykakaa.com${app.shareImage}`,
    downloadUrl: app.playUrl,
    url: `https://www.heykakaa.com/projects/${slug}`,
    creator: {
      "@type": "Person",
      name: "Kaka",
      url: "https://www.heykakaa.com",
    },
  };
}
