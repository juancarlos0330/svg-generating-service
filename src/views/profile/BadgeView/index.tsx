import React, { useEffect, useState } from "react";
import { MintCard } from "@/components/Card";
// import { MINT_ITEMS } from "@/utils/constants";
import TransactionLoading from "@/components/Loaders/TransactionLoading";

const BadgeView: React.FC<{ userData: any; setBadgesCount: React.Dispatch<React.SetStateAction<number>> }> = ({
  userData,
  setBadgesCount
}) => {
  const [items, setItems] = useState<any>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  console.log(userData, "userData");

  useEffect(() => {
    setBadgesCount(items.length);
  }, [items, setBadgesCount]);

  const MINT_ITEMS: any[] = [
    {
      src: "/img/profile/1.png",
      name: "100 followers",
      claimed: userData.followers100Badge === 2,
      type: 4,
      id: "followers100Badge",
      description: "Connected with 100-10000 Followers"
    },
    {
      src: "/img/profile/2.png",
      name: "500 followers",
      claimed: userData.followers500Badge === 2,
      type: 4,
      id: "followers500Badge",
      description: "Connected with 100-10000 Followers"
    },
    {
      src: "/img/profile/3.png",
      name: "1000 followers",
      claimed: userData.followers1000Badge === 2,
      type: 4,
      id: "followers1000Badge",
      description: "Connected with 100-10000 Followers"
    },
    {
      src: "/img/profile/4.png",
      name: "10000 followers",
      claimed: userData.followers10000Badge === 2,
      type: 4,
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
      name: "1 Domain",
      claimed: userData.domainL1Badge === 2,
      type: 4,
      id: "domainL1Badge",
      description: "Owning ONE 3-letter domain"
    },
    {
      src: "/img/profile/10.png",
      name: "2 Domains",
      claimed: userData.domainL2Badge === 2,
      type: 4,
      id: "domainL2Badge",
      description: "Owning TWO 3-letter domains"
    },
    {
      src: "/img/profile/11.png",
      name: "3 Domains",
      claimed: userData.domainL3Badge === 2,
      type: 4,
      id: "domainL3Badge",
      description: "Owning THREE 3-letter domains"
    },
    {
      src: "/img/profile/2.png",
      name: "4 Domains",
      claimed: userData.domainL4Badge === 2,
      type: 4,
      id: "domainL4Badge",
      description: "Owning FOUR 3-letter domains"
    },

    {
      src: "/img/profile/3.png",
      name: "2 Domains",
      claimed: userData.domain2Badge === 2,
      type: 4,
      id: "domain2Badge",
      description: "Own 2 domains on ZNS"
    },
    {
      src: "/img/profile/4.png",
      name: "5 domains",
      claimed: userData.domain5Badge === 2,
      type: 4,
      id: "domain5Badge",
      description: "Own 5 domains on ZNS"
    },
    {
      src: "/img/profile/5.png",
      name: "20 domains",
      claimed: userData.domain20Badge === 2,
      type: 4,
      id: "domain20Badge",
      description: "Own 20 domains on ZNS"
    },
    {
      src: "/img/profile/6.png",
      name: "100 Domains",
      claimed: userData.domain100Badge === 2,
      type: 4,
      id: "domain100Badge",
      description: "Own 100 domains on ZNS"
    }
  ];

  useEffect(() => {
    const type1Items = MINT_ITEMS.filter((item) => item.claimed === true);
    setItems(type1Items);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div className="flex justify-center items-center">
      {isLoading && <TransactionLoading size={60} color="#CAFC01" />}
      {!isLoading && (
        <>
          {items.length === 0 && (
            <p className="border border-main-200 rounded-lg inline-flex justify-center items-center w-full py-[100px] text-[30px] text-main-200 font-700 text-center desktop:text-[22px] font-space_grotesk">
              {"You don't have any badges"}
            </p>
          )}
          <div className="grid grid-cols-4 desktop:grid-cols-3 tablet:grid-cols-2 small:grid-cols-1 gap-4 w-full place-items-center ">
            {items.length != 0 &&
              items.map((item: any, index: number) => (
                <MintCard userID={userData.id} {...item} key={`profile-gallery-${index}`} />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BadgeView;
