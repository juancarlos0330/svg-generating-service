import { Chain } from "@rainbow-me/rainbowkit";
export const mintMainnet = {
  id: 185,
  name: "Mint Mainnet",
  iconBackground: "#fff",
  nativeCurrency: { name: "Mint", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.mintchain.io"] }
  },
  blockExplorers: {
    default: { name: "Mint", url: "https://explorer.mintchain.io/" }
  }
} as const satisfies Chain;
