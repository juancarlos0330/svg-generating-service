export type DomainType = {
  id: number;
  domainName: string;
  mainImgUrl: string;
  bannerURL: string;
  location: string | null;
  bio: string;
  name: string | null;
  category: string;
  dateJoined: string;
  userId: number;
  followerIds: number[];
  followingIds: number[];
  website: string;
  discord: string;
  youtube: string;
  twitter: string;
  telegram: string;
  instagram: string;
  linkedin: string;
  websiteVerified: boolean;
  discordVerified: boolean;
  youtubeVerified: boolean;
  twitterVerified: boolean;
  telegramVerified: boolean;
  instagramVerified: boolean;
  linkedinVerified: boolean;
}

export type DomainParent = {
  domain: { domain: DomainType };
}