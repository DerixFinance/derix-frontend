"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ClientOnly from "@/components/ClientOnly";
import Link from "next/link";

// 模拟数据
const mockStakingStats = {
  totalStaked: 2450000,
  aprRange: "12-20",
  feesDistributed: 345000,
  stakersCount: 1258,
};

const mockUserStats = {
  stakedBalance: 5000,
  pendingRewards: 120.5,
  totalClaimed: 850.25,
  stakingPeriod: 30, // 天数
  aprBoost: 3, // 额外APR百分比
};

// 模拟质押历史
const mockStakingHistory = [
  {
    id: "1",
    amount: 2000,
    timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).getTime(),
    lockPeriod: 30,
    status: "active",
  },
  {
    id: "2",
    amount: 3000,
    timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).getTime(),
    lockPeriod: 90,
    status: "active",
  },
  {
    id: "3",
    amount: 1500,
    timestamp: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000).getTime(),
    lockPeriod: 60,
    status: "completed",
  },
];

export default function StakePage() {
  const [isClient, setIsClient] = useState(false);
  const [stakeAmount, setStakeAmount] = useState<string>("");
  const [lockPeriod, setLockPeriod] = useState<30 | 60 | 90>(30);
  const [unstakeId, setUnstakeId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"stake" | "unstake">("stake");

  // 确保只在客户端渲染时运行
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 处理质押提交
  const handleStakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`质押成功: ${stakeAmount} DER，锁定期: ${lockPeriod}天`);
    setStakeAmount("");
  };

  // 处理解除质押
  const handleUnstake = (id: string) => {
    setUnstakeId(id);
    // 在真实环境中，这里会与智能合约交互
    alert(`解除质押: ID ${id}`);
    setUnstakeId(null);
  };

  // 处理领取奖励
  const handleClaimRewards = () => {
    // 在真实环境中，这里会与智能合约交互
    alert(`成功领取奖励: ${mockUserStats.pendingRewards} DER`);
  };

  // 增减数量的辅助函数
  const increaseStakeAmount = () => {
    const currentAmount = stakeAmount === "" ? 0 : parseFloat(stakeAmount);
    setStakeAmount((currentAmount + 100).toString());
  };

  const decreaseStakeAmount = () => {
    const currentAmount = stakeAmount === "" ? 0 : parseFloat(stakeAmount);
    const newAmount = Math.max(0, currentAmount - 100);
    setStakeAmount(newAmount.toString());
  };

  // 计算预计APR
  const calculateEstimatedApr = (): string => {
    const baseApr = parseInt(mockStakingStats.aprRange.split("-")[0]);
    let boost = 0;

    if (lockPeriod === 60) boost = 2;
    else if (lockPeriod === 90) boost = 5;

    return (baseApr + boost).toString();
  };

  // 加载状态
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">加载质押界面中...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <ClientOnly>
        <Navbar />
      </ClientOnly>

      <div className="container mx-auto px-4 pt-20 pb-8">
        {/* 质押统计 */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-6">质押 DER 代币</h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="card p-4">
              <div className="text-gray-400 text-sm mb-1">总质押量</div>
              <div className="text-xl font-semibold">
                {mockStakingStats.totalStaked.toLocaleString()} DER
              </div>
            </div>
            <div className="card p-4">
              <div className="text-gray-400 text-sm mb-1">年化收益率</div>
              <div className="text-xl font-semibold text-[rgb(var(--accent-green))]">
                {mockStakingStats.aprRange}%
              </div>
            </div>
            <div className="card p-4">
              <div className="text-gray-400 text-sm mb-1">已分发收益</div>
              <div className="text-xl font-semibold">
                {mockStakingStats.feesDistributed.toLocaleString()} DER
              </div>
            </div>
            <div className="card p-4">
              <div className="text-gray-400 text-sm mb-1">质押者数量</div>
              <div className="text-xl font-semibold">
                {mockStakingStats.stakersCount.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 质押表单 */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="p-4 border-b border-[rgba(var(--border-color),0.5)]">
                <div className="flex">
                  <button
                    className={`flex-1 py-2 text-center rounded-l font-medium transition-all ${
                      activeTab === "stake"
                        ? "bg-[rgba(var(--highlight),0.2)] text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                    onClick={() => setActiveTab("stake")}
                  >
                    质押
                  </button>
                  <button
                    className={`flex-1 py-2 text-center rounded-r font-medium transition-all ${
                      activeTab === "unstake"
                        ? "bg-[rgba(var(--highlight),0.2)] text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                    onClick={() => setActiveTab("unstake")}
                  >
                    解除质押
                  </button>
                </div>
              </div>

              {activeTab === "stake" ? (
                <form onSubmit={handleStakeSubmit} className="p-4">
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-300">
                        质押数量
                      </label>
                      <span className="text-xs text-gray-400">
                        余额: 10,000 DER
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        type="button"
                        onClick={decreaseStakeAmount}
                        className="flex-none bg-[rgba(var(--highlight),0.1)] hover:bg-[rgba(var(--highlight),0.2)] text-white w-8 h-8 flex items-center justify-center rounded transition-colors"
                      >
                        -
                      </button>
                      <div className="relative flex-grow">
                        <input
                          type="number"
                          value={stakeAmount}
                          onChange={(e) => setStakeAmount(e.target.value)}
                          className="w-full py-2.5 px-3 bg-[rgba(var(--input-bg),0.5)] border border-[rgba(var(--border-color),0.7)] rounded text-white appearance-none"
                          placeholder="0.00"
                          step="100"
                          min="0"
                          required
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <span className="text-gray-400">DER</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={increaseStakeAmount}
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
                            setStakeAmount(((10000 * percent) / 100).toString())
                          }
                        >
                          {percent}%
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-300 block mb-2">
                      锁定期
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        className={`py-2 px-3 rounded text-center text-sm transition-colors ${
                          lockPeriod === 30
                            ? "bg-[rgba(var(--highlight),0.2)] text-white"
                            : "bg-[rgba(var(--input-bg),0.5)] text-gray-400 hover:text-white"
                        }`}
                        onClick={() => setLockPeriod(30)}
                      >
                        30天
                      </button>
                      <button
                        type="button"
                        className={`py-2 px-3 rounded text-center text-sm transition-colors ${
                          lockPeriod === 60
                            ? "bg-[rgba(var(--highlight),0.2)] text-white"
                            : "bg-[rgba(var(--input-bg),0.5)] text-gray-400 hover:text-white"
                        }`}
                        onClick={() => setLockPeriod(60)}
                      >
                        60天
                      </button>
                      <button
                        type="button"
                        className={`py-2 px-3 rounded text-center text-sm transition-colors ${
                          lockPeriod === 90
                            ? "bg-[rgba(var(--highlight),0.2)] text-white"
                            : "bg-[rgba(var(--input-bg),0.5)] text-gray-400 hover:text-white"
                        }`}
                        onClick={() => setLockPeriod(90)}
                      >
                        90天
                      </button>
                    </div>
                  </div>

                  <div className="mb-6 py-3 px-4 bg-[rgba(var(--input-bg),0.4)] rounded">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">
                      质押摘要
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">质押数量</span>
                        <span className="text-white">
                          {stakeAmount
                            ? parseFloat(stakeAmount).toLocaleString()
                            : "0"}{" "}
                          DER
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">锁定期</span>
                        <span className="text-white">{lockPeriod} 天</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">预计APR</span>
                        <span className="text-[rgb(var(--accent-green))]">
                          {calculateEstimatedApr()}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">解锁日期</span>
                        <span className="text-white">
                          {new Date(
                            Date.now() + lockPeriod * 24 * 60 * 60 * 1000
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-[rgb(var(--accent-blue))] hover:bg-[rgb(var(--accent-blue-hover))] text-white font-medium rounded transition-colors"
                  >
                    质押 DER
                  </button>
                </form>
              ) : (
                <div className="p-4">
                  <div className="bg-[rgba(var(--input-bg),0.4)] rounded p-4 mb-4">
                    <div className="text-sm text-gray-300 mb-2">已质押总量</div>
                    <div className="text-xl font-semibold">
                      {mockUserStats.stakedBalance.toLocaleString()} DER
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-300 mb-2">
                      选择要解除的质押
                    </div>
                    <div className="space-y-2">
                      {mockStakingHistory
                        .filter((item) => item.status === "active")
                        .map((stake) => (
                          <div
                            key={stake.id}
                            className="p-3 border border-[rgba(var(--border-color),0.5)] rounded hover:border-[rgba(var(--highlight),0.5)] transition-colors cursor-pointer"
                            onClick={() =>
                              setUnstakeId(
                                stake.id === unstakeId ? null : stake.id
                              )
                            }
                          >
                            <div className="flex justify-between mb-1">
                              <span>{stake.amount.toLocaleString()} DER</span>
                              <span
                                className={
                                  unstakeId === stake.id
                                    ? "text-[rgb(var(--accent-green))]"
                                    : ""
                                }
                              >
                                ✓
                              </span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-400">
                              <span>锁定 {stake.lockPeriod} 天</span>
                              <span>
                                {new Date(stake.timestamp).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                    {mockStakingHistory.filter(
                      (item) => item.status === "active"
                    ).length === 0 && (
                      <div className="text-center py-4 text-gray-400">
                        暂无活跃质押
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleUnstake(unstakeId || "")}
                    disabled={!unstakeId}
                    className={`w-full py-3 px-4 font-medium rounded transition-colors ${
                      unstakeId
                        ? "bg-[rgb(var(--accent-blue))] hover:bg-[rgb(var(--accent-blue-hover))] text-white"
                        : "bg-[rgba(var(--input-bg),0.7)] text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    解除质押
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 用户质押信息 */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="card p-4">
                <div className="text-gray-400 text-sm mb-1">我的质押</div>
                <div className="text-xl font-semibold">
                  {mockUserStats.stakedBalance.toLocaleString()} DER
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  ≈ ${(mockUserStats.stakedBalance * 1.2).toLocaleString()}
                </div>
              </div>
              <div className="card p-4">
                <div className="text-gray-400 text-sm mb-1">待领取奖励</div>
                <div className="flex justify-between items-center">
                  <div className="text-xl font-semibold text-[rgb(var(--accent-green))]">
                    {mockUserStats.pendingRewards.toLocaleString()} DER
                  </div>
                  <button
                    onClick={handleClaimRewards}
                    disabled={mockUserStats.pendingRewards <= 0}
                    className={`py-1.5 px-3 rounded text-sm transition-colors ${
                      mockUserStats.pendingRewards > 0
                        ? "bg-[rgba(var(--accent-green),0.2)] text-[rgb(var(--accent-green))] hover:bg-[rgba(var(--accent-green),0.3)]"
                        : "bg-[rgba(var(--input-bg),0.5)] text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    领取
                  </button>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  ≈ ${(mockUserStats.pendingRewards * 1.2).toLocaleString()}
                </div>
              </div>
            </div>

            {/* 质押历史 */}
            <div className="card">
              <div className="px-4 py-3 border-b border-[rgba(var(--border-color),0.5)]">
                <h2 className="text-base font-medium">质押历史</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[rgba(var(--input-bg),0.3)]">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                        数量
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                        日期
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                        锁定期
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                        解锁日期
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 tracking-wider">
                        状态
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[rgba(var(--border-color),0.3)]">
                    {mockStakingHistory.map((stake) => (
                      <tr
                        key={stake.id}
                        className="hover:bg-[rgba(var(--highlight),0.05)] transition-colors"
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="font-medium">
                            {stake.amount.toLocaleString()} DER
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {new Date(stake.timestamp).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {stake.lockPeriod} 天
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {new Date(
                            stake.timestamp +
                              stake.lockPeriod * 24 * 60 * 60 * 1000
                          ).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`py-1 px-2 text-xs font-medium rounded-full ${
                              stake.status === "active"
                                ? "bg-[rgba(var(--accent-green),0.2)] text-[rgb(var(--accent-green))]"
                                : "bg-[rgba(var(--highlight),0.2)] text-[rgb(var(--highlight))]"
                            }`}
                          >
                            {stake.status === "active" ? "活跃" : "已完成"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {mockStakingHistory.length === 0 && (
                  <div className="py-8 text-center text-gray-400">
                    暂无质押记录
                  </div>
                )}
              </div>
            </div>

            {/* 质押说明 */}
            <div className="mt-6 card p-5">
              <h3 className="text-lg font-medium mb-3">质押说明</h3>
              <div className="space-y-3 text-gray-300 text-sm">
                <p>
                  质押DER代币可以让您参与平台的手续费收益分享。通过锁定您的代币，您将获得平台交易手续费的一部分作为奖励。
                </p>
                <p>
                  <span className="text-[rgb(var(--accent-green))]">
                    • 基础APR:
                  </span>{" "}
                  质押的基础年化收益率为12%。
                </p>
                <p>
                  <span className="text-[rgb(var(--accent-green))]">
                    • 锁定期激励:
                  </span>{" "}
                  选择更长的锁定期将获得额外APR奖励：
                  <br />
                  - 30天锁定期：基础APR
                  <br />
                  - 60天锁定期：基础APR + 2%
                  <br />- 90天锁定期：基础APR + 5%
                </p>
                <p>
                  <span className="text-[rgb(var(--accent-green))]">
                    • 奖励发放:
                  </span>{" "}
                  奖励每日计算，实时积累，可随时领取。
                </p>
                <p>
                  <span className="text-[rgb(var(--accent-red))]">• 注意:</span>{" "}
                  锁定期内无法解除质押。请根据您的需求选择合适的锁定期。
                </p>
                <p>
                  了解更多信息，请查阅
                  <Link
                    href="#"
                    className="text-[rgb(var(--accent-blue))] hover:underline ml-1"
                  >
                    质押政策文档
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
