import { twMerge } from "tailwind-merge";
import { ButtonHTMLAttributes } from "react";

export default function Button({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={twMerge("btn", className)} {...props} />;
}
