import { Flex, GradientText } from "@/components";
import { CATEGORY_LIST } from "@/utils/constants";
import clsx from "clsx";
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import { useGetChainName } from "@/utils/web3/hooks/useGetChainName";

const ProfileView: React.FC<{ domain: any }> = ({ domain }) => {
  const [isDrop, setIsDrop] = useState<boolean>(false);
  const [category, setCategory] = useState<number>(0);
  const [categoryLabel, setCategoryLabel] = useState<string>(domain.category);
  let updatedCategory = "";

  // State variables for profile data
  const [name, setName] = useState<string>(domain.name);
  const [bio, setBio] = useState<string>(domain.bio);
  const [location, setLocation] = useState<string>(domain.location);
  const [website, setWebsite] = useState<string>(domain.website);
  const chainName = useGetChainName();

  const handleCategory = (id: number) => {
    const categoryItem = CATEGORY_LIST.find((item) => item.id === id);
    if (categoryItem) {
      updatedCategory = categoryItem.label;
      setCategory(categoryItem.id);
      setCategoryLabel(categoryItem.label.replace(/\s+/g, ""));
    }
    setIsDrop(false);
  };
  let chain = chainName;

  // Handler for updating the profile
  const handleUpdateProfile = async () => {
    try {
      if (!validateWebsite(website)) {
        toast.error("Please enter a valid website URL.");
        return; // Stop further execution if website is invalid
      }
      const toasts = toast.loading("Updating...");
      const response = await fetch("/api/domain/update/updateDomain", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: domain.id,
          name,
          bio,
          location,
          website,
          category: categoryLabel,
          chain
        })
      });

      if (response.ok) {
        toast.dismiss(toasts);
        // Handle success
        console.log(response.json());
        toast.success("Updated your profile");
        console.log("Updated your profile");
      } else {
        // Handle error
        toast.error("Error happened");
        console.error("Error updating profile:", response.statusText);
      }
    } catch (error) {
      toast.error("Error happened");
      console.error("Error updating profile:", error);
    }
  };

  const validateWebsite = (websiteUrl: string) => {
    const regex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;
    return regex.test(websiteUrl);
  };

  return (
    <div className="w-full">
      <div className="uppercase text-[36px] font-500 font-space_grotesk border-b-2 border-primary/30 pb-3 small:text-center">
        <GradientText>my profile</GradientText>
      </div>
      <Flex direction="flex-col" className="pt-5 space-y-4 w-[578px] laptop:w-full">
        <Flex direction="flex-col" className="w-full space-y-[10px]">
          <p className="text-[16px] font-500 text-main-900 ">Name</p>
          <input
            value={name}
            placeholder={`${name || "Enter your name"}`}
            onChange={(e) => setName(e.target.value)}
            className="placeholder:text-[14px] w-full h-[54px] rounded-xl px-4 placeholder:text-white-500 border border-main-300 outline-none bg-black/40"
          />
        </Flex>
        <Flex direction="flex-col" className="w-full space-y-[10px]">
          <p className="text-[16px] font-500 text-main-900 ">Short bio</p>
          <textarea
            value={bio}
            placeholder={`${bio || "Enter your bio"}`}
            onChange={(e) => setBio(e.target.value)}
            className="placeholder:text-[14px] w-full h-[135px] rounded-xl p-4 placeholder:text-white-500 border border-main-300 outline-none bg-black/40"
          />
        </Flex>
        <Flex direction="flex-col" className="w-full space-y-[10px]">
          <p className="text-[16px] font-500 text-main-900 ">Location</p>
          <input
            value={location}
            placeholder={`${location || "Enter your location"}`}
            onChange={(e) => setLocation(e.target.value)}
            className="placeholder:text-[14px] w-full h-[54px] rounded-xl px-4 placeholder:text-white-500 border border-main-300 outline-none bg-black/40"
          />
        </Flex>
        <Flex direction="flex-col" className="w-full space-y-[10px]">
          <p className="text-[16px] font-500 text-main-900 ">Web Site</p>
          <input
            value={website}
            placeholder={`${website || "Enter your website"}`}
            onChange={(e) => setWebsite(e.target.value)}
            className="placeholder:text-[14px] w-full h-[54px] rounded-xl px-4 placeholder:text-white-500 border border-main-300 outline-none bg-black/40"
          />
        </Flex>
        <Flex direction="flex-col" className="w-full space-y-[10px] relative">
          <p className="text-[16px] font-500 text-main-900 ">Category</p>
          <Flex align="items-center" justifyContent="justify-between" className="relative w-full h-[54px] rounded-xl">
            <div
              onClick={() => setIsDrop(!isDrop)}
              className={clsx(
                "bg-black/40 cursor-pointer text-[14px] w-full h-full rounded-xl px-4 border border-main-300 items-center inline-flex",
                category === 0 ? "text-white-500" : "text-white"
              )}
            >
              {category === 0
                ? "Choose your category"
                : CATEGORY_LIST.filter((item) => item.id === category).length
                  ? CATEGORY_LIST.filter((item) => item.id === category)[0].label
                  : ""}
            </div>

            <button
              type="submit"
              className="absolute right-0 rounded-full text-center w-10 h-10 inline-flex items-center justify-center"
            >
              {!isDrop ? <IoIosArrowDown className="w-5 h-5" /> : <IoIosArrowUp className="w-5 h-5" />}
            </button>
          </Flex>

          <Flex
            direction="flex-col"
            className={clsx(
              "duration-200 rounded-2xl overflow-clip absolute w-full top-[85px]",
              isDrop ? "visible opacity-100" : "invisible opacity-0"
            )}
          >
            {CATEGORY_LIST.map((item, index) => (
              <Flex
                action={() => handleCategory(item.id)}
                align="items-center"
                key={`category_list_${index}`}
                className="z-10 p-5 bg-black border-main-200 border-b-2 cursor-pointer hover:text-primary"
              >
                <p className="text-[14px] font-500">{item.label}</p>
              </Flex>
            ))}
          </Flex>
        </Flex>
        <div className="pt-10  w-[141px] tablet:w-full">
          <button
            onClick={handleUpdateProfile}
            className="w-full bg-primary text-[16px] font-500 px-[38px] py-[11px] rounded-3xl text-black "
          >
            Update
          </button>
        </div>
      </Flex>
      <Toaster />
    </div>
  );
};

export default ProfileView;
