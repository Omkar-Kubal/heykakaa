import type { Metadata } from "next";
import "./globals.css";
import "./heykakaa.css";
import { FirebasePageViews } from "./components/firebase-page-views";
import { SiteMotion } from "./components/site-motion";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.heykakaa.com"),
  title: "HeyKakaa | Android apps by Kaka",
  description:
    "Meet Kaka, the Android app developer behind SyncSpend and SyncTasks. Explore the apps and follow the App #11 build log.",
  applicationName: "HeyKakaa",
  creator: "@hey.kakaa",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark hpvSLW_variable font-sans antialiased" style={{ colorScheme: "dark" }}>
      <body>
        <SiteMotion />
        <div className="hk-site-content">{children}<FirebasePageViews /></div>
      </body>
    </html>
  );
}
