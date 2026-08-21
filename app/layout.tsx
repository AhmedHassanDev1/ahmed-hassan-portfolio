import type { Metadata } from "next";
import "./globals.css";

import Navibar from "@/components/layout/Navibar";
import { NeuralGridOverlay } from "@/components/visual/background/NeuralGridOverlay";

export const metadata: Metadata = {
  title: "Ahmed Hassan | Full-Stack AI Product Developer",
  description:
    "Portfolio for a full-stack developer building AI-powered SaaS products, workflows, and backend systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="min-h-full">
        <NeuralGridOverlay />
        <Navibar />
        {children}
      </body>
    </html>
  );
}
