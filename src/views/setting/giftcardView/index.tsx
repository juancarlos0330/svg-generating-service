import { GradientText } from "@/components";
import { GiftCard } from "@/components/Card";
import { GALLERY_ITEMS } from "@/utils/constants";
import { useGiftCardLookup } from "@/utils/web3/hooks/useGiftCardLookup";
import React, { useEffect, useState } from "react";
import { MainnetChains } from "@/utils/web3/misc/MainnetChains";
import { useAccount } from "wagmi";

const GiftCardView: React.FC = () => {
  const { chainId } = useAccount();
  const [valueDecimals, setValueDecimals] = useState<number>(1e12);
  const { userGiftCards } = useGiftCardLookup();
  const GIFT_CARDS = userGiftCards.map(({ giftCardId, credits }) => {
    return {
      giftCardId,
      credits,
      src: "https://ek65wlrwd0szvdez.public.blob.vercel-storage.com/assets/GIft_Card-KyqZtduZi1fiQIkxnCnAIwlXSoqW7Y.jpg"
    };
  });

  useEffect(() => {
    if (MainnetChains.includes(chainId as number)) {
      setValueDecimals(1e18);
    }
  }, [chainId]);

  return (
    <div className="w-full">
      <div className="uppercase text-[36px] font-500 font-space_grotesk border-b-2 border-primary/30 pb-3 small:text-center">
        <GradientText>gift cards</GradientText>
      </div>
      {GALLERY_ITEMS.length === 0 && (
        <p className="border border-main-200 mt-5 rounded-lg inline-flex justify-center items-center w-full py-[100px] text-[30px] text-main-200 font-700 text-center desktop:text-[22px] font-space_grotesk">
          {"You don't have gift cards"}
        </p>
      )}
      <div className="pt-5 grid grid-cols-4 desktop:grid-cols-3 tablet:grid-cols-2 small:grid-cols-1 gap-4 w-full place-items-center ">
        {(GIFT_CARDS as any[]).map((item, index) => (
          <GiftCard
            src={item.src}
            name={`Credits: ${Math.floor(Number(item.credits) / valueDecimals)}`}
            count={item.giftCardId}
            key={`profile-gallery-${index}`}
          />
        ))}
      </div>
    </div>
  );
};

export default GiftCardView;
