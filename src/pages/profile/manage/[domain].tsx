import type { NextPage } from "next";
import { TabView } from "@/views/dynamic-setting";
import { Container } from "@/components";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Page } from "@/components/Page";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";
import NotFound from "@/components/NotFound";
import { useGetChainName } from "@/utils/web3/hooks/useGetChainName";
import { useDomainDetails } from "@/utils/web3/hooks/useDomainDetails";
import TransactionLoading from "@/components/Loaders/TransactionLoading";

// import { redirect } from "next/navigation";
// import { useDomainDetails } from "@/utils/web3/useDomainDetails";

const Setting: NextPage = (props) => {
  const router = useRouter();
  // const slug = router.query.domain;

  const searchParams = useSearchParams();
  const editmode = searchParams.get("editmode");
  const [owner, setOwner] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("Trying to load profile Details");

  const [domain, setDomain] = useState<string>(router.query.domain as string);

  const [domainStatus, setDomainStatus] = useState<"true" | "loading" | "false" | "error">("loading");
  const { domainData } = useDomainDetails(domain?.split(".")[0] as string);
  console.log("domain", domain, domain?.split(".")[0]);

  const [userDataReceived, setUserDataReceived] = useState<boolean>(false);
  const [domainDataReceived, setDomainDataReceived] = useState<boolean>(false);

  const [userDetails, setUserDetails] = useState<any>({});
  const [domainDetails, setDomainDetails] = useState<any>({});

  const { address } = useAccount();
  const chainName = useGetChainName();

  const getDomaindetails = async (domainName: string | string[] | undefined, walletAddress: string, chain: string) => {
    if (walletAddress != "" && chain != "" && domainName != "") {
      try {
        setDomainDataReceived(false);
        const domainRequestBody = {
          domainName,
          address,
          chain
        };

        const response = await fetch("/api/domain/fetch/fetchDomain", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(domainRequestBody)
        });

        if (response.ok) {
          const data = await response.json();
          // console.log("Fetched domain data:", data);
          // Handle your fetched domain data here
          setDomainDataReceived(true);
          setDomainDetails(data.data);
          return data.data;
        } else {
          console.error("Failed to fetch domain:", response.statusText);
          setDomainStatus("false");
        }
      } catch (error) {
        console.error("Error fetching domain:", error);
        setDomainStatus("false");
      }
    }
  };

  const getUserDetails = async (walletAddress: string, chainName: string) => {
    if (walletAddress != "" && chainName != "") {
      try {
        setUserDataReceived(false);
        const userRequestBody = {
          walletAddress,
          chainName
        };

        const response = await fetch("/api/user/fetch/fetchUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(userRequestBody)
        });

        if (response.ok) {
          const data = await response.json();
          setUserDataReceived(true);
          setUserDetails(data.data);
          return data.data;
        } else {
          console.error("Failed to fetch user:", response.statusText);

          setDomainStatus("false");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error("Error fetching user");
        setDomainStatus("false");
      }
    }
  };

  useEffect(() => {
    if (domain) {
      setDomain(domain);
    }
  }, [router.query.slug, domain]);

  useEffect(() => {
    if (domain && address && chainName) {
      const fetchData = async () => {
        try {
          if (!userDataReceived && !domainDataReceived) {
            await Promise.all([getDomaindetails(domain, address, chainName), getUserDetails(address, chainName)]);
          }
        } catch {
          setDomainStatus("false");
        }
      };

      fetchData();
    }
  }, [domain, address, chainName]); // Specify dependencies

  useEffect(() => {
    if (userDataReceived && domainDataReceived) {
      setDomainStatus("true");
    }
  }, [userDataReceived, domainDataReceived]);

  useEffect(() => {
    setDomain(Array.isArray(router.query.domain) ? router.query.domain[0] : router.query.domain || "");
    // console.log(router.query.domain);
  }, [router.query.domain]);

  useEffect(() => {
    console.log(domainData, address);
    console.log("Validation", (domainData as { owner: string })?.owner, address);
    if (
      (domainData as { owner: string })?.owner === address &&
      address &&
      address !== undefined &&
      (domainData as { owner: string })?.owner !== "0x0000000000000000000000000000000000000000"
    ) {
      console.log("Validation", (domainData as { owner: string })?.owner, address);
      setOwner(true);
      // console.log("Owner", isOwner);
    } else {
      if (
        domainData &&
        address &&
        domain &&
        (domainData as { owner: string })?.owner !== "0x0000000000000000000000000000000000000000"
      ) {
        setOwner(false);
        toast.error("You are not the owner of this domain");
        setMessage("You are not the owner of this domain");
        router.push("/");
      }
      // console.log("Owner", isOwner);
    }
  }, [domainData, address, domain]);

  return (
    <Page name="settings">
      <Container>
        {domainStatus === "true" ? (
          <TabView
            domainName={Array.isArray(domain) ? domain[0] : domain ?? ""}
            domain={domainDetails.domain}
            user={userDetails.user}
          />
        ) : domainStatus === "loading" ? (
          <div className="text-main-300 h-[50vh] pt-[100px] inline-flex items-center w-screen justify-center text-[50px] uppercase">
            <TransactionLoading size={60} color="#CAFC01" />
          </div>
        ) : (
          <div className="py-[200px] px-[30px] small:px-[10px]">
            <NotFound label={message} />
          </div>
        )}
      </Container>
    </Page>
  );
};

export default Setting;
