import { Chain } from "@rainbow-me/rainbowkit";
export const zkCandy = {
  id: 302,
  name: "ZkCandy Testnet",
  iconBackground: "#000",
  nativeCurrency: { name: "SepETH", symbol: "SepETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://sepolia.rpc.zkcandy.io"] }
  },
  blockExplorers: {
    default: { name: "zkCandy", url: "https://sepolia.explorer.zkcandy.io" }
  }
} as const satisfies Chain;
