import React, { useState } from "react";
import { Flex, GradientText } from "@/components";
import CountSection from "./Count";
import CheckoutSection from "./Checkout";
import ContentSection from "./Content";
import { CheckoutModal } from "@/components/Modal";

import NotFound from "@/components/NotFound";
import { useContextLocalStorage } from "@/contexts";

const CartView: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { localstorage } = useContextLocalStorage();

  return (
    <Flex direction="flex-col" align="items-center" className="pt-[200px]">
      {JSON.parse(localstorage).length === 0 ? (
        <NotFound label="Your cart is empty" />
      ) : (
        <>
          <div className="uppercase text-[60px] font-500 text-center small:text-[36px]">
            <GradientText>Your Cart</GradientText>
          </div>
          <Flex direction="flex-row" justifyContent="justify-between" className="space-x-[30px] pt-[100px] w-full">
            <Flex direction="flex-col" className="flex-1 space-y-[30px] desktop:w-full">
              <CountSection />
              <ContentSection />
              <Flex justifyContent="justify-end" className="hidden desktop:flex">
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-primary text-[18px] font-600 p-2 rounded-xl w-[180px] text-black"
                >
                  Confirm
                </button>
              </Flex>
            </Flex>
            <div className="w-[425px] desktop:hidden">
              <CheckoutSection />
            </div>
          </Flex>
        </>
      )}

      <CheckoutModal setShowModal={setShowModal} showModal={showModal} />
    </Flex>
  );
};

export default CartView;
