"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import ClientOnly from "@/components/ClientOnly";
import Link from "next/link";
import { useRouter } from "next/navigation";

// 文档页面内容数据结构
interface DocSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

export default function DocsPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>("introduction");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  // 所有文档部分
  const sections: DocSection[] = [
    {
      id: "introduction",
      title: "平台介绍",
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">关于 Derix</h2>
          <p>
            Derix
            是一个去中心化的衍生品交易平台，旨在为用户提供安全、高效、透明的金融衍生品交易环境。我们的平台基于区块链技术构建，支持多种加密货币的杠杆交易。
          </p>
          <p>
            我们的使命是打造一个无需许可、全球可访问的衍生品交易市场，让用户能够自由地进行交易、质押和赚取收益。
          </p>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-3">平台特点</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">去中心化架构：</span>
                基于智能合约构建，无需信任中介机构，资金由用户自行控制。
              </li>
              <li>
                <span className="font-medium">高流动性：</span>
                采用自动做市商机制，确保市场深度和交易执行效率。
              </li>
              <li>
                <span className="font-medium">透明机制：</span>
                所有交易和价格馈送都在链上记录，可以被任何人审计。
              </li>
              <li>
                <span className="font-medium">多样化产品：</span>
                支持多种加密货币的永续合约和传统期权合约。
              </li>
              <li>
                <span className="font-medium">质押奖励：</span>
                DER 代币持有者可以通过质押获得平台手续费收益的分成。
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "trading",
      title: "交易指南",
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">交易指南</h2>
          <p>
            Derix
            平台支持多种加密货币的杠杆交易。您可以通过简单的步骤开始您的交易旅程。
          </p>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3">交易流程</h3>
            <ol className="list-decimal pl-5 space-y-4">
              <li>
                <h4 className="font-medium">连接钱包</h4>
                <p className="text-gray-300 mt-1">
                  点击页面右上角的"连接钱包"按钮，选择您喜欢的钱包（如MetaMask、WalletConnect等）并授权连接。
                </p>
              </li>
              <li>
                <h4 className="font-medium">充值资金</h4>
                <p className="text-gray-300 mt-1">
                  在用户界面的资金管理部分，选择"充值"并确认交易。您需要支付少量的网络费用来处理交易。
                </p>
              </li>
              <li>
                <h4 className="font-medium">选择交易对</h4>
                <p className="text-gray-300 mt-1">
                  在交易界面选择您想要交易的加密货币对，例如BTC/USD、ETH/USD等。
                </p>
              </li>
              <li>
                <h4 className="font-medium">设置杠杆和订单类型</h4>
                <p className="text-gray-300 mt-1">
                  选择杠杆倍数（最高100倍）和订单类型（市价单或限价单）。杠杆越高，风险也就越大。
                </p>
              </li>
              <li>
                <h4 className="font-medium">下单交易</h4>
                <p className="text-gray-300 mt-1">
                  输入您想要交易的金额，确认交易详情，然后点击"多仓"或"空仓"按钮提交订单。
                </p>
              </li>
              <li>
                <h4 className="font-medium">管理持仓</h4>
                <p className="text-gray-300 mt-1">
                  您可以在持仓区域监控和管理您的活跃交易，设置止盈止损，或者平仓结束交易。
                </p>
              </li>
            </ol>
          </div>

          <div className="mt-8 p-4 bg-[rgba(var(--highlight),0.05)] rounded">
            <h3 className="text-lg font-semibold text-[rgb(var(--accent-yellow))]">
              风险提示
            </h3>
            <p className="mt-2">
              杠杆交易涉及高风险，可能导致本金全部损失。永远不要投入超过您能承受损失的资金，并确保您充分了解产品的风险。
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "staking",
      title: "质押规则",
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">质押规则</h2>
          <p>
            通过质押 DER
            代币，您可以参与平台的收益分享计划，获得平台交易手续费的一部分作为奖励。
          </p>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3">质押机制</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">基础收益率</h4>
                <p className="text-gray-300 mt-1">
                  DER 代币的基础质押年化收益率 (APR) 为
                  12-20%，根据平台交易量和总质押量动态调整。
                </p>
              </div>
              <div>
                <h4 className="font-medium">锁定期激励</h4>
                <p className="text-gray-300 mt-1">
                  您可以选择不同的锁定期来获得额外的APR奖励：
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>30天锁定期：基础APR</li>
                  <li>60天锁定期：基础APR + 2%</li>
                  <li>90天锁定期：基础APR + 5%</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium">奖励计算</h4>
                <p className="text-gray-300 mt-1">
                  质押奖励按日计算，实时累积，可随时领取。奖励根据您的质押占总质押量的比例分配。
                </p>
              </div>
              <div>
                <h4 className="font-medium">解除质押</h4>
                <p className="text-gray-300 mt-1">
                  在锁定期结束后，您可以自由解除质押。锁定期内无法解除质押，请根据您的需求选择合适的锁定期。
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-[rgba(var(--highlight),0.05)] rounded">
            <h3 className="text-lg font-semibold">质押公式</h3>
            <div className="mt-3 space-y-2">
              <p>
                <strong>日奖励</strong> = 您的质押量 × 日APR × (您的质押比例)
              </p>
              <p>
                <strong>日APR</strong> = 年化APR ÷ 365
              </p>
              <p>
                <strong>您的质押比例</strong> = 您的质押量 ÷ 总质押量
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "security",
      title: "安全机制",
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">安全机制</h2>
          <p>
            Derix
            将安全性置于首位，我们采用多层次的安全机制来保护用户资金和平台稳定性。
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">智能合约安全</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-medium">代码审计：</span>
                  所有智能合约经过顶级安全公司（如CertiK和Quantstamp）的多重审计。
                </li>
                <li>
                  <span className="font-medium">形式化验证：</span>
                  核心合约逻辑通过形式化验证，确保逻辑正确性。
                </li>
                <li>
                  <span className="font-medium">开源透明：</span>
                  所有合约代码公开可查，任何人都可以审核。
                </li>
                <li>
                  <span className="font-medium">漏洞赏金计划：</span>
                  提供高额赏金激励白帽黑客发现并报告潜在漏洞。
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">资金安全</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-medium">多重签名机制：</span>
                  管理资金的合约要求多方批准才能执行关键操作。
                </li>
                <li>
                  <span className="font-medium">时间锁：</span>
                  重要参数更新有24-72小时的延迟期，给用户足够的反应时间。
                </li>
                <li>
                  <span className="font-medium">保险基金：</span>
                  平台收入的10%用于建立保险基金，应对极端市场条件下可能出现的损失。
                </li>
                <li>
                  <span className="font-medium">资金隔离：</span>
                  用户资金与平台运营资金完全分离，保证用户资产安全。
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">风险控制</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-medium">动态清算机制：</span>
                  系统持续监控所有杠杆头寸，当抵押率不足时自动触发清算流程。
                </li>
                <li>
                  <span className="font-medium">价格馈送保护：</span>
                  使用多个去中心化预言机的中位数价格，抵御价格操纵攻击。
                </li>
                <li>
                  <span className="font-medium">交易限制：</span>
                  根据市场流动性动态调整最大头寸规模和价格影响限制。
                </li>
                <li>
                  <span className="font-medium">紧急暂停：</span>
                  在极端情况下，治理可以暂停特定功能，防止系统性风险扩散。
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-4 bg-[rgba(var(--highlight),0.05)] rounded">
            <h3 className="text-lg font-semibold">安全是共同责任</h3>
            <p className="mt-2">
              虽然我们采取了多种措施保障平台安全，但用户也应当重视个人安全实践，如使用强密码、开启双因素认证、谨慎管理私钥等。
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "tokenomics",
      title: "代币经济",
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">DER 代币经济</h2>
          <p>
            DER 是 Derix
            平台的原生功能型代币，用于平台治理、质押奖励和费用折扣。
          </p>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3">代币分配</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-[rgba(var(--panel-bg),0.4)] p-4 rounded">
                <h4 className="font-medium mb-2">代币供应</h4>
                <p className="text-gray-300">总供应量: 100,000,000 DER</p>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between">
                    <span>社区质押与流动性奖励</span>
                    <span>40%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>团队与顾问</span>
                    <span>20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>生态系统发展</span>
                    <span>15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>私募投资者</span>
                    <span>15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>流动性储备</span>
                    <span>5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>社区空投</span>
                    <span>5%</span>
                  </div>
                </div>
              </div>
              <div className="bg-[rgba(var(--panel-bg),0.4)] p-4 rounded">
                <h4 className="font-medium mb-2">代币解锁</h4>
                <p className="text-gray-300 mb-3">
                  团队、顾问和私募投资者的代币有3年的线性解锁期，确保长期利益一致性。
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>初始解锁（流通）</span>
                    <span>15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>第一年解锁额外</span>
                    <span>25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>第二年解锁额外</span>
                    <span>30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>第三年解锁额外</span>
                    <span>30%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-3">代币实用性</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">交易费折扣</h4>
                <p className="text-gray-300 mt-1">
                  持有并质押 DER
                  代币的用户可以获得交易手续费的折扣，最高可达30%。
                </p>
              </div>
              <div>
                <h4 className="font-medium">平台治理</h4>
                <p className="text-gray-300 mt-1">
                  DER
                  持有者可以参与平台治理，对关键参数变更、新功能开发和资源分配等事项进行投票。
                </p>
              </div>
              <div>
                <h4 className="font-medium">质押奖励</h4>
                <p className="text-gray-300 mt-1">
                  质押 DER
                  代币可以获得平台手续费收入的分成，年化收益率根据市场条件动态调整。
                </p>
              </div>
              <div>
                <h4 className="font-medium">优先参与新产品</h4>
                <p className="text-gray-300 mt-1">
                  DER
                  持有者可以优先参与平台新产品的测试和早期访问，获得额外奖励。
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-[rgba(var(--highlight),0.05)] rounded">
            <h3 className="text-lg font-semibold">费用分配</h3>
            <p className="mt-2">平台收取的手续费按以下比例分配：</p>
            <div className="mt-3 space-y-2">
              <div className="flex justify-between">
                <span>质押者奖励</span>
                <span>70%</span>
              </div>
              <div className="flex justify-between">
                <span>保险基金</span>
                <span>10%</span>
              </div>
              <div className="flex justify-between">
                <span>流动性激励</span>
                <span>10%</span>
              </div>
              <div className="flex justify-between">
                <span>代币回购与销毁</span>
                <span>10%</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "faq",
      title: "常见问题",
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">常见问题</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[rgb(var(--accent-blue))]">
                基础问题
              </h3>
              <div className="mt-3 space-y-4">
                <div className="border-b border-[rgba(var(--border-color),0.3)] pb-3">
                  <h4 className="font-medium mb-2">什么是 Derix？</h4>
                  <p className="text-gray-300">
                    Derix
                    是一个去中心化的衍生品交易平台，允许用户以去中心化的方式交易加密货币衍生品，同时通过质押
                    DER 代币参与平台收益分享。
                  </p>
                </div>
                <div className="border-b border-[rgba(var(--border-color),0.3)] pb-3">
                  <h4 className="font-medium mb-2">如何开始使用 Derix？</h4>
                  <p className="text-gray-300">
                    首先，您需要连接您的加密货币钱包（如MetaMask），然后向您的账户充值资金，之后您就可以开始交易或质押了。
                  </p>
                </div>
                <div className="border-b border-[rgba(var(--border-color),0.3)] pb-3">
                  <h4 className="font-medium mb-2">Derix 支持哪些链？</h4>
                  <p className="text-gray-300">
                    Derix 目前支持以太坊主网和
                    Arbitrum，未来将扩展到更多EVM兼容链。
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[rgb(var(--accent-blue))]">
                交易相关
              </h3>
              <div className="mt-3 space-y-4">
                <div className="border-b border-[rgba(var(--border-color),0.3)] pb-3">
                  <h4 className="font-medium mb-2">什么是永续合约？</h4>
                  <p className="text-gray-300">
                    永续合约是一种没有到期日的衍生品合约，允许交易者无限期地保持仓位。它通过资金费率机制将合约价格与基础资产价格保持一致。
                  </p>
                </div>
                <div className="border-b border-[rgba(var(--border-color),0.3)] pb-3">
                  <h4 className="font-medium mb-2">什么是清算？</h4>
                  <p className="text-gray-300">
                    清算是指当交易者的保证金不足以支撑其仓位时，平台自动关闭其仓位以避免更大损失的过程。为避免清算，请确保您的账户有足够的保证金。
                  </p>
                </div>
                <div className="border-b border-[rgba(var(--border-color),0.3)] pb-3">
                  <h4 className="font-medium mb-2">Derix 的交易费用是多少？</h4>
                  <p className="text-gray-300">
                    Derix 的标准交易费率为 0.1%，但质押 DER
                    代币可以获得最高30%的费用折扣。此外，还需要支付网络手续费用于链上确认交易。
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[rgb(var(--accent-blue))]">
                质押相关
              </h3>
              <div className="mt-3 space-y-4">
                <div className="border-b border-[rgba(var(--border-color),0.3)] pb-3">
                  <h4 className="font-medium mb-2">
                    质押 DER 代币有什么好处？
                  </h4>
                  <p className="text-gray-300">
                    质押 DER
                    代币可以让您分享平台交易手续费收入，获得被动收益。质押期越长，额外APR奖励越高。
                  </p>
                </div>
                <div className="border-b border-[rgba(var(--border-color),0.3)] pb-3">
                  <h4 className="font-medium mb-2">我可以随时解除质押吗？</h4>
                  <p className="text-gray-300">
                    不可以。质押设有锁定期（30天、60天或90天），在锁定期内您无法解除质押。锁定期结束后，您可以随时解除质押。
                  </p>
                </div>
                <div className="border-b border-[rgba(var(--border-color),0.3)] pb-3">
                  <h4 className="font-medium mb-2">质押奖励如何发放？</h4>
                  <p className="text-gray-300">
                    质押奖励按日计算，实时累积，可以随时领取。领取的奖励会直接发送到您的钱包。
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[rgb(var(--accent-blue))]">
                安全与支持
              </h3>
              <div className="mt-3 space-y-4">
                <div className="border-b border-[rgba(var(--border-color),0.3)] pb-3">
                  <h4 className="font-medium mb-2">我的资金安全吗？</h4>
                  <p className="text-gray-300">
                    Derix
                    使用经过审计的智能合约，实施多重签名和时间锁保护机制，并建立保险基金应对风险。但所有加密货币投资都有内在风险，请谨慎投资。
                  </p>
                </div>
                <div className="border-b border-[rgba(var(--border-color),0.3)] pb-3">
                  <h4 className="font-medium mb-2">如何联系客户支持？</h4>
                  <p className="text-gray-300">
                    您可以通过 Discord 社区、Telegram 群组或发送邮件至
                    support@derix.io 获取支持。我们的团队将在24小时内回复您。
                  </p>
                </div>
                <div className="border-b border-[rgba(var(--border-color),0.3)] pb-3">
                  <h4 className="font-medium mb-2">如何保护我的账户安全？</h4>
                  <p className="text-gray-300">
                    使用硬件钱包、开启双因素认证、定期更新您的钱包应用、不要分享私钥，并且警惕钓鱼攻击。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  // 切换目录显示状态（移动端）
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <main className="min-h-screen">
      <ClientOnly>
        <Navbar />
      </ClientOnly>

      <div className="container mx-auto px-4 pt-20 pb-8">
        {/* 移动端显示的目录开关按钮 */}
        <div className="flex md:hidden justify-between items-center mb-4">
          <h1 className="text-xl font-bold">文档中心</h1>
          <button
            className="py-2 px-4 bg-[rgba(var(--panel-bg),0.6)] rounded"
            onClick={toggleMenu}
          >
            {menuOpen ? "隐藏目录" : "显示目录"}
          </button>
        </div>

        <div className="flex flex-row">
          {/* 目录侧边栏 - 始终以左右布局显示，移动端可隐藏 */}
          <div
            className={`
              fixed md:relative top-0 md:top-auto left-0 md:left-auto 
              w-3/4 md:w-64 h-full md:h-auto z-40 md:z-auto
              transform transition-transform duration-300 ease-in-out
              ${
                menuOpen
                  ? "translate-x-0"
                  : "-translate-x-full md:translate-x-0"
              }
              bg-[rgba(var(--bg-color),0.95)] md:bg-transparent
              md:block md:shrink-0 pt-20 md:pt-0 px-4 md:px-0
              overflow-y-auto md:overflow-visible
            `}
          >
            <div className="sticky top-24">
              <div className="card p-4">
                <h2 className="text-lg font-bold mb-4">文档目录</h2>
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                        activeSection === section.id
                          ? "bg-[rgba(var(--highlight),0.2)] text-white"
                          : "text-gray-400 hover:text-white hover:bg-[rgba(var(--highlight),0.1)]"
                      }`}
                      onClick={() => {
                        setActiveSection(section.id);
                        if (window.innerWidth < 768) {
                          setMenuOpen(false);
                        }
                      }}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
                <div className="mt-6 pt-4 border-t border-[rgba(var(--border-color),0.5)]">
                  <Link
                    href="/trade"
                    className="block w-full text-center py-2 px-4 bg-[rgb(var(--accent-blue))] hover:bg-[rgb(var(--accent-blue-hover))] text-white rounded transition-colors"
                  >
                    开始交易
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* 遮罩层 - 移动端菜单打开时显示 */}
          {menuOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
              onClick={() => setMenuOpen(false)}
            />
          )}

          {/* 主要内容区域 */}
          <div className="flex-grow md:ml-6">
            <div className="card p-4 md:p-6">
              {
                sections.find((section) => section.id === activeSection)
                  ?.content
              }
            </div>

            {/* 文档导航 */}
            <div className="mt-6 flex justify-between">
              {activeSection !== sections[0].id && (
                <button
                  className="py-2 px-4 bg-[rgba(var(--panel-bg),0.6)] hover:bg-[rgba(var(--panel-bg),0.8)] text-white rounded flex items-center transition-colors"
                  onClick={() => {
                    const currentIndex = sections.findIndex(
                      (section) => section.id === activeSection
                    );
                    if (currentIndex > 0) {
                      setActiveSection(sections[currentIndex - 1].id);
                    }
                  }}
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  上一节
                </button>
              )}
              {activeSection !== sections[sections.length - 1].id && (
                <button
                  className="py-2 px-4 bg-[rgba(var(--panel-bg),0.6)] hover:bg-[rgba(var(--panel-bg),0.8)] text-white rounded flex items-center ml-auto transition-colors"
                  onClick={() => {
                    const currentIndex = sections.findIndex(
                      (section) => section.id === activeSection
                    );
                    if (currentIndex < sections.length - 1) {
                      setActiveSection(sections[currentIndex + 1].id);
                    }
                  }}
                >
                  下一节
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
