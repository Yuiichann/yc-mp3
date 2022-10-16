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
    // init new Playlist with one song
    initPrivatePlaylist: (state, action: PayloadAction<SongApi>) => {
      return {
        ...state,
        playlistDetail: {
          ...state.playlistDetail,
          encodeId: action.payload.encodeId,
        },
        songs: {
          ...state.songs,
          items: [action.payload],
        },
        currentSongIndex: 0,
      };
    },
    // change currentSongIndex ==> dispatch new song in playlist
    setPlayBySongIndex: (state, action: PayloadAction<PlayList['currentSongIndex']>) => {
      return {
        ...state,
        currentSongIndex: action.payload,
      };
    },
    // add one song to current Playlist
    addSongToPlaylist: (state, action: PayloadAction<SongApi>) => {
      return {
        ...state,
        songs: { ...state.songs, items: [...state.songs.items, action.payload] },
      };
    },
    // remove playlist
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
