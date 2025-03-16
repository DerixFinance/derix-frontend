"use client";

import React, { useState, useEffect } from "react";

interface TradeFormProps {
  symbol: string;
  lastPrice: number;
  onSubmit: (orderData: OrderData) => void;
  initialOrderType?: "market" | "limit";
  onOrderTypeChange?: (type: "market" | "limit") => void;
}

interface OrderData {
  type: "market" | "limit";
  side: "long" | "short";
  size: number;
  leverage: number;
  price?: number;
}

const TradeForm: React.FC<TradeFormProps> = ({
  symbol,
  lastPrice,
  onSubmit,
  initialOrderType = "market",
  onOrderTypeChange,
}) => {
  const [orderType, setOrderType] = useState<"market" | "limit">(
    initialOrderType
  );
  const [side, setSide] = useState<"long" | "short">("long");
  const [size, setSize] = useState<string>("");
  const [price, setPrice] = useState<string>(lastPrice.toString());
  const [leverage, setLeverage] = useState<number>(10);

  // 同步外部orderType变化
  useEffect(() => {
    setOrderType(initialOrderType);
  }, [initialOrderType]);

  // 处理订单类型变更，并通知父组件
  const handleOrderTypeChange = (type: "market" | "limit") => {
    setOrderType(type);
    if (onOrderTypeChange) {
      onOrderTypeChange(type);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const orderData: OrderData = {
      type: orderType,
      side: side,
      size: parseFloat(size),
      leverage: leverage,
      ...(orderType === "limit" && { price: parseFloat(price) }),
    };

    onSubmit(orderData);
  };

  // 增减数量的辅助函数
  const increaseSize = () => {
    const currentSize = size === "" ? 0 : parseFloat(size);
    setSize((currentSize + 100).toString());
  };

  const decreaseSize = () => {
    const currentSize = size === "" ? 0 : parseFloat(size);
    const newSize = Math.max(0, currentSize - 100);
    setSize(newSize.toString());
  };

  return (
    <div className="h-full flex flex-col">
      <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
        {/* 交易类型选择 - 固定在顶部 */}
        <div className="border-b border-[rgba(var(--border-color),0.5)] sticky top-0 bg-[rgba(var(--card-bg),1)] z-10">
          <div className="flex w-full">
            <button
              type="button"
              className={`flex-1 py-4 font-medium text-sm text-center relative ${
                orderType === "market"
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-200"
              }`}
              onClick={() => handleOrderTypeChange("market")}
            >
              市价
              {orderType === "market" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[rgb(var(--highlight))]"></span>
              )}
            </button>
            <button
              type="button"
              className={`flex-1 py-4 font-medium text-sm text-center relative ${
                orderType === "limit"
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-200"
              }`}
              onClick={() => handleOrderTypeChange("limit")}
            >
              限价
              {orderType === "limit" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[rgb(var(--highlight))]"></span>
              )}
            </button>
          </div>
        </div>

        {/* 可滚动的主要表单内容区域 */}
        <div className="flex-grow overflow-auto">
          <div className="p-4 pb-20">
            {" "}
            {/* 底部padding为固定按钮区域预留空间 */}
            {/* 多空方向选择 */}
            <div className="flex mb-5">
              <button
                type="button"
                className={`flex-1 py-2.5 text-center rounded-l font-medium transition-all ${
                  side === "long"
                    ? "bg-[rgb(var(--accent-green))] text-white"
                    : "bg-[rgba(var(--input-bg),0.6)] text-gray-400 hover:text-white"
                }`}
                onClick={() => setSide("long")}
              >
                多仓
              </button>
              <button
                type="button"
                className={`flex-1 py-2.5 text-center rounded-r font-medium transition-all ${
                  side === "short"
                    ? "bg-[rgb(var(--accent-red))] text-white"
                    : "bg-[rgba(var(--input-bg),0.6)] text-gray-400 hover:text-white"
                }`}
                onClick={() => setSide("short")}
              >
                空仓
              </button>
            </div>
            {/* 价格输入区域 */}
            <div className="mb-5">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-300">
                  价格
                </label>
                <span className="text-xs text-gray-400">
                  当前: ${lastPrice.toFixed(2)}
                </span>
              </div>
              {orderType === "limit" ? (
                <div className="relative">
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full py-2.5 px-3 bg-[rgba(var(--input-bg),0.5)] border border-[rgba(var(--border-color),0.7)] rounded text-white"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-gray-400">USD</span>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <div className="w-full py-2.5 px-3 bg-[rgba(var(--input-bg),0.3)] border border-[rgba(var(--border-color),0.4)] rounded text-gray-400 flex justify-between items-center">
                    <div className="flex items-center">
                      <span>市价</span>
                      <span className="ml-2 text-xs bg-[rgba(var(--highlight),0.15)] text-[rgb(var(--accent-yellow))] px-1.5 py-0.5 rounded">
                        市价模式
                      </span>
                    </div>
                    <span>${lastPrice.toFixed(2)} USD</span>
                  </div>
                </div>
              )}
            </div>
            {/* 数量输入区域 */}
            <div className="mb-5">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-300">
                  数量
                </label>
                <span className="text-xs text-gray-400">
                  可用余额: 10,000 USD
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  type="button"
                  onClick={decreaseSize}
                  className="flex-none bg-[rgba(var(--highlight),0.1)] hover:bg-[rgba(var(--highlight),0.2)] text-white w-8 h-8 flex items-center justify-center rounded transition-colors"
                >
                  -
                </button>
                <div className="relative flex-grow">
                  <input
                    type="number"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full py-2.5 px-3 bg-[rgba(var(--input-bg),0.5)] border border-[rgba(var(--border-color),0.7)] rounded text-white appearance-none"
                    placeholder="0.00"
                    step="100"
                    min="0"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-gray-400">USD</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={increaseSize}
                  className="flex-none bg-[rgba(var(--highlight),0.1)] hover:bg-[rgba(var(--highlight),0.2)] text-white w-8 h-8 flex items-center justify-center rounded transition-colors"
                >
                  +
                </button>
              </div>

              {/* 快速选择金额按钮 */}
              <div className="grid grid-cols-4 gap-2 mt-2">
                {[25, 50, 75, 100].map((percent) => (
                  <button
                    key={percent}
                    type="button"
                    className="py-2 px-2 bg-[rgba(var(--highlight),0.1)] hover:bg-[rgba(var(--highlight),0.2)] rounded text-xs text-gray-300 transition-colors"
                    onClick={() =>
                      setSize(((10000 * percent) / 100).toString())
                    }
                  >
                    {percent}%
                  </button>
                ))}
              </div>
            </div>
            {/* 杠杆滑块 */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-300">
                  杠杆
                </label>
                <span className="text-white font-medium py-0.5 px-2 bg-[rgba(var(--highlight),0.2)] rounded-full text-xs">
                  {leverage}x
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={leverage}
                onChange={(e) => setLeverage(parseInt(e.target.value))}
                className="w-full h-2 bg-[rgba(var(--input-bg),0.7)] rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1x</span>
                <span>50x</span>
                <span>100x</span>
              </div>
            </div>
          </div>
        </div>

        {/* 底部区域 - 包含订单摘要和确认按钮 */}
        <div className="sticky bottom-0 left-0 right-0 w-full p-3 bg-[rgba(var(--card-bg),0.98)] border-t border-[rgba(var(--border-color),0.5)] z-10">
          {/* 上下布局: 上方订单摘要, 下方确认按钮 */}
          <div className="flex flex-col gap-2">
            {/* 上方: 订单摘要 */}
            <div className="w-full p-2 bg-[rgba(var(--input-bg),0.4)] rounded">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">保证金:</span>
                <span className="text-sm text-white">
                  ${size ? (parseFloat(size) / leverage).toFixed(2) : "0.00"}
                </span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-sm text-gray-400">手续费:</span>
                <span className="text-sm text-white">
                  ${size ? (parseFloat(size) * 0.0005).toFixed(2) : "0.00"}
                </span>
              </div>
            </div>

            {/* 下方: 确认按钮 */}
            <button
              type="submit"
              className={`w-full py-3 font-bold text-base rounded shadow-lg text-white text-center transition-colors ${
                side === "long"
                  ? "bg-[rgb(var(--accent-green))] hover:bg-[rgba(var(--accent-green),0.9)]"
                  : "bg-[rgb(var(--accent-red))] hover:bg-[rgba(var(--accent-red),0.9)]"
              }`}
            >
              {side === "long" ? "做多" : "做空"} {symbol}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TradeForm;
