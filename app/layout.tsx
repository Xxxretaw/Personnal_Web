import type { Metadata } from "next";
import { Caveat, DM_Serif_Display, Inter } from "next/font/google";
import { LenisProvider } from "@/components/LenisContext";
import "./globals.css";

const caveat = Caveat({
  variable: "--caveat",
  subsets: ["latin"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  variable: "--dm-serif",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Your Name | AI 训练师",
  description: "个人网站 — AI 训练师，专注数据质量与模型对齐",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh"
      className={`${caveat.variable} ${dmSerif.variable} ${inter.variable}`}
    >
      <body className="relative min-h-screen">
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
