"use client";
import { useRef, useState } from "react";
import { askForAnswer } from "@/app/create/actions";
import TextInput from "@/lib/kit/TextInput";
import { handleStream } from "@/app/create/utils";
import Button from "@/lib/kit/Button";
import Loading from "@/lib/kit/Loading";
import { IconSearch } from "@tabler/icons-react";
import TextArea from "@/lib/kit/TextArea";
import FlashCard from "@/lib/models/FlashCard";
import { create } from "@/lib/repository";
import { useRouter } from "next/navigation";

export default function Home() {
  const questionRef = useRef<HTMLInputElement>(null);
  const answerRef = useRef<HTMLTextAreaElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const [answer, setAnswer] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { back } = useRouter();

  async function handleSearch() {
    const question = questionRef.current!.value;
    if (question) {
      setIsLoading(true);
      await handleStream(() => askForAnswer(question), setAnswer);
      setIsLoading(false);
    }
  }

  async function createFlashCard() {
    const question = questionRef.current!.value;
    const answer = answerRef.current!.value;
    const category = categoryRef.current!.value;

    // Toast or some validation

    // Save FlashCard somewhere
    const flashCard = new FlashCard(question, answer, category);
    create(flashCard);
    back();
    // Add success toast
  }

  return (
    <div className="flex flex-col gap-5 h-full w-full">
      <div className="join">
        <TextInput
          ref={questionRef}
          className="join-item max-w-full"
          placeholder="answer for..."
        />
        <Button className="join-item" onClick={handleSearch}>
          {isLoading ? (
            <Loading className="loading-ring loading-md" />
          ) : (
            <IconSearch />
          )}
        </Button>
      </div>
      <TextArea
        ref={answerRef}
        className="flex-1"
        rows={8}
        placeholder={"Genie generated answer or your bespoke one..."}
        defaultValue={answer}
      />
      <TextInput
        ref={categoryRef}
        placeholder="Category..."
        className="max-w-full"
      />
      <Button className="mt-auto" onClick={createFlashCard}>
        {"Add New"}
      </Button>
    </div>
  );
}
