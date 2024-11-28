import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import ProfileMenu from "./profilemenu";
import { Container } from "@/components";
import { Flex, Image, Link } from "@/components";
import { MENU_ICON_LIST } from "@/utils/constants";
import { useConnect, useMenu, useContextLocalStorage } from "@/contexts";
// icons
import clsx from "clsx";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { MdOutlineSearch as Search, MdOutlineMenu as Menu } from "react-icons/md";
import { Autocomplete } from "@mui/material";
// import { useQueryClient } from "@tanstack/react-query";
import { useDomainDetails } from "@/utils/web3/hooks/useDomainDetails";
import { useContextFavorite } from "@/contexts/FavoriteProvider";
import { useAccount } from "wagmi";
import { useGetChainName } from "@/utils/web3/hooks/useGetChainName";
import { useGetPrimaryDomain } from "@/utils/web3/hooks/useGetPrimaryDomain";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { fetchDomainDetails } from "@/utils/web3/core/fetchDomainDetails";
import toast, { Toaster } from "react-hot-toast";

export default function Header() {
  const router = useRouter();
  // const queryClient = useQueryClient();
  const { isConnect } = useConnect();

  // useEffect(() => {
  //   if (isConnect) {
  //     // toast.success("Connected your wallet");
  //   }
  // }, [isConnect]);

  const wrapperRef = useRef<any>(null);
  const menuButtonRef = useRef<any>(null);

  const [showDropdown, setShowDropdown] = useState(false);

  const { showMenu, setShowMenu } = useMenu();
  const { localstorage } = useContextLocalStorage();
  const { favorite } = useContextFavorite();
  const [unScrolled, setUnScrolled] = useState(true);
  const { openConnectModal } = useConnectModal();

  const [searchedDomain, setSearchedDomain] = useState<string>("");
  const [domainStatus, setDomainStatus] = useState<boolean>(false);
  const { domainData } = useDomainDetails(searchedDomain);
  const [AutocompleteOpen, setAutocompleteOpen] = useState<boolean>(true);
  const timeoutId = useRef<undefined | ReturnType<typeof setTimeout>>(undefined);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string>("");

  const { address, isConnected } = useAccount();

  const chainName = useGetChainName();
  const primaryDomain = useGetPrimaryDomain();

  const options = [
    {
      label: searchedDomain,
      status: searchedDomain === "" ? "" : domainStatus
    }
  ];

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, [showDropdown]);

  useEffect(() => {
    if (isConnected) {
      if ((domainData as { domainName: string })?.domainName === "") {
        setDomainStatus(true);
      } else {
        setDomainStatus(false);
      }
      setLoading(false);
    }
  }, [domainData]);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputText = e.target.value.toLowerCase();
    inputText = inputText.replace(/[^a-z0-9\s-]/g, "");
    inputText = inputText.replace(/\s+/g, "-");
    inputText = inputText.replace(/-{2,}/g, "-");
    inputText = inputText.trim();
    if (inputText.length > 24) {
      toast.error("Search limited to first 24 characters for security.");
      inputText = inputText.slice(0, 23);
    }
    clearTimeout(timeoutId.current);
    setSearchedDomain(inputText);
    setLoading(true);
    timeoutId.current = setTimeout(async () => {
      if (!isConnected) {
        const domainData = await fetchDomainDetails(inputText);
        if ((domainData as { domainName: string })?.domainName === "") {
          setDomainStatus(true);
        } else {
          setDomainStatus(false);
        }
        setLoading(false);
      }
    }, 300);
  };

  const handleButtonClick = () => {
    const trimmedDomain = searchedDomain.replace(/^-+|-+$/g, "");
    setAutocompleteOpen(false);
    setShowDropdown(false);
    setSearchedDomain("");
    router.push({
      pathname: "/search",
      query: { domain: trimmedDomain }
    });
  };

  const getDomainDetails = async (domainName: string | string[] | undefined, walletAddress: string, chain: string) => {
    if (walletAddress != "" && chain != "" && domainName != "") {
      try {
        const domainRequestBody = {
          domainName,
          walletAddress,
          chain
        };

        const response = await fetch("/api/domain/fetch/fetchDomain", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(domainRequestBody)
        });

        if (response.ok) {
          const data = await response.json();
          // console.log("Fetched domain data:", data);
          // Handle your fetched domain data here
          console.log("data from header", data.data);
          setAvatar(data.data.domain.mainImgUrl);
        } else {
          console.error("Failed to fetch domain:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching domain:", error);
      }
    }
  };
  useEffect(() => {
    if (isConnect) {
      getDomainDetails(primaryDomain, address as string, chainName as string);
    }
  }, [isConnect, primaryDomain, address, chainName]);
  const handleScroll = () => {
    setUnScrolled(document.documentElement.scrollTop === 0);
  };
  const handleClickOutside = (e: any) => {
    if (wrapperRef.current && wrapperRef.current.contains(e.target)) {
      return;
    } else {
      if (menuButtonRef.current && menuButtonRef.current.contains(e.target)) {
        setShowDropdown(!showDropdown);
        return;
      } else {
        setShowDropdown(false);
      }
    }
  };

  const [MENU_LIST, setMENU_LIST] = useState<any>([
    { name: "Home", link: "/" },
    { name: "Register domain", link: "/search" },
    { name: "Affiliate", link: "/affiliate" },
    { name: "Badges", link: "/badges" },
    { name: "Documentation", link: "https://docs.znsconnect.io/" }
  ]);

  // const handleClick = (link: string) => {
  //   if (!isConnect) {
  //     toast.error("Please connect your wallet first");
  //     return;
  //   }
  //   router.push(link);
  // };

  return (
    <div
      className={`fixed top-0 z-50 w-full ${unScrolled ? "" : "bg-transparent backdrop-blur-xl"} ${!showMenu ? "visible opacity-100" : "invisible opacity-0"}`}
    >
      <Container>
        <Flex align="items-center" justifyContent="justify-between" className="py-5">
          <Link href="/" className="cursor-pointer">
            <Image src="/img/zns-logo.png" alt="ZNS Connect logo" width={59} height={59} />
          </Link>
          <Flex align="items-center" className="space-x-7 desktop:space-x-4 laptop:hidden">
            {MENU_LIST.map((menu: any, index: number) => {
              return (
                <Link
                  key={`navbar_menu_${index}`}
                  href={menu.link}
                  className={clsx(
                    router.pathname === menu.link ? "text-[16px] font-700 text-primary" : "text-[14px] font-400",
                    "cursor-pointer"
                  )}
                >
                  {menu.name}
                </Link>
              );
            })}
          </Flex>
          <Flex align="items-center" justifyContent="justify-between" className="space-x-7">
            <div className="relative border border-white-200 bg-black-400 rounded-full mobile:hidden">
              <Autocomplete
                open={searchedDomain !== "" && AutocompleteOpen}
                onBlur={() => setAutocompleteOpen(false)}
                onFocus={() => setAutocompleteOpen(true)}
                options={options}
                renderOption={(props, option) => {
                  return (
                    <Flex
                      key={option.label}
                      align="items-center"
                      justifyContent="justify-between"
                      className="px-6 font-space_grotesk cursor-pointer hover:bg-gray-200/40"
                      action={() => handleButtonClick()}
                    >
                      <p className="text-[12px] font-600 text-main-300 break-all">{option.label}</p>
                      <p className={`text-4 font-500 ${!option.status ? "text-red-500" : "text-blue-500"}`}>
                        {isLoading ? (
                          <AiOutlineLoading3Quarters className="w-5 h-5 loading-icon" />
                        ) : option.status === "" ? (
                          ""
                        ) : option.status ? (
                          <p className="bg-verified p-2 rounded-full" />
                        ) : (
                          <p className="bg-red-500 p-2 rounded-full" />
                        )}
                      </p>
                    </Flex>
                  );
                }}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <input
                      {...params.inputProps}
                      value={searchedDomain}
                      onChange={handleInputChange}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleButtonClick();
                      }}
                      placeholder="Search"
                      className="max-w-[238px] w-[238px] desktop:w-full h-[38px] px-4 py-[10px] text-[12px] font-400 placeholder:text-white-500 border-none outline-none bg-transparent"
                    />
                    <button
                      type="submit"
                      className="absolute right-0 bg-primary p-2 rounded-full text-center"
                      onClick={handleButtonClick}
                    >
                      <Search className="text-black w-5 h-5" />
                    </button>
                  </div>
                )}
              />
            </div>
            <Flex className="relative space-x-7 desktop:space-x-5 small:hidden">
              {MENU_ICON_LIST.map((menu, index) => (
                <div key={`navbar_menu_icon_${index}`} className="relative hover:text-primary">
                  <Link
                    href={menu.link}
                    // onClick={() => handleClick(menu.link)}
                    className={clsx(`cursor-pointer`, router.asPath === menu.link && "text-primary")}
                  >
                    {<menu.icon className="w-6 h-6" />}
                  </Link>
                  {menu.link === "/settings?tab=favorite" && JSON.parse(favorite).length != 0 && (
                    <span className="absolute -right-2 -top-[10px] bg-verified rounded-full h-[15px] w-[15px] inline-flex items-center justify-center text-[10px]">
                      {JSON.parse(favorite).length}
                    </span>
                  )}
                  {menu.link === "/cart" && JSON.parse(localstorage).length != 0 && (
                    <span className="absolute -right-2 -top-[10px] bg-verified rounded-full h-[15px] w-[15px] inline-flex items-center justify-center text-[10px]">
                      {JSON.parse(localstorage).length}
                    </span>
                  )}
                </div>
              ))}
            </Flex>

            {!isConnect ? (
              <button
                onClick={openConnectModal}
                className="w-[141px] h-10 text-black bg-primary rounded-full laptop:hidden"
              >
                Connect
              </button>
            ) : (
              <button ref={menuButtonRef}>
                <Image
                  src={avatar || "/img/zns-logo.png"}
                  alt={"profile"}
                  fill
                  className="w-[44px] h-[44px] shrink-0 rounded-full"
                />
              </button>
            )}

            <button className="hidden laptop:block" onClick={() => setShowMenu(true)}>
              <Menu className="w-6 h-6" />
            </button>
          </Flex>
        </Flex>
        <ProfileMenu showDropdown={showDropdown} wrapperRef={wrapperRef} setShowDropdown={setShowDropdown} />
      </Container>
      <Toaster />
    </div>
  );
}
