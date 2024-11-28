import React from "react";
import { TabView } from "@/views/badges";
import { Container } from "@/components";
import { Page } from "@/components/Page";

const Badges: React.FC = () => {
  return (
    <Page name="badges">
      <Container>
        <TabView />
      </Container>
    </Page>
  );
};

export default Badges;
