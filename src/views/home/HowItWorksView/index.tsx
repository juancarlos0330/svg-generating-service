import React from "react";
import { Flex } from "@/components";
import { BadgeCard } from "@/components/Card";
import { BADGE_TYPES } from "@/utils/constants";
import { Container } from "@/components";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

const HowItWorksView: React.FC = () => {
  return (
    <Container>
      <Flex direction="flex-col" justifyContent="justify-center" align="items-center" className="space-y-[50px]">
        <p className="uppercase font-space_grotesk bg-primary_gradient_text text-transparent bg-clip-text font-500 text-[60px] desktop:text-[30px] mobile:text-[24px]">
          how it works ?
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
              640: {
                slidesPerView: 2
              },
              1024: {
                slidesPerView: 3
              }
            }}
            className="bage_type_slider"
          >
            {BADGE_TYPES.map((item, index) => (
              <SwiperSlide key={`badge-card-${index}`}>
                <BadgeCard {...item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Flex>
      </Flex>
    </Container>
  );
};

export default HowItWorksView;
