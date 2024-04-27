type QuestLevel = 'easy' | 'medium' | 'hard';

type QuestType = 'adventures'|'horror'|'mystic'|'detective'|'sci-fi';

type QuestCard = {
  id: string;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  level: QuestLevel;
  type: QuestType;
  peopleMinMax: [number, number];
  }

export type {QuestCard};
