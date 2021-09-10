/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import NoProfileImage from "public/no-profile-image.webp";
import type { VFC } from "react";

import { DialogImage } from "./DialogImage";
import { NextImage } from "./NextImage";
import type { ImagePropsSrcUndefinedable } from "./types";
import { hasSrc, isBlob } from "./types";

/**
 * @package
 */
export const Avatar: VFC<ImagePropsSrcUndefinedable> = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { noDialog, ...rest } = props;

  if (!hasSrc(rest)) {
    return (
      <div className={rest.className}>
        <Image src={NoProfileImage} alt="No Profile Image" placeholder="blur" />
      </div>
    );
  }

  if (isBlob(rest)) {
    return <img {...rest} alt={rest.alt} />;
  }

  if (noDialog) {
    return <NextImage {...rest} />;
  }

  return (
    <DialogImage src={typeof rest.src === "string" ? rest.src : "/no-profile-image.webp"} alt={rest.alt}>
      <NextImage {...rest} />
    </DialogImage>
  );
};
