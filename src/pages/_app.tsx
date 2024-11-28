import type { AppProps } from "next/app";
import { Poppins, Space_Mono, Space_Grotesk } from "next/font/google";
import NProgress from "nprogress";
import { Router } from "next/router";
import Layout from "@/layouts";

import "@/styles/globals.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-cards";

import "@rainbow-me/rainbowkit/styles.css";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider, http, createConfig } from "wagmi";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { rainbowWallet, walletConnectWallet, bitgetWallet, metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
import { berachainTestnet, bsc, polygon } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { StorageProvider } from "@/contexts";
import FavoriteProvider from "@/contexts/FavoriteProvider";
import { xterio } from "@/utils/web3/chains/xterio";
import { mintMainnet } from "@/utils/web3/chains/mintMainnet";
import { tabi } from "@/utils/web3/chains/tabi";
import { xLayer } from "@/utils/web3/chains/xLayer";
import { taikoHekla } from "@/utils/web3/chains/taikoHekla";
import { SessionProvider } from "next-auth/react";
import { scrollMainnet } from "@/utils/web3/chains/scroll";
import { Five_ire } from "@/utils/web3/chains/Five_ire";
import { zkCandy } from "@/utils/web3/chains/zkCandy";
import { arthera } from "@/utils/web3/chains/arthera";
import { morphHolesky } from "@/utils/web3/chains/morphHolesky";
import { neox } from "@/utils/web3/chains/neox";

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [metaMaskWallet, bitgetWallet, rainbowWallet, walletConnectWallet]
    }
  ],
  {
    appName: "ZNS Connect",
    projectId: "fee68566c73e3310c5d5a89c2230fba6"
  }
);

const config = createConfig({
  connectors,
  chains: [
    {
      ...bsc
    },
    {
      ...scrollMainnet,
      iconUrl: "/img/chainLogos/scroll.png"
    },
    {
      ...xLayer,
      iconUrl: "/img/chainLogos/xLayer.webp"
    },
    {
      ...polygon
    },
    {
      ...mintMainnet,
      iconUrl: "/img/chainLogos/mintchain.png"
    },
    {
      ...arthera,
      iconUrl: "/img/chainLogos/arthera.png"
    },
    {
      ...berachainTestnet,
      iconUrl: "/img/chainLogos/berachain.png"
    },
    {
      ...morphHolesky,
      iconUrl: "/img/chainLogos/morphHolesky.png"
    },
    {
      ...taikoHekla,
      iconUrl: "/img/chainLogos/taikoHekla.png"
    },
    {
      ...tabi,
      iconUrl: "/img/chainLogos/tabi.jpeg"
    },
    {
      ...Five_ire,
      iconUrl: "/img/chainLogos/5ire.png"
    },
    {
      ...zkCandy,
      iconUrl: "/img/chainLogos/zkCandy.jpeg"
    },
    {
      ...neox,
      iconUrl: "/img/chainLogos/neox.png"
    },
    {
      ...xterio,
      iconUrl: "/img/chainLogos/xterio.jpeg"
    }
  ],
  transports: {
    [bsc.id]: http(),
    [scrollMainnet.id]: http(),
    [xLayer.id]: http(),
    [polygon.id]: http(),
    [mintMainnet.id]: http(),
    [arthera.id]: http(),
    [berachainTestnet.id]: http(),
    [morphHolesky.id]: http(),
    [taikoHekla.id]: http(),
    [tabi.id]: http(),
    [Five_ire.id]: http(),
    [zkCandy.id]: http(),
    [neox.id]: http(),
    [xterio.id]: http()
  },
  ssr: true
});

export const queryClient = new QueryClient();

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-poppins"
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  variable: "--font-space-mono"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk"
});

NProgress.configure({ showSpinner: false });

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });
  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });
  Router.events.on("routeChangeError", () => NProgress.done());

  return (
    <div className={`relative ${poppins.variable} ${spaceMono.variable} ${spaceGrotesk.variable} font-poppins`}>
      <div className="absolute -z-10 inset-0 bg-decoration bg-cover bg-no-repeat mix-blend-multiply" />
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider theme={darkTheme()}>
            <StorageProvider>
              <FavoriteProvider>
                <Layout>
                  <SessionProvider session={session}>
                    <Component {...pageProps} />
                  </SessionProvider>
                </Layout>
              </FavoriteProvider>
            </StorageProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
}
