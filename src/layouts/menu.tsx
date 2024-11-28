import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Container, Flex, Image, Link } from "@/components";
import { MdCancel } from "react-icons/md";
import { MENU_ICON_LIST, MENU_LIST } from "@/utils/constants";
import { useConnect, useContextLocalStorage, useMenu } from "@/contexts";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Autocomplete } from "@mui/material";
import { MdOutlineSearch as Search } from "react-icons/md";
import { useDomainDetails } from "@/utils/web3/hooks/useDomainDetails";
// import { useQueryClient } from "@tanstack/react-query";
import { useContextFavorite } from "@/contexts/FavoriteProvider";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-hot-toast";
import clsx from "clsx";
import { fetchDomainDetails } from "@/utils/web3/core/fetchDomainDetails";

const Menu: React.FC = () => {
  const router = useRouter();
  // const queryClient = useQueryClient();
  const { showMenu, setShowMenu } = useMenu();
  const { isConnect, setConnect } = useConnect();
  const { favorite } = useContextFavorite();
  const { localstorage } = useContextLocalStorage();
  const { isConnected, isDisconnected } = useAccount();
  const handleClose = () => setShowMenu(!showMenu);
  const { openConnectModal } = useConnectModal();
  const [AutocompleteOpen, setAutocompleteOpen] = useState<boolean>(true);
  const [searchedDomain, setSearchedDomain] = useState<string>("");
  const [domainStatus, setDomainStatus] = useState<boolean>(false);
  const timeoutId = useRef<undefined | ReturnType<typeof setTimeout>>(undefined);
  const { domainData } = useDomainDetails(searchedDomain);
  const [isLoading, setLoading] = useState<boolean>(false);

  const options = [
    {
      label: searchedDomain,
      status: searchedDomain === "" ? "" : domainStatus
    }
  ];

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
    router.push({
      pathname: `/search`,
      query: { domain: trimmedDomain }
    });
    handleClose();
  };

  useEffect(() => {
    if (isConnected) {
      setConnect(true);
    }
    if (isDisconnected) {
      setConnect(false);
    }
  }, [isConnected, isDisconnected]);

  return (
    <div
      className={`fixed h-full w-full py-10 transition-all duration-300 z-[500] left-0 top-0 bg-black/60 ${showMenu ? "visible opacity-100 backdrop-blur-2xl" : "invisible opacity-0"}`}
    >
      <Container>
        <Flex direction="flex-col" justifyContent="justify-between" className="h-full">
          <Flex direction="flex-col" className="space-y-5">
            <Flex align="items-center" justifyContent="justify-between" className="pb-5">
              <Link href="/" onClick={handleClose} className="cursor-pointer">
                <Image src="/img/zns-logo.png" alt="ZNS Connect logo" width={59} height={59} />
              </Link>

              <button onClick={handleClose}>
                <MdCancel className="w-[35px] h-[35px] mobile:w-[30px] mobile:h-[30px]" />
              </button>
            </Flex>
            <div className="relative border border-white-400 rounded-full">
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
                      <p className="text-[12px] font-600 text-main-300">{option.label}</p>
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
                      placeholder="Search domain names"
                      className="w-full h-10 pl-4 pr-10 py-[10px] text-[12px] font-400 placeholder:text-white-500 border-none outline-none bg-transparent"
                    />
                    <button
                      type="submit"
                      className="absolute right-0 bg-primary rounded-full text-center w-10 h-10 inline-flex items-center justify-center"
                      onClick={handleButtonClick}
                    >
                      <Search className="text-black w-5 h-5" />
                    </button>
                  </div>
                )}
              />
            </div>
            {!isConnect && (
              <span
                onClick={openConnectModal}
                className={`text-primary text-[20px] mobile:text-[16px] font-400 cursor-pointer border border-primary rounded-lg py-2 text-center`}
              >
                Connect Wallet
              </span>
            )}
          </Flex>

          <Flex direction="flex-col" className="space-y-5">
            {MENU_LIST.map((menu, index) => {
              return (
                <Link
                  key={`navbar_menu_${index}`}
                  href={menu.link}
                  onClick={handleClose}
                  className={`animated-border relative hover:text-primary/50 ${router.asPath === menu.link ? "text-primary text-[24px] mobile:text-[18px] font-700" : "text-[20px] mobile:text-[16px] font-400"} cursor-pointer`}
                >
                  {menu.name}
                </Link>
              );
            })}
          </Flex>
          <Flex className="relative space-x-5 w-fit">
            {MENU_ICON_LIST.map((menu, index) => (
              <div key={`navbar_menu_icon_${index}`} className="relative hover:text-primary">
                <Link
                  href={menu.link}
                  onClick={handleClose}
                  className={clsx(`cursor-pointer`, router.asPath === menu.link && "text-primary")}
                >
                  {<menu.icon className="w-8 h-8 mobile:w-6 mobile:h-6" />}
                </Link>

                {menu.link === "/settings?tab=favorite" && JSON.parse(favorite).length != 0 && (
                  <span className="absolute right-0 top-0 bg-verified rounded-full h-[15px] w-[15px] inline-flex items-center justify-center text-[10px]">
                    {JSON.parse(favorite).length}
                  </span>
                )}
                {menu.link === "/cart" && JSON.parse(localstorage).length != 0 && (
                  <span className="absolute right-0 top-0 bg-verified rounded-full h-[15px] w-[15px] inline-flex items-center justify-center text-[10px]">
                    {JSON.parse(localstorage).length}
                  </span>
                )}
              </div>
            ))}
          </Flex>
        </Flex>
      </Container>
    </div>
  );
};

export default Menu;
