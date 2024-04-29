import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createApi } from '../services/api';
import { questsSlice } from './slices/quests';
import { questSlice } from './slices/quest';
import { userSlice } from './slices/user';
import { bookingInformationSlice } from './slices/booking';


const reducer = combineReducers({
  [questsSlice.name]: questsSlice.reducer,
  [questSlice.name]: questSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [bookingInformationSlice.name]: bookingInformationSlice.reducer
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
