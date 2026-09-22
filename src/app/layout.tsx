import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://lifestylefitness.pk"),
  title: "Lifestyle Fitness PK | Khawar Khan - ISSA USA Certified Nutritionist",
  description: "Official platform of Khawar Khan (ISSA USA Certified Nutritionist, 317k+ YouTube Subs). Weight loss video library, Japanese Matcha Green Tea, Chia Seeds, Camu Camu, AI Food Calorie Scanner & Personalized Diet Plans.",
  manifest: "/manifest.json",
  icons: {
    icon: "/images/lf-logo.png",
    shortcut: "/images/lf-logo.png",
    apple: "/images/lf-logo.png",
  },
  openGraph: {
    title: "Lifestyle Fitness PK - Khawar Khan (ISSA USA)",
    description: "Lose 10 Kilos of Stubborn Fat with Science-Backed Desi Diet Plans and Superfoods.",
    images: ["/images/lf-logo.png"],
  }
};

export const viewport: Viewport = {
  themeColor: "#059669",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="bg-dark-900 text-slate-100 min-h-screen selection:bg-brand-500 selection:text-dark-900">
        {children}
      </body>
    </html>
  );
}
