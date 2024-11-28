import { createPublicClient, http } from "viem";
import { mintMainnet } from "@/utils/web3/chains/mintMainnet";

export const publicClient = createPublicClient({
  chain: mintMainnet,
  transport: http()
});
