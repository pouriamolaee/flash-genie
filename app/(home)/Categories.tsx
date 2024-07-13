"use client";
import { useEffect, useState } from "react";
import Button from "@/lib/kit/Button";
import { getAll } from "@/lib/repository";
import { useRouter } from "next/navigation";
import { routesMapper } from "@/lib/constants/routes-mapper";

export default function Categories() {
  const { push } = useRouter();
  const [categories, setCategories] = useState<string[]>([]);

  function getCategories() {
    const data = getAll("data");
    setCategories(Object.keys(data));
  }

  function study(category: string) {
    push(routesMapper.study(category));
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="flex gap-4 flex-wrap">
      {categories.map((category, index) => (
        <Button
          key={category}
          className={getBtnClassName(index)}
          onClick={() => study(category)}
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
