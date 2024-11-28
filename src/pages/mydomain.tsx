import React from "react";
import { TabView } from "@/views/mydomain";
import { Container } from "@/components";
import { Page } from "@/components/Page";

const MyDomain: React.FC = () => {
  return (
    <Page name="domains">
      <Container>
        <TabView />
      </Container>
    </Page>
  );
};

export default MyDomain;
