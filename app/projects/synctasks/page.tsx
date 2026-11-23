import type { Metadata } from "next";
import { AndroidAppDetail } from "../../components/android-app-detail";
import { androidApps } from "@/lib/android-apps";

const app = androidApps.synctasks;
const image = app.shareImage;

export const metadata: Metadata = {
  title: "SyncTasks To-Do List and Planner for Android | HeyKakaa",
  description:
    "Explore SyncTasks for Android: plan your day, organize tasks with lists and folders, set reminders, create recurring tasks, and track progress.",
  alternates: { canonical: "/projects/synctasks" },
  openGraph: {
    type: "website",
    title: "SyncTasks To-Do List and Planner for Android",
    description: app.shareDescription,
    url: "/projects/synctasks",
    images: [{ url: image, width: app.shareImageWidth, height: app.shareImageHeight, alt: app.shareImageAlt }],
  },
  twitter: { card: "summary_large_image", images: [image] },
};

export default function SyncTasksPage() {
  return <AndroidAppDetail app={app} />;
}
