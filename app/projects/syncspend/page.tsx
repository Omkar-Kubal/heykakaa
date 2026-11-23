import type { Metadata } from "next";
import { AndroidAppDetail } from "../../components/android-app-detail";
import { androidApps } from "@/lib/android-apps";

const app = androidApps.syncspend;
const image = app.shareImage;

export const metadata: Metadata = {
  title: "SyncSpend Expense Tracker for Android | HeyKakaa",
  description:
    "Explore SyncSpend for Android: log daily expenses, review spending insights, sync with Notion, use widgets, and export records as CSV.",
  alternates: { canonical: "/projects/syncspend" },
  openGraph: {
    type: "website",
    title: "SyncSpend Expense Tracker for Android",
    description: app.shareDescription,
    url: "/projects/syncspend",
    images: [{ url: image, width: app.shareImageWidth, height: app.shareImageHeight, alt: app.shareImageAlt }],
  },
  twitter: { card: "summary_large_image", images: [image] },
};

export default function SyncSpendPage() {
  return <AndroidAppDetail app={app} />;
}
