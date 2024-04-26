import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createApi } from '../services/api';
import { questsSlice } from './slices/quests';


const reducer = combineReducers({
  [questssSlice.name]: offersSlice.reducer,
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
