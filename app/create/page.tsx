"use client";
import { useRef, useState } from "react";
import { askForAnswer } from "@/app/create/actions";
import TextInput from "@/lib/kit/TextInput";
import { handleStream } from "@/app/create/utils";
import Button from "@/lib/kit/Button";
import Loading from "@/lib/kit/Loading";
import { IconSearch } from "@tabler/icons-react";
import TextArea from "@/lib/kit/TextArea";

export default function Home() {
  const questionRef = useRef<HTMLInputElement>(null);
  const answerRef = useRef<HTMLTextAreaElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const [answer, setAnswer] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSearch() {
    const question = questionRef.current?.value;
    if (question) {
      setIsLoading(true);
      await handleStream(() => askForAnswer(question), setAnswer);
      setIsLoading(false);
    }
  }

  async function createFlashCard() {}

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="join">
        <TextInput
          ref={questionRef}
          className="join-item"
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
        rows={10}
        placeholder={"Genie generated answer or your bespoke one..."}
      >
        {answer}
      </TextArea>
      <TextInput ref={categoryRef} placeholder="Category..." />
      <Button className="mt-auto">{"Add New Flash Card"}</Button>
    </div>
  );
}
