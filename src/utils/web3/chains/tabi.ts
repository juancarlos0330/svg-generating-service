import { Chain } from "@rainbow-me/rainbowkit";
export const tabi = {
  id: 9789,
  name: "Tabi Testnet",
  iconBackground: "#000",
  nativeCurrency: { name: "Tabi", symbol: "TABI", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.testnet.tabichain.com"] }
  },
  blockExplorers: {
    default: { name: "Tabi", url: "https://testnet.tabiscan.com/" }
  }
} as const satisfies Chain;
