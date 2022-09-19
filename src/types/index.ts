interface ApiConfig {
  baseUrl: string;
}

interface RoutesProps {
  title: string;
  index?: boolean;
  path: string;
  component: () => JSX.Element;
}

interface SideBarItem {
  Icon: any;
  path: string;
  title: string;
}

// curr song playing in app => use in redux
interface SongPlaying {
  currentPlaying?: string;

  listWatting: string[]; // array include endcodeId waitting be play

  error?: {
    message: string;
  };
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

// Album API
interface AlbumApi {
  encodeId: string;
  artistNames: string;
  artists: [];
  releaseDate: string | number;
  textType: string;
  thumbnail: string;
  thumbnailM: string;
  title: string;
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
};
