import { configureStore } from '@reduxjs/toolkit';
import mainInfoReducer from '../reducer/mainInfoSlice';

export const store = configureStore({
  reducer: {
    mainInfo: mainInfoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
