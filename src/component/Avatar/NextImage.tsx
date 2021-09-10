import type { ImageLoaderProps, ImageProps } from "next/image";
import Image from "next/image";
import type { VFC } from "react";

const isExternal = (src: string) => {
  return src.startsWith("http");
};

const loader = ({ src, width, quality }: ImageLoaderProps) => {
  const url = new URL(src);
  url.searchParams.append("w", width.toString());
  url.searchParams.append("q", (quality || 75).toString());
  return url.toString();
};

const LoaderedImage: VFC<Omit<ImageProps, "src"> & { src: string }> = (props) => {
  return <Image {...props} src={props.src} alt={props.alt} loader={isExternal(props.src) ? loader : undefined} />;
};

/**
 * @package
 */
export const NextImage: VFC<ImageProps> = (props) => {
  if (typeof props.src === "string") {
    return <LoaderedImage {...props} src={props.src} />;
  }
  return <Image {...props} alt={props.alt} />;
};
