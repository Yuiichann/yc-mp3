interface ApiConfig {
  baseUrl: string;
}

interface RoutesProps {
  title: string;
  index?: boolean;
  path: string;
  component: () => JSX.Element;
}

interface AudioStatus {
  statusAudio: 'playing' | 'pause';
  isLoop: false | 'single' | 'multi';
  volumn: number;
  isPlaylist: boolean;
}

interface SideBarItem {
  Icon: any;
  path: string;
  title: string;
}

// curr song playing in app => use in redux
interface SongPlaying {
  currentSong: string;
  currentDetails: {
    title: string;
    thumbnail: string;
    thumbnailM: string;
    artistsNames: string;
    encodeId: string;
  };
  loading: 'idle' | 'pending' | 'successed' | 'failed';
}

// Type state Search in page Search
interface SearchItems {
  song: SongApi[];
  playlists: AlbumApi[];
  top?: TopItemSearch;
  artists: any;
  videos?: VideoSearchItems[];
}

// Song or Artist - using for SearchItems
interface TopItemSearch {
  alias?: string;
  thumbnail?: string;
  thumbnailM?: string;
  name?: string;
  encodeId?: string;
  title?: string;
  artistsNames?: string;
}

// playlist using in playlistSlice
interface PlayList {
  playlistDetail: {
    encodeId: string;
    title: string;
    artistsNames?: string;
    thumbnail: string;
  };
  songs: PlaylistItem['song'];
  currentSongIndex: number;
}

// using for Artists in home
interface Artist {
  alias: string;
  id: string;
  spotlight: boolean;
  thumbnail: string;
  thumbnailM: string;
  cover: string;
  name: string;
}

// using for ArtistsDetail
interface ArtistDetail extends Artist {
  realname: string;
  biography: string;
  birthday: string;
  national: string;
  sortBiography: string;
  topAlbum: AlbumApi;
  sections: {
    sectionType: 'playlist' | 'video' | 'song' | 'artist';
    title: string;
    items: any;
  }[];
}

// state global save temp
interface TempState {
  temp_songs: SongApi[];
  temp_playlists: PlaylistItem[];
  temp_artists: ArtistDetail[];
}

// Main Infomation of app include banner,playlist,... ==> use in rudux
interface MainInfo {
  banner: BannerApi[];
  newRelease: NewReleaseApi;
  weekend: MainInfoSlider;
  newSongSlider: MainInfoSlider;
  top100: MainInfoSlider;
  artistSpotlight: {
    title: string;
    items: Artist[];
  };
  chart: ChartData;

  albumYc: SongApi[];

  isLoading: boolean;
  error?: {
    message: string;
  };
}

// chart data in maininfo
interface ChartData {
  chart: {
    items: {};
    times: {
      hour: string;
    }[];
    totalScore: number;
    minScore: number;
    maxScore: number;
  };
  items: SongApi[];
}

// chart home using in ranking
interface ChartHome {
  RTChart: {
    items: SongApi[];
  };
  weekChart: {
    korea: WeekChartItem;
    vn: WeekChartItem;
    us: WeekChartItem;
  };
}

// using for ChartHome
interface WeekChartItem {
  banner: string;
  country: string;
  cover: string;
  group: {};
  items: SongApi[];
  year: number;
  playlistId: string;
  startDate: string;
  endDate: string;
}

// weekend items in Maininfo
interface MainInfoSlider {
  title: string;
  items: AlbumApi[];
}

// using for page Bang Xep Hang (top100 Api)
interface DataRanking {
  title: string;
  genre: {
    name: string;
  };
  items: BannerApi[];
}

// Banner Api of main info
interface BannerApi {
  banner: string;
  cover: string;
  description: string;
  encodeId: string;
  title: string;
  type: number;
  thumbnail?: string;
  thumbnailM?: string;
  textType?: string;
}

// New Release Api of main info
interface NewReleaseApi {
  title: string;
  song: SongApi[];
  album: AlbumApi[];
}

// Song api
interface SongApi {
  thumbnail: string;
  thumbnailM: string;
  title: string;
  releaseDate: number | string;
  duration: number;
  alias: string;
  artistsNames: string;
  artists: Artist[];
  encodeId: string;
  hasLyric: boolean;
  genres: [];
  score: number;
  rakingStatus: number;
}

// // using for Song Yc Collection
// interface SongYcAlbum {
//   thumbnail: string;
//   thumbnailM: string;
//   title: string;
//   releaseDate: number | string;
//   duration: number;
//   artistsNames: string;
//   encodeId: string;
// }

// Album API --> using on Home
interface AlbumApi {
  encodeId: string;
  artistNames: string;
  artists: Artist[];
  releaseDate: string | number;
  artistsNames: string;
  textType: string;
  thumbnail: string;
  thumbnailM: string;
  title: string;
  isAlbum: boolean;
}

// using for search data
interface VideoSearchItems {
  title: string;
  artistsNames: string;
  alias: string;
  duration: number;
  encodeId: string;
  thumbnail: string;
  thumbnailM: string;
  artist: {};
  artists: [];
}

// Using page Video
interface VideoItems extends VideoSearchItems {
  streamingStatus: number;
  privacy: string;
  streaming: {
    mp4: any;
  };
}

// using for page album and playlist
interface PlaylistItem extends AlbumApi {
  song: {
    total: number;
    totalDuration: number;
    items: SongApi[];
  };
  subType: number;
  textType: string;
}

// Interface params API
interface SearchParams {
  keyword: string;
}

interface IDParams {
  id: string;
}

interface HomeParams {
  page: string;
}

interface ArtistParams {
  name: string;
}

export type {
  ApiConfig,
  SearchParams,
  IDParams,
  HomeParams,
  ArtistParams,
  RoutesProps,
  SideBarItem,
  BannerApi,
  MainInfo,
  SongApi,
  AlbumApi,
  NewReleaseApi,
  SongPlaying,
  PlayList,
  PlaylistItem,
  SearchItems,
  VideoItems,
  AudioStatus,
  DataRanking,
  Artist,
  MainInfoSlider,
  ArtistDetail,
  ChartHome,
  TempState,
};
