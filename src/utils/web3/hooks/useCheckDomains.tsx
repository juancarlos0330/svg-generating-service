import { useReadContracts } from "wagmi";
import { polyAbi } from "../polyAbi";
import { useContractAddressByChain } from "./useContractAddressByChain";
import { mnetAbi } from "../mnetAbi";
import { useAccount } from "wagmi";
import { newAbiChainIds } from "../misc/newAbiChainIds";

export const useCheckDomains = (checkoutDomains: string[]) => {
  const { chainId } = useAccount();
  const abi = newAbiChainIds.includes(chainId as number) ? mnetAbi : polyAbi;
  const { registryAddress } = useContractAddressByChain();

  //Domain Lookup
  const contractCallConfigs: any = checkoutDomains?.map(
    (domainName: string) =>
      ({
        abi: abi,
        address: registryAddress as `0x${string}`,
        functionName: "registryLookupByName",
        args: [domainName]
      }) as const
  );
  const { data: domainInfo }: any = useReadContracts({ contracts: contractCallConfigs });
  const domainList = (domainInfo ?? [])
    .map((item: any) => item.result)
    .filter((result: any) => result.domainName !== "");

  return { domainList };
};
