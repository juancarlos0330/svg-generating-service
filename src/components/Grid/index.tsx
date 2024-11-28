import React from "react";

import type { ButtonProps, GridProps } from "@/types";

export default function Grid({ children, rows, cols, action, className = "" }: GridProps & Pick<ButtonProps, "action">) {
  return (
    <div onClick={action} className={`grid ${rows} ${cols} ${className}`}>
      {children}
    </div>
  );
}
