import { Chain } from "@rainbow-me/rainbowkit";
export const taikoHekla = {
  id: 167009,
  name: "Taiko Hekla",
  iconBackground: "#fff",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.hekla.taiko.xyz"] }
  },
  blockExplorers: {
    default: { name: "Taiko Hekla", url: "https://hekla.taikoscan.network/" }
  }
} as const satisfies Chain;
