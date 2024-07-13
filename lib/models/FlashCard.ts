export enum CardStatus {
  ToLearn,
  Review,
  Learned,
}

interface FlashCardInterface {
  question: string;
  answer: string;
  category: string;
  status: CardStatus;
}

export default class FlashCard implements FlashCardInterface {
  constructor(
    public question: string,
    public answer: string,
    public category: string,
    public status: CardStatus = CardStatus.ToLearn,
  ) {}
}
