import FlashCard from "@/lib/models/FlashCard";

export function create(flashCard: FlashCard) {
  const data = getAll("data");
  data[flashCard.category] = data[flashCard.category] || [];
  data[flashCard.category].push(flashCard);
  localStorage.setItem("data", JSON.stringify(data));
}

export function update(index: number, flashCard: FlashCard) {
  const data = getAll("data");
  data[flashCard.category][index] = flashCard;
  localStorage.setItem("data", JSON.stringify(data));
}

export function getAll(key: string) {
  return JSON.parse(localStorage.getItem(key) || "{}");
}
