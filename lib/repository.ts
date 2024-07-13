import FlashCard from "@/lib/models/FlashCard";

export function save(flashCard: FlashCard) {
  const data = fetch("data");
  data[flashCard.category] = data[flashCard.category] || [];
  data[flashCard.category].push(flashCard);
  localStorage.setItem("data", JSON.stringify(data));
}

export function fetch(key: string) {
  return JSON.parse(localStorage.getItem(key) || "{}");
}
