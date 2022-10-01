import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AudioStatus } from '../types';

// get data from local storage
const isLoopLocal = JSON.parse(localStorage.getItem('__isLoop') || 'false') as boolean;

const initialState: AudioStatus = {
  statusAudio: 'pause',
  isLoop: isLoopLocal,
  isHiddenMusicPlayer: false,
  volumn: 1,
};

const audioStatusSlice = createSlice({
  name: 'audio-status',
  initialState,
  reducers: {
    setStatusAudio: (state, action: PayloadAction<AudioStatus['statusAudio']>) => {
      return {
        ...state,
        statusAudio: action.payload,
      };
    },
    setLoopAudio: (state, action: PayloadAction<AudioStatus['isLoop']>) => {
      // set data to local
      localStorage.setItem('__isLoop', JSON.stringify(action.payload));

      return {
        ...state,
        isLoop: action.payload,
      };
    },
    setIsHiddenMusicPlayer: (state, action: PayloadAction<AudioStatus['isHiddenMusicPlayer']>) => {
      return {
        ...state,
        isHiddenMusicPlayer: action.payload,
      };
    },
    setVolumnAudio: (state, action: PayloadAction<AudioStatus['volumn']>) => {
      return {
        ...state,
        volumn: action.payload,
      };
    },
  },
});

export const { setStatusAudio, setLoopAudio, setIsHiddenMusicPlayer, setVolumnAudio } =
  audioStatusSlice.actions;
export default audioStatusSlice.reducer;
