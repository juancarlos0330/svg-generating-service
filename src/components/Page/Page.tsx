import React, { PropsWithChildren } from "react";
// component
import { Seo } from "../SEO";
// utils
import { getInformation } from "@/utils/seo-information";
// types
import { PageProps } from "@/types/page";

// --------------------------------------------------

const Page: React.FC<PropsWithChildren<PageProps>> = ({ name, children }) => {
  const props = getInformation(name);
  return (
    <>
      <Seo {...props} />
      {children}
    </>
  );
};
export default Page;
