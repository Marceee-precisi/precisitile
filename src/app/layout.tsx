import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site } from "@/lib/content";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} | Lake Norman Tile Contractor`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL("https://precisitile.com"),
  openGraph: {
    title: site.name,
    description: site.description,
    url: "https://precisitile.com",
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  robots: {
    googleBot: {
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} h-full antialiased`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-ads-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
