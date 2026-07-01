import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Nolan Pastore",
  description: "Personal portfolio of Nolan Pastore — CIS & Communication Management student at the University of Dayton.",
  openGraph: {
    title: "Nolan Pastore",
    description: "Personal portfolio of Nolan Pastore — CIS & Communication Management student at the University of Dayton.",
    url: "https://nolanpastore.com",
    siteName: "Nolan Pastore",
    images: [
      {
        url: "https://nolanpastore.com/nolan.jpg",
        width: 1200,
        height: 630,
        alt: "Nolan Pastore",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nolan Pastore",
    description: "Personal portfolio of Nolan Pastore — CIS & Communication Management student at the University of Dayton.",
    images: ["https://nolanpastore.com/nolan.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-black text-white antialiased font-sans">
        {children}
      </body>
    </html>
  );
}