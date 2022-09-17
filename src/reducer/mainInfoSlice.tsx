import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { BannerApi, MainInfo } from '../types';

const initialState: MainInfo = {
  banner: [],
  isLoading: true,
};

export const mainInfoSlice = createSlice({
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
