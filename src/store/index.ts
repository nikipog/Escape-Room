import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createApi } from '../services/api';
import { questsSlice } from './slices/quests';


const reducer = combineReducers({
  [questsSlice.name]: questsSlice.reducer,
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
