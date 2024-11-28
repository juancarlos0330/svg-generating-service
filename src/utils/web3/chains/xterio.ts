import { Chain } from "@rainbow-me/rainbowkit";
export const xterio = {
  id: 1637450,
  name: "Xterio Testnet",
  iconBackground: "#fff",
  nativeCurrency: { name: "Xterio", symbol: "tBNB", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://xterio-testnet.alt.technology"] }
  },
  blockExplorers: {
    default: { name: "Xterio", url: "https://xterio-testnet-explorer.alt.technology/" }
  }
} as const satisfies Chain;
