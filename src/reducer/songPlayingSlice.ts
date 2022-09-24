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
  currentDetails: {
    thumbnail: '',
    title: '',
    artistsNames: '',
    encodeId: '',
  },
  loading: 'idle',
};

// always dipatch actions setInfoSongPlaying before createayncthunk
const songPlayingSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    setInfoSongPlaying: (state, action: PayloadAction<SongPlaying['currentDetails']>) => {
      return {
        ...state,
        currentDetails: { ...action.payload },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDataMp3.pending, (state, action) => {
      return {
        ...state,
        currentSong: '',
        loading: 'pending',
      };
    });

    builder.addCase(fetchDataMp3.fulfilled, (state, action: PayloadAction<string>) => {
      return {
        ...state,
        currentSong: action.payload,
        loading: 'successed',
      };
    });

    builder.addCase(fetchDataMp3.rejected, (state, action) => {
      return {
        ...state,
        currentSong: '',
        loading: 'failed',
      };
    });
  },
});

export const { setInfoSongPlaying } = songPlayingSlice.actions;
export default songPlayingSlice.reducer;
