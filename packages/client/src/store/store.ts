import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import authorsReducer from './authors/authorsSlice';
import booksReducer from './books/booksSlice';
import genresReducer from './genres/genresSlice';
import sharedReducer from './shared/sharedSlice';
import userReducer from './user/userSlice';
import loansReducer from './loans/loansSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    authors: authorsReducer,
    books: booksReducer,
    genres: genresReducer,
    shared: sharedReducer,
    user: userReducer,
    loans: loansReducer,
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
