import type { NextPage } from "next";

import {
  HeroView,
  IdentifyView,
  BadgesView,
  MultiChainView,
  HowItWorksView,
  PersonalizedView,
  UtilityView
} from "@/views/home";
import { Flex } from "@/components";
import { Page } from "@/components/Page";

const Home: NextPage = () => {
  return (
    <Page name="home">
      <Flex className="space-y-[200px] desktop:space-y-[180px] small:space-y-[150px]" direction="flex-col">
        <HeroView />
        <IdentifyView />
        <BadgesView />
        <MultiChainView />
        <HowItWorksView />
        <PersonalizedView />
        <UtilityView />
      </Flex>
    </Page>
  );
};

export default Home;
