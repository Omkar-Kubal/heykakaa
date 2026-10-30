import type { Metadata } from "next";
import "./globals.css";
import "./heykakaa.css";

export const metadata: Metadata = {
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
      <body>{children}</body>
    </html>
  );
}
