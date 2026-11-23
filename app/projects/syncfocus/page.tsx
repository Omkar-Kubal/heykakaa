import type { Metadata } from "next";
import { AndroidAppDetail } from "../../components/android-app-detail";
import { androidApps } from "@/lib/android-apps";

const app = androidApps.syncfocus;
const image = app.shareImage;

export const metadata: Metadata = {
  title: "Sync Focus Pomodoro Timer for Android | HeyKakaa",
  description:
    "Make time for focus with Sync Focus: a circular timer, task planner, ambient sounds, and session progress for Android.",
  alternates: { canonical: "/projects/syncfocus" },
  openGraph: {
    type: "website",
    title: "Sync Focus Pomodoro Timer for Android",
    description: app.shareDescription,
    url: "/projects/syncfocus",
    images: [{ url: image, width: app.shareImageWidth, height: app.shareImageHeight, alt: app.shareTitle }],
  },
  twitter: { card: "summary_large_image", images: [image] },
};

export default function SyncFocusPage() {
  return <AndroidAppDetail app={app} />;
}
