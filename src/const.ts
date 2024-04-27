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
  Quests: '/quest'
} as const;

export const enum RequestStatus { Idle, Loading, Success, Failed }

export const ToastifyErrors = {
  FetchAllQuestsError: 'Не удалось загрузить данные с сервера'
} as const;

export const enum QuestGenre {
  All = 'all',
  Adventures = 'adventures',
  Horror = 'horror',
  Mystic = 'mystic',
  Detective = 'detective',
  SciFi = 'sci-fi'
}

