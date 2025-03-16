/**
 * 交易对配置文件
 * 定义平台支持的所有交易对及其基本信息
 */

export interface TradingPair {
  /** 交易对唯一标识符 */
  id: string;
  /** 显示名称 */
  name: string;
  /** 基础货币符号 */
  baseAsset: string;
  /** 计价货币符号 */
  quoteAsset: string;
  /** 初始/默认价格 */
  defaultPrice: number;
  /** 价格精度 */
  pricePrecision: number;
  /** 数量精度 */
  quantityPrecision: number;
  /** 最小交易数量 */
  minQuantity: number;
  /** 最大杠杆 */
  maxLeverage: number;
  /** 交易手续费率 */
  feeRate: number;
  /** 图标 */
  icon?: string;
  /** 是否启用 */
  enabled: boolean;
}

/**
 * 交易对列表
 */
const tradingPairs: TradingPair[] = [
  {
    id: "BTC-USD",
    name: "BTC/USD",
    baseAsset: "BTC",
    quoteAsset: "USD",
    defaultPrice: 65000,
    pricePrecision: 2,
    quantityPrecision: 2,
    minQuantity: 10,
    maxLeverage: 100,
    feeRate: 0.0005,
    enabled: true,
  },
  {
    id: "AAPL-USD",
    name: "AAPL/USD",
    baseAsset: "AAPL",
    quoteAsset: "USD",
    defaultPrice: 195.5,
    pricePrecision: 2,
    quantityPrecision: 2,
    minQuantity: 1,
    maxLeverage: 50,
    feeRate: 0.0005,
    enabled: true,
  },
  {
    id: "SPX-USD",
    name: "SPX/USD",
    baseAsset: "SPX",
    quoteAsset: "USD",
    defaultPrice: 5200,
    pricePrecision: 2,
    quantityPrecision: 2,
    minQuantity: 1,
    maxLeverage: 50,
    feeRate: 0.0005,
    enabled: true,
  },
];

/**
 * 获取所有启用的交易对
 */
export const getEnabledTradingPairs = (): TradingPair[] => {
  return tradingPairs.filter((pair) => pair.enabled);
};

/**
 * 通过ID获取交易对
 */
export const getTradingPairById = (id: string): TradingPair | undefined => {
  return tradingPairs.find((pair) => pair.id === id);
};

/**
 * 默认交易对ID
 */
export const DEFAULT_TRADING_PAIR_ID = "BTC-USD";

export default tradingPairs;
