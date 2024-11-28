import React, { useEffect, useState } from "react";
import { Flex, GradientText } from "@/components";
import { MINT_ITEMS } from "@/utils/constants";
import { AllViewTab } from "..";

import clsx from "clsx";
// import { CardProps } from "@/types/card";
import { useGetChainName } from "@/utils/web3/hooks/useGetChainName";
import { useGetPrimaryDomain } from "@/utils/web3/hooks/useGetPrimaryDomain";
import { useAccount } from "wagmi";
import { useConnect } from "@/contexts";
import { useDomainLookup } from "@/utils/web3/hooks/useDomainLookup";
import toast from "react-hot-toast";

const TabView: React.FC = () => {
  const [tabIndex, setTabIndex] = useState<number>(1);
  const [followers, setFollowers] = useState<number>(0);
  const [userData, setUserData] = useState<any>({});
  const chainName = useGetChainName();
  const primaryDomain = useGetPrimaryDomain();
  const { address } = useAccount();
  const { isConnect } = useConnect();
  const { updatedDomainList } = useDomainLookup();
  // console.log(updatedDomainList, "updatedDomainList");

  const oneLetterDomainsCount = updatedDomainList.filter((domain: any) => domain.domainName.length === 1).length;
  const twoLetterDomainsCount = updatedDomainList.filter((domain: any) => domain.domainName.length === 2).length;
  const threeLetterDomainsCount = updatedDomainList.filter((domain: any) => domain.domainName.length === 3).length;
  const fourLetterDomainsCount = updatedDomainList.filter((domain: any) => domain.domainName.length === 4).length;

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
          // console.log("data from getDomainData",data.data.domain.followerIds.length)
          // console.log("data from getDomainData",data)
          setFollowers(data.data.domain.followerIds.length);
          // console.log("data from getDomainData",data.data.domain.followerIds.length)
        } else {
          console.error("Failed to fetch domain:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching domain:", error);
      }
    }
  };

  const getUserDetails = async (walletAddress: string, chainName: string) => {
    if (walletAddress != "" && chainName != "") {
      try {
        const userRequestBody = {
          walletAddress,
          chainName
        };

        const response = await fetch("/api/user/fetch/fetchUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(userRequestBody)
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data.data.user);
          // console.log("Userdata", data.data.user);
        } else {
          console.error("Failed to fetch user:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error("Error fetching user");
      }
    }
  };
  useEffect(() => {
    if (isConnect) {
      getDomainDetails(primaryDomain, address as string, chainName as string);
      getUserDetails(address as string, chainName as string);
    }
  }, [primaryDomain, address, chainName]);

  const BADGES_TAB_LIST = [
    { id: 1, label: "All" },
    { id: 2, label: "Unclaimed" },
    { id: 3, label: "Claimed" },
    { id: 4, label: "Not Available" }
  ];

  const MINT_ITEMS: any[] = [
    {
      src: "/img/profile/1.png",
      name: "100 followers",
      count: followers,
      claimed: userData.followers100Badge === 2,
      type: followers >= 100 ? 1 : 2,
      id: "followers100Badge",
      description: "Connected with 100-10000 Followers"
    },
    {
      src: "/img/profile/2.png",
      name: "500 followers",
      count: followers,
      claimed: userData.followers500Badge === 2,
      type: followers >= 500 ? 1 : 2,
      id: "followers500Badge",
      description: "Connected with 100-10000 Followers"
    },
    {
      src: "/img/profile/3.png",
      name: "1000 followers",
      count: followers,
      claimed: userData.followers1000Badge === 2,
      type: followers >= 1000 ? 1 : 2,
      id: "followers1000Badge",
      description: "Connected with 100-10000 Followers"
    },
    {
      src: "/img/profile/4.png",
      name: "10000 followers",
      count: followers,
      claimed: userData.followers10000Badge === 2,
      type: followers >= 10000 ? 1 : 2,
      id: "followers10000Badge",
      description: "Connected with 100-10000 Followers"
    },

    // {
    //   src: "/img/profile/5.png",
    //   name: "100 days",
    //   count: "57",
    //   claimed: false,
    //   type: 1,
    //   id: "domain100DaysBadge",
    //   description: "Minted domain 100-500 days ago"
    // },
    // {
    //   src: "/img/profile/6.png",
    //   name: "200 days",
    //   count: "57",
    //   claimed: false,
    //   type: 2,
    //   id: "domain200DaysBadge",
    //   description: "Minted domain 100-500 days ago"
    // },
    // {
    //   src: "/img/profile/7.png",
    //   name: "365 days",
    //   count: "57",
    //   claimed: false,
    //   type: 3,
    //   id: "domain365DaysBadge",
    //   description: "Minted domain 100-500 days ago"
    // },
    // {
    //   src: "/img/profile/8.png",
    //   name: "500 days",
    //   count: "57",
    //   claimed: false,
    //   type: 3,
    //   id: "domain500DaysBadge",
    //   description: "Minted domain 100-500 days ago"
    // },

    {
      src: "/img/profile/9.png",
      name: "1 Letter Domain",
      count: oneLetterDomainsCount,
      claimed: userData.domainL1Badge === 2,
      type: oneLetterDomainsCount >= 1 ? 1 : 2,
      id: "domainL1Badge",
      description: "Owning one 1-letter domain"
    },
    {
      src: "/img/profile/10.png",
      name: "2 Letter Domain",
      count: twoLetterDomainsCount,
      claimed: userData.domainL2Badge === 2,
      type: twoLetterDomainsCount >= 1 ? 1 : 2,
      id: "domainL2Badge",
      description: "Owning one 2-letter domain"
    },
    {
      src: "/img/profile/11.png",
      name: "3 Letter Domain",
      count: threeLetterDomainsCount,
      claimed: userData.domainL3Badge === 2,
      type: threeLetterDomainsCount >= 1 ? 1 : 2,
      id: "domainL3Badge",
      description: "Owning one 3-letter domain"
    },
    {
      src: "/img/profile/2.png",
      name: "4 Letter Domain",
      count: fourLetterDomainsCount,
      claimed: userData.domainL4Badge === 2,
      type: fourLetterDomainsCount >= 1 ? 1 : 2,
      id: "domainL4Badge",
      description: "Owning one 4-letter domain"
    },

    {
      src: "/img/profile/3.png",
      name: "2 Domains",
      count: updatedDomainList.length,
      claimed: userData.domain2Badge === 2,
      type: updatedDomainList.length >= 2 ? 1 : 2,
      id: "domain2Badge",
      description: "Own 2 domains on ZNS"
    },
    {
      src: "/img/profile/4.png",
      name: "5 domains",
      count: updatedDomainList.length,
      claimed: userData.domain5Badge === 2,
      type: updatedDomainList.length >= 5 ? 1 : 2,
      id: "domain5Badge",
      description: "Own 5 domains on ZNS"
    },
    {
      src: "/img/profile/5.png",
      name: "20 domains",
      count: updatedDomainList.length,
      claimed: userData.domain20Badge === 2,
      type: updatedDomainList.length >= 20 ? 1 : 2,
      id: "domain20Badge",
      description: "Own 20 domains on ZNS"
    },
    {
      src: "/img/profile/6.png",
      name: "100 Domains",
      count: updatedDomainList.length,
      claimed: userData.domain100Badge === 2,
      type: updatedDomainList.length >= 100 ? 1 : 2,
      id: "domain100Badge",
      description: "Own 100 domains on ZNS"
    }
  ];

  return (
    <Flex direction="flex-col" className="pt-[200px] mobile:pt-[150px] space-y-[30px] px-20 laptop:px-0">
      <Flex direction="flex-col" justifyContent="justify-center" align="items-center" className="pb-10">
        <div className="text-[64px] small:text-[44px] font-500 uppercase font-space_grotesk">
          <GradientText>Badges</GradientText>
        </div>
        <p className="text-[16px] font-400 font-poppins text-center">Select your badges and claim them!</p>
      </Flex>
      <Flex
        justifyContent="justify-between"
        align="items-center"
        className="bg-black rounded-full px-14 tablet:px-7 small:px-2"
      >
        {BADGES_TAB_LIST.map((item, mapIndex) => (
          <Flex
            key={`my-domain-${mapIndex}`}
            align="items-center"
            justifyContent="justify-center"
            action={() => setTabIndex(mapIndex + 1)}
            className={clsx(
              "w-full cursor-pointer py-3",
              tabIndex === mapIndex + 1
                ? "border-b-2 border-main-300 border-spacing-5"
                : "text-main-400 hover:text-white"
            )}
          >
            <p className="text-[16px] small:text-[10px] font-500">{item.label}</p>
          </Flex>
        ))}
      </Flex>

      {tabIndex === 1 && <AllViewTab items={MINT_ITEMS} userID={userData.id} />}
      {tabIndex === 2 && (
        <AllViewTab
          userID={userData.id}
          items={MINT_ITEMS.filter(
            (item) => item.claimed === false && item.type != 2 && item.type != 3 && item.type != 4
          )}
        />
      )}
      {tabIndex === 3 && <AllViewTab userID={userData.id} items={MINT_ITEMS.filter((item) => item.claimed === true)} />}
      {tabIndex === 4 && <AllViewTab userID={userData.id} items={MINT_ITEMS.filter((item) => item.type === 2)} />}
    </Flex>
  );
};

export default TabView;
