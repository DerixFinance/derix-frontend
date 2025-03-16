"use client";

import { ReactNode, useState, useEffect } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mainnet, arbitrum, optimism, polygon } from "wagmi/chains";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

// 创建 Wagmi 配置
const { connectors } = getDefaultWallets({
  appName: "Derix 交易平台",
  projectId: "YOUR_PROJECT_ID", // 替换为你的 WalletConnect 项目 ID
});

const config = createConfig({
  chains: [mainnet, arbitrum, optimism, polygon],
  transports: {
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
    [polygon.id]: http(),
  },
  connectors,
  ssr: false,
});

// 创建 QueryClient 实例
const queryClient = new QueryClient();

interface Web3ProviderProps {
  children: ReactNode;
}

export default function Web3Provider({ children }: Web3ProviderProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // 客户端内容，包含所有需要的 providers
  const clientContent = (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );

  // 服务器端内容，简单的加载状态
  const serverContent = (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <div className="text-xl">正在准备 Web3 功能...</div>
    </div>
  );

  return isClient ? clientContent : serverContent;
}
