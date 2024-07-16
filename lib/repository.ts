import FlashCard from "@/lib/models/FlashCard";

const repoDataKey = "data";

export function create(flashCard: FlashCard) {
  const data = getAll();
  data[flashCard.category] = data[flashCard.category] || [];
  data[flashCard.category].push(flashCard);
  save(data);
}

export function update(flashCard: FlashCard) {
  const data = getAll();
  const flashCardIndex = data[flashCard.category].findIndex(
    ({ id }: FlashCard) => id === flashCard.id,
  );
  data[flashCard.category][flashCardIndex] = flashCard;
  save(data);
}

export function getAll() {
  return JSON.parse(localStorage.getItem(repoDataKey) || "{}");
}

function save(value: any) {
  localStorage.setItem(repoDataKey, JSON.stringify(value));
}
