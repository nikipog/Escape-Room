import type { AxiosInstance } from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

import type { QuestCard } from '../../types/quest';
import { Endpoint } from '../../const';


const fetchAllQuests = createAsyncThunk<QuestCard[], undefined, {extra: AxiosInstance}>
('fetchQuests/all', async (_arg, {extra: api}) => {
  const response = await api.get<QuestCard[]>(`${Endpoint.Quests}`);
  return response.data;
});


export {fetchAllQuests};
