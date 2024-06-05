/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getEmail, setEmail, removeEmail, setToken, removeToken } from 'utilities/utility-functions';

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  userInfo: null,
  email: getEmail() || '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onLoggedIn: (state, { payload }) => {
      state.isAuthenticated = true;
      if (payload.token) setToken(payload);
      // if (payload) {
      //   state.userInfo = { ...payload, ...payload.user };
      //   delete state.userInfo.user;
      // }
    },
    onLoggedOut: state => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.userInfo = null;
      removeToken();
      removeEmail();
    },
    getUserDetail: (state, action) => ({
      ...state,
      isAuthenticated: true,
      userInfo: action.payload,
    }),
    onForgetEmail: (state, { payload }) => {
      state.email = payload;
      if (payload) setEmail(payload);
    },
    updateUserInfo: (state, { payload }) => {
      if (payload) {
        state.userInfo = { ...payload, ...payload.user };
        delete state.userInfo.user;
      }
    },
  },
});

export const { onLoggedIn, onLoggedOut, onForgetEmail, getUserDetail, updateUserInfo } = authSlice.actions;

export default authSlice.reducer;
