import type { PropsWithChildren } from "react";
import { createContext, useContext, useMemo, useState } from "react";

export const FavoriteContext = createContext({
  favorite: "[]",
  setFavorite: (value: any) => {
    value;
  }
});

export function FavoriteProvider({ children }: PropsWithChildren) {
  const [favorite, setFavorite] = useState("[]");

  const data = useMemo(
    () => ({
      favorite,
      setFavorite
    }),
    [favorite, setFavorite]
  );

  return <FavoriteContext.Provider value={data}>{children}</FavoriteContext.Provider>;
}

export const useContextFavorite = () => {
  return useContext(FavoriteContext);
};

export default FavoriteProvider;
