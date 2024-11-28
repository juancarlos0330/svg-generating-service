import React, { useEffect, useState } from "react";
import { Flex } from "@/components";
import { useContextLocalStorage } from "@/contexts";

const CountSection: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const { localstorage } = useContextLocalStorage();

  useEffect(() => {
    setCount(JSON.parse(localstorage).length);
  }, [localstorage]);

  return (
    <Flex direction="flex-col" className="p-[30px] small:p-[24px] rounded-2xl bg-black/40 border border-main-200">
      <Flex align="items-center" justifyContent="justify-between">
        <p className="text-[24px] font-500">Your Cart</p>
        <p className="text-[24px] font-500 text-primary">{count} Items</p>
      </Flex>
      <p className="text-[13px] font-400 capitalize">
        {"Domain purchases entail a single payment and come with a 90% discount on renewal fees."}
      </p>
    </Flex>
  );
};

export default CountSection;
