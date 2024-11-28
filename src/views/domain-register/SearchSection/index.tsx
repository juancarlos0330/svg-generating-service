import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Flex } from "@/components";
import { FollowerItem } from "@/components/Item/FollowerItem";
import { useContextLocalStorage } from "@/contexts";
import { MdOutlineSearch } from "react-icons/md";
// import { FAVORITE_ITEMS } from "@/utils/constants";
// import toast from "react-hot-toast"; 
// import { formatPrice } from "@/utils/func";
// import { useAccount } from "wagmi";
// import { fetchPriceToRegister } from "@/utils/web3/core/fetchPriceToRegister";
// import { usePriceToRegister } from "@/utils/web3/hooks/usePriceToRegister";

const SearchSection: React.FC<{ search: string }> = ({ search }) => {
  const router = useRouter();
  // const { isConnected } = useAccount();
  // const [priceToDisplay, setPriceToDisplay] = useState<string>("0");
  // const [symbolToDisplay, setSymbolToDisplay] = useState<string>("");

  const { localstorage } = useContextLocalStorage();
  // const { priceInEther, symbol } = usePriceToRegister(search.length);

  // useEffect(() => {
  //   if (isConnected) {
  //     setPriceToDisplay(priceInEther as string);
  //     setSymbolToDisplay(symbol as string);
  //   } else {
  //     const fetchRegistrationDetails = async () => {
  //       const { NWC_priceInEther, symbol } = await fetchPriceToRegister(search.length);
  //       setPriceToDisplay(NWC_priceInEther);
  //       setSymbolToDisplay(symbol);
  //     };
  //     if (search.length > 0) fetchRegistrationDetails();
  //   }
  // }, [isConnected, priceInEther, symbol, search]);

  const OnContinueToCart = () => {
    router.push("/cart");
  };

  return (
    <div className="w-full">
      {search != "" && search != null ? (
        <p className="text-[20px] font-400">
          {`Search Results For`}
          <span className="text-primary">{` ${search}`}</span>
        </p>
      ) : (
        ""
      )}
      <Flex className="space-x-[30px] pt-[30px] tablet_md:flex-col tablet_md:space-x-0 tablet_md:space-y-[30px]">
        <Flex direction="flex-col" className="flex-1 space-y-[24px]">
          {search != "" && search != null ? (
            <FollowerItem
              src="/img/zns-logo.png"
              name={search}
              count={23}
              // price={priceToDisplay + " " + symbolToDisplay}
              index={1}
            />
          ) : (
            <div className="inline-flex items-center justify-center uppercase rounded-xl text-main-300 text-[45px] small:text-[30px] border border-dotted border-main-300 h-full p-5">
              <MdOutlineSearch className="w-[100px] h-[100px] small:w-[50px] small:h-[50px]" />
              <span className="pl-10">No Result</span>
            </div>
          )}
        </Flex>
        <div className="w-[333px] tablet_md:w-full">
          <Flex direction="flex-col" className="space-y-3 border border-main-300  rounded-xl px-[28px] py-[30px]">
            <p className="text-[24px] font-600">
              Your <span className="text-primary">Cart : {JSON.parse(localstorage).length || 0}</span>
            </p>
            <p className="text-[16px] font-400">
              {"The ultimate price will be computed at checkout, factoring in potential discounts and credits."}
            </p>
            <div className="pt-[10px]">
              <button
                onClick={OnContinueToCart}
                className="bg-primary text-[14px] text-black px-[33px] py-3 rounded-3xl font-500"
              >
                {"Continue To Cart"}
              </button>
            </div>
          </Flex>
        </div>
      </Flex>
    </div>
  );
};

export default SearchSection;
