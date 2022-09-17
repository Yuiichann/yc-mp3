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
};
