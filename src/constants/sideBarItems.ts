import { ReactComponent as Svg1 } from '../assets/icons/svg1.svg'; // kham pha
import { ReactComponent as Svg3 } from '../assets/icons/svg3.svg'; // ca nhan
import { ReactComponent as Svg4 } from '../assets/icons/svg4.svg'; // nhac moi
import { ReactComponent as Ranking } from '../assets/icons/ranking.svg'; // ranking
import { ReactComponent as AlbumSvg } from '../assets/icons/album.svg';
import { ReactComponent as AlbumYc } from '../assets/icons/album-yc.svg';
import { SideBarItem } from '../types';

// export for mobile menu
export const sideBarItem: SideBarItem[] = [
  {
    Icon: Svg1,
    path: '/',
    title: 'Khám Phá',
  },
  {
    Icon: Svg4,
    path: '/nhac-moi-nhat',
    title: 'Nhạc Mới',
  },
  {
    Icon: AlbumSvg,
    path: '/album-moi-nhat',
    title: 'Album',
  },
  {
    Icon: Ranking,
    path: '/bxh',
    title: 'Bảng Xếp Hạng',
  },
  //   {
  //     Icon: Ranking,
  //     path: '/nghe-nhac-truc-tuyen',
  //     title: 'Radio',
  //   },
  {
    Icon: AlbumYc,
    path: '/album-yc',
    title: 'YC Collection',
  },
  {
    Icon: Svg3,
    path: '/ca-nhan',
    title: 'Cá Nhân',
  },
];
