import React from "react";
import { CardProps } from "@/types/card";
import { Flex, Image } from "..";
import clsx from "clsx";
import toast from "react-hot-toast";

const MintCard: React.FC<any> = ({ count, name, src, type, id, description, claimed, userID }) => {
  const [claim, setClaim] = React.useState<boolean>(claimed);
  const onCLick = async () => {
    if(type === 1){
    try {
      let data = {};
      // if(true) {
        data = {
          id: userID,
          [id]: 2 // Dynamically set the property using the id from entry
        };

      const toasts = toast.loading("Claiming Badge...");
      const response = await fetch("/api/user/update/updateUser", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });


      if (response.ok) {
        toast.dismiss(toasts);
        // Handle success
        console.log(response.json());
        setClaim(true)
        toast.success("Updated Badges, Please refresh to see changes");
        console.log("Updated your profile");
      } else {
        // Handle error
        toast.error("Error happened");
        console.error("Error updating profile:", response.statusText);
      }
    // }
    } catch (error) {
      toast.error("Error happened");
      console.error("Error updating profile:", error);
    }}

  }
  return (
    <Flex
      direction="flex-col"
      align="items-center"
      justifyContent="justify-center"
      className="w-full h-[370px] small:w-[314px] mobile:w-[250px] mobile:h-[350px] rounded-xl space-y-5 pb-3 bg-black-200/40 overflow-hidden"
    >
      <Image src={src} alt={name} fill className="w-[100px] h-[100px] shrink-0 rounded-full" />
      <Flex direction="flex-col" align="items-center" className="font-space_grotesk space-y-5 px-[22px] pb-[10px]">
        <Flex direction="flex-col" className="space-y-1">
          <p className="text-[24px] text-primary font-700 font-space_grotesk text-center">{name}</p>
          <p className="text-[14px] text-center">{description}</p>
        </Flex>
        {count && <Flex className="text-[14px] font-400 space-x-3">
          <p className="text-primary">Total Minted : </p>
          <p>{count}</p>
        </Flex>}
        <button
          onClick={() => onCLick()}
          className={clsx(
            claimed && "bg-verified cursor-not-allowed",
            type === 1 && "bg-primary text-black",
            type === 2 && "bg-error cursor-not-allowed",
            type === 3 && "bg-verified cursor-not-allowed",
            "w-full rounded-3xl p-2"
          )}
        >
          {claimed && "Claimed"}
          {type === 1 && !claimed && "Claim"}
          {type === 2 && !claimed && "Not Available"}
          {type === 3 && !claimed && "Unclaimed"}
        </button>
      </Flex>
    </Flex>
  );
};

export default MintCard;
