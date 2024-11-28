import type { PropsWithChildren } from "react";
import { createContext, useContext, useMemo, useState } from "react";

export interface Follower {
  src: string;
  name: string;
  isfollow: boolean;
}

export interface FollowerContextType {
  follower: Follower[];
  setFollower: React.Dispatch<React.SetStateAction<Follower[]>>;
}

export const FollowerContext = createContext<FollowerContextType>({
  follower: [],
  setFollower: () => {}
});

export function FollowerProvider({ children }: PropsWithChildren) {
  const [follower, setFollower] = useState<Follower[]>([
    {
      src: "/img/profile/1.png",
      name: "znsconnect",
      isfollow: true
    },
    {
      src: "/img/profile/2.png",
      name: "dyor",
      isfollow: false
    },
    { src: "/img/profile/3.png", name: "LiviaRosser", isfollow: true },
    { src: "/img/profile/4.png", name: "@supergirl", isfollow: true },
    { src: "/img/profile/5.png", name: "HHHHHHHHHHHHHHHHHH.ZETA", isfollow: true }
  ]);

  const data = useMemo(
    () => ({
      follower,
      setFollower
    }),
    [follower, setFollower]
  );

  return <FollowerContext.Provider value={data}>{children}</FollowerContext.Provider>;
}

export const useContextFollower = () => {
  return useContext(FollowerContext);
};

export default FollowerProvider;
