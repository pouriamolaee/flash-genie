"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAll, update } from "@/lib/repository";
import FlashCard, { Feedback } from "@/lib/models/FlashCard";
import Button from "@/lib/kit/Button";
import Collapse from "@/lib/kit/Collapse";

export default function StudyCategory() {
  const { category } = useParams();
  const [flashCards, setFlashCards] = useState<FlashCard[]>([]);
  const [show, setShow] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const flashCard = flashCards[cardIndex];
  const { back } = useRouter();

  function toggleShow() {
    setShow((prev) => !prev);
  }

  function move() {
    const newCardIndex = cardIndex + 1;
    if (newCardIndex < flashCards.length) {
      setCardIndex(newCardIndex);
    } else {
      // Toast done!
      back();
    }
  }

  function review(feedback: Feedback) {
    flashCard.review(feedback);
    update(cardIndex, flashCard);
    show && setShow(false);
    move();
  }

  useEffect(() => {
    function getDueFlashCards() {
      const data = getAll("data");
      const dueFlashCards: FlashCard[] = data[category as string]
        .map((localStorageObj: any) =>
          FlashCard.fromLocalStorageObj(localStorageObj),
        )
        .filter((flashCard: FlashCard) => flashCard.isDue());
      setFlashCards(dueFlashCards);
    }

    getDueFlashCards();
  }, [category]);

  return (
    <div className="flex flex-col h-full w-full">
      <Collapse
        title={
          <div className="flex gap-4">
            <span>{`${cardIndex + 1} / ${flashCards.length}`}</span>
            <span>{flashCard?.question}</span>
          </div>
        }
        show={show}
        onClick={toggleShow}
      >
        {flashCard?.answer}
      </Collapse>
      <div className="join mt-auto w-full">
        <Button
          className="join-item flex-1 btn-warning"
          onClick={() => review(Feedback.Again)}
        >
          {"Again"}
        </Button>
        <Button
          className="join-item flex-1 btn-info"
          onClick={() => review(Feedback.Good)}
        >
          {"Good"}
        </Button>
        <Button
          className="join-item flex-1 btn-success"
          onClick={() => review(Feedback.Easy)}
        >
          {"Easy"}
        </Button>
      </div>
    </div>
  );
}
