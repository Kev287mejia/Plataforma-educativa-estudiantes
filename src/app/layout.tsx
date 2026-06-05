import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yapti Learn | Plataforma Educativa",
  description: "Plataforma Educativa Virtual para las Comunidades Indígenas de Bilwi, Puerto Cabezas – 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 selection:bg-yapti-teal selection:text-white">
        <div className="fixed inset-0 z-[-1] yapti-pattern opacity-60"></div>
        <main className="flex-1 flex flex-col">{children}</main>
      </body>
    </html>
  );
}
