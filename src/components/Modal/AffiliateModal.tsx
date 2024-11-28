import React, { useEffect, useState } from "react";
import { Flex, Image } from "..";
import { AFFILIATE_ITEMS, AFFILIATE_ITEM_YOU } from "@/utils/constants";

import { IoMdCloseCircle } from "react-icons/io";
import { useGetDomainTLD } from "@/utils/web3/hooks/useGetDomainTLD";

const AffiliateModal = ({
  selected,
  showModal,
  isYou,
  setShowModal
}: {
  selected: number;
  showModal: boolean;
  isYou: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [item, setItem] = useState<any>(null);
  const TLD = useGetDomainTLD();

  useEffect(() => {
    if (isYou) {
      setItem(AFFILIATE_ITEM_YOU[selected]);
    } else {
      setItem(AFFILIATE_ITEMS[selected]);
    }
  }, [selected, isYou]);

  const onHandleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      {item != null && (
        <div
          className={`fixed h-full w-full transition-all duration-300 z-[500] left-0 top-0 bg-black/60 flex justify-center items-center ${showModal ? "visible opacity-100 backdrop-blur-2xl" : "invisible opacity-0"}`}
        >
          <div className="absolute bg-main-100 p-8 rounded-xl w-[450px] small:w-[80%]">
            <IoMdCloseCircle
              onClick={onHandleClose}
              className="absolute w-[30px] h-[30px] -right-7 -top-7 cursor-pointer"
            />
            <Flex direction="flex-col" justifyContent="justify-between" align="items-center" className="space-y-5">
              <Image src={item.src} alt={"logo"} fill className="w-[150px] h-[150px] shrink-0 rounded-full" />
              <div className="text-center">
                <div className="break-all text-[38px] small:text-[26px] font-500 w-full text-center inline bg-primary_gradient_text bg-clip-text text-transparent">
                  {item.domain}.{TLD}
                </div>
              </div>
              <Flex direction="flex-col" className="w-full space-y-3">
                <Flex justifyContent="justify-between" align="items-center">
                  <p className="text-[20px]  small:text-[16px] text-main-400">Position</p>
                  <p className="text-[20px]  small:text-[16px] font-500 text-success">
                    {isYou ? item.ranking : selected + 1}
                  </p>
                </Flex>
                <Flex justifyContent="justify-between" align="items-center">
                  <p className="text-[20px]  small:text-[16px] text-main-400">Refferals</p>
                  <p className="text-[20px]  small:text-[16px] font-500 text-success">{item.refferals}</p>
                </Flex>
                <Flex justifyContent="justify-between" align="items-center">
                  <p className="text-[20px]  small:text-[16px] text-main-400">Total Earning</p>
                  <p className="text-[20px]  small:text-[16px] font-500">{item.earning} USDT</p>
                </Flex>
              </Flex>
              <button
                onClick={onHandleClose}
                className="w-full bg-primary text-black rounded-3xl p-2 text-[20px] small:text-[16px] font-400"
              >
                Close
              </button>
            </Flex>
          </div>
        </div>
      )}
    </>
  );
};

export default AffiliateModal;
