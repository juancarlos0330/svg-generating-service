import React, { useState } from "react";
import { Flex, GradientText, Image } from "@/components";
import { FaInstagram as Instagram } from "react-icons/fa";
import { TfiTwitter as Twitter } from "react-icons/tfi";
import { LiaDiscord as Discord, LiaTelegram as Telegram } from "react-icons/lia";
import { MdOutlineVerified } from "react-icons/md";
import { CiLinkedin as Linkedin } from "react-icons/ci";
import toast, { Toaster } from "react-hot-toast";
// import { useCookies } from "react-cookie";
import { useSession, getSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { useGetChainName } from "@/utils/web3/hooks/useGetChainName";
import { useRouter, Router } from "next/router";

const AccountView: React.FC<{ domain: any }> = ({ domain }) => {
  const [updatedLinks, setUpdatedLinks] = useState([
    { id: 1, icon: Instagram, link: domain?.instagram, isVerify: domain?.instagramVerified, label: "Instagram" },
    { id: 2, icon: Twitter, link: domain?.twitter, isVerify: domain?.twitterVerified, label: "Twitter" },
    { id: 3, icon: Discord, link: domain?.discord, isVerify: domain?.discordVerified, label: "Discord" },
    { id: 4, icon: Linkedin, link: domain?.linkedin, isVerify: domain?.linkedinVerified, label: "Linkedin" },
    { id: 5, icon: Telegram, link: domain?.telegram, isVerify: domain?.telegramVerified, label: "Telegram" }
  ]);

  const { data: session, status, update } = useSession();
  // const [cookies, setCookie] = useCookies(["next-auth.session-token"]);

  // const router = useRouter();
  // if (router.query.id) {
  //   toast.success("Twitter/Discord verification will update automatically in a few moments");
  // }

  const chainName = useGetChainName();
  const onHandle = async () => {
    const updatedLinksCopy = [...updatedLinks];
    let hasChanges = false;
    let updatedData: any = {};

    for (let i = 0; i < updatedLinksCopy.length; i++) {
      const inputValue = (document.getElementById(`input-${i}`) as HTMLInputElement)?.value;

      if (inputValue !== undefined && inputValue !== updatedLinksCopy[i].link) {
        updatedLinksCopy[i].link = inputValue;
        hasChanges = true;
        updatedData[updatedLinksCopy[i].label.toLowerCase()] = inputValue;
      }
    }

    if (hasChanges) {
      try {
        const toasts = toast.loading("Updating...");

        const response = await fetch("/api/domain/update/updateDomain", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: domain.id,
            chain: chainName,
            ...updatedData
          })
        });

        if (response.ok) {
          toast.dismiss(toasts);
          toast.success("Updated social links");
        } else {
          toast.error("Error updating social links");
          console.error("Error updating social links:", response.statusText);
        }
      } catch (error) {
        toast.error("Error updating social links");
        console.error("Error updating social links:", error);
      }
    } else {
      toast.error("No changes detected");
    }
  };

  const verifyHandler = async (socialPlatform: string) => {
    await onHandle();
    console.log(`Verifying ${socialPlatform}`);
    socialPlatform = socialPlatform.toLowerCase();

    const expirationTime = new Date();
    expirationTime.setTime(expirationTime.getTime() + 5 * 60 * 1000); // 5 minutes in milliseconds
    // Add your verification logic here
    // setCookie(
    //   "next-auth.session-token",
    //   JSON.stringify({
    //     id: domain.id
    //   })
    // { expires: expirationTime }
    // );
    update({ id: domain.id });
    // Update the session
    // This function is provided by NextAuth.js
    // It persists the changes and updates the session object
    // await updateSession(updatedSession);

    console.log(`${window.location.href}&id=${domain.id}`);
    signIn(socialPlatform, {
      callbackUrl: `${window.location.href}&id=${domain.id}` // Add your callback URL here, e.g. `https://yourdomain.com/verify?token=
    });
  };

  return (
    <div className="w-full">
      <div className="uppercase text-[36px] font-500 font-space_grotesk border-b-2 border-primary/30 pb-3 small:text-center">
        <GradientText>socials</GradientText>
      </div>
      <Flex direction="flex-col" className="pt-5 space-y-4 w-[578px] laptop:w-full">
        {updatedLinks.map((item: any, index: number) => (
          <Flex align="items-center" className="relative space-x-5" key={`user-profile-link-${index}`}>
            <item.icon className={`w-10 h-10 tablet:w-8 tablet:h-8 cursor-pointer`} />
            <input
              id={`input-${index}`}
              placeholder={`Enter ${item.label} URL`}
              defaultValue={item.link}
              className="placeholder:text-[14px] w-full h-[54px] rounded-xl px-4 placeholder:text-white-500 border border-main-300 outline-none bg-black/40"
            />
            {item.isVerify ? (
              <Image
                src={"/img/verify_blue.png"}
                width={20}
                height={20}
                className="absolute w-6 h-6 right-5 tablet:w-5 tablet:h-5"
                alt="profile_verify_avatar"
              />
            ) : item.label === "Twitter" || item.label === "Discord" ? (
              <button
                className="absolute right-5 top-1/2 transform -translate-y-1/2"
                onClick={() => verifyHandler(item.label)}
              >
                Verify
              </button>
            ) : null}
          </Flex>
        ))}
        <div className="pt-10 w-[141px] tablet:w-full">
          <button
            onClick={onHandle}
            className="w-full bg-primary text-[16px] font-500 px-[38px] py-[11px] rounded-3xl text-black"
          >
            Update
          </button>
        </div>
      </Flex>
      <Toaster />
    </div>
  );
};

export default AccountView;
