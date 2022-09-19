import { memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as Svg1 } from '../assets/icons/svg1.svg'; // kham pha
import { ReactComponent as Svg3 } from '../assets/icons/svg3.svg'; // ca nhan
import { ReactComponent as Svg4 } from '../assets/icons/svg4.svg'; // nhac moi
import { ReactComponent as Ranking } from '../assets/icons/ranking.svg'; // ranking
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
    path: '/nhac-moi',
    title: 'Nhạc Mới',
  },
  {
    Icon: Ranking,
    path: '/bxh',
    title: 'Bảng Xếp Hạng',
  },
  {
    Icon: Svg3,
    path: '/ca-nhan',
    title: 'Cá Nhân',
  },
];

const SideBar = () => {
  // tac nhan gay re-render
  const navigate = useNavigate();
  const location = useLocation(); //get location now

  // push route
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="m-1">
      <ul className="flex flex-col font-normal space-y-4">
        {sideBarItem.map((item) => (
          <li
            className={`sidebar-item ${location.pathname === item.path && 'sidebar-item--active'}`}
            key={item.path}
            onClick={() => handleNavigate(item.path)}
          >
            <item.Icon width={20} height={20} />
            <p>{item.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(SideBar);
