export interface Memory {
  id: string;
  title: string;
  date: string;
  description: string;
  image?: string;
  location?: string;
  tag?: string;
}

export const memoriesData: Memory[] = [
  {
    id: "memory-1",
    title: "The First Hello",
    date: "October 14, 2023",
    description: "The day our story began, filled with nervous smiles and endless conversations.",
    location: "Cafe Serenade",
    tag: "Firsts",
  },
  {
    id: "memory-2",
    title: "Stargazing Night",
    date: "December 24, 2023",
    description: "Wrapped in warm blankets watching the night sky, wishing moments could freeze.",
    location: "Hilltop Observatory",
    tag: "Adventures",
  },
  {
    id: "memory-3",
    title: "Sunset by the Shore",
    date: "February 14, 2024",
    description: "Golden hour hues reflecting on the water as we walked hand in hand.",
    location: "Sunset Beach",
    tag: "Milestones",
  },
];
