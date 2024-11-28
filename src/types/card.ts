import { StaticImageData } from "next/image";

export interface DomainCardProps {
  name: string;
  tld?: string;
  src: StaticImageData | string;
  hoverScale?: Boolean;
  heroEmbed?: Boolean;
  className?: string;
  borderColor?: string;
}

export interface BadgeCardProps {
  index?: number;
  title: string;
  description: string;
  src: StaticImageData | string;
}

export interface CardProps {
  src: string;
  name: string;
  count: string;
  type?: number;
}

export interface DomainOwnCardProps {
  card: CardProps;
  information: {
    title: string;
    subtitle: string;
    list: string[];
  };
}

export interface GeneralCardProps extends DomainCardProps {
  type: "card_1" | "card_2";
  avatar: StaticImageData | string;
}
