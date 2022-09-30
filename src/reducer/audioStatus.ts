import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AudioStatus } from '../types';

const initialState: AudioStatus = {
  statusAudio: 'pause',
  isLoop: false,
  isHiddenMusicPlayer: false,
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
  },
});

export const { setStatusAudio, setLoopAudio, setIsHiddenMusicPlayer } = audioStatusSlice.actions;
export default audioStatusSlice.reducer;
