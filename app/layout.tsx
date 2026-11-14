import type { Metadata } from "next";
import "./globals.css";
import "./heykakaa.css";
import { FirebasePageViews } from "./components/firebase-page-views";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.heykakaa.com"),
  title: "HeyKakaa",
  description:
    "Hey, I’m Kaka. I build for Android and share what I learn along the way.",
  applicationName: "HeyKakaa",
  creator: "@hey.kakaa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark hpvSLW_variable font-sans antialiased" style={{ colorScheme: "dark" }}>
      <body>{children}<FirebasePageViews /></body>
    </html>
  );
}
