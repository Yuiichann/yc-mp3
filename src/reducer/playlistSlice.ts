import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlayList, SongApi } from '../types';

const initialState: PlayList[] = [];

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    // init a new playlist ---> click start a playlist
    initNewPlaylist: (state, action: PayloadAction<PlayList[]>) => {
      return action.payload;
    },
    // add a song to playlist now
    addNewSongToPlaylist: (state, action: PayloadAction<PlayList>) => {
      return [...state, action.payload];
    },
    // remove 1 song in playlist
    removeSong: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1);
      return state;
    },
  },
});

export const { initNewPlaylist, addNewSongToPlaylist, removeSong } = playlistSlice.actions;
export default playlistSlice.reducer;
