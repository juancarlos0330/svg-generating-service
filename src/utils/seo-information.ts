import { SeoProps } from "@/components/SEO";

const information: { [key: string]: SeoProps } = {
  home: {
    title: "ZNS Connect Name Service | ZNS",
    description:
      "ZNS Connect, the cutting-edge decentralized communication ID platform powered by decentralized addresses with unique domain names.",
    keywords: "ZNS, ZNSConnect, ZNS Connect, Name Service, Domain Name Service"
  },
  register: {
    title: "Register Domain Name on Blockchain | ZNS",
    description:
      "Secure your unique identity on the blockchain with ZNS. Register your domain name hassle-free and enjoy decentralized ownership.",
    keywords:
      "Register domain, Domain registration, Blockchain domain, ZNS domain registration, Decentralized ownership"
  },
  cart: {
    title: "Your Cart | ZNS Connect",
    description:
      "Review and manage your selected domain registrations with ease. Your Cart on ZNS lets you finalize your domain purchases securely.",
    keywords: "Your Cart, Domain registration cart, Manage domain registrations, ZNS Cart, Secure domain checkout"
  },
  profile: {
    title: "My Profile on ZNS Connect App | ZNS Connect",
    description:
      "Access and manage your personal settings and preferences with ease on ZNS Connect. Customize your experience effortlessly.",
    keywords: "My Profile, ZNS Connect App, Personal settings, Preferences, Customize profile"
  },
  domains: {
    title: "My Domains on ZNS Connect App | ZNS Connect",
    description:
      "View and manage your domain names effortlessly with My Domains on ZNS Connect. Take control of your decentralized identity.",
    keywords: "My Domains, ZNS Connect App, Manage domains, Decentralized identity"
  },
  settings: {
    title: "Manage your profile on ZNS | ZNS Connect",
    description:
      "Adjust your preferences and personalize your experience with Settings on ZNS Connect. Control your profile and privacy settings effortlessly.",
    keywords: "Settings zns, Profile management zns, Privacy settings, ZNS Connect"
  },
  favorites: {
    title: "Your Favorites domains on ZNS | ZNS Connect",
    description:
      "Access your favorite domains easily with Favorites on ZNS Connect. Keep track of the domains you love the most.",
    keywords: "Favorites domain names, Favorite domains zns, Best domains names, Bookmark domains"
  },
  affiliate: {
    title: "Top Affiliate Program for Domain Name Services | ZNS Connect",
    description:
      "Join the top affiliate program for domain name services on ZNS Connect. Earn rewards for referring others to our decentralized communication ID platform.",
    keywords: "Affiliate program, Domain name services, ZNS Connect Affiliate program, Referral system"
  },
  badges: {
    title: "Earn Exclusive Badges for Domain Name Services | ZNS Connect",
    description:
      "Discover how to earn exclusive badges for your domain name services on ZNS Connect. Show off your achievements and stand out in the decentralized communication ID platform.",
    keywords: "Badges, Mint badges, Domain name services, ZNS Connect"
  }
};
export const getInformation = (page: string): SeoProps => {
  if (information[page]) {
    return information[page];
  } else {
    return {
      title: "",
      description: "",
      canonical: "",
      keywords: "",
      image: ""
    };
  }
};
