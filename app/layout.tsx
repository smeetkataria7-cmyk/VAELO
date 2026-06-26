import type { Metadata } from "next";
import {
  Azeret_Mono,
  DM_Sans,
  Geist_Mono,
  Playfair_Display,
  Work_Sans,
} from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { MarketingOnly } from "@/components/site/marketing-only";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  display: "swap",
});

const azeretMono = Azeret_Mono({
  variable: "--font-azeret-mono",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Agency OS (internal app) type pairing — applied via the .os theme class.
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Vaelo Creative — AI photoshoots, Instagram & ads",
    template: "%s · Vaelo Creative",
  },
  description:
    "Photoshoot-quality visuals without the photoshoot. Vaelo Creative crafts AI-generated brand imagery, Instagram management, and paid advertising — at a fraction of the cost.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${workSans.variable} ${geistMono.variable} ${azeretMono.variable} ${playfair.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <SmoothScroll />
        <div className="bg-ambient" aria-hidden />
        <MarketingOnly>
          <SiteNav />
        </MarketingOnly>
        <main className="flex-1">{children}</main>
        <MarketingOnly>
          <SiteFooter />
        </MarketingOnly>
      </body>
    </html>
  );
}
