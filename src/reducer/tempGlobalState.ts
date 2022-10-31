import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ArtistDetail, PlaylistItem, SongApi, TempState } from '../types';

// add item temp in global state to fast render UI

const initialState: TempState = {
  temp_songs: [],
  temp_playlists: [],
  temp_artists: [],
  temp_search: {} as TempState['temp_search'],
};

const tempGlobalState = createSlice({
  name: 'temp-state',
  initialState,
  reducers: {
    addTempSong: (state, action: PayloadAction<SongApi>) => {
      // temp state only save 5 item latest
      if (state.temp_songs.length === 5) {
        const songs = [...state.temp_songs];
        songs.splice(0, 1); // delete last item in arr

        return {
          ...state,
          temp_songs: [...songs, action.payload],
        };
      }

      return {
        ...state,
        temp_songs: [...state.temp_songs, action.payload],
      };
    },
    addTempPlaylist: (state, action: PayloadAction<PlaylistItem>) => {
      // temp state only save 5 item latest
      if (state.temp_playlists.length === 5) {
        const playlists = [...state.temp_playlists];
        playlists.splice(0, 1);

        return {
          ...state,
          temp_playlists: [...playlists, action.payload],
        };
      }

      return {
        ...state,
        temp_playlists: [...state.temp_playlists, action.payload],
      };
    },
    addTempArtist: (state, action: PayloadAction<ArtistDetail>) => {
      if (state.temp_artists.length === 5) {
        const artists = [...state.temp_artists];
        artists.splice(0, 1); // remove first item

        return {
          ...state,
          temp_artists: [...artists, action.payload],
        };
      }

      return {
        ...state,
        temp_artists: [...state.temp_artists, action.payload],
      };
    },
    addTempSearch: (state, action: PayloadAction<TempState['temp_search']>) => {
      return {
        ...state,
        temp_search: action.payload,
      };
    },
  },
});

export const { addTempSong, addTempPlaylist, addTempArtist, addTempSearch } =
  tempGlobalState.actions;
export default tempGlobalState.reducer;
