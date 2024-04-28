import { createSlice } from '@reduxjs/toolkit';
import type { FullQuestCard } from '../../types/quest';

import { RequestStatus } from '../../const';
import { fetchQuest } from '../thunks/quests';

interface QuestState {
  info: FullQuestCard | null;
  status: RequestStatus;
}

//начальное состояние
const initialState: QuestState = {
  // храним объект предложения, важно указывать null вместо пустого объекта!
  info: null,
  //состояние
  status: RequestStatus.Idle
};

//в экстра-редьюсере обрабатываем асинхронные экшены на получение квеста

export const questSlice = createSlice({
  extraReducers: (builder) => {
    // в случае успеха получения оффера:
    builder.addCase(fetchQuest.fulfilled, (state, action) => {
      // обновляем поле инфо
      state.info = action.payload;
      state.status = RequestStatus.Success;
    });
    //если не получили - указываем статус
    builder.addCase(fetchQuest.rejected, (state) => {
      state.status = RequestStatus.Failed;
    });
    // если загружается - указываем статус
    builder.addCase(fetchQuest.pending, (state) => {
      state.status = RequestStatus.Loading;
    });
  },
  initialState,
  name: 'quest',
  reducers: {
    clear(state) {
      state.info = null;
    }
  },
  // обязательно пользоваться селекторами: на получение квеста и статуса
  selectors: {
    quest: (state: QuestState) => state.info,
    questStatus: (state: QuestState) => state.status
  }
});

export const questActions = {...questSlice.actions, fetchQuest}; //асинхронные экшены на получение квеста
export const questSelector = questSlice.selectors;


