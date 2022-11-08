import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth/authSlice';
import authorsReducer from './authors/authorsSlice';
import booksReducer from './books/booksSlice';
import genresReducer from './genres/genresSlice';
import sharedReducer from './shared/sharedSlice';
import userReducer from './user/userSlice';
import loansReducer from './loans/loansSlice';

const persistConfig = {
  key: 'user',
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    authors: authorsReducer,
    books: booksReducer,
    genres: genresReducer,
    shared: sharedReducer,
    user: userReducer,
    loans: loansReducer,
  },
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppStore = typeof store;
