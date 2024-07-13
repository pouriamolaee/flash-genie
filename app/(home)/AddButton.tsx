"use client";
import { IconPlus } from "@tabler/icons-react";
import Button from "@/lib/kit/Button";
import { useRouter } from "next/navigation";
import { routesMapper } from "@/lib/constants/routes-mapper";

export default function AddFlashCardButton() {
  const router = useRouter();

  return (
    <Button
      className="ms-auto mt-auto btn-square"
      onClick={() => router.push(routesMapper.create)}
    >
      <IconPlus />
    </Button>
  );
}
