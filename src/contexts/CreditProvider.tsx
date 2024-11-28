import type { PropsWithChildren } from "react";
import { createContext, useContext, useMemo, useState } from "react";
import { useCreditsLookup } from "@/utils/web3/hooks/useCreditsLookup";

export const CreditContext = createContext({
  creditValue: 0,
  setCreditValue: (value: number) => {
    value;
  }
});

export function CreditProvider({ children }: PropsWithChildren) {
  const { userCredits } = useCreditsLookup();
  const [creditValue, setCreditValue] = useState<number>(Number(userCredits));

  const data = useMemo(
    () => ({
      creditValue,
      setCreditValue
    }),
    [creditValue]
  );

  return <CreditContext.Provider value={{ ...data }}>{children}</CreditContext.Provider>;
}

export const useCredit = () => {
  return useContext(CreditContext);
};

export default CreditProvider;
