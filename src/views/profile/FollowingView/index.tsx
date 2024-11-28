import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Flex, GradientText, Image } from "@/components";
import toast from "react-hot-toast";
import { Follower, useContextFollower } from "@/contexts";
// assets

// import { FOLLOWER_ITEMS } from "@/utils/constants";
import { useRouter } from "next/router";
import { useGetChainName } from "@/utils/web3/hooks/useGetChainName";
import { useAccount } from "wagmi";
import { useGetDomainTLD } from "@/utils/web3/hooks/useGetDomainTLD";
import TransactionLoading from "@/components/Loaders/TransactionLoading";
import { useGetPrimaryDomain } from "@/utils/web3/hooks/useGetPrimaryDomain";

const FollowingItem = ({
  index,
  src,
  name,
  parentDomain,
  owner,
  follower
}: {
  index: number;
  src: string;
  owner: boolean;
  name: string;
  follower: any;
  parentDomain: any;
}) => {
  const TLD = useGetDomainTLD();
  const primaryDomain = useGetPrimaryDomain();
  const chainName = useGetChainName();
  const { address } = useAccount();
  const [buttonMessage, setbuttonMessage] = useState<"Unfollow" | "Removed">("Unfollow");

  const onUnFollow = async (parentID: string, followerID: string) => {
    try {
      if (primaryDomain.split(".")[0] !== "undefined" && primaryDomain.split(".")[0] !== undefined) {
        try {
          const toastId = toast.loading("Unfollowing...");
          const followerRequestBody = {
            followingId: followerID,
            followerWalletAddress: address,
            followerChain: chainName,
            followingDomain: primaryDomain
          };
          await fetch("/api/domain/followers/delete/deleteFollower", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(followerRequestBody)
          });
          toast.dismiss(toastId);
          setbuttonMessage("Removed");
          toast.success("Unfollowed successfully");
        } catch (e) {
          console.log(e);
        }
      } else {
        toast.error("Please buy a domain to use this functionality");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Flex
      align="items-center"
      justifyContent="justify-between"
      className={clsx(
        "px-5 py-2 space-x-2 bg-black/40 rounded-2xl cursor-pointer hover:bg-main-100",
        "tablet:flex-col tablet:space-y-3 tablet:space-x-0 tablet:p-0 tablet:pb-5 tablet:overflow-clip",
        "mobile:w-[80%]"
      )}
    >
      <Flex align="items-center" className={clsx("w-[80%] space-x-5 tablet:space-x-0 tablet:w-full")}>
        <Flex justifyContent="justify-center" align="items-center" className="tablet:hidden">
          <div className="w-5 h-5 rounded-full bg-main-200 text-main-900 text-[16px] inline-flex items-center justify-center">
            {index}
          </div>
        </Flex>
        <Flex
          align="items-center"
          className={clsx("space-x-4", "tablet:flex-col tablet:space-x-0 tablet:w-full tablet:space-y-3")}
        >
          <img
            src={src}
            alt={name}
            // fill
            className={clsx(
              "w-[62px] h-[62px] shrink-0 rounded-full",
              "tablet:rounded-none tablet:w-full tablet:h-[200px] object-cover"
            )}
          />
          <p className={clsx("text-[22px] small:text-[16px] font-500 break-all", "tablet:text-center tablet:px-10")}>
            {name}
          </p>
        </Flex>
      </Flex>
      <button
        onClick={() => onUnFollow(parentDomain.id, follower.id)}
        className={clsx("rounded-3xl inline-flex items-center justify-center p-3", "w-[113px] border border-primary")}
      >
        <span className="text-[12px] text-primary">{buttonMessage}</span>
      </button>
    </Flex>
  );
};

const FollowingView: React.FC<{ domain: any; owner: any }> = (domain, owner) => {
  // const router = useRouter();

  domain = domain.domain;
  console.log(domain);
  const [following, setfollowing] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state
  const { address } = useAccount();
  const chain = useGetChainName();
  let walletAddress = address;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch domain details
        const domainData = domain;
        console.log("domainData", domainData);

        // Fetch follower details based on domain details
        // @ts-ignore
        if (domainData.followerIds && loading) {
          // @ts-ignore
          const followingIds = domainData.followingIds;
          const followingDetails = await Promise.all(
            followingIds.map(async (followingId: number) => {
              const domainRequestBody = {
                domainId: followingId
              };

              try {
                const response = await fetch("/api/domain/fetch/fetchDomainById", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(domainRequestBody)
                });

                if (response.ok) {
                  const data = await response.json();
                  return data.data.domain; // Assuming data contains necessary following information
                } else {
                  throw new Error("Failed to fetch following details");
                }
              } catch (error) {
                console.error("Error fetching following details:", error);
                return null; // Handle error gracefully
              }
            })
          );
          console.log("followingDetails", followingDetails);

          setfollowing(followingDetails.filter((following: any) => following !== null));
          setLoading(false); // Update loading state when following are fetched
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Ensure loading state is updated on error
      }
    };

    fetchData();
  }, [domain, walletAddress, chain]);

  const { follower, setFollower } = useContextFollower();
  const [items, setItems] = useState<Follower[]>([]);

  useEffect(() => {
    setItems(follower.filter((item: Follower) => item.isfollow));
  }, [follower]);

  const onUnFollow = (name: string) => {
    const updatedFollowers = follower.map((follower) => {
      if (follower.name === name) {
        return { ...follower, isfollow: false };
      }
      return follower;
    });

    console.log("updateFollowers", updatedFollowers);

    setFollower(updatedFollowers);
  };

  return (
    <div className="w-full">
      <div
        className={clsx(
          "flex-col space-y-3",
          "tablet:grid tablet:grid-cols-2 tablet:space-y-0 tablet:gap-4",
          "mobile:grid-cols-1 mobile:place-items-center"
        )}
      >
        {loading ? ( // Render loading indicator while loading
          <div className="flex items-center justify-center">
            <TransactionLoading size={60} color="#CAFC01" />
          </div>
        ) : following.length !== 0 ? (
          following.map((following, index) => (
            <FollowingItem
              follower={following}
              owner={owner}
              parentDomain={domain}
              // follower={domain.followingIds.includes(follower.id)}
              key={`follower-item-${index}`}
              index={index + 1}
              src={following.mainImgUrl}
              name={following.domainName}
              // onUnFollow={onUnFollow}
            />
          ))
        ) : (
          <p className="border border-main-200 rounded-lg inline-flex justify-center items-center w-full py-[100px] text-[30px] text-main-200 font-700 text-center desktop:text-[22px] font-space_grotesk">
            {"You don't have any following"}
          </p>
        )}
      </div>
    </div>
  );
};

export default FollowingView;
