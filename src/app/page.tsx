"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import ClientOnly from "@/components/ClientOnly";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className="flex min-h-screen flex-col">
      {/* 导航栏 */}
      <nav className="fixed top-0 left-0 right-0 z-10 bg-[rgba(var(--panel-bg),0.9)] backdrop-blur-md border-b border-[rgba(var(--border-color),0.5)]">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white">
            Derix
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="#features"
              className="text-gray-300 hover:text-white transition-colors"
            >
              特点
            </Link>
            <Link
              href="#markets"
              className="text-gray-300 hover:text-white transition-colors"
            >
              市场
            </Link>
            <Link
              href="#faq"
              className="text-gray-300 hover:text-white transition-colors"
            >
              常见问题
            </Link>
            {isClient && (
              <Link
                href="/trade"
                className="px-4 py-2 bg-[rgb(var(--accent-blue))] hover:bg-[rgb(var(--accent-blue-hover))] text-white font-medium rounded transition-colors"
              >
                开始交易
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* 英雄区域 */}
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <div className="absolute top-0 left-0 right-0 -z-10 h-[70vh] overflow-hidden">
            <div className="w-full h-full bg-[rgba(var(--background-darker),0.7)] relative">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[rgba(var(--accent-blue),0.1)] blur-[120px]"></div>
              <div className="absolute top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[rgba(var(--accent-green),0.08)] blur-[80px]"></div>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[rgb(var(--accent-blue))] to-[rgb(var(--accent-green))]">
              Web3永续交易
            </span>
            <br />
            更高效、更安全
          </h1>
          <p className="text-xl text-gray-300 text-center max-w-2xl mb-10">
            Derix是一个去中心化的永续合约交易平台，提供多达100倍杠杆，低手续费，多链支持，让您以最佳价格交易加密货币永续合约。
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/trade"
              className="px-8 py-3 bg-[rgb(var(--accent-blue))] hover:bg-[rgb(var(--accent-blue-hover))] text-white font-medium rounded text-center transition-colors"
            >
              开始交易
            </Link>
            <Link
              href="#learn"
              className="px-8 py-3 bg-[rgba(var(--panel-bg),0.8)] hover:bg-[rgba(var(--panel-bg),0.9)] border border-[rgba(var(--border-color),0.5)] text-white font-medium rounded text-center transition-colors"
            >
              了解更多
            </Link>
          </div>
        </div>
      </section>

      {/* 特点部分 */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            为什么选择Derix?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6">
              <div className="w-12 h-12 bg-[rgba(var(--accent-blue),0.2)] rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[rgb(var(--accent-blue))]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">高杠杆</h3>
              <p className="text-gray-400">
                提供高达100倍的杠杆，最大化您的交易潜力，同时通过智能风险管理系统保障资金安全。
              </p>
            </div>

            <div className="card p-6">
              <div className="w-12 h-12 bg-[rgba(var(--accent-green),0.2)] rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[rgb(var(--accent-green))]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">多链支持</h3>
              <p className="text-gray-400">
                支持Arbitrum、Base等多条Layer
                2链，低Gas费和快速确认，为您提供流畅的交易体验。
              </p>
            </div>

            <div className="card p-6">
              <div className="w-12 h-12 bg-[rgba(var(--highlight),0.2)] rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[rgb(var(--highlight))]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">低手续费</h3>
              <p className="text-gray-400">
                业内最低手续费，使用我们的平台代币可获得更多折扣，让您的每一次交易都更具成本效益。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 市场部分 */}
      <section id="markets" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">热门交易市场</h2>

          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[rgba(var(--input-bg),0.5)]">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      交易对
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                      最新价格
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                      24小时
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                      24小时成交量
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                      交易
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(var(--border-color),0.3)]">
                  <tr className="hover:bg-[rgba(var(--highlight),0.05)] transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-[rgba(255,165,0,0.2)] flex items-center justify-center text-white font-bold">
                          BTC
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium">BTC/USD</div>
                          <div className="text-sm text-gray-400">比特币</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      $52,856.24
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-[rgb(var(--accent-green))]">
                      +2.34%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-300">
                      $4.2B
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                      <Link
                        href="/trade"
                        className="px-3 py-1 bg-[rgb(var(--accent-blue))] hover:bg-[rgb(var(--accent-blue-hover))] text-white rounded transition-colors"
                      >
                        交易
                      </Link>
                    </td>
                  </tr>
                  <tr className="hover:bg-[rgba(var(--highlight),0.05)] transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-[rgba(79,181,247,0.2)] flex items-center justify-center text-white font-bold">
                          ETH
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium">ETH/USD</div>
                          <div className="text-sm text-gray-400">以太坊</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      $3,248.52
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-[rgb(var(--accent-red))]">
                      -1.25%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-300">
                      $1.8B
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                      <Link
                        href="/trade"
                        className="px-3 py-1 bg-[rgb(var(--accent-blue))] hover:bg-[rgb(var(--accent-blue-hover))] text-white rounded transition-colors"
                      >
                        交易
                      </Link>
                    </td>
                  </tr>
                  <tr className="hover:bg-[rgba(var(--highlight),0.05)] transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-[rgba(118,211,162,0.2)] flex items-center justify-center text-white font-bold">
                          SOL
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium">SOL/USD</div>
                          <div className="text-sm text-gray-400">索拉纳</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      $142.78
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-[rgb(var(--accent-green))]">
                      +5.67%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-300">
                      $845M
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                      <Link
                        href="/trade"
                        className="px-3 py-1 bg-[rgb(var(--accent-blue))] hover:bg-[rgb(var(--accent-blue-hover))] text-white rounded transition-colors"
                      >
                        交易
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 常见问题 */}
      <section id="faq" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">常见问题</h2>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="card p-6">
              <h3 className="text-lg font-medium mb-3">什么是永续合约交易？</h3>
              <p className="text-gray-400">
                永续合约是一种没有到期日的衍生品合约，允许交易者用杠杆做多或做空加密资产。不同于期货合约，永续合约可以无限期持有，通过资金费率机制保持价格与现货市场同步。
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-medium mb-3">
                我如何开始在Derix上交易？
              </h3>
              <p className="text-gray-400">
                只需连接您的Web3钱包（如MetaMask），存入加密货币作为保证金，然后您就可以在平台上开始交易永续合约。我们支持多种连锁选择，让您可以选择最适合您的选项。
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-medium mb-3">
                Derix的交易费用是多少？
              </h3>
              <p className="text-gray-400">
                Derix提供业内最具竞争力的费率，开仓费用0.05%，平仓费用0.05%。持有平台代币的用户可享受高达50%的费用折扣，大宗交易商还可获得定制费率计划。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="py-12 border-t border-[rgba(var(--border-color),0.3)]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl font-bold">Derix</div>
              <p className="text-gray-400 mt-2">去中心化永续合约交易平台</p>
            </div>
            <div className="flex flex-col md:flex-row gap-8 md:gap-16">
              <div>
                <h4 className="text-white font-medium mb-4">平台</h4>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/trade"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      交易
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      代币
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      API
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-medium mb-4">资源</h4>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      文档
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      博客
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      社区
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-medium mb-4">公司</h4>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      关于我们
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      联系我们
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      工作机会
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-[rgba(var(--border-color),0.3)] text-center text-gray-500">
            <p>© {new Date().getFullYear()} Derix. 保留所有权利。</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
