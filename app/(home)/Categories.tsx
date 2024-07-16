"use client";
import { useEffect, useState } from "react";
import Button from "@/lib/kit/Button";
import { getAll } from "@/lib/repository";
import { useRouter } from "next/navigation";
import { routesMapper } from "@/lib/constants/routes-mapper";
import FlashCard from "@/lib/models/FlashCard";
import { RepoData } from "@/lib/models/RepoData";

export default function Categories() {
  const { push } = useRouter();
  const [data, setData] = useState<RepoData>();

  function study(category: string) {
    push(routesMapper.study(category));
  }

  useEffect(() => {
    setData(getAll());
  }, []);

  if (!data) {
    return null;
  }

  return (
    <div className="flex gap-4 flex-wrap">
      {Object.entries(data).map(([category, flashCards], index) => (
        <Button
          key={category}
          className={getBtnClassName(index)}
          onClick={() => study(category)}
          disabled={
            !flashCards.some((flashCard) =>
              FlashCard.fromLocalStorageObj(flashCard).isDue(),
            )
          }
        >
          {category}
        </Button>
      ))}
    </div>
  );
}

function getBtnClassName(index: number) {
  const randomColorMapper: { [key: number]: string } = {
    0: "btn-info",
    1: "btn-warning",
    2: "btn-success",
    3: "btn-error",
  };
  return randomColorMapper[index % Object.keys(randomColorMapper).length];
}
