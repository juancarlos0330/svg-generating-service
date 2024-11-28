import { useReadContracts } from "wagmi";
import { polyAbi } from "../polyAbi";
import { useContractAddressByChain } from "./useContractAddressByChain";
import { useUserLookup } from "@/utils/web3/hooks/useUserLookup";
import { useAccount } from "wagmi";
import { mnetAbi } from "../mnetAbi";
import { newAbiChainIds } from "../misc/newAbiChainIds";

export const useDomainLookup = () => {
  const { chainId } = useAccount();
  const abi = newAbiChainIds.includes(chainId as number) ? mnetAbi : polyAbi;
  const { userDomains } = useUserLookup();
  const { registryAddress } = useContractAddressByChain();

  const allOwnedDomains = (userDomains as { allOwnedDomains: Array<bigint> })?.allOwnedDomains;

  //Domain Lookup
  const contractCallConfigs: any = allOwnedDomains?.map(
    (domainId) =>
      ({
        abi: abi,
        address: registryAddress as `0x${string}`,
        functionName: "registryLookupById",
        args: [domainId]
      }) as const
  );
  const { data: domainInfo }: any = useReadContracts({ contracts: contractCallConfigs });
  const domainList = domainInfo?.map((item: any) => item.result) ?? [];

  //Domain URI Lookup
  const contractCallUris: any = allOwnedDomains?.map(
    (domainId) =>
      ({
        abi: abi,
        address: registryAddress as `0x${string}`,
        functionName: "tokenURI",
        args: [domainId]
      }) as const
  );

  const { data: domainUris }: any = useReadContracts({ contracts: contractCallUris });
  const domainUrisList = domainUris?.map((item: any) => item.result) ?? [];

  const checkPrimary = (tokenId: number) => {
    if (tokenId === Number((userDomains as { primaryDomain: bigint })?.primaryDomain)) {
      return true;
    }
    return false;
  };

  const updatedDomainList = domainList.map((item: any, index: number) => ({
    ...item,
    uri: domainUrisList[index],
    tokenId: Number(allOwnedDomains[index]),
    isPrimary: checkPrimary(Number(allOwnedDomains[index]))
  }));

  return domainUrisList.length > 0 ? { updatedDomainList } : { updatedDomainList: [] };
};
