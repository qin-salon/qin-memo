import type { ImageProps as NextImageProps } from "next/image";
import type { ImgHTMLAttributes } from "react";

type BlobImage = ImgHTMLAttributes<HTMLImageElement>;

type ImageProps = (BlobImage | NextImageProps) & { noDialog?: boolean };

/**
 * @package
 */
export type ImagePropsSrcUndefinedable = Omit<ImageProps, "src"> & { src?: ImageProps["src"] };

/**
 * @package
 */
export const hasSrc = (props: ImagePropsSrcUndefinedable): props is ImageProps => {
  return !!props.src;
};

/**
 * @package
 */
export const isBlob = (props: ImageProps): props is BlobImage => {
  return typeof props.src === "string" && props.src.startsWith("blob");
};
