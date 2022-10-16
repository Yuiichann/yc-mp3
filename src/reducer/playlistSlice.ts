import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '../config/store';
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
  currentSongIndex: -1,
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
    initPrivatePlaylist: (state, action: PayloadAction<SongApi>) => {
      return {
        ...state,
        songs: {
          ...state.songs,
          items: [action.payload],
        },
      };
    },
    // change currentSongIndex ==> dispatch new song in playlist
    setPlayBySongIndex: (state, action: PayloadAction<PlayList['currentSongIndex']>) => {
      return {
        ...state,
        currentSongIndex: action.payload,
      };
    },
    addSongToPlaylist: (state, action: PayloadAction<SongApi>) => {
      return {
        ...state,
        songs: { ...state.songs, items: [...state.songs.items, action.payload] },
      };
    },
    removePlaylist: () => {
      return initialState;
    },
  },
});

export const {
  initNewPlaylist,
  initPrivatePlaylist,
  removePlaylist,
  setPlayBySongIndex,
  addSongToPlaylist,
} = playlistSlice.actions;
export default playlistSlice.reducer;
