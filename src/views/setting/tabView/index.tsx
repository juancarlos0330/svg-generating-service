import React from "react";

import clsx from "clsx";
import { Flex, GradientText } from "@/components";
import { CreditView, FavoriteView, SecurityView, GiftCardView } from "@/views/setting";
// assets
import { CREDIT_SETTINGS } from "@/utils/constants";
import { useQueryParam } from "@/hooks";

const TabView: React.FC = () => {
  const { tab, setTab } = useQueryParam();

  return (
    <Flex direction="flex-col" className="pt-[200px] mobile:pt-[150px] space-y-[97px]">
      <Flex justifyContent="justify-center">
        <div className="text-[64px] small:text-[44px] font-500 uppercase">
          <GradientText>settings</GradientText>
        </div>
      </Flex>
      <Flex justifyContent="justify-between" className="space-x-10 tablet:flex-col tablet:space-x-0 tablet:space-y-10">
        <div className="w-[233px] tablet:w-full">
          <Flex direction="flex-col" className="tablet:flex-row tablet:justify-between">
            {CREDIT_SETTINGS.map((item, mapIndex) => (
              <Flex
                key={`profile-settings-${mapIndex}`}
                align="items-center"
                justifyContent="justify-start"
                action={() => setTab(item.tabName)}
                className={clsx(
                  "w-full space-x-[15px] px-[25px] py-[17px] rounded-2xl cursor-pointer",
                  tab === item.tabName ? "text-black bg-primary_gradient_text" : "text-main-400 hover:text-white",
                  "tablet:justify-center tablet:px-0",
                  "small:space-x-2 small:bg-none small:rounded-none",
                  tab === item.tabName && "small:text-primary border-b-2 border-primary",
                  "mobile:flex-col mobile:justify-center mobile:items-center mobile:space-y-1 mobile:space-x-0"
                )}
              >
                <item.icon className="w-[20px] h-[20px] small:w-[25px] small:h-[25px]" />
                <p className="text-[16px] small:hidden font-500 uppercase">{item.label}</p>
              </Flex>
            ))}
          </Flex>
        </div>
        <div className="flex-1">
          {tab === "credits" && <CreditView />}
          {tab === "favorite" && <FavoriteView />}
          {tab === "security" && <SecurityView />}
          {tab === "gift-cards" && <GiftCardView />}
        </div>
      </Flex>
    </Flex>
  );
};

export default TabView;
