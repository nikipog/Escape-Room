import { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import type { User } from '../../types/user';

import { AuthorizationStatus, RequestStatus } from '../../const';
import { checkAuth, login, logout } from '../thunks/auth';

interface UserState {
  info: User | null;
  requestStatus: RequestStatus;
  status: AuthorizationStatus;
}

const initialState: UserState = {
  info: null,
  requestStatus: RequestStatus.Idle,
  status: AuthorizationStatus.Unknown
};

function processSuccess(state: UserState, action: PayloadAction<User>) {
  state.info = action.payload;
  state.status = AuthorizationStatus.Auth;
  state.requestStatus = RequestStatus.Success;
}

function processFailed(state: UserState) {
  state.requestStatus = RequestStatus.Failed;
  state.status = AuthorizationStatus.NoAuth;
}

function processLoading(state: UserState) {
  state.requestStatus = RequestStatus.Loading;
}

export const userSlice = createSlice({
  extraReducers(builder) {
    builder.addCase(checkAuth.fulfilled, processSuccess);
    builder.addCase(checkAuth.rejected, processFailed);
    builder.addCase(checkAuth.pending, processLoading);
    builder.addCase(login.fulfilled, processSuccess);
    builder.addCase(login.rejected, processFailed);
    builder.addCase(login.pending, processLoading);
    builder.addCase(logout.fulfilled, (state) => {
      state.info = null;
      state.status = AuthorizationStatus.Unknown;
    });
  },
  initialState,
  name: 'user',
  reducers: {},
  selectors: {
    userStatus: (state : UserState) => state.status,
    userInfo: (state : UserState) => state.info,
    userRequestStatus: (state : UserState) => state.requestStatus
  }
});

export const userActions = {
  checkAuth,
  login,
  logout
};

export const userSelector = userSlice.selectors;
