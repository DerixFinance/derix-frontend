"use client";

import React, { useEffect, useRef, useState } from "react";
// 使用通用导入以避免类型错误问题
import * as LightweightCharts from "lightweight-charts";
import { CandlestickSeries } from "lightweight-charts";

interface ChartProps {
  data: any[];
  colors?: {
    backgroundColor?: string;
    lineColor?: string;
    textColor?: string;
  };
  height?: number;
  isLoading?: boolean;
}

const cc_data = [
  { open: 10, high: 10.63, low: 9.49, close: 9.55, time: 1642427876 },
  { open: 9.55, high: 10.3, low: 9.42, close: 9.94, time: 1642514276 },
  { open: 9.94, high: 10.17, low: 9.92, close: 9.78, time: 1642600676 },
  { open: 9.78, high: 10.59, low: 9.18, close: 9.51, time: 1642687076 },
  { open: 9.51, high: 10.46, low: 9.1, close: 10.17, time: 1642773476 },
  { open: 10.17, high: 10.96, low: 10.16, close: 10.47, time: 1642859876 },
  { open: 10.47, high: 11.39, low: 10.4, close: 10.81, time: 1642946276 },
  { open: 10.81, high: 11.6, low: 10.3, close: 10.75, time: 1643032676 },
  { open: 10.75, high: 11.6, low: 10.49, close: 10.93, time: 1643119076 },
  { open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: 1643205476 },
];

export const TradingChart: React.FC<ChartProps> = (props) => {
  const {
    data,
    colors = {
      backgroundColor: "rgba(16, 17, 28, 0)",
      lineColor: "rgb(0, 190, 126)",
      textColor: "rgba(255, 255, 255, 0.9)",
    },
    height = 400,
    isLoading = false,
  } = props;

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [chartError, setChartError] = useState<string | null>(null);

  // 仅在客户端执行
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 创建和管理图表的 useEffect
  useEffect(() => {
    if (!isClient || !chartContainerRef.current) return;

    // 如果没有数据，显示错误提示
    if (!data || data.length === 0) {
      setChartError("没有数据可显示");
      return;
    }

    let chart: any = null;

    try {
      console.log("开始创建图表...");

      // 清理容器
      const container = chartContainerRef.current;
      container.innerHTML = "";

      // 格式化数据
      const formattedData = data
        .filter((item) => item && typeof item.close === "number" && item.time)
        .map((item) => {
          // 处理时间格式
          let timeValue: string;
          if (typeof item.time === "string") {
            timeValue = item.time;
          } else if (typeof item.time === "number") {
            // 转换时间戳为 YYYY-MM-DD 格式
            const date = new Date(item.time * 1000);
            timeValue = date.toISOString().split("T")[0];
          } else {
            return null;
          }

          // 返回格式化的数据点
          return {
            time: timeValue,
            value: item.close,
          };
        })
        .filter(Boolean);

      if (formattedData.length === 0) {
        setChartError("处理后没有有效的价格数据");
        return;
      }

      console.log(
        "处理后的数据样本:",
        formattedData[0],
        "总数据点:",
        formattedData.length
      );

      // 创建图表
      chart = LightweightCharts.createChart(container, {
        width: container.clientWidth,
        height,
        layout: {
          background: {
            type: LightweightCharts.ColorType.Solid,
            color: colors.backgroundColor,
          },
          textColor: colors.textColor,
        },
        grid: {
          vertLines: {
            style: LightweightCharts.LineStyle.Dotted,
          },
          horzLines: {
            style: LightweightCharts.LineStyle.Dotted,
          },
        },
      });

      // 尝试添加各种系列类型
      console.log(
        "创建图表API方法:",
        Object.keys(chart).filter((key) => typeof chart[key] === "function")
      );

      try {
        // 尝试 v5 风格的 API
        if (typeof chart.addSeries === "function") {
          console.log("使用 v5 API: addSeries");
          // @ts-ignore - 忽略类型错误，尝试使用 v5 API
          const series = chart.addSeries(CandlestickSeries, {
            upColor: "#26a69a",
            downColor: "#ef5350",
            borderVisible: false,
            wickUpColor: "#26a69a",
            wickDownColor: "#ef5350",
          });
          series.setData(cc_data);
          chart.timeScale().fitContent();
        } else {
          throw new Error("未找到有效的添加系列方法");
        }

        // 使图表适应数据
        chart.timeScale().fitContent();
        console.log("图表创建和数据设置成功");
      } catch (error) {
        console.error("添加系列失败:", error);
        throw new Error(`添加图表系列失败: ${error}`);
      }

      // 处理窗口大小变化
      const handleResize = () => {
        if (chart && container) {
          chart.applyOptions({
            width: container.clientWidth,
          });
        }
      };

      window.addEventListener("resize", handleResize);

      // 返回清理函数
      return () => {
        window.removeEventListener("resize", handleResize);
        if (chart) {
          chart.remove();
        }
      };
    } catch (error) {
      console.error("创建图表出错:", error);
      setChartError("无法创建图表: " + String(error));

      // 确保在出错时也清理资源
      return () => {
        if (chart) {
          chart.remove();
        }
      };
    }
  }, [isClient, data, height, colors, isLoading]);

  // 未挂载时显示加载状态
  if (!isClient) {
    return (
      <div
        style={{ height: `${height}px` }}
        className="bg-[rgba(var(--panel-bg),0.3)] rounded-lg flex items-center justify-center"
      >
        <div className="text-gray-400">加载图表中...</div>
      </div>
    );
  }

  // 加载数据状态
  if (isLoading) {
    return (
      <div
        style={{ height: `${height}px` }}
        className="bg-[rgba(var(--panel-bg),0.3)] rounded-lg flex items-center justify-center"
      >
        <div className="text-gray-400">
          <div className="flex flex-col items-center">
            <div className="mb-3 text-base">获取价格数据中...</div>
            <div className="w-8 h-8 border-t-2 border-blue-500 rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  // 错误状态
  if (chartError) {
    return (
      <div
        style={{ height: `${height}px` }}
        className="bg-[rgba(var(--panel-bg),0.3)] rounded-lg flex items-center justify-center"
      >
        <div className="text-red-500 text-center">
          <p>{chartError}</p>
          <p className="mt-2 text-xs text-gray-400">
            如果问题持续存在，请确认您的 lightweight-charts 版本是最新的 v5 版本
          </p>
          <p className="mt-2 text-xs text-gray-400">
            (<code>npm view lightweight-charts version</code>)
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 py-2 px-4 bg-[rgba(var(--highlight),0.2)] rounded text-white"
          >
            刷新页面
          </button>
        </div>
      </div>
    );
  }

  // 渲染图表容器
  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <div ref={chartContainerRef} className="w-full h-full" />
    </div>
  );
};
