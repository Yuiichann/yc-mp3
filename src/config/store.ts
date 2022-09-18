import { configureStore } from '@reduxjs/toolkit';
import mainInfoReducer from '../reducer/mainInfoSlice';
import songPlayingReducer from '../reducer/songPlaying';

export const store = configureStore({
  reducer: {
    mainInfo: mainInfoReducer,
    songPlaying: songPlayingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
