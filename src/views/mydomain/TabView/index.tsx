import React, { useEffect, useState } from "react";
import { Flex, GradientText } from "@/components";
import { DOMAIN_TAB_LIST } from "@/utils/constants";
import { SortbyName } from "..";
import clsx from "clsx";
import { MdOutlineSearch } from "react-icons/md";
import { useDomainLookup } from "@/utils/web3/hooks/useDomainLookup";
import { useUserLookup } from "@/utils/web3/hooks/useUserLookup";
import { useAccount } from "wagmi";
import NotFound from "@/components/NotFound";

const TabView: React.FC = () => {
  const [tabIndex, setTabIndex] = useState<number>(1);
  const { isConnected } = useAccount();
  const { userDomains } = useUserLookup();
  const [searchedDomain, setSearchedDomain] = useState<string>("");
  const [domains, setDomains] = useState<any>([]);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [filteredDomain, setFilteredDomain] = useState<any>([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [makerun, setMakeRun] = useState<boolean>(false);
  const { updatedDomainList } = useDomainLookup();

  useEffect(() => {
    setTimeout(() => {
      setIsFetching(false);
    }, 3000);
  }, []);

  useEffect(() => {
    if (domains.length !== updatedDomainList.length) {
      setMakeRun((prev) => !prev);
    }
  }, [updatedDomainList]);

  useEffect(() => {
    if (updatedDomainList !== undefined && updatedDomainList.length !== 0) {
      setIsFetching(false);
    }
  }, [updatedDomainList]);

  useEffect(() => {
    if (tabIndex === 1) {
      setDomains([...updatedDomainList].sort((a, b) => a.domainName.localeCompare(b.domainName)));
    } else if (tabIndex === 2) {
      setDomains([...updatedDomainList].sort((a, b) => a.lengthOfDomain - b.lengthOfDomain));
    } else if (tabIndex === 3) {
      setDomains(
        [...updatedDomainList].sort(
          (a, b) => new Date(Number(a.expirationDate)).getTime() - new Date(Number(b.expirationDate)).getTime()
        )
      );
    } else if (tabIndex === 4) {
      setDomains(
        [...updatedDomainList].sort((a, b) => new Date(a.expiration).getTime() - new Date(b.expiration).getTime())
      );
    }
  }, [tabIndex, searchedDomain, isFetching, makerun, userDomains]);

  const handleButtonClick = () => {
    const filteredData = domains.filter((item: any) =>
      item.domainName.toLowerCase().includes(searchedDomain.toLowerCase())
    );
    if (searchedDomain !== "") {
      setIsFiltered(true);
      setFilteredDomain(filteredData);
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedDomain(e.target.value);
    if (e.target.value === "") setIsFiltered(false);
  };

  return (
    <>
      {DOMAIN_TAB_LIST.length !== 0 ? (
        <Flex direction="flex-col" className="pt-[200px] mobile:pt-[150px] space-y-[30px] px-20 laptop:px-0">
          <Flex direction="flex-col" justifyContent="justify-center" align="items-center">
            <div className="text-[64px] small:text-[44px] font-500 uppercase font-space_grotesk">
              <GradientText>My domains ({domains.length})</GradientText>
            </div>
          </Flex>

          <Flex
            justifyContent="justify-between"
            align="items-center"
            className="bg-black rounded-full px-14 tablet:px-5 small:flex-col small:rounded-md"
          >
            {DOMAIN_TAB_LIST.map((item, mapIndex) => (
              <Flex
                key={`my-domain-${mapIndex}`}
                align="items-center"
                justifyContent="justify-center"
                action={() => setTabIndex(mapIndex + 1)}
                className={clsx(
                  "w-full cursor-pointer py-3 border-b-2 ",
                  tabIndex === mapIndex + 1
                    ? "border-main-300 border-spacing-5"
                    : "border-transparent text-main-400 hover:text-white"
                )}
              >
                <p className="text-[16px] tablet:text-[15px] font-500">{item.label}</p>
              </Flex>
            ))}
          </Flex>
          <div className="relative border border-white-200 bg-black-400 rounded-full w-full mt-[70px]">
            <input
              value={searchedDomain}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleButtonClick();
              }}
              placeholder="Search from my domains"
              className="w-full h-[55px] px-[45px] mobile:px-[20px] mobile:text-[14px] py-6 text-[16px] font-400 placeholder:text-white-500 border-none outline-none bg-transparent"
            />

            <button
              type="submit"
              onClick={handleButtonClick}
              className="absolute w-[197px] tablet:w-[180px] small:w-[110px] mobile:w-[55px] h-full right-0 bg-primary rounded-full inline-flex items-center justify-center"
            >
              <MdOutlineSearch className="text-black w-8 h-8 mobile:w-6 mobile:h-6" />
            </button>
          </div>

          <Flex
            align="items-center"
            justifyContent="justify-between"
            className="px-5 py-2 space-x-2 rounded-2xl cursor-pointer small:px-4 small:py-1 final:px-1 border border-main-200"
          >
            <Flex align="items-center" justifyContent="justify-between" className="w-full space-x-3  pr-[50px]">
              <Flex
                className="space-x-5 w-[60%] tablet:w-[80%] small:w-full"
                align="items-center"
                justifyContent="justify-start"
              >
                <p className="w-5 h-5 shrink-0 text-main-900 text-[16px]">#</p>
                <p className="text-main-900 text-[16px]">{"Domain Name"}</p>
              </Flex>
              <p className="text-main-900 text-[16px] w-[90px] tablet:hidden text-center">{"Token ID"}</p>
              <p className="text-main-900 text-[16px] w-[90px] desktop:hidden text-center">{"Registrant"}</p>
              <p className="text-main-900 text-[16px] w-[130px]  small:hidden text-center">{"Expiration"}</p>
            </Flex>
          </Flex>
          {updatedDomainList && (
            <SortbyName
              updatedDomainList={domains}
              filteredDomain={filteredDomain}
              isFiltered={isFiltered}
              isFetching={isFetching}
            />
          )}
        </Flex>
      ) : (
        <div className="py-[200px] px-[30px] small:px-[10px]">
          <NotFound label="There is no your domains" />
        </div>
      )}
    </>
  );
};

export default TabView;
