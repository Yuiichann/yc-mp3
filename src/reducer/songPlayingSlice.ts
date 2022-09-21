import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ycMp3 from '../api/ycmp3Api';
import { SongPlaying } from '../types';

// thunk function fetch data link mp3
export const fetchDataMp3 = createAsyncThunk(
  'song/fetchLinkMusic',
  async (encodeId: string, thunkAPI) => {
    const res: any = await ycMp3.getSong({ id: encodeId });

    if (res.msg === 'Success' && res.data['128']) {
      return res.data['128'];
    } else {
      return thunkAPI.rejectWithValue(res.msg);
    }
  }
);

const initialState: SongPlaying = {
  currentSong: '',
  loading: 'idle',
};

const songPlayingSlice = createSlice({
  name: 'song-playing',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDataMp3.pending, (state, action) => {
      return {
        ...state,
        loading: 'pending',
      };
    });

    builder.addCase(fetchDataMp3.fulfilled, (state, action: PayloadAction<string>) => {
      return {
        currentSong: action.payload,
        loading: 'successed',
      };
    });

    builder.addCase(fetchDataMp3.rejected, (state, action) => {
      return {
        currentSong: '',
        loading: 'failed',
      };
    });
  },
});

export const {} = songPlayingSlice.actions;
export default songPlayingSlice.reducer;
