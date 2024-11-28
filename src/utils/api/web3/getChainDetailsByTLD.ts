import { Chain } from "viem";
import { xterio } from "@/utils/web3/chains/xterio";
import { mintMainnet } from "@/utils/web3/chains/mintMainnet";
import { tabi } from "@/utils/web3/chains/tabi";
import { xLayer } from "@/utils/web3/chains/xLayer";
import { taikoHekla } from "@/utils/web3/chains/taikoHekla";
import { berachainTestnet, bsc, polygon } from "wagmi/chains";
import { scrollMainnet } from "@/utils/web3/chains/scroll";

export const getChainDetailsByTLD = (tld: string) => {
  let registryAddress: string | undefined;
  let chain: Chain | undefined;
  switch (tld) {
    case "nft":
      registryAddress = process.env.NEXT_PUBLIC_REGISTRY_ADDRESS_MINT;
      chain = mintMainnet;
      break;
    case "xterio":
      registryAddress = process.env.NEXT_PUBLIC_REGISTRY_ADDRESS_XTERIO;
      chain = xterio;
      break;
    case "honey":
      registryAddress = process.env.NEXT_PUBLIC_REGISTRY_ADDRESS_BERACHAIN_ARTIO;
      chain = berachainTestnet;
      break;
    case "poly":
      registryAddress = process.env.NEXT_PUBLIC_REGISTRY_ADDRESS_POLYGON;
      chain = polygon;
      break;
    case "cz":
      registryAddress = process.env.NEXT_PUBLIC_REGISTRY_ADDRESS_BSC;
      chain = bsc;
      break;
    case "xlayer":
      registryAddress = process.env.NEXT_PUBLIC_REGISTRY_ADDRESS_XLAYER;
      chain = xLayer;
      break;
    case "tabi":
      registryAddress = process.env.NEXT_PUBLIC_REGISTRY_ADDRESS_TABI;
      chain = tabi;
      break;
    case "taiko":
      registryAddress = process.env.NEXT_PUBLIC_REGISTRY_ADDRESS_TAIKO_HEKLA;
      chain = taikoHekla;
      break;
    case "scroll":
      registryAddress = process.env.NEXT_PUBLIC_REGISTRY_ADDRESS_SCROLL;
      chain = scrollMainnet;
      break;
    default:
      return { registryAddress, chain };
  }
  return { registryAddress, chain };
};
