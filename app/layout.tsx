import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LetsPlatMath - 數學大冒險",
  description: "一個小學二、三年級的數學測驗互動遊戲，答對題目就能抽寶可夢卡！",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 antialiased">
        {children}
      </body>
    </html>
  );
}
