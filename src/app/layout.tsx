import type { Metadata } from "next";
import { Caveat, Fredoka, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-handwriting",
  weight: ["400", "600", "700"],
});

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-bubble",
  weight: ["500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Happy Boyfriend's Day | bfie Love Archive",
  description: "A cosmic romantic scrapbook floating in a dreamy neon universe.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${caveat.variable} ${fredoka.variable} ${jakarta.variable} ${playfair.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#080019] text-white font-sans antialiased selection:bg-pink-500 selection:text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
