"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { arbitrum, arbitrumSepolia, base, baseSepolia } from "wagmi/chains";
import { http } from "wagmi";

// 配置支持的链和提供者
export const config = getDefaultConfig({
  appName: "Derix Perpetual Trading Dapp",
  projectId: "YOUR_WALLET_CONNECT_PROJECT_ID", // 您需要从 https://cloud.walletconnect.com 获取项目ID
  chains: [arbitrum, base, arbitrumSepolia, baseSepolia],
  transports: {
    [arbitrum.id]: http(),
    [base.id]: http(),
    [arbitrumSepolia.id]: http(),
    [baseSepolia.id]: http(),
  },
});
