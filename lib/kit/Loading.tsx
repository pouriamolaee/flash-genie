import { twMerge } from "tailwind-merge";

export default function Loading({ className }: { className: string }) {
  return <span className={twMerge("loading", className)} />;
}
