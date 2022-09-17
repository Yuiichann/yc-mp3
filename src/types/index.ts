interface ApiConfig {
  baseUrl: string;
}

interface RoutesProps {
  title: string;
  exact?: boolean;
  path: string;
  component: () => JSX.Element;
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

export type { ApiConfig, SearchParams, IDParams, HomeParams, ArtistParams, RoutesProps };
