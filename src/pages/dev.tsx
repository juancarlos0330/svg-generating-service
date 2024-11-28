import type { NextPage } from "next";
import { Flex } from "@/components";
import { signIn, signOut } from "next-auth/react";

const Home: NextPage = () => {
  return (
    <Flex className="my-16 p-16" direction="flex-col">
      <button onClick={() => signIn("discord")}>Discord</button>
      <button onClick={() => signIn("twitter")}>Twitter</button>
      <button onClick={() => signOut()}>Sign out</button>
    </Flex>
  );
};

export default Home;
