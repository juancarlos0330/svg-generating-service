import { Chain } from "@rainbow-me/rainbowkit";
export const morphHolesky = {
  id: 2810,
  name: "Morph Holesky",
  iconBackground: "#fff",
  nativeCurrency: { name: "Morph", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc-holesky.morphl2.io"] }
  },
  blockExplorers: {
    default: { name: "Morph", url: "https://explorer-holesky.morphl2.io/" }
  }
} as const satisfies Chain;
