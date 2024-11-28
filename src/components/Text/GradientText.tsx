import React from "react";

import type { ComponentProps } from "@/types";

interface GradientTextProps extends ComponentProps {
  gradientColor?: string;
  className?: string;
}

export default function GradientText({ children, gradientColor, className }: GradientTextProps) {
  return (
    <p
      className={`${gradientColor ? gradientColor : "inline bg-primary_gradient_text"} bg-clip-text text-transparent ${className}`}
    >
      {children}
    </p>
  );
}
