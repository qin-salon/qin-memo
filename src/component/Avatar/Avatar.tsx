/* eslint-disable @next/next/no-img-element */
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import type { ImageProps as NextImageProps } from "next/image";
import Image from "next/image";
import NoProfileImage from "public/no-profile-image.webp";
import type { ImgHTMLAttributes, VFC } from "react";
import { Fragment, useCallback, useState } from "react";

type BlobImage = ImgHTMLAttributes<HTMLImageElement>;

type ImageProps = (BlobImage | NextImageProps) & { noDialog?: boolean };

type ImagePropsSrcUndefinedable = Omit<ImageProps, "src"> & { src?: ImageProps["src"] };

const hasSrc = (props: ImagePropsSrcUndefinedable): props is ImageProps => {
  return !!props.src;
};

const isBlob = (props: ImageProps): props is BlobImage => {
  return typeof props.src === "string" && props.src.startsWith("blob");
};

/**
 * @package
 */
export const Avatar: VFC<ImagePropsSrcUndefinedable> = (props) => {
  if (!hasSrc(props)) {
    return (
      <div className={props.className}>
        <Image src={NoProfileImage} alt="No Profile Image" />
      </div>
    );
  }

  if (isBlob(props)) {
    const { noDialog: _, alt, ...others } = props;
    return <img {...others} alt={alt} />;
  }

  if (props.noDialog) {
    const { noDialog: _, alt, ...others } = props;
    /* next/imageがキャッシュした過去の画像が表示するため、いったんimgタグで代用 */
    return <img {...(others as BlobImage)} alt={alt} />;
  }

  return <DialogImage {...props} />;
};

export const DialogImage: VFC<NextImageProps> = (props) => {
  const [isShow, setIsShow] = useState(false);
  const handleOpen = useCallback(() => {
    setIsShow(true);
  }, []);
  const handleClose = useCallback(() => {
    setIsShow(false);
  }, []);

  return (
    <>
      <button className="contents" onClick={handleOpen}>
        {/* next/imageがキャッシュした過去の画像が表示するため、いったんimgタグで代用 */}
        <img {...(props as BlobImage)} alt={props.alt} />
      </button>

      <Transition as={Fragment} show={isShow}>
        <Dialog static className="overflow-y-auto fixed inset-0 z-10" open={isShow} onClose={handleClose}>
          <div className="relative min-h-screen">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div>
                <img
                  className="absolute inset-0 m-auto max-w-full max-h-full"
                  src={typeof props.src === "string" ? props.src : "/no-profile-image.webp"}
                  alt={props.alt}
                />
                <button
                  type="button"
                  className="absolute top-3.5 left-3 p-1.5 text-white bg-gray-600 hover:bg-gray-500 rounded-full border border-transparent focus:outline-none"
                  onClick={handleClose}
                >
                  <XIcon className="w-6 h-6" />
                </button>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
