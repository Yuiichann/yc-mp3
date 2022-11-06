import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ycMp3 from '../api/ycmp3Api';
import { SongPlaying } from '../types';

interface FetchDataFulfilled {
  link_mp3: string;
  songDetail: SongPlaying['currentDetails'];
}

// get data song playing in local storage
const getDataLocal = () => {
  const localData = localStorage.getItem('playing');

  if (!localData) return undefined;

  const parserData = JSON.parse(localData);
  return parserData as SongPlaying;
};

const initialState: SongPlaying = getDataLocal() || {
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

// thunk function fetch data link mp3
export const fetchDataMp3 = createAsyncThunk(
  'song/fetchLinkMusic',
  async (songDetail: SongPlaying['currentDetails'], thunkAPI) => {
    const resZing: any = await ycMp3.getSong({ id: songDetail.encodeId });

    // get API of Zing Mp3 Successfully
    if (resZing.msg === 'Success' && resZing.data['128']) {
      return {
        link_mp3: resZing.data['128'],
        songDetail,
      };
    }

    const resAlbumYc: any = await ycMp3.getDataSongOfAlbumYc({ id: songDetail.encodeId });

    // get API of Yc Album
    if (resAlbumYc.msg === 'Success' && resAlbumYc.data['128']) {
      return {
        link_mp3: resAlbumYc.data['128'],
        songDetail,
      };
    }

    // data not found
    return thunkAPI.rejectWithValue(resZing.msg);
  }
);

// always dipatch actions setInfoSongPlaying before createayncthunk
const songPlayingSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //  case pending
    builder.addCase(fetchDataMp3.pending, (state, action) => {
      return {
        currentDetails: {
          title: '',
          artistsNames: '',
          encodeId: '',
          thumbnail: '',
          thumbnailM: '',
        },
        currentSong: '',
        loading: 'pending',
      };
    });

    // case fulfilled
    builder.addCase(fetchDataMp3.fulfilled, (state, action: PayloadAction<FetchDataFulfilled>) => {
      const currentSong: SongPlaying = {
        currentDetails: action.payload.songDetail,
        currentSong: action.payload.link_mp3,
        loading: 'init-local',
      };

      localStorage.setItem('playing', JSON.stringify(currentSong));

      return {
        currentDetails: action.payload.songDetail,
        currentSong: action.payload.link_mp3,
        loading: 'successed',
      };
    });

    // case rejected
    builder.addCase(fetchDataMp3.rejected, (state, action) => {
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
