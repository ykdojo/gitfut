import type { Metadata } from "next";
import { Saira_Condensed, Hanken_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const display = Saira_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-saira",
});

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
});

// FUT card fonts (DINPro suite) ported from the Python generator — used by the
// player card overlays. (Champions-*.otf/ttf are also bundled in ./fonts for
// future use but not wired here.)
const dinCond = localFont({ src: "./fonts/DINPro-Cond.otf", variable: "--font-din-cond", display: "swap" });
const dinBold = localFont({ src: "./fonts/DINPro-CondBold.otf", variable: "--font-din-bold", display: "swap" });
const dinMedium = localFont({ src: "./fonts/DINPro-CondMedium.otf", variable: "--font-din-medium", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://gitfut.com"),
  title: "GitFut — your GitHub, rated out of 99",
  description: "Turn any GitHub profile into a FUT-style player card rated out of 99.",
  openGraph: {
    title: "GitFut — your GitHub, rated out of 99",
    description: "Turn any GitHub profile into a FUT-style player card rated out of 99.",
    url: "https://gitfut.com",
    siteName: "GitFut",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${dinCond.variable} ${dinBold.variable} ${dinMedium.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
