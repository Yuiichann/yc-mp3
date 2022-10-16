import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ycMp3 from '../api/ycmp3Api';
import { SongPlaying, SongYcAlbum } from '../types';

interface FetchDataFulfilled {
  link_mp3: string;
  songDetail: SongPlaying['currentDetails'];
}

// thunk function fetch data link mp3
export const fetchDataMp3 = createAsyncThunk(
  'song/fetchLinkMusic',
  async (songDetail: SongPlaying['currentDetails'], thunkAPI) => {
    const res: any = await ycMp3.getSong({ id: songDetail.encodeId });

    if (res.msg === 'Success' && res.data['128']) {
      return {
        link_mp3: res.data['128'],
        songDetail,
      };
    } else {
      return thunkAPI.rejectWithValue(res.msg);
    }
  }
);

// thunk function fetch data Yc Collection
export const fetchYcCollection = createAsyncThunk(
  'song/fetchYcSong',
  async (encodeId: string, thunkAPI) => {
    const res: any = await ycMp3.getOneSongInYcAlbum({ id: encodeId });

    if (res.msg === 'Success') {
      const songItem: SongYcAlbum = res.data;

      return songItem;
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
    thumbnailM: '',
  },
  loading: 'idle',
};

// always dipatch actions setInfoSongPlaying before createayncthunk
const songPlayingSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // case of fetch link mp3
    builder.addCase(fetchDataMp3.pending, (state, action) => {
      return {
        currentDetails: initialState.currentDetails,
        currentSong: '',
        loading: 'pending',
      };
    });

    builder.addCase(fetchDataMp3.fulfilled, (state, action: PayloadAction<FetchDataFulfilled>) => {
      return {
        currentDetails: action.payload.songDetail,
        currentSong: action.payload.link_mp3,
        loading: 'successed',
      };
    });

    builder.addCase(fetchDataMp3.rejected, (state, action) => {
      return {
        currentDetails: initialState.currentDetails,
        currentSong: '',
        loading: 'failed',
      };
    });

    // case fetch data from yc collection
    builder.addCase(fetchYcCollection.pending, (state, action) => {
      return {
        ...state,
        currentSong: '',
        loading: 'pending',
      };
    });

    builder.addCase(fetchYcCollection.fulfilled, (state, action: PayloadAction<SongYcAlbum>) => {
      return {
        currentSong: action.payload.link_mp3,
        currentDetails: {
          thumbnail: action.payload.thumbnail,
          thumbnailM: action.payload.thumbnailM,
          artistsNames: action.payload.artistsNames,
          encodeId: action.payload.encodeId,
          title: action.payload.title,
        },
        loading: 'successed',
      };
    });

    builder.addCase(fetchYcCollection.rejected, (state, action) => {
      return {
        currentDetails: initialState.currentDetails,
        currentSong: '',
        loading: 'failed',
      };
    });
  },
});

export const {} = songPlayingSlice.actions;
export default songPlayingSlice.reducer;
