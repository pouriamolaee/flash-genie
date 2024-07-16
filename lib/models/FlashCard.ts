import { uuid } from "uuidv4";

export enum Feedback {
  Again,
  Good,
  Easy,
}

interface FlashCardCreation {
  question: string;
  answer: string;
  category: string;
}

interface ReviewConfigOptions {
  againInterval: number;
  goodMultiplier: number;
  easyMultiplier: number;
  minEaseFactor: number;
  easeFactor: number;
  easeAdjustmentFactor: number;
}

export default class FlashCard {
  id: string;
  readonly question: string;
  readonly answer: string;
  readonly category: string;
  repetitions: number;
  private interval: number;
  private readonly againInterval: number;
  private readonly goodMultiplier: number;
  private readonly easyMultiplier: number;
  private readonly easeAdjustmentFactor: number;
  private readonly minEaseFactor: number;
  private easeFactor: number;
  private reviewDate;

  constructor(
    { question, answer, category }: FlashCardCreation,
    {
      againInterval = 1,
      goodMultiplier = 1.25,
      easyMultiplier = 1.5,
      easeAdjustmentFactor = 0.2,
      minEaseFactor = 1.3,
      easeFactor = 2.5,
    }: Partial<ReviewConfigOptions> = {},
  ) {
    this.id = uuid();
    this.question = question;
    this.answer = answer;
    this.category = category;
    this.repetitions = 0;
    this.interval = 1;
    this.againInterval = againInterval;
    this.goodMultiplier = goodMultiplier;
    this.easyMultiplier = easyMultiplier;
    this.easeAdjustmentFactor = easeAdjustmentFactor;
    this.minEaseFactor = minEaseFactor;
    this.easeFactor = easeFactor;
    this.reviewDate = new Date();
  }

  public review(feedback: Feedback): void {
    this.repetitions += 1;
    const now = new Date();

    switch (feedback) {
      case Feedback.Again:
        this.interval = this.againInterval;
        this.easeFactor = Math.max(
          this.minEaseFactor,
          this.easeFactor - this.easeAdjustmentFactor,
        );
        break;
      case Feedback.Good:
        this.interval = this.interval * this.easeFactor * this.goodMultiplier;
        break;
      case Feedback.Easy:
        this.interval = this.interval * this.easeFactor * this.easyMultiplier;
        this.easeFactor = this.easeFactor + this.easeAdjustmentFactor;
        break;
    }

    this.reviewDate = new Date(
      now.getTime() + this.interval * 24 * 60 * 60 * 1000, // Based on days
    );
  }

  public isDue(): boolean {
    const now = new Date();
    return this.reviewDate <= now;
  }

  public static fromLocalStorageObj(obj: any): FlashCard {
    const flashCard = new FlashCard(
      {
        question: obj.question,
        answer: obj.answer,
        category: obj.category,
      },
      {
        againInterval: obj.againInterval,
        goodMultiplier: obj.goodMultiplier,
        easyMultiplier: obj.easyMultiplier,
        easeAdjustmentFactor: obj.easeAdjustmentFactor,
        easeFactor: obj.easeFactor,
      },
    );
    flashCard.id = obj.id;
    flashCard.repetitions = obj.repetitions;
    flashCard.interval = obj.interval;
    flashCard.reviewDate = new Date(obj.reviewDate);
    return flashCard;
  }
}
