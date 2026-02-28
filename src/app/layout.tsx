import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Permanence Diagnostic — Aieutics",
  description:
    "12 questions to test whether your innovation has been institutionally embedded — or is quietly evaporating. Budget permanence, metric health, personnel survival, and mechanism match.",
  openGraph: {
    title: "Permanence Diagnostic",
    description:
      "Has your innovation been embedded, or is it evaporating? A diagnostic for corporate innovation teams.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Almarai:wght@300;400;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
