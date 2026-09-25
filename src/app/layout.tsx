import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Animewonderous | More Than Just Fandom",
  description: "Anime merch, COD tournaments, anime streaming, and the biggest anime fest in Enugu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark antialiased`}>
      <body className="min-h-full bg-background text-foreground flex flex-col font-sans" suppressHydrationWarning>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}

