type QuestLevel = 'easy' | 'medium' | 'hard';

type QuestType = 'adventures' | 'horror' | 'mystic' | 'detective' | 'sci-fi';

type QuestCard = {
  id: string;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  level: QuestLevel;
  type: QuestType;
  peopleMinMax: [number, number];
}

type FullQuestCard = QuestCard & {
  description: string;
  coverImg: string;
  coverImgWebp: string;
}

export type { QuestCard, FullQuestCard };
