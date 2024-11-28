import type { PropsWithChildren } from "react";
import { createContext, useContext, useMemo, useState } from "react";

export const MenuContext = createContext({
  showMenu: false,
  setShowMenu: (value: boolean) => {
    value;
  }
});

export function MenuProvider({ children }: PropsWithChildren) {
  const [showMenu, setShowMenu] = useState(false);

  const menu = useMemo(
    () => ({
      showMenu,
      setShowMenu
    }),
    [showMenu]
  );

  return <MenuContext.Provider value={{ ...menu }}>{children}</MenuContext.Provider>;
}

export const useMenu = () => {
  return useContext(MenuContext);
};

export default MenuProvider;
