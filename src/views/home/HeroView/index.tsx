import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Autocomplete from "@mui/material/Autocomplete";
import { Container, Flex, GradientText } from "@/components";
import { DomainCard } from "@/components/Card";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
// assets
import { MdOutlineSearch as Search } from "react-icons/md";
import { HiOutlineRocketLaunch as Rocket } from "react-icons/hi2";
import { useAccount } from "wagmi";
import { DOMAIN_CARD_LIST } from "@/utils/constants";
import { useDomainDetails } from "@/utils/web3/hooks/useDomainDetails";
import { fetchDomainDetails } from "@/utils/web3/core/fetchDomainDetails";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import useStore from "@/utils/web3/store";
import { getUserDetails } from "@/utils/api/refs/getUserByRefs";

function HeroView() {
  const router = useRouter();
  const refferalParams = useSearchParams();
  const refferal = refferalParams.get("ref");
  const { setReferalState } = useStore();
  const { isConnected } = useAccount();
  const [searchedDomain, setSearchedDomain] = useState<string>("");
  const [domainStatus, setDomainStatus] = useState<boolean>(false);
  const { domainData } = useDomainDetails(searchedDomain);
  const [AutocompleteOpen, setAutocompleteOpen] = useState<boolean>(true);
  const timeoutId = useRef<undefined | ReturnType<typeof setTimeout>>(undefined);
  const [isLoading, setLoading] = useState<boolean>(false);

  const options = [
    {
      label: searchedDomain,
      status: searchedDomain === "" ? "" : domainStatus
    }
  ];

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (refferal) {
          const userAddress = await getUserDetails(refferal);
          setReferalState(userAddress);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUserDetails();
  }, [refferal]);

  useEffect(() => {
    if (isConnected) {
      if ((domainData as { domainName: string })?.domainName === "") {
        setDomainStatus(true);
      } else {
        setDomainStatus(false);
      }
      setLoading(false);
    }
  }, [domainData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputText = e.target.value.toLowerCase();
    inputText = inputText.replace(/[^a-z0-9\s-]/g, "");
    inputText = inputText.replace(/\s+/g, "-");
    inputText = inputText.replace(/-{2,}/g, "-");
    inputText = inputText.trim();

    if (inputText.length > 24) {
      toast.error("Search limited to first 24 characters for security");
      inputText = inputText.slice(0, 23);
    }
    clearTimeout(timeoutId.current);
    setSearchedDomain(inputText);
    setLoading(true);

    timeoutId.current = setTimeout(async () => {
      if (!isConnected) {
        const domainData = await fetchDomainDetails(inputText);
        if ((domainData as { domainName: string })?.domainName === "") {
          setDomainStatus(true);
        } else {
          setDomainStatus(false);
        }
        setLoading(false);
      }
    }, 300);
  };

  const handleButtonClick = () => {
    const trimmedDomain = searchedDomain.replace(/^-+|-+$/g, "");
    setAutocompleteOpen(false);
    router.push({
      pathname: `/search`,
      query: { domain: trimmedDomain }
    });
  };

  return (
    <Container>
      <Flex
        align="items-center"
        className="space-x-12 laptop:flex-col-reverse tablet:space-x-0 pt-[200px] tablet:pt-[150px]"
      >
        <div className="w-1/2 laptop:w-full">
          <Flex direction="flex-col" className="font-space_grotesk space-y-[35px] laptop:pt-[57px]">
            <Flex direction="flex-col" className="font-700 uppercase">
              <div className="text-[32px] mobile:text-[20px]">
                <p>Your identity</p>
                <p>
                  Your own <span className="text-primary">#Web3</span> page
                </p>
              </div>
              <div className="text-[56px] desktop:text-[40px] mobile:text-[32px]">
                Claim <GradientText>your domain</GradientText>
              </div>
            </Flex>
            <div className="relative uppercase">
              <Autocomplete
                open={searchedDomain !== "" && AutocompleteOpen}
                onBlur={() => setAutocompleteOpen(false)}
                onFocus={() => setAutocompleteOpen(true)}
                options={options}
                renderOption={(props, option) => {
                  return (
                    <Flex
                      key={option.label}
                      align="items-center"
                      justifyContent="justify-between"
                      className="p-2 px-6 font-space_grotesk cursor-pointer hover:bg-gray-200/40"
                      action={() => handleButtonClick()}
                    >
                      <p className="text-5 font-600 text-main-300">{option.label}</p>
                      <p className={`text-4 font-500 ${!option.status ? "text-red-500" : "text-blue-500"}`}>
                        {isLoading ? (
                          <AiOutlineLoading3Quarters className="w-5 h-5 loading-icon" />
                        ) : option.status === "" ? (
                          ""
                        ) : option.status ? (
                          <p className="bg-verified p-2 rounded-full" />
                        ) : (
                          <p className="bg-red-500 p-2 rounded-full" />
                        )}
                      </p>
                    </Flex>
                  );
                }}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <input
                      {...params.inputProps}
                      value={searchedDomain}
                      onChange={handleInputChange}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleButtonClick();
                      }}
                      placeholder="Search domain names"
                      className="w-full h-[56px] px-6 py-4 text-[18px] font-400 rounded-2xl border-none outline-none text-black mobile:h-[50px]"
                    />
                    <button
                      type="submit"
                      className="absolute right-0 bg-primary h-full w-[110px] rounded-2xl text-black font-600 text-[18px] inline-flex items-center justify-center"
                      onClick={handleButtonClick}
                    >
                      <Search className="text-black w-8 h-8" />
                    </button>
                  </div>
                )}
              />
            </div>

            <Flex
              justifyContent="justify-between"
              className="space-x-2 uppercase text-[16px] mobile:text-[12px] final:text-[10px]"
            >
              <div>
                <p className="text-primary">50.000 +</p>
                <p>Domain minted</p>
              </div>
              <div>
                <span className="text-primary">MORE</span> THAN
                <p>Domain names</p>
              </div>
              <div>
                <p>
                  <span className="text-primary">50+</span> integration
                </p>
                <p>
                  <span className="text-primary">100+</span> partners
                </p>
              </div>
            </Flex>

            <Flex
              direction="flex-col"
              className="space-y-7 text-[24px] font-700 desktop:text-[18px] tablet:text-[24px] small:text-[18px] mobile:text-[14px] final:text-[12px]"
            >
              <button className="h-[60px] px-6 border-2 border-solid border-primary rounded-3xl mobile:h-[50px] tablet:px-3">
                <Flex align="items-center" justifyContent="justify-center" className="space-x-3">
                  <Rocket className="text-primary w-5 h-5" />
                  <span>Change Numeric To Alphabetic</span>
                </Flex>
              </button>
              <button className="h-[60px] px-6 border-2 border-solid border-primary rounded-3xl mobile:h-[50px]  tablet:px-3">
                <Flex align="items-center" justifyContent="justify-center" className="space-x-3">
                  <Rocket className="text-primary w-5 h-5" />
                  <span>Get Access To Any Web3 APPS</span>
                </Flex>
              </button>
            </Flex>
          </Flex>
        </div>
        <div className="w-1/2 laptop:w-full overflow-x-clip relative">
          {/* <div id="carousel" className="noselect">
            <div
              className="arrow arrow-left inline-flex justify-center items-center bg-main-200 p-2"
              onClick={moveLeft}
            >
              <BsArrowLeft />
            </div>
            <TransitionGroup transitionName={direction}>{generateItems()}</TransitionGroup>
            <div
              className="arrow arrow-right inline-flex justify-center items-center bg-main-200 p-2"
              onClick={moveRight}
            >
              <BsArrowRight />
            </div>
          </div> */}
          <Swiper
            effect="cards"
            loop
            centeredSlides={true}
            grabCursor={true}
            cardsEffect={{
              slideShadows: false,
              perSlideRotate: 20
            }}
            modules={[EffectCards]}
            width={250}
            breakpoints={{
              769: {
                width: 300
              }
            }}
            rewind
            slideToClickedSlide
            className="badge_effect_swiper"
          >
            {DOMAIN_CARD_LIST.map((item, index) => (
              <SwiperSlide key={`domain_card_${index}`}>
                <DomainCard {...item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Flex>
    </Container>
  );
}

export default HeroView;
