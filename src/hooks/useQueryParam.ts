import { useQueryState } from "nuqs";

export const useQueryParam = () => {
  const [domain, setDomain] = useQueryState("domain");
  const [tab, setTab] = useQueryState("tab");

  return { domain, setDomain, tab, setTab };
};

export default useQueryParam;
