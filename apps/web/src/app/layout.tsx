import type { Metadata } from "next";
import { Playfair_Display, Lora, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const displayFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
});

const readingFont = Lora({
  subsets: ["latin"],
  variable: "--font-reading",
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const uiFont = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-ui",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Altheara — A place for your life.",
  description: "Notice your life. Keep what matters. Understand it more deeply. A cinematic narrative experience of your life.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${readingFont.variable} ${uiFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-charcoal text-ivory">
        {children}
      </body>
    </html>
  );
}
