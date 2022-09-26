import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlayList, SongApi } from '../types';

const initialState: PlayList = {
  playlistDetail: {
    encodeId: '',
    title: '',
    thumbnail: '',
    artistsNames: '',
  },
  song: {
    total: 0,
    totalDuration: 0,
    items: [],
  },
};

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    // init a new playlist ---> click start a playlist
    initNewPlaylist: (state, action: PayloadAction<PlayList>) => {
      return action.payload;
    },
    removePlaylist: () => {
      return {
        playlistDetail: {
          encodeId: '',
          title: '',
          thumbnail: '',
          artistsNames: '',
        },
        song: {
          total: 0,
          totalDuration: 0,
          items: [],
        },
      };
    },
  },
});

export const { initNewPlaylist, removePlaylist } = playlistSlice.actions;
export default playlistSlice.reducer;
