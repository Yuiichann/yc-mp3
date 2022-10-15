import { configureStore } from '@reduxjs/toolkit';
import audioStatusReducer from '../reducer/audioStatus';
import mainInfoReducer from '../reducer/mainInfoSlice';
import playlistReducer from '../reducer/playlistSlice';
import songPlayingReducer from '../reducer/songPlayingSlice';
import tempGlobalReducer from '../reducer/tempGlobalState';

export const store = configureStore({
  reducer: {
    mainInfo: mainInfoReducer,
    songPlaying: songPlayingReducer,
    playlist: playlistReducer,
    audioStatus: audioStatusReducer,
    tempGlobalState: tempGlobalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
