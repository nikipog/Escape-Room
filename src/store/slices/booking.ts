import { createSlice } from '@reduxjs/toolkit';
import type { BookingInformation } from '../../types/booking';

import { RequestStatus } from '../../const';
import { fetchBookingInformation } from '../thunks/booking';

interface BookingInformationState {
  info: BookingInformation[] | null;
  status: RequestStatus;
}

//начальное состояние
const initialState: BookingInformationState = {
  // храним объект предложения, важно указывать null вместо пустого объекта!
  info: null,
  //состояние
  status: RequestStatus.Idle
};

//в экстра-редьюсере обрабатываем асинхронные экшены на получение квеста

export const bookingInformationSlice = createSlice({
  extraReducers: (builder) => {
    // в случае успеха получения оффера:
    builder.addCase(fetchBookingInformation.fulfilled, (state, action) => {
      // обновляем поле инфо
      state.info = action.payload;
      state.status = RequestStatus.Success;
    });
    //если не получили - указываем статус
    builder.addCase(fetchBookingInformation.rejected, (state) => {
      state.status = RequestStatus.Failed;
    });
    // если загружается - указываем статус
    builder.addCase(fetchBookingInformation.pending, (state) => {
      state.status = RequestStatus.Loading;
    });
  },
  initialState,
  name: 'bookingInfo',
  reducers: {
    clear(state) {
      state.info = null;
    }
  },
  // обязательно пользоваться селекторами: на получение квеста и статуса
  selectors: {
    bookingInfo: (state: BookingInformationState) => state.info,
    bookingInfoStatus: (state: BookingInformationState) => state.status
  }
});

export const bookingInfoActions = {...bookingInformationSlice.actions, fetchBookingInfo: fetchBookingInformation}; //асинхронные экшены на получение инфо о брони
export const bookingInfoSelector = bookingInformationSlice.selectors;


