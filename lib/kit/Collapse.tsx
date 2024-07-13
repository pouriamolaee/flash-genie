import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface CollapseProps {
  title: ReactNode;
  children: ReactNode;
  show?: boolean;
  onClick?: () => void;
}

export default function Collapse({
  title,
  children,
  show = false,
  onClick,
}: CollapseProps) {
  return (
    <div
      className={twMerge("collapse bg-base-200", show && "collapse-open")}
      onClick={onClick}
    >
      <div className="collapse-title text-xl font-medium">{title}</div>
      <div className="collapse-content">{children}</div>
    </div>
  );
}
