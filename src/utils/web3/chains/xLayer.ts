import { Chain } from "@rainbow-me/rainbowkit";
export const xLayer = {
  id: 196,
  name: "X Layer",
  iconBackground: "#fff",
  nativeCurrency: { name: "xLayer", symbol: "OKB", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.xlayer.tech/"] }
  },
  blockExplorers: {
    default: { name: "xLayer", url: "https://www.oklink.com/xlayer" }
  }
} as const satisfies Chain;
