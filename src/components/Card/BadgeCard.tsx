import React from "react";
import { Flex, Image } from "..";
import { BadgeCardProps } from "@/types/card";

const BadgeCard: React.FC<BadgeCardProps> = ({ index, title, description, src }) => {
  return (
    <Flex
      direction="flex-col"
      align="items-center"
      className="max-w-[330px] h-[470px] bg-black/40 rounded-xl flex-shrink px-[30px] py-[10px] border border-solid border-main-300 cursor-pointer space-y-[40px] laptop:h-[420px] mobile:h-[400px] final:h-[360px]"
    >
      <Image src={src} width={208} height={208} alt={`logo-${title}`} className="laptop:h-[150px] laptop:w-[150px]" />
      <Flex direction="flex-col" className="text-center space-y-[10px]">
        <p className="font-space_grotesk text-[24px] font-700 laptop:text-[20px]">
          {index} <span className="text-primary">{title}</span>
        </p>
        <p className="text-[16px] font-400 laptop:text-[14px]">{description}</p>
      </Flex>
    </Flex>
  );
};

export default BadgeCard;
