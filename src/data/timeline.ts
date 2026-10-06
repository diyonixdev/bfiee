export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  iconName?: string;
  highlight?: boolean;
}

export const timelineData: TimelineEvent[] = [
  {
    id: "timeline-1",
    date: "Day One",
    title: "When It All Began",
    description: "A spark that ignited a beautiful journey together.",
    iconName: "Heart",
    highlight: true,
  },
  {
    id: "timeline-2",
    date: "Month Three",
    title: "First Roadtrip Together",
    description: "Favorite playlists on repeat and getting lost in the best way.",
    iconName: "Sparkles",
  },
  {
    id: "timeline-3",
    date: "One Year",
    title: "Anniversary Celebration",
    description: "365 days of laughter, support, and growing closer every single day.",
    iconName: "Gift",
    highlight: true,
  },
];
