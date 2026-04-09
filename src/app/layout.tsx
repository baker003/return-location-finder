import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DS_2",
  description: "DS_2 Design System - Next.js + Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
