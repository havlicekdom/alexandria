import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { Message } from 'types/messages';
import { parseErrorToMessage } from 'utils/messages';

type SharedState = {
  loading: number;
  message: Message | null;
};

const initialState: SharedState = {
  loading: 0,
  message: null,
};

export const sharedSlice = createSlice({
  name: 'shared',
  initialState,
  reducers: {
    clearMessage(state) {
      state.message = initialState.message;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher((action: AnyAction) => action.type.includes('/pending'), (state) => {
        state.loading += 1;
      })
      .addMatcher((action: AnyAction) => action.type.includes('/fulfilled'), (state, action) => {
        state.message = action.payload.message;
        state.loading -= 1;
      })
      .addMatcher((action: AnyAction) => action.type.includes('/rejected'), (state, action) => {
        if (action.payload.statusCode !== 401) state.message = parseErrorToMessage(action.payload);
        state.loading -= 1;
      });
  },
});

export const selectIsLoading = (state: RootState) => state.shared.loading > 0;
export const selectMessage = (state: RootState) => state.shared.message;

export const { clearMessage } = sharedSlice.actions;

export default sharedSlice.reducer;
