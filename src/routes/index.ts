import AddSong from '../pages/AddSong';
import Album from '../pages/Album';
import ArtistInfo from '../pages/ArtistInfo';
import Home from '../pages/Home';
import Latest from '../pages/Latest';
import NotFound from '../pages/NotFound';
import Private from '../pages/Private';
import Ranking from '../pages/Ranking';
import Search from '../pages/Search';
import SongInfo from '../pages/SongInfo';
import Video from '../pages/Video';
import YCCollection from '../pages/YCCollection';
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
  // bun bun lmao
  {
    title: 'Thêm nhạc',
    path: '/dashboard/them-bai-hat',
    component: AddSong,
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
    title: 'Bộ sưu tập của Yc',
    path: '/album-yc',
    component: YCCollection,
  },
  {
    title: 'Thông tin bài hát',
    path: '/bai-hat',
    component: SongInfo,
  },
  {
    title: 'Thông tin ca sĩ',
    path: '/ca-si',
    component: ArtistInfo,
  },
  {
    title: 'Thông tin Album',
    path: '/album',
    component: Album,
  },
  {
    title: 'Thông tin & Xem Album',
    path: '/video',
    component: Video,
  },
  {
    title: 'Không tìm thấy',
    path: '*',
    component: NotFound,
  },
];

export default routes;
