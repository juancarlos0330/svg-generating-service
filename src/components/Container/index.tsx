import React from "react";

import type { ComponentProps } from "@/types";

export default function Container({ children, className }: ComponentProps) {
  return (
    <div
      className={`max-w-[1440px] h-full w-full mx-auto px-16 desktop:px-12 tablet:px-8 mobile:px-6 final:px-4 ${className}`}
    >
      {children}
    </div>
  );
}
