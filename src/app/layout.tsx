import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { CartProvider } from "../lib/CartContext";
import NextAuthSessionProvider from "../components/SessionProviderWrapper";

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
    <html
      lang="en"
      className="dark antialiased"
      style={{
        "--font-sans": "Arial, Helvetica, sans-serif",
        "--font-display": '"Trebuchet MS", Arial, sans-serif',
      } as React.CSSProperties}
    >
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