import { Chain } from "@rainbow-me/rainbowkit";
export const arthera = {
  id: 10242,
  name: "Arthera Mainnet",
  iconBackground: "#fff",
  nativeCurrency: { name: "Arthera", symbol: "AA", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.arthera.net/"] }
  },
  blockExplorers: {
    default: { name: "Arthera", url: "https://explorer.arthera.net/" }
  }
} as const satisfies Chain;
