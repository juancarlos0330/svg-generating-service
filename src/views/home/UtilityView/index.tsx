import React from "react";
import { Container, Flex, Link } from "@/components";
import { DomainOwnCard } from "@/components/Card";
import { DOMAIN_CARD_TYPES } from "@/utils/constants";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

const UtilityView: React.FC = () => {
  return (
    <Container>
      <Flex direction="flex-col" align="items-center" className="font-space_grotesk space-y-[88px]">
        <p className="uppercase bg-primary_gradient_text text-transparent bg-clip-text font-500 text-[60px] desktop:text-[30px]  mobile:text-[24px] text-center">
          Domain that have utility
        </p>

        <Flex className="w-full">
          <Swiper
            loop={true}
            slidesPerView={1}
            spaceBetween={20}
            pagination={{
              clickable: true
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false
            }}
            modules={[Pagination, Autoplay]}
            breakpoints={{
              768: {
                slidesPerView: 2
              },
              1024: {
                slidesPerView: 3
              }
            }}
            className="bage_type_slider"
          >
            {DOMAIN_CARD_TYPES.map((item, index) => (
              <SwiperSlide key={`domain_card_$${index}`}>
                <Flex direction="flex-col" className="space-y-[30px] max-w-[330px] tablet:cursor-w-resize">
                  <DomainOwnCard {...item.card} />
                  <Flex direction="flex-col" className="h-full">
                    <p className="text-[32px] font-700 uppercase text-primary laptop:text-[28px]">
                      {item.information.title}
                    </p>
                    <p className="text-[18px] font-700 uppercase laptop:text-[16px]">{item.information.subtitle}</p>
                    <ul className="list-disc pl-5 font-400 font-poppins space-y-1">
                      {item.information.list.map((piece, index) => (
                        <li
                          key={`information-${index}`}
                          className="text-[14px] font-400 text-main-900  laptop:text-[12px]"
                        >
                          {piece}
                        </li>
                      ))}
                    </ul>
                  </Flex>
                  <Link href="/search">
                    <p className="text-primary text-[14px] font-poppins font-400">Start now</p>
                  </Link>
                </Flex>
              </SwiperSlide>
            ))}
          </Swiper>
        </Flex>
      </Flex>
    </Container>
  );
};

export default UtilityView;
