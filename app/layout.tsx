import type { Metadata } from "next";
import "./globals.css";

import { Inter, Newsreader, Roboto } from "next/font/google";
import { cn } from "@/lib/utils";
import Navibar from "@/components/layout/Navibar";

const roboto = Roboto({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["italic"],
  display: "swap",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", inter.variable, newsreader.variable, "font-sans", roboto.variable)}
    >
      <body className="min-h-full flex flex-col">
        <Navibar />
        {children}
        </body>
    </html>
  );
}
