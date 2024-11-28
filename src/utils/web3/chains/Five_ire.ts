import { Chain } from "@rainbow-me/rainbowkit";
export const Five_ire = {
  id: 997,
  name: "5ire Testnet",
  iconBackground: "#000",
  nativeCurrency: { name: "5ire", symbol: "5ire", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc-testnet.5ire.network"] }
  },
  blockExplorers: {
    default: { name: "5ire", url: "https://explorer.5ire.network/" }
  }
} as const satisfies Chain;
