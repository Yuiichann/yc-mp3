import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { MainInfo } from '../types';

const initialState: MainInfo = {
  banner: [],
  newRelease: {
    title: '',
    song: [],
    album: [],
  },
  isLoading: true,
};

const mainInfoSlice = createSlice({
  name: 'mainInfo',
  initialState,
  reducers: {
    setDataOfMainInfo: (state, action: PayloadAction<MainInfo>) => {
      return action.payload;
    },
  },
});

export const { setDataOfMainInfo } = mainInfoSlice.actions;
export default mainInfoSlice.reducer;
