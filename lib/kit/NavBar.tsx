import { ReactNode } from "react";

export default function NavBar({ children }: { children: ReactNode }) {
  return <div className="navbar bg-base-100">{children}</div>;
}
