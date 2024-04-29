import type { BookingInformation, QuestBooking } from '../../types/booking';
import { Endpoint } from '../../const';
import { createAppAsyncThunk } from '../../hooks/store';


const fetchBookingInformation = createAppAsyncThunk<BookingInformation[], string>
('booking/fetchInfo', async (questID, {extra: api}) => {
  const response = await api.get<BookingInformation[]>(`${Endpoint.Quests}/${questID}/booking`);
  return response.data;
});

const bookQuest = createAppAsyncThunk<QuestBooking, PostBookingProps>
('booking/bookQuest', async ({ formData, questID }, { extra : api}) => {
  //отправляем на "ручку" body, который собираем внутри формы
  const response = await api.post<QuestBooking>(`${Endpoint.Quests}/${questID}/booking`, formData);
  return response.data;
});


export { fetchBookingInformation };
