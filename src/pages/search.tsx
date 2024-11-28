import type { NextPage } from "next";
import { Container } from "@/components";

import DomainRegisterView from "@/views/domain-register";
import { Page } from "@/components/Page";

const DomainRegisterPage: NextPage = () => {
  return (
    <Page name="register">
      <Container>
        <DomainRegisterView />
      </Container>
    </Page>
  );
};

export default DomainRegisterPage;
