"use client";

import React, { useState, useEffect } from "react";

interface Trade {
  id: string;
  time: Date;
  price: number;
  size: number;
  side: "buy" | "sell";
}

interface RecentTradesProps {
  symbol: string;
  height?: number;
}

// 生成基于真实价格的模拟成交数据
const generateRecentTrades = (symbol: string, count: number): Trade[] => {
  const trades: Trade[] = [];
  const now = new Date();
  let basePrice = 0;

  // 根据交易对设置基础价格
  switch (symbol.split("/")[0]) {
    case "BTC":
      basePrice = 52000 + (Math.random() - 0.5) * 1000;
      break;
    case "ETH":
      basePrice = 3200 + (Math.random() - 0.5) * 100;
      break;
    case "SOL":
      basePrice = 150 + (Math.random() - 0.5) * 10;
      break;
    case "AVAX":
      basePrice = 35 + (Math.random() - 0.5) * 5;
      break;
    case "LINK":
      basePrice = 15 + (Math.random() - 0.5) * 2;
      break;
    default:
      basePrice = 100 + (Math.random() - 0.5) * 10;
  }

  for (let i = 0; i < count; i++) {
    // 价格围绕基准价格小幅波动
    const priceVariation = (Math.random() - 0.5) * (basePrice * 0.002); // 0.2%的价格变化
    const price = basePrice + priceVariation;

    // 成交量随机变化，但根据交易对调整基础成交量级别
    let sizeBase = 0;
    switch (symbol.split("/")[0]) {
      case "BTC":
        sizeBase = 0.1;
        break; // BTC成交量较小
      case "ETH":
        sizeBase = 1.5;
        break; // ETH成交量中等
      case "SOL":
        sizeBase = 20;
        break; // SOL成交量大
      case "AVAX":
        sizeBase = 15;
        break; // AVAX成交量中等
      case "LINK":
        sizeBase = 25;
        break; // LINK成交量大
      default:
        sizeBase = 10;
    }

    const size =
      Math.round((sizeBase + Math.random() * sizeBase * 2) * 100) / 100;

    // 买卖方向随机，略微偏向当前价格趋势
    const side = Math.random() > 0.5 ? "buy" : "sell";

    // 时间递减，越往前的成交越新
    const time = new Date(now.getTime() - i * 5000 - Math.random() * 5000);

    trades.push({
      id: `trade-${i}-${Date.now()}`,
      time,
      price,
      size,
      side,
    });
  }

  return trades;
};

const RecentTrades: React.FC<RecentTradesProps> = ({
  symbol,
  height = 270,
}) => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 初始化并定期添加新交易
  useEffect(() => {
    // 清空旧的交易数据，重置加载状态
    setTrades([]);
    setIsLoading(true);

    // 初始化交易列表 - 当交易对变化时重置
    setTrades(generateRecentTrades(symbol, 20));
    setIsLoading(false);

    // 定期添加新交易
    const interval = setInterval(() => {
      setTrades((prevTrades) => {
        // 为当前选中的交易对生成一笔新成交
        const newTrades = generateRecentTrades(symbol, 1);

        // 将新成交添加到列表开头，并保持最多50条记录
        return [...newTrades, ...prevTrades.slice(0, 49)];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [symbol]); // 当交易对变化时，重新生成数据

  // 格式化时间
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="px-3 py-3 border-b border-[rgba(var(--border-color),0.5)]">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-medium">最近成交</h2>
          <span className="text-xs text-gray-400">{symbol}</span>
        </div>
      </div>

      <div
        className="overflow-auto scrollbar-none"
        style={{ height: `${height}px` }}
      >
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-gray-400">加载成交数据...</div>
          </div>
        ) : (
          <table className="w-full">
            <thead className="sticky top-0 bg-[rgba(var(--panel-bg),0.9)] backdrop-blur-sm z-10">
              <tr className="text-xs text-gray-400">
                <th className="px-2 py-2 text-left">时间</th>
                <th className="px-2 py-2 text-right">价格</th>
                <th className="px-2 py-2 text-right">数量</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(var(--border-color),0.2)]">
              {trades.map((trade) => (
                <tr
                  key={trade.id}
                  className="text-sm hover:bg-[rgba(var(--highlight),0.05)] transition-colors"
                >
                  <td className="px-2 py-1.5 text-gray-300 text-left whitespace-nowrap">
                    {formatTime(trade.time)}
                  </td>
                  <td
                    className={`px-2 py-1.5 text-right whitespace-nowrap font-medium ${
                      trade.side === "buy"
                        ? "text-[rgb(var(--accent-green))]"
                        : "text-[rgb(var(--accent-red))]"
                    }`}
                  >
                    {trade.price.toFixed(2)}
                  </td>
                  <td className="px-2 py-1.5 text-gray-300 text-right whitespace-nowrap">
                    {trade.size.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RecentTrades;
