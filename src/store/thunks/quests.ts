import type { QuestCard } from '../../types/quest';
import { Endpoint } from '../../const';
import { createAppAsyncThunk } from '../../hooks/store';
import type { FullQuestCard } from '../../types/quest';


const fetchAllQuests = createAppAsyncThunk<QuestCard[], undefined>
('fetchQuests/all', async (_arg, {extra: api}) => {
  const response = await api.get<QuestCard[]>(`${Endpoint.Quests}`);
  return response.data;
});

const fetchQuest = createAppAsyncThunk<FullQuestCard, string>
('fetchQuests/one', async (questID, {extra: api}) => {
  const response = await api.get<FullQuestCard>(`${Endpoint.Quests}/${questID}`);
  return response.data;
});


export {fetchAllQuests, fetchQuest};
