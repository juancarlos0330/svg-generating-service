import React, { useState } from "react";

import { Flex, Image, Link } from "@/components";
import { MEDIA_LIST, MENU_LIST, SOCIAL_LIST } from "@/utils/constants";
import { Container } from "@/components";
import toast from "react-hot-toast";

export default function Footer() {
  const [email, setEmail] = useState("");

  const subscribe = () => {
    // Check if email is provided
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }
    toast.success("Subscribing...");

    // Make API call
    fetch("/api/marketing/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Subscribed successfully.");
          setEmail(""); // Clear the email input
        } else {
          throw new Error("Failed to subscribe.");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <Container>
      <Flex justifyContent="justify-between" className="laptop:flex-col laptop:space-y-[103px]  mt-[150px]">
        {/* ZNC Connect */}
        <Flex direction="flex-col" className="space-y-8">
          <Flex align="items-center" className="space-x-4">
            <Image src="/img/zns-logo.png" alt="ZNS logo" width={44} height={44} />
            <p className="text-[24px] font-700 desktop:text-[20px]">ZNS Connect</p>
          </Flex>
          <p className="max-w-[267px] text-[18px] font-400 text-main-400 desktop:text-[14px]">
            Empowering Web3 Identity, One Domain at a Time.
          </p>
          <p className="text-[18px] font-400 text-main-400 desktop:text-[14px]">Join our community</p>

          <Flex direction="flex-row" className="space-x-4 flex-wrap">
            {SOCIAL_LIST.map((item, index) => (
              <Link key={`social_link_${index}`} href={item.link} className="cursor-pointer">
                {<item.icon className="w-10 h-10 text-dark desktop:w-8" />}
              </Link>
            ))}
          </Flex>
        </Flex>
        {/* Explore & Media */}
        <Flex className="space-x-32 desktop:space-x-8">
          {/* Explore */}
          <Flex align="items-start" direction="flex-col" className="space-y-8">
            <p className="font-space_mono text-[24px] font-700 desktop:text-[20px]">Explore</p>
            <Flex direction="flex-col" className="space-y-5 text-[14px] font-400">
              {MENU_LIST.map((menu, index) => (
                <Link
                  key={`navbar_menu_${index}`}
                  href={menu.link}
                  className={"text-main-400 hover:underline cursor-pointer"}
                >
                  {menu.name}
                </Link>
              ))}
            </Flex>
          </Flex>
          {/* Media  */}
          <Flex align="items-start" direction="flex-col" className="space-y-8">
            <p className="font-space_mono text-[24px] font-700 desktop:text-[20px]">Media</p>
            <Flex direction="flex-col" className="space-y-5 text-[14px] font-400">
              {MEDIA_LIST.map((menu, index) => (
                <Link
                  key={`navbar_menu_${index}`}
                  href={menu.link}
                  className={"text-main-400 hover:underline cursor-pointer"}
                >
                  {menu.name}
                </Link>
              ))}
            </Flex>
          </Flex>
        </Flex>

        {/* Join our weekly digest */}
        <Flex align="items-start" direction="flex-col" className="space-y-8">
          <p className="font-space_mono text-[24px] font-700 desktop:text-[20px]">Join Our Weekly Digest</p>
          <p className="text-[18px] font-400 text-main-400 desktop:text-[14px]">Weekly updates, no spams, guaranteed</p>

          <div className="w-full laptop:max-w-[300px] relative h-[67px] desktop:h-[55px]">
            <input
              value={email}
              placeholder="Enter your email here"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-full px-6 py-4 text-[18px] font-400  text-black rounded-3xl border-none outline-none desktop:text-[14px]"
            />

            <button
              type="submit"
              onClick={subscribe}
              className="absolute right-0 bg-primary h-full w-1/3 rounded-3xl text-center text-black font-600 text-[18px] desktop:text-[14px]"
            >
              Subscribe
            </button>
          </div>
        </Flex>
      </Flex>

      <div className="py-[22.5px] border-t border-solid border-primary opacity-45 mt-[83px]">
        <span className="text-[13.5px] font-400">Ⓒ ZNC Connect . All Rights Reserved.</span>
      </div>
    </Container>
  );
}
