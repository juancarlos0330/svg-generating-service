import type { PropsWithChildren } from "react";
import { createContext, useContext, useMemo, useState } from "react";

export const StorageContext = createContext({
  localstorage: "[]",
  setLocalStorage: (value: any) => {
    value;
  }
});

export function StorageProvider({ children }: PropsWithChildren) {
  const [localstorage, setLocalStorage] = useState("[]");

  const data = useMemo(
    () => ({
      localstorage,
      setLocalStorage
    }),
    [localstorage, setLocalStorage]
  );

  return <StorageContext.Provider value={data}>{children}</StorageContext.Provider>;
}

export const useContextLocalStorage = () => {
  return useContext(StorageContext);
};

export default StorageProvider;
