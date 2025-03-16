"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Navbar() {
  const [isClient, setIsClient] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-900/90 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-white">
              Derix
            </Link>
            <div className="hidden md:flex ml-10 space-x-8">
              <Link
                href="/trade"
                className="text-gray-300 hover:text-white transition-colors"
              >
                交易
              </Link>
              <Link
                href="/stake"
                className="text-gray-300 hover:text-white transition-colors"
              >
                质押
              </Link>
              <Link
                href="/docs"
                className="text-gray-300 hover:text-white transition-colors"
              >
                文档
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            {isClient ? (
              <ConnectButton showBalance={false} />
            ) : (
              <button
                disabled
                className="bg-blue-600 text-white px-4 py-2 rounded-lg opacity-70"
              >
                连接钱包
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
