import type { PropsWithChildren } from "react";
import { createContext, useContext, useMemo, useState } from "react";

export const ConnectContext = createContext({
  isConnect: false,
  setConnect: (value: boolean) => {
    value;
  }
});

export function ConnectProvider({ children }: PropsWithChildren) {
  const [isConnect, setConnect] = useState(false);

  const connect = useMemo(
    () => ({
      isConnect,
      setConnect
    }),
    [isConnect]
  );

  return <ConnectContext.Provider value={{ ...connect }}>{children}</ConnectContext.Provider>;
}

export const useConnect = () => {
  return useContext(ConnectContext);
};

export default ConnectProvider;
