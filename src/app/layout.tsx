import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Web3Provider from "@/components/Web3Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Derix - 去中心化永续合约交易平台",
  description:
    "Derix 是一个基于区块链的去中心化永续合约交易平台，支持多种加密货币交易对，提供高杠杆、低费率的交易体验。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
