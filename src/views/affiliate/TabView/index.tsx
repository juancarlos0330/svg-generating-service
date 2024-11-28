import React, { useEffect, useState } from "react";
import { Flex, GradientText } from "@/components";
import { AFFILIATE_ITEMS, AFFILIATE_TAB_LIST, AFFILIATE_ITEM_YOU } from "@/utils/constants";
import { TabItem } from "..";
import clsx from "clsx";
import HelpSection from "../HelpSection";
import { BsCopy } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import { useAccount } from "wagmi";
import { useGetChainName } from "@/utils/web3/hooks/useGetChainName";

const TabView: React.FC = () => {
  const chainName = useGetChainName();
  const { address } = useAccount();

  const [tabIndex, setTabIndex] = useState<number>(1);
  const [inputData, setInputData] = useState<string | null>();
  const [userId, setUserId] = useState<number>(0);

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
          setInputData(data.data.user.referralCode);
          setUserId(data.data.user.id);
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
    getUserDetails(address as string, chainName as string);
  }, [address, chainName]);

  const updateReferralCode = async (referralCode: string) => {
    try {
      if (referralCode !== "") {
        const updateLink = toast.loading("Checking and Updating Referral Code");
        const data = {
          referralCode: referralCode,
          walletAddress: address,
          id: userId
        };

        const response = await fetch("/api/user/update/updateUserRef", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });

        toast.dismiss(updateLink);

        if (response.ok) {
          // Handle success
          toast.success("Referral Code Updated Successfully");
          await copyToClipboard(`${window.location.host}/?ref=${referralCode}`);

          // copyToClipboard(`${window.location.href}?ref=${referralCode}`);
        } else {
          // Handle error
          toast.error("Already taken, PLEASE TRY ANOTHER REFERRAL CODE!");
          console.error("Error updating profile:", response.statusText);
        }
      } else {
        toast.error("Please enter a valid referral code");
      }
      // await getUserDetails(address as string, chainName as string);}
    } catch (e) {
      console.log(e);
      toast.error("Error Occurred");
    }
  };

  const copyToClipboard = async (text: string) => {
    if (!navigator.clipboard) {
      console.error("Clipboard API not supported");
      return;
    }
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success("Affiliate Link Copied");
      },
      (err) => {
        console.error("Failed to copy:", err);
      }
    );
  };

  return (
    <Flex direction="flex-col" className="pt-[200px] mobile:pt-[150px] space-y-[30px] px-20 laptop:px-0">
      <Flex direction="flex-col" justifyContent="justify-center" align="items-center">
        <div className="text-[64px] small:text-[44px] font-500 uppercase font-space_grotesk">
          <GradientText>Affiliate</GradientText>
        </div>

        <HelpSection />

        <div className="relative border border-white-200 bg-black-400 rounded-full w-full mt-[70px]">
          <input
            value={inputData as string}
            onChange={(e) => setInputData(e.target.value)}
            placeholder="Create your affiliate code"
            className="w-full h-[55px] px-[45px] mobile:px-[20px] py-6 text-[16px] mobile:text-[14px] font-400 placeholder:text-white-500 border-none outline-none bg-transparent"
          />

          <button
            type="submit"
            onClick={() => updateReferralCode(inputData as string)}
            className="absolute w-[263px] tablet:w-[185px] small:w-[55px] h-full right-0 bg-primary rounded-full inline-flex items-center justify-center"
          >
            <span className="text-black text-[16px] font-500 small:hidden">Create and Copy Affiliate Link</span>
            <BsCopy className="hidden small:w-5 small:h-5 small:block text-black" />
          </button>
        </div>
      </Flex>
      <br />

      <TabItem affilate_items={AFFILIATE_ITEM_YOU} isYou={true} />
      <br />
      <Flex
        justifyContent="justify-between"
        align="items-center"
        className="bg-black rounded-full px-14 tablet:px-7 small:px-5"
      >
        {AFFILIATE_TAB_LIST.map((item, mapIndex) => (
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

      <TabItem affilate_items={AFFILIATE_ITEMS} isYou={false} />
      {/*<Toaster />*/}
    </Flex>
  );
};

export default TabView;
