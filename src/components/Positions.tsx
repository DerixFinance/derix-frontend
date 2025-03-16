"use client";

import React from "react";

interface Position {
  id: string;
  symbol: string;
  side: "long" | "short";
  size: number;
  entryPrice: number;
  leverage: number;
  liquidationPrice: number;
  pnl: number;
  pnlPercentage: number;
  markPrice: number;
}

interface PositionsProps {
  positions: Position[];
  onClose: (id: string) => void;
}

const Positions: React.FC<PositionsProps> = ({ positions, onClose }) => {
  if (positions.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-400">暂无持仓</p>
        <p className="text-gray-500 text-sm mt-2">
          开仓后，您的持仓将显示在这里
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="px-4 py-3 border-b border-[rgba(var(--border-color),0.5)] flex items-center justify-between">
        <h2 className="text-base font-medium">持仓</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">总计:</span>
          <span
            className={`text-sm font-medium ${
              positions.reduce((acc, pos) => acc + pos.pnl, 0) >= 0
                ? "text-[rgb(var(--accent-green))]"
                : "text-[rgb(var(--accent-red))]"
            }`}
          >
            ${positions.reduce((acc, pos) => acc + pos.pnl, 0).toFixed(2)}
          </span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[rgba(var(--input-bg),0.3)]">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                交易对
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                方向
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                规模
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                杠杆
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                入场价
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                标记价
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                清算价
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                未实现盈亏
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(var(--border-color),0.3)]">
            {positions.map((position) => (
              <tr
                key={position.id}
                className="hover:bg-[rgba(var(--highlight),0.05)] transition-colors"
              >
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="font-medium">{position.symbol}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className={`py-1.5 px-3 text-xs font-medium rounded-full ${
                      position.side === "long"
                        ? "bg-[rgba(var(--accent-green),0.2)] text-[rgb(var(--accent-green))]"
                        : "bg-[rgba(var(--accent-red),0.2)] text-[rgb(var(--accent-red))]"
                    }`}
                  >
                    {position.side === "long" ? "多" : "空"}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span>${position.size.toLocaleString()}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span>{position.leverage}x</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span>${position.entryPrice.toLocaleString()}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span>${position.markPrice.toLocaleString()}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-[rgb(var(--accent-red))]">
                    ${position.liquidationPrice.toLocaleString()}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div
                    className={`flex flex-col ${
                      position.pnl >= 0
                        ? "text-[rgb(var(--accent-green))]"
                        : "text-[rgb(var(--accent-red))]"
                    }`}
                  >
                    <span>${position.pnl.toFixed(2)}</span>
                    <span className="text-xs">
                      {position.pnlPercentage >= 0 ? "+" : ""}
                      {position.pnlPercentage.toFixed(2)}%
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onClose(position.id)}
                      className="py-2 px-4 text-sm rounded bg-[rgba(var(--highlight),0.1)] hover:bg-[rgba(var(--highlight),0.2)] text-white transition-colors"
                    >
                      平仓
                    </button>
                    <button
                      className="py-2 px-4 text-sm rounded bg-[rgba(var(--input-bg),0.7)] hover:bg-[rgba(var(--input-bg),0.9)] text-gray-300 transition-colors tooltip"
                      data-tooltip="编辑持仓"
                    >
                      编辑
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Positions;
