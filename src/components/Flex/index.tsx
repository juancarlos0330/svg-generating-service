import React from "react";

import type { ButtonProps, FlexProps } from "@/types";

export default function Flex({
  children,
  id = "",
  direction = "flex-row",
  align,
  justifyContent = "justify-normal",
  hover,
  action,
  className = ""
}: FlexProps & Pick<ButtonProps, "action" | "hover">) {
  return (
    <div
      id={id}
      onMouseEnter={hover}
      onClick={action}
      className={`flex ${direction} ${align} ${justifyContent} ${className}`}
    >
      {children}
    </div>
  );
}
