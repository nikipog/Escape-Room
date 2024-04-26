type QuestLevel = 'easy' | 'medium' | 'hard';

type QuestType = 'adventures'|'horror'|'mystic'|'detective'|'sci-fi';

type QuestCard = {
  id: string;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  level: QuestLevel;
  type: QuestType;
  peopleMinMax: [number];
  }

export type {QuestCard};
