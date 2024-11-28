import React, { useEffect, useState } from "react";
import { Flex, Image } from "..";
import { FAVORITE_ITEMS } from "@/utils/constants";
import clsx from "clsx";

import { IoMdCloseCircle } from "react-icons/io";
import { useRouter } from "next/router";
import { useContextLocalStorage } from "@/contexts";
import { useDomainDetails } from "@/utils/web3/hooks/useDomainDetails";
import { usePriceToRegister } from "@/utils/web3/hooks/usePriceToRegister";
import { useGetDomainTLD } from "@/utils/web3/hooks/useGetDomainTLD";

const AddCartModal = ({
  domain,
  showModal,
  setShowModal
}: {
  domain: string;
  showModal: boolean;
  setShowModal: any;
}) => {
  const router = useRouter();
  const { setLocalStorage, localstorage } = useContextLocalStorage();
  const [domainStatus, setDomainStatus] = useState<boolean>(false);
  const { domainData } = useDomainDetails(domain || "");
  const { priceInEther } = usePriceToRegister(domain.length);
  const TLD = useGetDomainTLD();

  useEffect(() => {
    if ((domainData as { domainName: string })?.domainName === "") {
      setDomainStatus(true);
    } else {
      setDomainStatus(false);
    }
  }, [domain, domainData]);

  const onHandleClose = () => {
    setShowModal(false);
  };

  const onCheckFromStroage = () => {
    let saveItems = JSON.parse(localstorage);
    const itemsWithName = saveItems.filter((item: any) => item.name === domain);
    if (itemsWithName.length !== 0) {
      return true;
    } else {
      return false;
    }
  };

  const onClickButton = () => {
    if (domainStatus) {
      let saveItems = JSON.parse(localstorage);
      let newItem = { name: domain, year: 1, price: priceInEther };
      saveItems.push(newItem);
      setLocalStorage(JSON.stringify(saveItems));
      localStorage.setItem("domains", JSON.stringify(saveItems));
    } else {
      router.push({
        pathname: `/profile/[domain]`,
        query: { domain: domain, editmode: false, owner: false }
      });
    }
  };

  const onDeleteCart = (name: string) => {
    let savedItems = JSON.parse(localstorage);
    let filterItem = savedItems.filter((item: any) => item.name !== name);
    setLocalStorage(JSON.stringify(filterItem));
    localStorage.setItem("domains", JSON.stringify(filterItem));
  };

  return (
    <div
      className={`border fixed h-full w-full transition-all duration-300 z-[500] left-0 top-0 bg-black/60 flex justify-center items-center ${showModal ? "visible opacity-100 backdrop-blur-2xl" : "invisible opacity-0"}`}
    >
      <div className="absolute bg-main-100 p-8 rounded-xl w-[450px] small:w-[80%]">
        <IoMdCloseCircle
          onClick={onHandleClose}
          className="absolute w-[30px] h-[30px] -right-7 -top-7 cursor-pointer"
        />

        <Flex direction="flex-col" justifyContent="justify-between" align="items-center" className="space-y-10">
          <Image
            src={FAVORITE_ITEMS[1].src}
            alt={"logo"}
            fill
            className="w-[160px] h-[160px] small:w-14 small:h-14 shrink-0 rounded-full"
          />
          <div className="text-[38px] small:text-[26px] font-500 truncate w-full text-center inline bg-primary_gradient_text bg-clip-text text-transparent">
            {`${domain}.${TLD}`}
          </div>
          <Flex direction="flex-col" className="w-full space-y-3">
            <Flex justifyContent="justify-between" align="items-center">
              <p className="text-[20px]  small:text-[16px] text-main-400">Token id</p>
              <p className="text-[20px]  small:text-[16px] font-500">{10}</p>
            </Flex>
            <Flex justifyContent="justify-between" align="items-center">
              <p className="text-[20px]  small:text-[16px] text-main-400">Status</p>
              <p
                className={clsx(
                  domainStatus ? "text-verified" : "text-error",
                  "font-500 text-[20px]  small:text-[16px] uppercase"
                )}
              >
                {domainStatus ? "Available" : "Not Available"}
              </p>
            </Flex>
          </Flex>

          {onCheckFromStroage() ? (
            <button
              onClick={() => onDeleteCart(domain)}
              className={"w-full bg-success text-black rounded-3xl p-2 text-[20px] small:text-[16px] font-400"}
            >
              {"Added"}
            </button>
          ) : (
            <button
              onClick={onClickButton}
              className="w-full bg-primary text-black rounded-3xl p-2 text-[20px] small:text-[16px] font-400"
            >
              {domainStatus ? "Add To Cart" : "Profile"}
            </button>
          )}
        </Flex>
      </div>
    </div>
  );
};

export default AddCartModal;
