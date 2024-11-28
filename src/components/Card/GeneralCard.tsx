// import React from "react";
// import { Flex, Image } from "..";

// import clsx from "clsx";
// import { GeneralCardProps } from "@/types/card";

// const GeneralCard: React.FC<GeneralCardProps & { level: number }> = ({
//   level,
//   name,
//   avatar,
//   type,
//   src,
//   borderColor,
//   tld
// }) => {
//   const className = "item level" + level;
//   return (
//     <Flex
//       direction="flex-col"
//       justifyContent="justify-center"
//       className={clsx(
//         "max-w-[300px] bg-black/80 rounded-3xl p-3 space-y-[70px] pb-[42px] tablet:space-y-[40px] tablet:pb-[20px]",
//         "border border-solid border-black ",
//         "font-space_grotesk ",
//         "cursor-pointer backdrop-blur-sm backdrop-filter",
//         borderColor,
//         className
//       )}
//     >
//       <div className={clsx("relative")}>
//         <div
//           className={clsx(
//             "rounded-3xl overflow-hidden w-full h-[185px] tablet:h-[170px]",
//             level != 0 && "tablet:h-[230px]"
//           )}
//         >
//           <Image
//             src={src}
//             alt={`card-${name}`}
//             width={280}
//             height={185}
//             className="rounded-2xl object-cover w-full h-full"
//           />
//         </div>
//         <div className="rounded-3xl overflow-hidden w-[104px] h-[104px] absolute right-[84px] -bottom-[52px] tablet:right-[60px] tablet:-bottom-[60px]">
//           <Image
//             src={avatar}
//             alt={`avatar-${name}`}
//             width={104}
//             height={104}
//             className="rounded-full object-cover w-full h-full tablet:w-[80px] tablet:h-[80px]"
//           />
//         </div>
//       </div>

//       <Flex className="font-space_grotesk" direction="flex-col" align="items-center">
//         <p
//           className={clsx(
//             "font-500 bg-primary_gradient_text text-transparent bg-clip-text text-[34px] tablet:text-[26px]"
//           )}
//         >
//           {name}
//         </p>
//         <p className="font-700 text-[16px] tablet:text-[14px] text-center">
//           {type === "card_1" ? (
//             <>
//               Followers <span className="text-primary">{tld}</span>
//             </>
//           ) : (
//             <span>{tld}</span>
//           )}
//         </p>
//       </Flex>
//     </Flex>
//   );
// };

// export default GeneralCard;

import React from "react";
import { Flex, Image } from "..";

import clsx from "clsx";
import { GeneralCardProps } from "@/types/card";

const GeneralCard: React.FC<GeneralCardProps> = ({ name, avatar, type, src, borderColor }) => {
  return (
    <Flex
      direction="flex-col"
      justifyContent="justify-center"
      className={clsx(
        "max-w-[300px] bg-black/80 rounded-3xl p-3 space-y-[70px] pb-[42px] tablet:space-y-[40px] tablet:pb-[20px]",
        "border border-solid border-black ",
        "font-space_grotesk ",
        "cursor-pointer backdrop-blur-sm backdrop-filter",
        borderColor
      )}
    >
      <div className="relative">
        <div className="rounded-3xl overflow-hidden w-full h-[185px] tablet:h-[180px]">
          <Image
            src={src}
            alt={`card-${name}`}
            width={280}
            height={185}
            className="rounded-2xl object-cover w-full h-full"
          />
        </div>
        <div className="rounded-3xl overflow-hidden w-[104px] h-[104px] absolute right-[84px] -bottom-[52px] tablet:right-[44px] tablet:-bottom-[60px] mobile:right-[44px]">
          <Image
            src={avatar}
            alt={`avatar-${name}`}
            width={104}
            height={104}
            className="rounded-full object-cover w-full h-full  tablet:w-[80px] tablet:h-[80px]"
          />
        </div>
      </div>

      <Flex className="font-space_grotesk" direction="flex-col" align="items-center">
        <p className="font-500 bg-primary_gradient_text text-transparent bg-clip-text text-[34px] tablet:text-[26px]">
          {name}
        </p>
        <p className="font-700 text-[16px]">
          {type === "card_1" ? (
            <>
              Followers <span className="text-primary">8001</span>
            </>
          ) : (
            "Own 3 domains on ZNS"
          )}
        </p>
      </Flex>
    </Flex>
  );
};

export default GeneralCard;
