type QuestLocation = {
  address: string;
  coords: [number, number];
}
type QuestTime =
  {
    time: string
    isAvailable: boolean
  }


type QuestSlots = {
  today: QuestTime[]
  tomorrow: QuestTime[]
}

type BookingInformation = {
  id: string;
  location: QuestLocation;
  slots: QuestSlots;
}

type AllowedQuestDay = 'today' | 'tomorrow'

type QuestBooking = {
  date: AllowedQuestDay
  time: string;
  contactPerson: string;
  phone: string;
  withChildren: boolean;
  peopleCount: number;
  placeId: string;
  }

export type { BookingInformation, QuestSlots, QuestTime, QuestBooking }
