import { Chain } from "@rainbow-me/rainbowkit";
export const scrollMainnet = {
  id: 534352,
  name: "Scroll Mainnet",
  iconBackground: "#FFDBB0",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://scroll.blockpi.network/v1/rpc/public"] }
  },
  blockExplorers: {
    default: { name: "Scroll", url: "https://scrollscan.com/" }
  }
} as const satisfies Chain;
