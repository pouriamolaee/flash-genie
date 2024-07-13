"use client";
import NavBar from "@/lib/kit/NavBar";
import Button from "@/lib/kit/Button";
import { IconArrowLeft, IconMenu2 } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import { routesMapper } from "@/lib/constants/routes";
import { BRAND_NAME } from "@/lib/constants";

const pageTitleMapper = {
  [routesMapper.home]: BRAND_NAME,
  [routesMapper.create]: "New Flash Card",
};

export default function RootNavBar() {
  const { back } = useRouter();
  const pathname = usePathname();
  const isHome = pathname === routesMapper.home;

  function handleClick() {
    if (!isHome) {
      back();
    }
  }

  return (
    <NavBar>
      <Button className="btn-square btn-link" onClick={handleClick}>
        {isHome ? <IconMenu2 /> : <IconArrowLeft />}
      </Button>
      <h1>{pageTitleMapper[pathname]}</h1>
    </NavBar>
  );
}
