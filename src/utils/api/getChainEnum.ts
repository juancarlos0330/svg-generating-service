import { Chain } from "@prisma/client";

export default function getChainEnum(chainName: string) {
  let chain;
  switch (chainName) {
    case "ZETA":
      chain = Chain.ZETA;
      break;
    case "BERA":
      chain = Chain.BERA;
      break;
    case "X1":
      chain = Chain.X1;
      break;
    case "OPBNB":
      chain = Chain.OPBNB;
      break;
    case "BASE":
      chain = Chain.BASE;
      break;
    case "POLY":
      chain = Chain.POLY;
      break;
    case "MINT":
      chain = Chain.MINT;
      break;
    case "HONEY":
      chain = Chain.HONEY;
      break;
    case "XTERIO":
      chain = Chain.XTERIO;
      break;
    case "CZ":
      chain = Chain.CZ;
      break;
    case "XLAYER":
      chain = Chain.XLAYER;
      break;
    case "NFT":
      chain = Chain.NFT;
      break;
    case "TABI":
      chain = Chain.TABI;
      break;
    case "TAIKO":
      chain = Chain.TAIKO;
      break;
    case "FIVE":
      chain = Chain.FIVE;
      break;
    case "SCROLL":
      chain = Chain.SCROLL;
      break;
    case "CANDY":
      chain = Chain.CANDY;
      break;
    case "ARTHERA":
      chain = Chain.ARTHERA;
      break;
    case "MORPH":
      chain = Chain.MORPH;
      break;
    case "NEOX":
      chain = Chain.NEOX;
      break;
    default:
      throw new Error("Invalid Chain / getChainEnum: Chain not found.");
  }
  return chain;
}
