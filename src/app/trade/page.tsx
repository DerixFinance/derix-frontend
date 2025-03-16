"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Navbar from "@/components/Navbar";
import { TradingChart } from "@/components/TradingChart";
import TradeForm from "@/components/TradeForm";
import Positions from "@/components/Positions";
import ClientOnly from "@/components/ClientOnly";
import RecentTrades from "@/components/RecentTrades";
import tradingPairs, {
  getTradingPairById,
  getEnabledTradingPairs,
  DEFAULT_TRADING_PAIR_ID,
  TradingPair,
} from "@/config/tradingPairs";

// 模拟持仓数据
const mockPositions = [
  {
    id: "1",
    symbol: "BTC/USD",
    side: "long" as const,
    size: 5000,
    entryPrice: 52350,
    leverage: 10,
    liquidationPrice: 48000,
    pnl: 250,
    pnlPercentage: 5,
    markPrice: 52800,
  },
  {
    id: "2",
    symbol: "ETH/USD",
    side: "short" as const,
    size: 3000,
    entryPrice: 3200,
    leverage: 5,
    liquidationPrice: 3520,
    pnl: -120,
    pnlPercentage: -4,
    markPrice: 3250,
  },
];

// 下拉菜单Portal组件
const Dropdown = ({
  isOpen,
  onClose,
  children,
  triggerRef,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  triggerRef: React.RefObject<HTMLElement | null>;
}) => {
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: Math.max(rect.width, 240), // 至少240px宽
      });
    }
  }, [isOpen, triggerRef]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  // 使用Portal将下拉内容渲染到body
  return typeof document !== "undefined"
    ? createPortal(
        <div
          ref={dropdownRef}
          className="fixed bg-[rgb(30,35,50)] border border-[rgba(255,255,255,0.1)] rounded-lg shadow-xl overflow-hidden"
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
            width: `${position.width}px`,
            zIndex: 9999,
          }}
        >
          {children}
        </div>,
        document.body
      )
    : null;
};

