import React from "react";
import { Flex, Image } from "@/components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const HelpSection: React.FC = () => {
  return (
    <Flex align="items-center" justifyContent="justify-center" className="space-x-[32px] pt-[60px] w-full">
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        pagination={{
          clickable: true
        }}
        navigation={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false
        }}
        modules={[Pagination, Autoplay, Navigation]}
        breakpoints={{
          500: {
            slidesPerView: 2
          },
          800: {
            slidesPerView: 3
          }
        }}
        className="bage_type_slider"
      >
        <SwiperSlide>
          <Flex align="items-center" className="space-x-[32px]">
            <Flex direction="flex-col" align="items-center" className="space-y-3">
              <div className="w-[92px] bg-primary/40 uppercase rounded-lg text-[22px] font-700 font-space_grotesk inline-flex items-center justify-center">
                Click
              </div>
              <Flex
                direction="flex-col"
                className="w-[198px] rounded-xl bg-black-200/40 border border-main-200 overflow-hidden h-[250px]"
              >
                <Image src={"/img/affiliate/1.png"} alt={"click"} fill className="w-full h-[142px] blur-sm" />
                <p className="text-[12px] font-400 p-5">
                  {"To start, get your unique referral link by"}
                  <span className="text-primary cursor-pointer hover:underline">{" clicking "}</span>
                  {"on the Copy Affiliate Link button"}
                </p>
              </Flex>
            </Flex>
          </Flex>
        </SwiperSlide>
        <SwiperSlide>
          <Flex align="items-center" className="space-x-[32px]">
            <Flex direction="flex-col" align="items-center" className="space-y-3">
              <div className="w-[92px] bg-primary/40 uppercase rounded-lg text-[22px] font-700 font-space_grotesk inline-flex items-center justify-center">
                Share
              </div>
              <Flex
                direction="flex-col"
                className="w-[198px] rounded-xl bg-black-200/40 border border-main-200 overflow-hidden h-[250px]"
              >
                <Image src={"/img/affiliate/2.png"} alt={"Share"} fill className="w-full h-[142px] blur-sm" />
                <p className="text-[12px] font-400 p-5">
                  <span className="text-primary cursor-pointer hover:underline">{"Share "}</span>
                  {"your unique affiliate link. Feel free to use our media kit"}
                </p>
              </Flex>
            </Flex>
          </Flex>
        </SwiperSlide>
        <SwiperSlide>
          <Flex align="items-center" className="space-x-[32px]">
            {/* <MdArrowForward className="text-primary w-[60px] h-[60px]" /> */}
            <Flex direction="flex-col" align="items-center" className="space-y-3">
              <div className="w-[92px] bg-primary/40 uppercase rounded-lg text-[22px] font-700 font-space_grotesk inline-flex items-center justify-center">
                Earn
              </div>
              <Flex
                direction="flex-col"
                className="w-[198px] rounded-xl bg-black-200/40 border border-main-200 overflow-hidden h-[250px]"
              >
                <Image src={"/img/affiliate/3.png"} alt={"Share"} fill className="w-full h-[142px] blur-sm" />
                <p className="text-[12px] font-400 p-5">
                  {"You'll"}
                  <span className="text-primary cursor-pointer hover:underline">{" earn a 25% "}</span>
                  {"commission on every purchase made through your affiliate link"}
                </p>
              </Flex>
            </Flex>
          </Flex>
        </SwiperSlide>
      </Swiper>
    </Flex>
  );
};

export default HelpSection;
