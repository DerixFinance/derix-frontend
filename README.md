# Derix - Web3 永续交易平台

Derix 是一个去中心化的永续合约交易平台，提供高杠杆、低手续费和多链支持，让用户能够以最佳价格交易加密货币永续合约。

## 项目特点

- 🚀 **高杠杆交易** - 提供高达 100 倍的杠杆，最大化您的交易潜力
- 🔗 **多链支持** - 支持 Arbitrum、Base 等多条 Layer 2 链
- 💰 **低手续费** - 业内最低手续费，使用平台代币可获得更多折扣
- 📊 **实时图表** - 使用轻量级图表库提供专业的 K 线和深度图
- 📱 **响应式设计** - 在任何设备上都能获得良好的用户体验

## 技术栈

- **前端框架**: Next.js 14 + TypeScript + Tailwind CSS
- **区块链交互**: ethers.js、wagmi、RainbowKit
- **图表库**: lightweight-charts

## 开始使用

### 前提条件

- Node.js 18.0.0 或更高版本
- npm 或 yarn

### 安装

1. 克隆仓库

```bash
git clone https://github.com/yourusername/derix-frontend.git
cd derix-frontend
```

2. 安装依赖

```bash
npm install
# 或
yarn install
```

3. 创建`.env.local`文件并添加以下环境变量

```bash
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=您的WalletConnect项目ID
```

4. 启动开发服务器

```bash
npm run dev
# 或
yarn dev
```

5. 打开[http://localhost:3000](http://localhost:3000)查看应用

## 部署

项目可以轻松部署到 Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/derix-frontend)

## 智能合约交互

本项目前端已经集成了与永续交易智能合约交互的功能，包括：

- 连接钱包和认证
- 读取市场数据和订单簿
- 开仓和平仓操作
- 查看持仓信息
- 调整杠杆和止盈止损

## 贡献指南

1. Fork 项目
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启 Pull Request

## 许可证

该项目采用 MIT 许可证 - 详情见[LICENSE](LICENSE)文件

## 联系方式

如有任何问题或建议，请通过以下方式联系我们：

- 电子邮件: contact@derix.finance
- Twitter: [@DerixFinance](https://twitter.com/derixfinance)
- Discord: [Derix 社区](https://discord.gg/derix)
