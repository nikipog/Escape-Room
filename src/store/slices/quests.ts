import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '../../const';
import { QuestCard } from '../../types/quest';
import { fetchAllQuests } from '../thunks/quests';


interface QuestsState {
  quests: QuestCard[];
  status: RequestStatus;
}

const initialState: QuestsState = {
  quests: [],
  status: RequestStatus.Idle
};
const questsSlice = createSlice({
  extraReducers: (builder) =>
    builder
      .addCase(fetchAllQuests.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchAllQuests.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.quests = action.payload;
      })
      .addCase(fetchAllQuests.rejected, (state) => {
        state.status = RequestStatus.Failed;
      }),
  initialState,
  name: 'quests',
  reducers: {},
  selectors: {
    quests: (state: QuestsState) => state.quests,
    questsStatus: (state: QuestsState) => state.status
  }
});

const questsActions = {...questsSlice.actions, fetchAllQuests};
const questsSelectors = questsSlice.selectors;

export { questsActions , questsSlice , questsSelectors };

