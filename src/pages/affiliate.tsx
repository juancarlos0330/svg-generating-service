import React from "react";
import { TabView } from "@/views/affiliate";
import { Container } from "@/components";
import { Page } from "@/components/Page";

const MyDomain: React.FC = () => {
  return (
    <Page name="affiliate">
      <Container>
        <TabView />
      </Container>
    </Page>
  );
};

export default MyDomain;
