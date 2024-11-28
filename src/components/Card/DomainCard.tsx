// import React from "react";
// import { Flex, Image } from "..";

// import clsx from "clsx";
// import { QRCode } from "react-qrcode-logo";
// import { DomainCardProps } from "@/types/card";

// const DomainCard: React.FC<DomainCardProps & { level: number }> = ({ name, tld, src, borderColor, level }) => {
//   const className = "item level" + level;

//   return (
//     <Flex
//       direction="flex-col"
//       justifyContent="justify-center"
//       className={clsx(
//         "max-w-[300px] bg-black/80 rounded-3xl p-3",
//         "border border-solid border-black",
//         "font-space_grotesk ",
//         "cursor-pointer backdrop-blur-sm backdrop-filter",
//         borderColor,
//         className
//       )}
//     >
//       <div className="relative">
//         <div className={clsx("rounded-3xl overflow-clip w-full h-[280px]", level != 0 && "tablet:h-[230px]")}>
//           <Image
//             src={src}
//             alt={`card-${name}`}
//             width={280}
//             height={280}
//             className="rounded-2xl object-cover w-full h-full"
//           />
//         </div>
//         <Image src="/img/zns-logo.png" alt="ZNS logo" width={40} height={40} className="absolute left-2 top-2" />
//       </div>
//       <Flex direction="flex-col" className="mt-3">
//         <p className="text-start font-900 bg-primary_gradient_text text-transparent bg-clip-text text-[40px] tablet:text-[35px]">
//           {name}
//         </p>
//         <Flex justifyContent="justify-between" align="items-end">
//           <p className="text-[28px] tablet:text-[24px] font-700">.{tld}</p>
//           <QRCode
//             size={60}
//             bgColor="transparent"
//             fgColor="white"
//             value={""}
//             logoImage={"/img/zns-logo.png"}
//             logoWidth={20}
//             logoHeight={20}
//           />
//         </Flex>
//       </Flex>
//     </Flex>
//   );
// };

// export default DomainCard;

import React from "react";
import { Flex, Image } from "..";

import clsx from "clsx";
import QrSvg from "@wojtekmaj/react-qr-svg";
import { DomainCardProps } from "@/types/card";

const DomainCard: React.FC<DomainCardProps> = ({ name, tld, src, borderColor }) => {
  return (
    <Flex
      direction="flex-col"
      justifyContent="justify-center"
      className={clsx(
        "max-w-[300px] bg-black/80 rounded-3xl p-3",
        "border border-solid border-black ",
        "font-space_grotesk ",
        "cursor-pointer backdrop-blur-sm backdrop-filter",
        borderColor
      )}
    >
      <div className="relative">
        <div className="rounded-3xl overflow-clip w-full h-[280px] tablet:h-[200px]">
          <Image
            src={src}
            alt={`card-${name}`}
            width={280}
            height={280}
            className="rounded-2xl object-cover w-full h-full"
          />
        </div>
        <Image src="/img/zns-logo.png" alt="ZNS logo" width={40} height={40} className="absolute left-2 top-2" />
      </div>
      <Flex direction="flex-col">
        <p className="font-500 text-[60px] bg-primary_gradient_text text-transparent bg-clip-text tablet:text-[45px]">
          {name}
        </p>
        <Flex justifyContent="justify-between">
          <p className="text-[30px] font-700">.{tld}</p>
          <QrSvg height={48} width={48} bgColor="transparent" fgColor="white" value={""} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DomainCard;
