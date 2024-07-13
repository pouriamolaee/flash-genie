import FlashCard from "@/lib/models/FlashCard";

export function create(flashCard: FlashCard) {
  const data = getAll("data");
  data[flashCard.category] = data[flashCard.category] || [];
  data[flashCard.category].push(flashCard);
  save("data", data);
}

export function update(index: number, flashCard: FlashCard) {
  const data = getAll("data");
  data[flashCard.category][index] = flashCard;
  save("data", data);
}

export function getAll(key: string) {
  return JSON.parse(localStorage.getItem(key) || "{}");
}

function save(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}
