import { useAccount } from "wagmi";
export const useGetChainName = () => {
  const { chainId } = useAccount();
  if (chainId) {
    if (chainId === 185) {
      return "NFT";
    }
    if (chainId === 80085) {
      return "HONEY";
    }
    if (chainId === 1637450) {
      return "XTERIO";
    }
    if (chainId === 56) {
      return "CZ";
    }
    if (chainId === 196) {
      return "XLAYER";
    }
    if (chainId === 9789) {
      return "TABI";
    }
    if (chainId === 167009) {
      return "TAIKO";
    }
    if (chainId === 534352) {
      return "SCROLL";
    }
    if (chainId === 997) {
      return "FIVE";
    }
    if (chainId === 302) {
      return "CANDY";
    }
    if (chainId === 10242) {
      return "ARTHERA";
    }
    if (chainId === 2810) {
      return "MORPH";
    }
    if (chainId === 12227331) {
      return "NEOX";
    }
  } else {
    return "NFT";
  }
};
