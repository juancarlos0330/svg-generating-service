import React from "react";
import NextLink from "next/link";

import type { LinkProps } from "@/types";

export default function Link({
  children,
  external = false,
  href = "",
  replace = false,
  scroll = true,
  shallow = false,
  passHref = false,
  prefetch = false,
  legacyBehavior = false,
  onClick,
  className = "",
}: LinkProps) {
  return !external ? (
    <NextLink
      href={href}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref={passHref}
      prefetch={prefetch}
      legacyBehavior={legacyBehavior}
      onClick={onClick}
      className={className}
    >
      {children}
    </NextLink>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}
