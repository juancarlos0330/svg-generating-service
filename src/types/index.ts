import { CSSProperties, MouseEventHandler, PropsWithChildren, TouchEventHandler } from "react";
import { ImageLoader, StaticImageData } from "next/image";

import { UrlObject } from "url";

export interface ExtraTWClassProps {
  className?: string;
}

export type ComponentProps = PropsWithChildren<ExtraTWClassProps>;

export interface ButtonProps extends ComponentProps {
  hover?: MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
  action?: MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
  outline?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  type?: "button" | "reset" | "submit";
}

export interface FlexProps extends ComponentProps {
  id?: string;
  direction?: "flex-row" | "flex-row-reverse" | "flex-col" | "flex-col-reverse";
  align?: "items-start" | "items-end" | "items-center" | "items-baseline" | "items-stretch";
  justifyContent?:
    | "justify-normal"
    | "justify-start"
    | "justify-end"
    | "justify-center"
    | "justify-between"
    | "justify-around"
    | "justify-evenly"
    | "justify-stretch";
}

export interface GridProps extends ComponentProps {
  rows?: "grid-rows-1" | "grid-rows-2" | "grid-rows-3" | "grid-rows-4" | "grid-rows-5";
  cols?: "grid-cols-1" | "grid-cols-2" | "grid-cols-3" | "grid-cols-4" | "grid-cols-5";
}

export interface LinkProps extends ComponentProps {
  external?: boolean;
  href: string;
  as?: string | UrlObject;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  prefetch?: boolean;
  locale?: string | false;
  legacyBehavior?: boolean;
  onMouseEnter?: MouseEventHandler<HTMLAnchorElement>;
  onTouchStart?: TouchEventHandler<HTMLAnchorElement>;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export interface ImageProps extends ExtraTWClassProps {
  src: StaticImageData | string;
  alt: string;
  width?: number; // | `${number}`
  height?: number;
  fill?: boolean | undefined;
  loader?: ImageLoader | undefined;
  quality?: number | undefined;
  priority?: boolean | undefined;
  loading?: "lazy" | "eager" | undefined;
  placeholder?: "blur" | "empty" | undefined;
  blurDataURL?: string | undefined;
  unoptimized?: boolean | undefined;
  sizes?: string;
  style?: CSSProperties | undefined;
  onClick?: MouseEventHandler<HTMLImageElement>;
}
