import React, { useEffect, useState } from "react";
import { Flex, Image } from "@/components";
import { AffiliateModal, ViewDomainModal } from "@/components/Modal";
import { useGetDomainTLD } from "@/utils/web3/hooks/useGetDomainTLD";
// assets
import clsx from "clsx";
import TransactionLoading from "@/components/Loaders/TransactionLoading";

const CustomRank = ({ rank }: { rank: number }) => {
  let ImgSrc = "";

  if (rank < 4) {
    ImgSrc = `/img/rank/${rank}.png`;
  }

  return (
    <>
      {rank < 4 ? (
        <Image
          src={ImgSrc}
          width={20}
          height={20}
          alt={`rank ${rank}`}
          className="w-[35px] h-[35px] small:w-[30px] small:h-[30px]"
        />
      ) : (
        <p
          className={clsx(
            "bg-main-300 p-3 small:p-2 w-[20px] h-[20px] rounded-full inline-flex justify-center items-center text-[12px] small:text-[10px]"
          )}
        >
          {rank}
        </p>
      )}
    </>
  );
};

const TabItem: React.FC<{ affilate_items: any; isYou: boolean }> = ({ affilate_items, isYou }) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>(1);
  const TLD = useGetDomainTLD();

  const onClickItem = (id: number) => {
    setShowModal(true);
    setSelected(id);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div>
      <Flex direction="flex-col" className="space-y-3">
        <div className="overflow-x-auto">
          {affilate_items.length !== 0 ? (
            <table className="w-full tablet:w-[768px] small:w-[650px] mobile:w-[430px] divide-y divide-main-200">
              <thead>
                <tr>
                  <td className="sticky left-0 z-10 pl-5 tablet:pl-2 tablet:w-[200px] small:w-[50%] mobile:w-[60%] final:w-[50px] bg-black small:text-[14px] mobile:text-[12px]">
                    <Flex className="space-x-8">
                      <p>#</p>
                      <p>MyPosition</p>
                    </Flex>
                  </td>
                  <td className="py-3 text-start bg-black w-[150px] tablet:w-[50px] small:w-[50px] small:text-[14px] mobile:text-[12px]">
                    My Refferals
                  </td>
                  <td className="py-3 text-end bg-black w-[150px] tablet:w-[50px] small:w-[50px] small:text-[14px] mobile:text-[12px] pr-5 tablet:pr-2">
                    Total Earning
                  </td>
                </tr>
              </thead>
              {isLoading && (
                <tbody>
                  <tr>
                    <td colSpan={3}>
                      <div className="flex items-center justify-center py-3">
                        <TransactionLoading size={60} color="#CAFC01" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              )}
              {!isLoading && (
                <tbody className="divide-y divide-main-200">
                  {affilate_items.length !== 0 &&
                    affilate_items.map((item: any, index: number) => (
                      <tr key={index} onClick={() => onClickItem(index)} className="cursor-pointer">
                        <td className="sticky left-0 z-10  px-5 tablet:px-2 py-5 bg-black">
                          <Flex
                            align="items-center"
                            justifyContent="justify-start"
                            className="w-full space-x-5 tablet:space-x-2"
                          >
                            <div className="text-center w-[35px]">
                              {item.isYou ? <CustomRank rank={item.ranking} /> : <CustomRank rank={index + 1} />}
                            </div>
                            <Flex
                              align="items-center"
                              justifyContent="justify-start"
                              className="space-x-4 mobile:space-x-2"
                            >
                              <Image
                                src={item.src}
                                alt={item.domain}
                                fill
                                className="w-[62px] h-[62px] small:w-12 small:h-12 shrink-0 rounded-full"
                              />
                              <Flex direction="flex-col" className="relative space-y-1">
                                <p className="text-[18px] font-500 break-all tablet:text-[16px] small:text-[14px] mobile:text-[12px]">
                                  {item.domain}.{TLD}
                                </p>
                                {item.isPrimary && (
                                  <p className="absolute -top-5 text-[10px] border border-verified rounded-full inline-flex items-center justify-center px-2">
                                    {"Primary"}
                                  </p>
                                )}
                              </Flex>
                            </Flex>
                          </Flex>
                        </td>
                        <td className="bg-black">
                          <p className="text-start text-success small:text-[14px] mobile:text-[12px]">
                            {item.refferals}
                          </p>
                        </td>
                        <td className="bg-black">
                          <p className="text-end small:text-[14px] mobile:text-[12px] pr-5 tablet:pr-2">
                            {item.earning} USDT
                          </p>
                        </td>
                      </tr>
                    ))}
                </tbody>
              )}
            </table>
          ) : (
            <p className="border border-main-200 rounded-lg inline-flex justify-center items-center w-full py-[100px] text-[30px] text-main-200 font-700 text-center desktop:text-[22px] font-space_grotesk">
              {"here is not have affiliate domains"}
            </p>
          )}
        </div>
      </Flex>

      <AffiliateModal showModal={showModal} setShowModal={setShowModal} selected={selected} isYou={isYou} />
    </div>
  );
};

export default TabItem;
