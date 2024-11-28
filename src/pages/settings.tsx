import type { NextPage } from "next";
import { Container } from "@/components";
import { TabView } from "@/views/setting";
import { Page } from "@/components/Page";
import { useSearchParams } from "next/navigation";

const Credit: NextPage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("tab");

  return (
    <Page name={search === "favorite" ? "favorites" : "settings"}>
      <Container>
        <TabView />
      </Container>
    </Page>
  );
};

export default Credit;
