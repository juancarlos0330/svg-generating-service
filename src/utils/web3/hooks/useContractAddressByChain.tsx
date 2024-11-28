import { useAccount } from "wagmi";
export const useContractAddressByChain = () => {
  const { chain } = useAccount();
  const chainID = chain?.id;
  let registryAddress: string | undefined;
  let giftCardAddress: string | undefined;
  switch (chainID) {
    case 185:
      registryAddress = process.env.NEXT_PUBLIC_REGISTRY_ADDRESS_MINT;
      giftCardAddress = process.env.NEXT_PUBLIC_GIFTCARD_ADDRESS_MINT;
      break;
    case 1637450:
      registryAddress = process.env.NEXT_PUBLIC_REGISTRY_ADDRESS_XTERIO;
      giftCardAddress = process.env.NEXT_PUBLIC_GIFTCARD_ADDRESS_XTERIO;
      break;
    case 80085:
      registryAddress = process.env.NEXT_PUBLIC_REGISTRY_ADDRESS_BERACHAIN_ARTIO;
      giftCardAddress = process.env.NEXT_PUBLIC_GIFTCARD_ADDRESS_BERACHAIN_ARTIO;
      break;
    case 137:
      registryAddress = process.env.NEXT_PUBLIC_REGISTRY_ADDRESS_POLYGON;
      giftCardAddress = process.env.NEXT_PUBLIC_GIFTCARD_ADDRESS_POLYGON;
      break;
    case 56:
      registryAddress = process.env.NEXT_PUBLIC_REGISTRY_ADDRESS_BSC;
      giftCardAddress = process.env.NEXT_PUBLIC_GIFTCARD_ADDRESS_BSC;
      break;
    case 196:
      registryAddress = process.env.NEXT_PUBLIC_REGISTRY_ADDRESS_XLAYER;
      giftCardAddress = process.env.NEXT_PUBLIC_GIFTCARD_ADDRESS_XLAYER;
      break;
    case 9789:
      registryAddress = process.env.NEXT_PUBLIC_REGISTRY_ADDRESS_TABI;
      giftCardAddress = process.env.NEXT_PUBLIC_GIFTCARD_ADDRESS_TABI;
      break;
    case 167009:
      registryAddress = process.env.NEXT_PUBLIC_REGISTRY_ADDRESS_TAIKO_HEKLA;
      giftCardAddress = process.env.NEXT_PUBLIC_GIFTCARD_ADDRESS_TAIKO_HEKLA;
      break;
    case 534352:
      registryAddress = process.env.NEXT_PUBLIC_REGISTRY_ADDRESS_SCROLL;
      giftCardAddress = process.env.NEXT_PUBLIC_GIFTCARD_ADDRESS_SCROLL;
      break;
    case 997:
      registryAddress = process.env.NEXT_PUBLIC_REGISTRY_ADDRESS_5IRE;
      giftCardAddress = process.env.NEXT_PUBLIC_GIFTCARD_ADDRESS_5IRE;
      break;
    case 302:
      registryAddress = process.env.NEXT_PUBLIC_REGISTRY_ADDRESS_ZKCANDY;
      giftCardAddress = process.env.NEXT_PUBLIC_GIFTCARD_ADDRESS_ZKCANDY;
      break;
    case 10242:
      registryAddress = process.env.NEXT_PUBLIC_REGISTRY_ADDRESS_ARTHERA;
      giftCardAddress = process.env.NEXT_PUBLIC_GIFTCARD_ADDRESS_ARTHERA;
      break;
    case 2810:
      registryAddress = process.env.NEXT_PUBLIC_REGISTRY_ADDRESS_MORPH_HOLESKY;
      giftCardAddress = process.env.NEXT_PUBLIC_GIFTCARD_ADDRESS_MORPH_HOLESKY;
      break;
    case 12227331:
      registryAddress = process.env.NEXT_PUBLIC_REGISTRY_ADDRESS_NEOX;
      giftCardAddress = process.env.NEXT_PUBLIC_GIFTCARD_ADDRESS_NEOX;
      break;
    default:
      // console.("Chain not supported");
      break;
  }
  return { registryAddress, giftCardAddress };
};
