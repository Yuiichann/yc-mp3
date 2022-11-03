import Account from '../pages/Account';
import AddSong from '../pages/AddSong';
import Album from '../pages/Album';
import ArtistInfo from '../pages/ArtistInfo';
import Home from '../pages/Home';
import Latest from '../pages/Latest';
import LiveStream from '../pages/LiveStream';
import NotFound from '../pages/NotFound';
import Private from '../pages/Private';
import Ranking from '../pages/Ranking';
import Search from '../pages/Search';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
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
    path: '/nhac-vn-moi-nhat',
    component: Latest,
  },
  {
    title: 'Nhạc ngước ngoài mới nhất(Latest)',
    path: '/nhac-nuoc-ngoai-moi-nhat',
    component: Latest,
  },
  {
    title: 'Cá Nhân',
    path: '/ca-nhan',
    component: Private,
  },
  {
    title: 'Đăng nhập',
    path: '/dang-nhap',
    component: SignIn,
  },
  {
    title: 'Đăng Ký',
    path: '/dang-ky',
    component: SignUp,
  },
  {
    title: 'Tài khoản',
    path: '/tai-khoan',
    component: Account,
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
    title: 'live Streaming',
    path: '/nghe-nhac-truc-tuyen',
    component: LiveStream,
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
