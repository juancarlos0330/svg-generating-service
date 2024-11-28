import { Chain } from "@rainbow-me/rainbowkit";
export const neox = {
  id: 12227331,
  name: "NEOX Chain",
  iconBackground: "#fff",
  nativeCurrency: { name: "Neox", symbol: "GAS", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://neoxseed1.ngd.network"] }
  },
  blockExplorers: {
    default: { name: "Neox", url: "https://xt3scan.ngd.network" }
  }
} as const satisfies Chain;
