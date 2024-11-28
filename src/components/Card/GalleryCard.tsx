import { CardProps } from "@/types/card";
import { Flex, Image } from "..";
import React from "react";

const GalleryCard: React.FC<CardProps> = ({ count, name, src }) => {
  return (
    <Flex
      direction="flex-col"
      className="w-full h-[370px] small:w-[314px] mobile:w-[250px] mobile:h-[350px] rounded-xl space-y-5 pb-3 bg-black-200/40 overflow-hidden"
    >
      <Image src={src} alt={name} fill className="w-full h-[250px] shrink-0" />
      <Flex direction="flex-col" className="font-space_grotesk space-y-1 px-[22px] pb-[10px]">
        <p className="text-[24px] font-700 uppercase">{name}</p>
        <p className="text-[14px] text-primary font-700">{count}</p>
      </Flex>
    </Flex>
  );
};

export default GalleryCard;
