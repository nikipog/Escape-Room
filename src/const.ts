export enum AppRoute {
  Main = '/',
  Booking = '/quest/:id/booking',
  Contacts = '/contacts',
  Login = '/login',
  MyQuests = '/my-quests',
  Quest = '/quest/:id'
}

export enum AuthorizationStatus {
  Auth ='Auth',
  NoAuth = 'NoAuth',
  Unknown = 'Unknown'
}

export const Endpoint = {
  Quests: '/quest',
  Login: '/login',
  Logout: '/logout',
} as const;

export const enum RequestStatus { Idle, Loading, Success, Failed }

export const ToastifyMessage = {
  FetchQuestsError: 'Не удалось загрузить данные с сервера'
} as const;

export const enum QuestGenre {
  All = 'all',
  Adventures = 'adventures',
  Horror = 'horror',
  Mystic = 'mystic',
  Detective = 'detective',
  SciFi = 'sci-fi'
}

export const enum QuestDifficulty {
  Any = 'any',
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard'
}

export const QuestGenreLocalization = {
  horror: 'Ужасы',
  adventures: 'Приключения',
  mystic: 'Мистика',
  detective: 'Детектив',
  SciFi: 'Sci-fi'
} as const;

export const QuestLevelLocalization = {
  easy: 'простой',
  medium: 'cредний',
  hard: 'сложный'
} as const;

export const ParticipantsRange = {
  MinParticipantsCount: 2,
  MaxParticipantsCount: 10
} as const;

export const DescriptionRange = {
  IdleDescriptionLength: 0,
  MinDescriptionLength: 50,
  MaxDescriptionLength: 300,
  MaxUnslicedDescriptionLength: 297
} as const;
