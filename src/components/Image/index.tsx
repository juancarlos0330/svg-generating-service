"use client";

import React, { useState } from "react";
import NextImage from "next/image";

import type { ImageProps } from "@/types";

export interface ImagePlaceholderProps {
  placeholder?: "empty" | "blur";
  blurDataURL?: string;
}

export default function Image({
  src,
  alt,
  width,
  height,
  quality = 100,
  fill = false,
  sizes = "",
  priority = false,
  onClick,
  className = ""
}: ImageProps) {
  const [isLoading, setLoading] = useState(true);

  const blurDataURL = (typeof src === "object" ? src.src : src) + "?q=100";
  const blurProperty: ImagePlaceholderProps =
    (width && width < 40) || (height && height < 40)
      ? { placeholder: "empty" }
      : { placeholder: "blur", blurDataURL: blurDataURL };

  return !fill ? (
    <NextImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      fill={fill}
      sizes={sizes}
      draggable={false}
      quality={quality}
      priority={priority}
      {...blurProperty}
      onLoad={() => setLoading(false)}
      onClick={onClick}
      className={`${isLoading ? "blur-sm" : "blur-0"} duration-100 ease-in max-w-full h-auto ${className}`}
    />
  ) : (
    <div className={`relative overflow-hidden ${className}`}>
      <NextImage src={src} alt={alt} fill sizes="100vw" style={{ objectFit: "cover" }} />
    </div>
  );
}
