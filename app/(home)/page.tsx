import AddFlashCardButton from "@/app/(home)/AddButton";
import Categories from "@/app/(home)/Categories";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col">
      <Categories />
      <AddFlashCardButton />
    </div>
  );
}