export default function TradePage() {
  const [selectedSymbol, setSelectedSymbol] = useState(tradingPairs[0].name);
  const [lastPrice, setLastPrice] = useState(52800);
  const [positions, setPositions] = useState(mockPositions);
  const [isClient, setIsClient] = useState(false);
  const [orderType, setOrderType] = useState<"market" | "limit">("market");
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 确保只在客户端渲染时运行
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 获取真实K线数据
  useEffect(() => {
    if (!isClient) return;

    const fetchKlineData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // 从选择的交易对获取币种符号
        const pair = getEnabledTradingPairs().find(
          (p) => p.name === selectedSymbol
        );
        const cryptoSymbol = pair?.baseAsset.toLowerCase() || "btc";

        console.log(`正在获取${cryptoSymbol}的K线数据...`);

        // 临时使用模拟数据而不是API
        // 在生产环境中替换为实际API调用
        const mockData = generateMockData(100, pair?.defaultPrice);
        console.log("已生成模拟K线数据，数据点数量:", mockData.length);

        setChartData(mockData);

        // 更新最新价格
        if (mockData.length > 0) {
          setLastPrice(mockData[mockData.length - 1].close);
        }

        /* 暂时注释实际API调用
        // 使用CoinGecko公共API获取价格历史数据 (无需API密钥)
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${cryptoSymbol}/market_chart?vs_currency=usd&days=30&interval=daily`,
          { mode: "cors", cache: "no-cache" }
        );

        if (!response.ok) {
          throw new Error(`API请求失败: ${response.status}`);
        }

        const data = await response.json();

        // 检查数据结构
        if (!data || !data.prices || !Array.isArray(data.prices)) {
          throw new Error("API返回的数据格式不正确");
        }

        console.log(
          `成功获取${cryptoSymbol}的K线数据，数据点数量: ${data.prices.length}`
        );

        // 转换为TradingView图表库所需格式
        const klineData = data.prices.map((item: any, index: number) => {
          const [timestamp, price] = item;
          const variation = price * 0.02; // 2%的价格变化范围

          return {
            time: Math.floor(timestamp / 1000),
            open: price,
            high: price + Math.random() * variation,
            low: price - Math.random() * variation,
            close: price + (Math.random() - 0.5) * variation,
          };
        });

        // 确保有数据
        if (klineData.length === 0) {
          throw new Error("转换后的K线数据为空");
        }

        setChartData(klineData);

        // 更新最新价格
        if (klineData.length > 0) {
          setLastPrice(klineData[klineData.length - 1].close);
        }
        */
      } catch (err) {
        console.error("获取K线数据失败:", err);
        setError("无法加载价格数据，使用模拟数据显示");

        // 回退到模拟数据
        const mockData = generateMockData(100);
        setChartData(mockData);

        // 更新最新价格（使用模拟数据的最后一个值）
        if (mockData.length > 0) {
          setLastPrice(mockData[mockData.length - 1].close);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchKlineData();

    // 设置定时器，定期更新数据
    const interval = setInterval(fetchKlineData, 60000); // 每分钟更新一次

    return () => clearInterval(interval);
  }, [isClient, selectedSymbol]);

  // 生成模拟K线数据
  const generateMockData = (length: number, basePrice: number = 52800) => {
    console.log("生成模拟K线数据");
    const mockData = [];
    const now = new Date();

    let currentPrice = basePrice;

    for (let i = 0; i < length; i++) {
      // 获取日期 - 从过去到现在
      const date = new Date();
      date.setDate(now.getDate() - (length - i));
      date.setHours(0, 0, 0, 0); // 重置为当天开始

      // UTC时间字符串 YYYY-MM-DD
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, "0");
      const day = String(date.getUTCDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      // 价格变化
      const volatility = currentPrice * 0.03; // 3%的波动性
      const change = (Math.random() - 0.5) * volatility;
      currentPrice = Math.max(currentPrice + change, 0.01); // 确保价格始终为正

      const open = currentPrice;
      const high = open * (1 + Math.random() * 0.015); // 最高价比开盘价高0-1.5%
      const low = open * (1 - Math.random() * 0.015); // 最低价比开盘价低0-1.5%
      const close = low + Math.random() * (high - low); // 收盘价在最高价和最低价之间

      mockData.push({
        time: formattedDate, // 使用格式化的日期字符串
        open,
        high,
        low,
        close,
      });
    }

    return mockData;
  };

  const handleTradeSubmit = (orderData: any) => {
    console.log("提交交易:", orderData);
    // 这里会实现与智能合约的交互，在真实环境中
    alert(
      `已提交${
        orderData.side === "long" ? "多仓" : "空仓"
      }订单: ${JSON.stringify(orderData)}`
    );
  };

  const handleClosePosition = (positionId: string) => {
    console.log("关闭持仓:", positionId);
    // 在实际应用中，这里会调用智能合约关闭仓位
    setPositions(positions.filter((pos) => pos.id !== positionId));
    alert(`已关闭持仓 ID: ${positionId}`);
  };

  // 处理订单类型变更
  const handleOrderTypeChange = (type: "market" | "limit") => {
    setOrderType(type);
  };

  // 可用的交易对选项 - 使用配置文件
  const availableSymbols = getEnabledTradingPairs().map((pair) => pair.name);

  // 获取币种信息
  const getCryptoInfo = (symbol: string) => {
    const [base] = symbol.split("/");
    const pair = getEnabledTradingPairs().find((p) => p.name === symbol);

    if (!pair) {
      return {
        name: base,
        color: "#888888",
        icon: base.charAt(0),
      };
    }

    switch (pair.baseAsset) {
      case "BTC":
        return {
          name: "比特币",
          color: "#F7931A",
          icon: "₿",
        };
      case "ETH":
        return {
          name: "以太坊",
          color: "#627EEA",
          icon: "Ξ",
        };
      case "SOL":
        return {
          name: "索拉纳",
          color: "#00FFBD",
          icon: "S",
        };
      case "AVAX":
        return {
          name: "雪崩",
          color: "#E84142",
          icon: "A",
        };
      case "LINK":
        return {
          name: "链接",
          color: "#2A5ADA",
          icon: "L",
        };
      case "AAPL":
        return {
          name: "苹果公司",
          color: "#A2AAAD",
          icon: "A",
        };
      case "SPX":
        return {
          name: "标普500指数",
          color: "#1E88E5",
          icon: "S",
        };
      default:
        return {
          name: pair.baseAsset,
          color: "#888888",
          icon: pair.baseAsset.charAt(0),
        };
    }
  };

  // 交易对选择器 - 使用Portal实现下拉菜单
  const SymbolSelector = () => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedInfo = getCryptoInfo(selectedSymbol);
    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
      <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(var(--border-color),0.5)]">
        <div className="relative">
          <button
            ref={buttonRef}
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-2 bg-[rgba(var(--panel-bg),0.6)] hover:bg-[rgba(var(--panel-bg),0.8)] py-2 px-4 rounded transition-colors"
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-white font-medium text-sm"
              style={{ backgroundColor: selectedInfo.color }}
            >
              {selectedInfo.icon}
            </div>
            <span className="font-medium">{selectedSymbol}</span>
            <svg
              className={`w-4 h-4 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <Dropdown
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            triggerRef={buttonRef}
          >
            {availableSymbols.map((symbol) => {
              const info = getCryptoInfo(symbol);
              return (
                <button
                  key={symbol}
                  className={`w-full text-left px-4 py-3 hover:bg-[rgba(255,255,255,0.05)] transition-colors flex items-center space-x-2 ${
                    symbol === selectedSymbol
                      ? "bg-[rgba(255,255,255,0.08)] text-white"
                      : "text-gray-300"
                  }`}
                  onClick={() => {
                    setSelectedSymbol(symbol);
                    setIsOpen(false);
                  }}
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white font-medium text-sm"
                    style={{ backgroundColor: info.color }}
                  >
                    {info.icon}
                  </div>
                  <div>
                    <div className="font-medium">{symbol}</div>
                    <div className="text-xs text-gray-400">{info.name}</div>
                  </div>
                </button>
              );
            })}
          </Dropdown>
        </div>

        <div className="flex">
          <div className="mr-4 px-3 py-1 rounded bg-[rgba(var(--highlight),0.1)] text-[rgb(var(--accent-green))]">
            24h +3.24%
          </div>
          <div className="px-3 py-1 rounded bg-[rgba(var(--highlight),0.1)] text-gray-400">
            成交量: $3.2B
          </div>
        </div>
      </div>
    );
  };

  // 加载状态
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">加载交易界面中...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <ClientOnly>
        <Navbar />
      </ClientOnly>

      <div className="w-full max-w-[1920px] mx-auto px-3 md:px-4 pt-20 pb-8">
        {/* 交易对选择器 */}
        <div className="card mb-4">
          <SymbolSelector />
        </div>

        {/* 主交易区 - 统一高度 */}
        <div className="grid grid-cols-1 lg:grid-cols-20 gap-4 mb-4">
          {/* 价格行情与图表 - 统一卡片高度 */}
          <div className="lg:col-span-12 card flex flex-col h-[600px]">
            <div className="border-b border-[rgba(var(--border-color),0.5)] px-5 py-3 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <span className="text-xl font-semibold">{selectedSymbol}</span>
                <span
                  className={`text-base ${
                    isLoading
                      ? "text-gray-400"
                      : lastPrice > 50000
                      ? "text-[rgb(var(--accent-green))]"
                      : "text-[rgb(var(--accent-red))]"
                  }`}
                >
                  ${lastPrice.toFixed(2)}
                  {isLoading && (
                    <span className="ml-1 animate-pulse">加载中...</span>
                  )}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-400">数据源</span>
                <span className="text-[rgba(var(--highlight),0.8)]">
                  CoinGecko API
                </span>
              </div>
            </div>
            <div className="flex-grow">
              {error ? (
                <div className="h-full flex items-center justify-center flex-col">
                  <div className="text-red-500 text-center">
                    <p>{error}</p>
                    <button
                      onClick={() => window.location.reload()}
                      className="mt-4 py-2 px-4 bg-[rgba(var(--highlight),0.2)] rounded text-white"
                    >
                      重新加载
                    </button>
                  </div>
                </div>
              ) : (
                <TradingChart
                  data={chartData}
                  height={550}
                  isLoading={isLoading}
                />
              )}
            </div>
          </div>

          {/* 最近成交列表 - 统一卡片高度 */}
          <div className="lg:col-span-3 card h-[600px] overflow-hidden flex flex-col">
            <RecentTrades symbol={selectedSymbol} height={560} />
          </div>

          {/* 交易表单 - 统一卡片高度 */}
          <div className="lg:col-span-5 flex flex-col h-[600px]">
            <ClientOnly>
              <div className="card h-full flex flex-col">
                <TradeForm
                  symbol={selectedSymbol}
                  lastPrice={lastPrice}
                  onSubmit={handleTradeSubmit}
                  onOrderTypeChange={handleOrderTypeChange}
                  initialOrderType={orderType}
                />
              </div>
            </ClientOnly>
          </div>
        </div>

        {/* 持仓信息 */}
        <div className="card">
          <ClientOnly>
            <Positions positions={positions} onClose={handleClosePosition} />
          </ClientOnly>
        </div>
      </div>
    </main>
  );
}
