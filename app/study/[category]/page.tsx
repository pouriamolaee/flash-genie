"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAll, update } from "@/lib/repository";
import FlashCard, { CardStatus } from "@/lib/models/FlashCard";
import Button from "@/lib/kit/Button";
import Collapse from "@/lib/kit/Collapse";

export default function StudyCategory() {
  const { category } = useParams();
  const [flashCards, setFlashCards] = useState<FlashCard[]>([]);
  const [show, setShow] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const { question, answer } = flashCards[cardIndex] || {};
  const { back } = useRouter();

  function updateStatus(status: CardStatus) {
    const newFlashCard = new FlashCard(
      question,
      answer,
      category as string,
      status,
    );
    update(cardIndex, newFlashCard);
    show && setShow(false);
    move();
  }

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

  useEffect(() => {
    const data = getAll("data");
    setFlashCards(data[category as string]);
  }, [category]);

  return (
    <div className="flex flex-col h-full w-full">
      <Collapse title={question} show={show} onClick={toggleShow}>
        {answer}
      </Collapse>
      <div className="join mt-auto w-full">
        <Button
          className="join-item flex-1 btn-error"
          onClick={() => updateStatus(CardStatus.ToLearn)}
        >
          {"No Idea"}
        </Button>
        <Button
          className="join-item flex-1 btn-warning"
          onClick={() => updateStatus(CardStatus.Review)}
        >
          {"Some Idea"}
        </Button>
        <Button
          className="join-item flex-1 btn-success"
          onClick={() => updateStatus(CardStatus.Learned)}
        >
          {"Learned"}
        </Button>
      </div>
    </div>
  );
}
