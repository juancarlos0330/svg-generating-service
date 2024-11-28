import React from "react";
import { Flex, Image } from "..";
import { CardProps } from "@/types/card";

const DomainOwnCard: React.FC<CardProps> = ({ src, count, name }) => {
  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-stone-900 to-neutral-500 absolute w-1/2 h-1/3 -right-[1px] -bottom-[1px] rounded-2xl -z-10" />
      <Flex
        direction="flex-col"
        className="max-w-[330px] h-[210px] rounded-2xl bg-black px-[9px] pt-[7px] pb-[10px] space-y-1"
      >
        <Image src={src} width={330} height={109} alt={`card-${name}`} />
        <Flex direction="flex-col">
          <p className="bg-primary_gradient_text text-transparent bg-clip-text text-[32px] font-500">{name}</p>
          <p className="text-[14px] font-700">{count}</p>
        </Flex>
      </Flex>
    </div>
  );
};

export default DomainOwnCard;
