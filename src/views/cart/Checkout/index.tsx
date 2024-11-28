import React, { useRef, useCallback, useEffect, useState } from "react";
import { LuMinusCircle, LuPlusCircle } from "react-icons/lu";
import clsx from "clsx";
import axios from "axios";
import { Flex, Link } from "@/components";
import { ascii, formatPrice, gtEq, ltEq } from "@/utils/func";
import { useContextLocalStorage } from "@/contexts";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import TransactionLoading from "@/components/Loaders/TransactionLoading";
import { useAccount, useBalance, useWriteContract, useWaitForTransactionReceipt, useChainId } from "wagmi";
import { polyAbi } from "@/utils/web3/polyAbi";
import { mnetAbi } from "@/utils/web3/mnetAbi";
import { getTotalCartPrice } from "@/utils/web3/core/getTotalCartPrice";
import { useQueryClient } from "@tanstack/react-query";
import { useContractAddressByChain } from "@/utils/web3/hooks/useContractAddressByChain";
import { useGetDomainTLD } from "@/utils/web3/hooks/useGetDomainTLD";
import { useGetChainName } from "@/utils/web3/hooks/useGetChainName";
import { useCheckDomains } from "@/utils/web3/hooks/useCheckDomains";
import { useGetTotalPrice } from "@/utils/web3/hooks/useGetTotalPrice";
import { useCreditsLookup } from "@/utils/web3/hooks/useCreditsLookup";
import { useGetPriceInUSD } from "@/utils/web3/hooks/useGetPriceInUSD";
import useStore from "@/utils/web3/store";
import { newAbiChainIds } from "@/utils/web3/misc/newAbiChainIds";
import { MainnetChains } from "@/utils/web3/misc/MainnetChains";
import { parseEther } from "viem";
import { readContract } from "viem/actions";
import { publicClient } from "@/utils/web3/core/client";

