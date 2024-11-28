import React, { useState, useEffect } from "react";
import Menu from "./menu";
import Header from "./header";
import Footer from "./footer";
import WrongChainModal from "@/components/Modal/WrongChainModal";
import { useAccount } from "wagmi";

import { MenuProvider, ConnectProvider, CreditProvider, useContextLocalStorage } from "@/contexts";
import type { ComponentProps } from "@/types";
import { useContextFavorite } from "@/contexts/FavoriteProvider";
import FollowerProvider from "@/contexts/FollowerProvider";

export default function Layout({ children }: ComponentProps) {
  const { setLocalStorage } = useContextLocalStorage();
  const { setFavorite } = useContextFavorite();
  const [wrongChain, setWrongChain] = useState(false);

  useEffect(() => {
    const saveItems = localStorage.getItem("domains") || "[]";
    const favoriteItems = localStorage.getItem("favorite") || "[]";

    setLocalStorage(saveItems);
    setFavorite(favoriteItems);
  }, []);

  const { isConnected, chainId } = useAccount();
  const chainIds = [80085, 1637450, 196, 56, 9789, 167009, 534352, 997, 302, 137, 10242, 185, 2810, 12227331];

  useEffect(() => {
    if (isConnected && !chainIds.includes(chainId as number)) {
      setWrongChain(true);
    } else {
      setWrongChain(false);
    }
  }, [isConnected, chainId]);

  return (
    <ConnectProvider>
      <FollowerProvider>
        <CreditProvider>
          <MenuProvider>
            <Header />
            {wrongChain && <WrongChainModal />}
            {children}
            <Footer />
            <Menu />
          </MenuProvider>
        </CreditProvider>
      </FollowerProvider>
    </ConnectProvider>
  );
}
