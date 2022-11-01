import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { MainInfo } from '../types';

const initialState: MainInfo = {
  banner: [],
  newRelease: {
    title: '',
    vPop: [],
    others: [],
  },
  weekend: {
    title: '',
    items: [],
  },
  newSongSlider: {
    title: '',
    items: [],
  },
  top100: {
    title: '',
    items: [],
  },
  liveStream: {
    title: '',
    items: [],
  },
  artistSpotlight: {
    title: '',
    items: [],
  },
  chart: {} as MainInfo['chart'],

  albumYc: [],

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
