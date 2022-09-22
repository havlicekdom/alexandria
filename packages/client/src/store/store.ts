import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import booksReducer from './books/booksSlice';
import sharedReducer from './shared/sharedSlice';
import userReducer from './user/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
    shared: sharedReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppStore = typeof store;
