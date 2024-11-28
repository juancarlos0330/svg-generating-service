import React from "react";
import { Flex, Image } from "@/components";
import { Container } from "@/components";
import { useRouter } from "next/router";

const PersonalizedView: React.FC = () => {
  const router = useRouter();
  return (
    <Container>
      <Flex
        align="items-center"
        justifyContent="justify-evenly"
        className="space-x-10 desktop:flex-col desktop:space-x-0 desktop:items-center desktop:space-y-[53px]"
      >
        <Flex className="flex-none" justifyContent="justify-center">
          <Image
            src="/img/home/iphone.png"
            alt="create identity"
            width={600}
            height={520}
            className="w-[500px] desktop:w-[600px]"
          />
        </Flex>
        <Flex direction="flex-col" className="space-y-[35px] font-space_grotesk desktop:items-center">
          <p className="font-space_grotesk font-700 text-[48px] uppercase desktop:text-[30px] mobile:text-[24px] desktop:text-center">
            Get your personalized <span className="text-primary">page</span>
          </p>

          <Flex
            direction="flex-col"
            className="max-w-[614px] w-full text-main-400 text-[16px] font-400 desktop:text-[14px] mobile:text-[12px] desktop:text-center"
          >
            <p>
              {
                "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."
              }
            </p>
            <br />
            <p>
              {
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
              }
            </p>
          </Flex>
          <button
            onClick={() => router.push("/search")}
            className="max-w-[528px] h-[80px] flex-shrink-0 rounded-[53px] border border-solid border-main-300 bg-primary_gradient_button  desktop:h-[60px]  mobile:h-[60px] laptop:px-6"
          >
            <span className="text-primary text-[28px] font-space_grotesk font-700 desktop:text-[24px] mobile:text-[20px] uppercase">
              Create web3 identity
            </span>
          </button>
        </Flex>
      </Flex>
    </Container>
  );
};

export default PersonalizedView;
