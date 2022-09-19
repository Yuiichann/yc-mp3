import AlbumInfo from '../pages/AlbumInfo';
import Home from '../pages/Home';
import Latest from '../pages/Latest';
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
    title: 'Cá Nhân',
    path: '/ca-nhan',
    component: Private,
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
    component: AlbumInfo,
  },
];

export default routes;
