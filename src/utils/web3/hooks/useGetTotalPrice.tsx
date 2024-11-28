import { useReadContracts, useAccount } from "wagmi";
import { polyAbi } from "../polyAbi";
import { mnetAbi } from "../mnetAbi";
import { newAbiChainIds } from "../misc/newAbiChainIds";
import { useContractAddressByChain } from "./useContractAddressByChain";

export const useGetTotalPrice = (cartItems: string[]) => {
  const { chainId } = useAccount();
  const abi = newAbiChainIds.includes(chainId as number) ? mnetAbi : polyAbi;
  const { registryAddress } = useContractAddressByChain();

  const contractCallRegister: any = cartItems.map((item) => ({
    abi: abi,
    address: registryAddress as `0x${string}`,
    functionName: "priceToRegister",
    args: [item.length]
  }));
  const { data: cartItemsPriceRegister } = useReadContracts({
    contracts: contractCallRegister
  });

  const contractCallRenew: any = cartItems.map((item) => ({
    abi: abi,
    address: registryAddress as `0x${string}`,
    functionName: "priceToRenew",
    args: [item.length]
  }));
  const { data: cartItemsPriceRenew } = useReadContracts({
    contracts: contractCallRenew
  });

  if (cartItemsPriceRegister && cartItemsPriceRenew) {
    const cartItemsPrice = cartItems.map((item, index) => ({
      name: item,
      priceToRegister: cartItemsPriceRegister[index].result,
      priceToRenew: cartItemsPriceRenew[index].result
    }));

    return { cartItemsPrice };
  }
};
