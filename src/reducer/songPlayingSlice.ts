import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SongPlaying } from '../types';

const initialState: SongPlaying = {
  listWatting: [],
};

const songPlayingSlice = createSlice({
  name: 'song-playing',
  initialState,
  reducers: {
    // add id song into queue
    addSongToQueue: (state, action: PayloadAction<string>) => {
      const checkSongInQueue = state.listWatting.find((item) => item === action.payload);

      if (checkSongInQueue) {
        console.log('Song already in list');
        return;
      }

      return {
        ...state,
        listWatting: [...state.listWatting, action.payload],
      };
    },
    // add a playlist to play
    addPlaylist: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        listWatting: action.payload,
      };
    },
    // play a song
    setOneSongPlaying: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        currentPlaying: action.payload,
      };
    },
    // set song in queue to play
    setSongPlayingInQueue: (state, action: PayloadAction<number>) => {
      const currentPlaying = state.listWatting[action.payload];

      return {
        ...state,
        currentPlaying,
      };
    },
  },
});

export const { addSongToQueue, setSongPlayingInQueue, setOneSongPlaying } =
  songPlayingSlice.actions;
export default songPlayingSlice.reducer;
