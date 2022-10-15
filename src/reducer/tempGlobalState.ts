import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PlaylistItem, SongApi, TempState } from '../types';

// add item temp in global state to fast render UI

const initialState: TempState = {
  temp_songs: [],
  temp_playlists: [],
};

const tempGlobalState = createSlice({
  name: 'temp-state',
  initialState,
  reducers: {
    addTempSong: (state, action: PayloadAction<SongApi>) => {
      return {
        ...state,
        temp_songs: [...state.temp_songs, action.payload],
      };
    },
    addTempPlaylist: (state, action: PayloadAction<PlaylistItem>) => {
      return {
        ...state,
        temp_playlists: [...state.temp_playlists, action.payload],
      };
    },
  },
});

export const { addTempSong, addTempPlaylist } = tempGlobalState.actions;
export default tempGlobalState.reducer;
