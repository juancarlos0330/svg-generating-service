import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";

import { useRouter } from "next/router";
import { GeneralCard1 } from "@/components/Card";
import { GENERAL_CARD_LIST_2 } from "@/utils/constants";
import { Container, Flex, GradientText } from "@/components";

function BadgesView() {
  const router = useRouter();
  return (
    <Container>
      <Flex align="items-center" className="space-x-12 laptop:flex-col-reverse laptop:space-x-0">
        <div className="w-1/2 laptop:w-full laptop:pt-20">
          <Flex direction="flex-col" className="space-y-[35px] font-space_grotesk laptop:items-center">
            <div className="font-space_grotesk font-700 text-[48px] uppercase desktop:text-[30px] mobile:text-[24px] laptop:text-center">
              How to get <GradientText>badges ?</GradientText>
            </div>

            <Flex
              direction="flex-col"
              className="text-main-400 text-[16px] font-400 desktop:text-[14px] mobile:text-[12px]"
            >
              <p>
                Earn recognition on ZNS with our badge system, rewarding your loyalty, domain ownership, and follower
                count
              </p>
              <br />

              <ul className="list-decimal pl-5">
                <li>{"Joining Duration Badge: Earn badges based on the number of days you've been with ZNS."}</li>
                <li>{"Domain Count Badge: Accumulate badges according to the number of domains you've minted."}</li>
                <li>
                  {"Domain Length Badge: Receive badges reflecting the length of characters in your domain names."}
                </li>
                <li>{"Follower Count Badge: Obtain badges based on the number of followers you have on ZNS."}</li>
              </ul>
            </Flex>

            <button
              onClick={() => router.push("/badges")}
              className="max-w-[528px] h-[80px] flex-shrink-0 rounded-[53px] border border-solid border-main-300 bg-primary_gradient_button  desktop:h-[60px] mobile:h-[60px] laptop:px-20 tablet:px-4"
            >
              <span className="uppercase text-primary text-[26px] font-space_grotesk font-700 desktop:text-[24px] mobile:text-[20px]">
                Mint Badges
              </span>
            </button>
          </Flex>
        </div>
        <div className="w-1/2 laptop:w-full overflow-x-clip">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            loop={true}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false
            }}
            modules={[EffectCoverflow, Autoplay]}
            className="overflow_effect_swiper"
          >
            {GENERAL_CARD_LIST_2.map((item, index) => (
              <SwiperSlide key={`domain_card_${index}`}>
                <GeneralCard1 {...item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Flex>
    </Container>
  );
}

export default BadgesView;
