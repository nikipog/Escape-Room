import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createApi } from '../services/api';
import { questsSlice } from './slices/quests';
import { questSlice } from './slices/quest';


const reducer = combineReducers({
  [questsSlice.name]: questsSlice.reducer,
  [questSlice.name]: questSlice.reducer
});


export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument:
          createApi()
      }
    }),
  reducer,
});
