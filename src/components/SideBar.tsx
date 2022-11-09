import { memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { sideBarItem } from '../constants/sideBarItems';

const SideBar = () => {
  // tac nhan gay re-render
  const navigate = useNavigate();
  const location = useLocation(); //get location now

  // push route
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="m-1 sticky top-[calc(56px+36px)] left-0">
      <ul className="flex flex-col font-normal space-y-4">
        {sideBarItem.map((item) => (
          <li
            className={`sidebar-item select-none ${
              location.pathname === item.path && 'sidebar-item--active'
            }`}
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
