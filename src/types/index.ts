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
  isLoop: boolean;
  isHiddenMusicPlayer: boolean;
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
  top?: SongApi;
  artists: any;
  videos?: VideoSearchItems[];
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

// Main Infomation of app include banner,playlist,... ==> use in rudux
interface MainInfo {
  banner: BannerApi[];
  newRelease: NewReleaseApi;

  isLoading: boolean;
  error?: {
    message: string;
  };
}

// Banner Api of main info
interface BannerApi {
  banner: string;
  cover: string;
  description: string;
  encodeId: string;
  title: string;
  type: number;
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
  artists: [];
  encodeId: string;
  hasLyric: boolean;
  genres: [];
}

// Album API --> using on Home
interface AlbumApi {
  encodeId: string;
  artistNames: string;
  artists: [];
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
};
