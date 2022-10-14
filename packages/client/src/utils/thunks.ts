import { createAsyncThunk, AsyncThunkPayloadCreator, AsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

interface ThunkAPIConfig {
  [key: string]: string;
}

export const createCustomAsyncThunk = <Returned, ThunkArg = any>(
  name: string,
  thunk: AsyncThunkPayloadCreator<Promise<Returned>, ThunkArg>,
): AsyncThunk<
  Returned,
  ThunkArg,
  ThunkAPIConfig
> => createAsyncThunk<Returned, ThunkArg, ThunkAPIConfig>(
  name,
  async (arg, thunkAPI) => {
    try {
      return await thunk(arg, thunkAPI);
    } catch (err) {
      const { response } = err as AxiosError;

      if (!response) {
        throw err;
      }

      return thunkAPI.rejectWithValue(response.data);
    }
  },
);
