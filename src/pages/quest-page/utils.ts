import { QuestGenreLocalization, QuestLevelLocalization, QuestGenre, QuestDifficulty } from '../../const';

export function localizeQuestGenre(type: string) {
  switch (type) {
    case QuestGenre.Adventures:
      return QuestGenreLocalization.adventures;
    case QuestGenre.Detective:
      return QuestGenreLocalization.detective;
    case QuestGenre.Horror:
      return QuestGenreLocalization.horror;
    case QuestGenre.Mystic:
      return QuestGenreLocalization.mystic;
    case QuestGenre.SciFi:
      return QuestGenreLocalization.SciFi;
  }
}

export function localizeQuestLevel(level: string) {
  switch (level) {
    case QuestDifficulty.Easy:
      return QuestLevelLocalization.easy;
    case QuestDifficulty.Medium:
      return QuestLevelLocalization.medium;
    case QuestDifficulty.Hard:
      return QuestLevelLocalization.hard;
  }
}