const CheckoutSection = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { localstorage, setLocalStorage } = useContextLocalStorage();
  const [isCredit, setIsCredit] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<bigint>(BigInt(0));
  const [finalPrice, setFinalPrice] = useState<bigint>(BigInt(0));
  const [creditPrice, setCreditPrice] = useState<number>(0);
  const { userCredits, creditsQuery } = useCreditsLookup();
  const { registryAddress } = useContractAddressByChain();
  const { priceInUSD } = useGetPriceInUSD();
  const [MaxCount, setMaxCount] = useState<number>(0);
  const [valueDecimals, setValueDecimals] = useState<number>(1e12);
  const [domain, setDomain] = useState<Array<string>>([]);

  //web3
  const { referalState } = useStore();
  const [referalAddress, setReferalAddress] = useState<string>("0x0000000000000000000000000000000000000000");
  const { address, isConnected, chainId } = useAccount();
  const { data }: any = useBalance({ address: address });
  const symbol = data?.symbol;
  const [symbolToDisplay, setSymbolToDisplay] = useState<string>("");
  const { data: hash, isPending, error, isError, writeContract } = useWriteContract();
  const { isSuccess, isLoading } = useWaitForTransactionReceipt({
    hash: hash
  });

  const domainNamesRef = useRef<Array<string>>([]);
  const expiresRef = useRef<Array<number>>([]);
  const [userId, setUserId] = useState<string>("");
  const TLD = useGetDomainTLD();
  const chainName = useGetChainName();
  const { domainList } = useCheckDomains(domainNamesRef.current);

  const { cartItemsPrice } = useGetTotalPrice(domainNamesRef.current) ?? { cartItemsPrice: undefined };

  useEffect(() => {
    if (MainnetChains.includes(chainId as number)) {
      setValueDecimals(1e18);
    }
  }, [chainId]);

  useEffect(() => {
    if (referalState) {
      setReferalAddress(referalState);
    }
  }, [referalState]);

  useEffect(() => {
    if (isConnected) {
      if (symbol) {
        setSymbolToDisplay(symbol);
      }
    } else {
      setCreditPrice(0);
      setSymbolToDisplay("ETH");
    }
  }, [isConnected, symbol]);

  const getUserDetails = async (walletAddress: string, chainName: string) => {
    if (walletAddress != "" && chainName != "") {
      try {
        const userRequestBody = {
          walletAddress,
          chainName
        };

        const response = await fetch("/api/user/fetch/fetchUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(userRequestBody)
        });

        if (response.ok) {
          const data = await response.json();
          return data.data;
        } else {
          console.error("Failed to fetch user:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
  };

  const createDomain = async (domainNames: Array<string>, userID: string) => {
    if (domainNames.length > 0 && userID != "") {
      try {
        const domainRequestBody = {
          domainNames,
          userID
        };

        const response = await fetch("/api/domain/create/createDomain", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(domainRequestBody)
        });

        if (response.ok) {
          const data = await response.json();
          return data.data;
        } else {
          console.error("Failed to fetch domain:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching domain:", error);
      }
    }
  };

  useEffect(() => {
    if (isConnected) {
      const fetchUser = async () => {
        try {
          if (address && chainName) {
            const res = await getUserDetails(address, chainName);
            setUserId(res.user.id);
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
      fetchUser();
    }
  }, [isConnected, chainId]);

  useEffect(() => {
    const domainWithTLDs = domainNamesRef.current.map((domain) => `${domain}.${TLD}`);
    if (isSuccess) {
      const fetchDomain = async () => {
        try {
          await createDomain(domainWithTLDs, userId);
        } catch (error) {
          console.error("Error fetching domain:", error);
        }
      };
      fetchDomain();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      console.log("Error : ", error);

      domainList.forEach(({ domainName }: { domainName: string }) => {
        let savedItems = JSON.parse(localstorage);
        let filterItem = savedItems.filter((item: any) => item.name !== domainName);
        setLocalStorage(JSON.stringify(filterItem));
        localStorage.setItem("domains", JSON.stringify(filterItem));
      });

      domainList.forEach(({ domainName }: { domainName: string }) => {
        toast.error(`domain ${domainName} has already been taken.`);
      });
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({ queryKey: creditsQuery });
      toast.success("Successful");
      setLocalStorage(JSON.stringify([]));
      localStorage.removeItem("domains");
      router.push("/mydomain");
    }
  }, [isSuccess]);

  useEffect(() => {
    let savedItems = JSON.parse(localstorage);
    domainNamesRef.current = savedItems.map((item: any) => item.name);
    expiresRef.current = savedItems.map((item: any) => item.year);

    // const sumOfPrice = savedItems.reduce((sum: bigint, item: any) => {
    //   const price = parseEther(item.price) || BigInt(0);
    //   const renewPrice = parseEther(item.renewPrice ?? "0");
    //   const additionalYears = BigInt(Math.max(item.year - 1, 0));
    //   return sum + price + renewPrice * additionalYears;
    // }, BigInt(0));

    if (cartItemsPrice) {
      const totalCartPrice = cartItemsPrice.reduce((sum: bigint, item: any, index: number) => {
        const priceToRegister = BigInt(item.priceToRegister);
        const priceToRenew = BigInt(item.priceToRenew);
        const expiresValue = expiresRef.current[index];
        const additionalYears = BigInt(
          typeof expiresValue === "number"
            ? Math.max(expiresValue - 1, 0)
            : Number.isInteger(expiresValue)
              ? Math.max(Number(expiresValue) - 1, 0)
              : 0
        );
        return sum + priceToRegister + priceToRenew * additionalYears;
      }, BigInt(0));
      setTotalPrice(totalCartPrice);
    }
    if (!isConnected) {
      const fetchCartTotal = async () => {
        const NWC_cartItemsPrice = await getTotalCartPrice(domainNamesRef.current);
        const totalCartPrice = NWC_cartItemsPrice.reduce((sum: bigint, item: any, index: number) => {
          const priceToRegister = parseEther(item.priceToRegister);
          const priceToRenew = parseEther(item.priceToRenew);
          const expiresValue = expiresRef.current[index];
          const additionalYears = BigInt(
            typeof expiresValue === "number"
              ? Math.max(expiresValue - 1, 0)
              : Number.isInteger(expiresValue)
                ? Math.max(Number(expiresValue) - 1, 0)
                : 0
          );
          return sum + priceToRegister + priceToRenew * additionalYears;
        }, BigInt(0));
        setTotalPrice(totalCartPrice);
      };
      fetchCartTotal();
    }
  }, [localstorage, cartItemsPrice, isConnected]);

  const handleTransferCount = (type: boolean) => {
    if (type) {
      if (totalPrice > BigInt(creditPrice * valueDecimals * 1e18) / priceInUSD) {
        if (creditPrice < Math.floor(Number(userCredits) / valueDecimals)) {
          setCreditPrice(Math.floor(creditPrice + 1));
        }
      }
    } else {
      if (creditPrice > 0) {
        setCreditPrice(Math.floor(creditPrice - 1));
      }
    }
  };

  const useCheckTransferNumbers = useCallback(
    ({ target: { value: v } }: { target: { value: any } }) =>
      v && gtEq(ascii([...v].pop()), 48) && ltEq(ascii([...v].pop()), 57)
        ? setCreditPrice(v)
        : setCreditPrice(v.slice(0, -1)),
    [setCreditPrice]
  );

  const onSetMaxCredit = () => {
    if (!isConnected) {
      toast.error("Please connect your wallet");
      return;
    }
    if (userCredits) {
      setMaxCount(1);
      if (BigInt(Number(userCredits) * 1e18) / priceInUSD < totalPrice) {
        setCreditPrice(Math.floor(Number(userCredits) / valueDecimals));
      } else {
        setCreditPrice(Math.round(Number(totalPrice * priceInUSD) / (1e18 * valueDecimals)));
      }
    }
  };

  useEffect(() => {
    if (MaxCount === 1) onSetMaxCredit();
  }, [totalPrice]);

  useEffect(() => {
    if (isCredit) {
      const priceValue = BigInt(totalPrice - BigInt(creditPrice * valueDecimals * 1e18) / priceInUSD);
      setFinalPrice(priceValue > 0 ? priceValue : BigInt(0));
    } else {
      setFinalPrice(totalPrice > 0 ? totalPrice : BigInt(0));
    }
  }, [isCredit, handleTransferCount]);

  const onCheckOut = () => {
    const abi = newAbiChainIds.includes(chainId as number) ? mnetAbi : polyAbi;
    const arrAddress = newAbiChainIds.includes(chainId as number)
      ? Array(domainNamesRef.current.length).fill(address)
      : address;
    if (!isConnected) {
      toast.error("Please connect your wallet");
      return;
    }
    const CreditValue = BigInt(creditPrice * valueDecimals);
    if (data.value >= finalPrice) {
      setDomain(domainNamesRef.current);
      writeContract({
        abi: abi,
        address: registryAddress as `0x${string}`,
        functionName: "registerDomains",
        value: finalPrice,
        args: [arrAddress, domainNamesRef.current, expiresRef.current, referalAddress, CreditValue]
      });
    } else {
      toast.error("Not enough balance");
    }
  };

  useEffect(() => {
    (async () => {
      if (isSuccess) {
        for await (const domain of domainNamesRef.current) {
          try {
            const id = await publicClient.readContract({
              abi: mnetAbi,
              address: registryAddress as `0x${string}`,
              functionName: "getDomainPrice",
              args: [domain]
            });

            const data = { chain: chainId, id };
            const response = await axios.post(`https://api.znsconnect.io/v1/create-metadata`, data);

            console.log(response.data);
          } catch (error) {
            console.error(error);
          }
        }
      }
    })();
  }, [isSuccess]);

  return (
    <div>
      <Flex
        direction="flex-col"
        className="p-10 rounded-2xl bg-black/40 border border-main-200 space-y-[30px] small:p-5"
      >
        <p className="text-[24px] font-600">Order Summary</p>
        <Flex direction="flex-col" className="space-y-1">
          <Flex align="items-center" justifyContent="justify-between">
            <p className="text-[14px] font-400 capitalize">{"Total price"}</p>
            <p className="text-[20px] font-500 text-primary">{`${formatPrice(Number(totalPrice) / 1e18)} ${symbolToDisplay}`}</p>
          </Flex>
          <Flex align="items-center" justifyContent="justify-between">
            <p className="text-[14px] font-400 capitalize">{"Credit Discount"}</p>
            <p className="text-[20px] font-500 text-primary">{`${formatPrice(isCredit ? Number(BigInt(creditPrice * valueDecimals * 1e18) / priceInUSD) / 1e18 : 0)} ${symbolToDisplay}`}</p>
          </Flex>
          <Flex align="items-center" justifyContent="justify-between">
            <p className="text-[14px] font-400 capitalize">{"Subtotal"}</p>
            <p className="text-[20px] font-500 text-primary">
              {formatPrice(Number(finalPrice) / 1e18)} {symbolToDisplay}
            </p>
          </Flex>
        </Flex>
        <Flex className="space-x-[10px]" justifyContent="justify-between">
          <Flex className="space-x-5">
            <Flex className="space-x-3" align="items-center">
              <button onClick={() => handleTransferCount(false)}>
                <LuMinusCircle className="w-[22px] h-[22px]" />
              </button>
              <input
                placeholder="0"
                value={Math.floor(creditPrice)}
                onChange={useCheckTransferNumbers}
                className={clsx(
                  "placeholder:text-[14px] placeholder:text-center placeholder:text-white-500",
                  "w-[60px] p-3 h-full rounded-xl border border-main-300 outline-none bg-black/40 text-center"
                )}
              />
              <button onClick={() => handleTransferCount(true)}>
                <LuPlusCircle className="w-[22px] h-[22px]" />
              </button>
            </Flex>
          </Flex>
          <button onClick={onSetMaxCredit} className="text-primary">
            Max
          </button>
          <Flex align="items-center" justifyContent="justify-between" className="space-x-3">
            <input
              type="checkbox"
              checked={isCredit}
              onChange={() => setIsCredit(!isCredit)}
              disabled={!isConnected}
              className="appearance-none rounded-md h-5 w-5 bg-transparent
             focus:ring-0 focus:ring-offset-0 checked:bg-primary
             border-main-200 border-2"
            />
            <p className="text-[14px] font-400">{"Use your credit"}</p>
          </Flex>
        </Flex>

        {(isLoading && hash) || isPending ? (
          <div className="flex justify-center">
            <TransactionLoading size={40} color={"#CAFC01"} />
          </div>
        ) : (
          <button
            onClick={onCheckOut}
            className="bg-primary text-black text-[16px] font-500 p-3 rounded-xl flex justify-center"
          >
            {"Checkout"}
          </button>
        )}
      </Flex>
      <p className="text-[14px] font-400 text-center pt-[20px]">
        Need more credits ? Get them{" "}
        <Link href="/settings?tab=credits" className="text-verified cursor-pointer hover:text-verified/90">
          here
        </Link>
      </p>
      <Toaster />
    </div>
  );
};

export default CheckoutSection;
