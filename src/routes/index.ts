import Album from '../pages/Album';
import Home from '../pages/Home';
import Latest from '../pages/Latest';
import NotFound from '../pages/NotFound';
import Private from '../pages/Private';
import Ranking from '../pages/Ranking';
import Search from '../pages/Search';
import SongInfo from '../pages/SongInfo';
import { RoutesProps } from '../types';

const routes: RoutesProps[] = [
  {
    title: 'Trang chủ(Khám phá)',
    index: true,
    path: '/',
    component: Home,
  },
  {
    title: 'Nhạc mới nhất(Latest)',
    path: '/nhac-moi-nhat',
    component: Latest,
  },
  {
    title: 'Album mới nhất(Latest)',
    path: '/album-moi-nhat',
    component: Latest,
  },
  {
    title: 'Cá Nhân',
    path: '/ca-nhan',
    component: Private,
  },
  {
    title: 'playlists',
    path: '/playlist',
    component: Album,
  },
  {
    title: 'Tìm kiếm',
    path: '/tim-kiem',
    component: Search,
  },
  {
    title: 'Bảng xếp hạng',
    path: '/bxh',
    component: Ranking,
  },
  {
    title: 'Thông tin bài hát',
    path: '/bai-hat',
    component: SongInfo,
  },
  {
    title: 'Thông tin Album',
    path: '/album',
    component: Album,
  },
  {
    title: 'Không tìm thấy',
    path: '/:error',
    component: NotFound,
  },
];

export default routes;
