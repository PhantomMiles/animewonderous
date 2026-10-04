import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { CartProvider } from "../lib/CartContext";
import NextAuthSessionProvider from "../components/SessionProviderWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Backs the `font-display` utility used on headings across src/pages/*.tsx.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
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
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} dark antialiased`} >
      <body className="min-h-full bg-background text-foreground flex flex-col font-sans" suppressHydrationWarning>
        <NextAuthSessionProvider>
          <ThemeProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </ThemeProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}