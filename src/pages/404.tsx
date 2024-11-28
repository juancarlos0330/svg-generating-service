import { Container, Flex } from "@/components";

export default function Custom404() {
  return (
    <Container>
      <Flex justifyContent="justify-center" align="items-center" className="pt-[400px] pb-[200px]">
        <p className="text-center text-[60px] font-space_grotesk tablet:text-[40px] small:text-[30px]">
          404 - Page Not Found
        </p>
      </Flex>
    </Container>
  );
}
