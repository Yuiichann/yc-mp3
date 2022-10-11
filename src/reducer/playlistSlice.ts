import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlayList, SongApi } from '../types';

const initialState: PlayList = {
  playlistDetail: {
    encodeId: '',
    title: '',
    thumbnail: '',
    artistsNames: '',
  },
  songs: {
    total: 0,
    totalDuration: 0,
    items: [],
  },
  currentSongIndex: 0,
};

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    // init a new playlist ---> click start a playlist
    initNewPlaylist: (state, action: PayloadAction<PlayList>) => {
      // save encodeId of list to local
      localStorage.setItem(
        '__currentPlaylist',
        JSON.stringify(action.payload.playlistDetail.encodeId)
      );

      return action.payload;
    },
    // change currentSongIndex ==> dispatch new song in playlist
    setPlayBySongIndex: (state, action: PayloadAction<PlayList['currentSongIndex']>) => {
      return {
        ...state,
        currentSongIndex: action.payload,
      };
    },
    removePlaylist: () => {
      return initialState;
    },
  },
});

export const { initNewPlaylist, removePlaylist, setPlayBySongIndex } = playlistSlice.actions;
export default playlistSlice.reducer;
