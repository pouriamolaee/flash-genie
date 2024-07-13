interface FlashCardInterface {
  question: string;
  answer: string;
  category: string;
}

export default class FlashCard implements FlashCardInterface {
  constructor(
    public question: string,
    public answer: string,
    public category: string,
  ) {}
}
