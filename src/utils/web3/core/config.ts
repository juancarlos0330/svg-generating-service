import { http, createConfig } from "@wagmi/core";
import { mintSepoliaTestnet } from "wagmi/chains";

export const config = createConfig({
  chains: [mintSepoliaTestnet],
  transports: {
    [mintSepoliaTestnet.id]: http()
  }
});
