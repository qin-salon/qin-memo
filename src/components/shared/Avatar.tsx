import clsx from "clsx";
import type { ImgHTMLAttributes, VFC } from "react";

type AvatarProps = ImgHTMLAttributes<HTMLImageElement> & { alt: string };

export const Avatar: VFC<AvatarProps> = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { className, ...otherProps } = props;

  return otherProps.src ? (
    <img {...otherProps} alt={otherProps.alt} className={clsx("rounded-full", className)} />
  ) : (
    <div className={clsx("grid place-items-center bg-gray-200 rounded-full", className)}>{props.alt.substr(0, 1)}</div>
  );
};
