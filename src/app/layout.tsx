import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider"; // adjust import path if needed

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Animewonderous | More Than Just Fandom",
  description: "Anime merch, COD tournaments, anime streaming, and the biggest anime fest in Enugu.",
  icons: {
    icon: "/aa.png",
    shortcut: "/aa.png",
    apple: "/aa.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark antialiased`} >
      <body className="min-h-full bg-background text-foreground flex flex-col font-sans" suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}