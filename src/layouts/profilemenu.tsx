import React, { useEffect, useState } from "react";
import { useConnect } from "@/contexts";
import { Flex, GradientText } from "@/components";
// import { HAMBUGER_MENU } from "@/utils/constants";
import { useRouter } from "next/router";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import { IoExitOutline as Exit } from "react-icons/io5";
import { BsCopy as Copy } from "react-icons/bs";
import toast from "react-hot-toast";
// TODO: Add CSS for wallet operations
import NetworkBtn from "@/components/NetworkBtn/NetworkBtn";
import { useGetPrimaryDomain } from "@/utils/web3/hooks/useGetPrimaryDomain";
import { FaCircleUser as Profile, FaLink as Domain } from "react-icons/fa6";
import clsx from "clsx";
import { DOMAIN_ITEMS } from "@/utils/constants";
import { useGetChainName } from "@/utils/web3/hooks/useGetChainName";
import { useCreditsLookup } from "@/utils/web3/hooks/useCreditsLookup";
import { MainnetChains } from "@/utils/web3/misc/MainnetChains";

const ProfileMenu = ({
  showDropdown,
  wrapperRef,
  setShowDropdown
}: {
  showDropdown: boolean;
  wrapperRef: any;
  setShowDropdown: any;
}) => {
  const [valueDecimals, setValueDecimals] = useState<number>(1e12);
  const router = useRouter();
  const { setConnect } = useConnect();
  const { userCredits } = useCreditsLookup();
  // const { creditValue } = useCredit();
  // const modalRef = useRef<HTMLDivElement>(null);
  const [copyHover, setCopyHover] = useState<boolean>(false);
  const [exitHover, setExitHover] = useState<boolean>(false);
  const primaryDomain = useGetPrimaryDomain();

  // Account Details Reflection
  const { address, isConnected, isDisconnected, chainId } = useAccount();
  const { data } = useBalance({ address: address });
  const shortenedAddress = address ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : "";
  const balance = data?.formatted.slice(0, 5);
  const symbol = data?.symbol;
  const { disconnect } = useDisconnect();
  const chainName = useGetChainName();

  useEffect(() => {
    if (MainnetChains.includes(chainId as number)) {
      setValueDecimals(1e18);
    }
  }, [chainId]);

  const createUser = async (walletAddress: string, chainName: string) => {
    if (walletAddress != "" && chainName != "") {
      try {
        const domainRequestBody = {
          walletAddress,
          chainName
        };

        const response = await fetch("/api/user/create/createUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(domainRequestBody)
        });

        if (response.ok) {
          const data = await response.json();
          return data.data;
        } else {
          console.error("Failed to fetch domain:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching domain:", error);
      }
    }
  };

  useEffect(() => {
    if (isConnected) {
      const fetchUser = async () => {
        try {
          if (address && chainName) {
            await createUser(address, chainName);
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
      fetchUser();
    }
  }, [address, chainId]);

  const onHover = (type: string, action: boolean) => {
    if (type === "copy") {
      setCopyHover(action);
    } else {
      setExitHover(action);
    }
  };

  const [HAMBUGER_MENU, setHAMBUGER_MENU] = useState<any>([
    { icon: Profile, label: "My Profile", link: "/pri", isDynamic: true },
    { icon: Domain, label: "My Domains", link: "/mydomain", isDynamic: false }
  ]);

  useEffect(() => {
    if (primaryDomain) {
      setHAMBUGER_MENU([
        { icon: Profile, label: "My Profile", link: `/${primaryDomain}`, isDynamic: true },
        { icon: Domain, label: "My Domains", link: "/mydomain", isDynamic: false }
      ]);
    }
  }, [primaryDomain]);

  useEffect(() => {
    if (isConnected) {
      setConnect(true);
    }
    if (isDisconnected) {
      setShowDropdown(false);
      setConnect(false);
    }
  }, [isConnected, isDisconnected]);

  const copyToClipboard = (text: string) => {
    if (!navigator.clipboard) {
      console.error("Clipboard API not supported");
      return;
    }
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success("Address Copied");
      },
      (err) => {
        console.error("Failed to copy:", err);
      }
    );
  };

  const onMenuItem = (menuitem: any) => {
    setShowDropdown(false);
    if (menuitem.isDynamic) {
      const itemWithIsPrimaryTrue = DOMAIN_ITEMS.find((item) => item.isprimary === true);
      router.push({
        pathname: menuitem.link
      });
    } else {
      router.push(menuitem.link);
    }
  };

  const onAddClick = () => {
    setShowDropdown(false);
    router.push("/settings?tab=credits");
  };

  return (
    <div
      ref={wrapperRef}
      className={`relative transition-all duration-300 ${showDropdown ? "visible opacity-100 backdrop-blur-2xl" : "invisible opacity-0"}`}
    >
      <div className="absolute right-0 w-[365px] z-[500] mobile:w-[290px]">
        <Flex direction="flex-col" className="bg-main-100 rounded-[30px] px-5 py-7 space-y-5">
          <Flex direction="flex-col" className="space-y-1">
            <Flex
              align="items-center"
              justifyContent="justify-between"
              className="text-[20px] font-500 font-space_grotesk space-x-3"
            >
              <GradientText>{shortenedAddress}</GradientText>
              <Flex align="items-center" className="space-x-3">
                <div className="relative p-2 border border-main-300 rounded-full  cursor-pointer">
                  <Copy
                    onClick={() => copyToClipboard(String(address))}
                    onMouseEnter={() => onHover("copy", true)}
                    onMouseLeave={() => onHover("copy", false)}
                    className="text-main-400 hover:text-primary w-4 h-4"
                  />
                  <span
                    className={clsx(
                      "absolute -right-[50%] -bottom-[40px] text-[12px] bg-black/40 border border-main-200 text-nowrap p-2 rounded-lg",
                      copyHover ? "visible opacity-100 backdrop-blur-2xl" : "invisible opacity-0"
                    )}
                  >
                    Copy wallet address
                  </span>
                </div>

                <div className="relative p-2 border border-main-300 rounded-full  cursor-pointer">
                  <Exit
                    onClick={() => disconnect()}
                    onMouseEnter={() => onHover("exit", true)}
                    onMouseLeave={() => onHover("exit", false)}
                    className="text-main-400 hover:text-primary w-4 h-4"
                  />
                  <span
                    className={clsx(
                      "absolute -right-[50%] -bottom-[40px] text-[12px] bg-black/40 border border-main-200 text-nowrap p-2 rounded-lg",
                      exitHover ? "visible opacity-100 backdrop-blur-2xl" : "invisible opacity-0"
                    )}
                  >
                    Disconnect Wallet
                  </span>
                </div>
              </Flex>
            </Flex>
            <Flex justifyContent="justify-between" className="text-[16px] font-400">
              <p>
                {balance} {symbol}
              </p>
            </Flex>
          </Flex>
          <Flex justifyContent="justify-between" className="text-[16px] font-500">
            <p>{Math.floor(Number(userCredits) / valueDecimals)} Credit</p>
            <p onClick={onAddClick} className="text-primary cursor-pointer hover:underline">
              Add
            </p>
          </Flex>
          {isConnected && <NetworkBtn />}
          <Flex direction="flex-col" className="space-y-[10px]">
            {HAMBUGER_MENU.map((item: any, index: number) => (
              <Flex
                key={`profile_menu_${index}`}
                align="items-center"
                className="p-5 bg-black/40 rounded-xl space-x-3 cursor-pointer hover:text-primary"
                action={() => onMenuItem(item)}
              >
                <item.icon className="w-5 h-5" />
                <p className="text-[14px] font-500">{item.label}</p>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </div>
      {/* <Toaster /> */}
    </div>
  );
};

export default ProfileMenu;
