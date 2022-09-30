import { configureStore } from '@reduxjs/toolkit';
import audioStatusReducer from '../reducer/audioStatus';
import mainInfoReducer from '../reducer/mainInfoSlice';
import playlistReducer from '../reducer/playlistSlice';
import songPlayingReducer from '../reducer/songPlayingSlice';

export const store = configureStore({
  reducer: {
    mainInfo: mainInfoReducer,
    songPlaying: songPlayingReducer,
    playlist: playlistReducer,
    audioStatus: audioStatusReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
