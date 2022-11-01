import { memo } from 'react';
import { Link } from 'react-router-dom';
import { sideBarItem } from '../constants/sideBarItems';

interface Props {
  handleCloseMenu: VoidFunction;
}

const MenuMobile = ({ handleCloseMenu }: Props) => {
  return (
    <nav className="container">
      <div className="flex flex-col space-y-6 mt-12">
        {/* Button Group Signin / Signup */}
        <div className="flex flex-row justify-around lg:justify-center items-center space-x-0 lg:space-x-3">
          <Link to="/dang-nhap" className="button-outline" onClick={handleCloseMenu}>
            Đăng Nhập
          </Link>
          <Link to="/dang-ky" className="button" onClick={handleCloseMenu}>
            Đăng Ký
          </Link>
        </div>

        <div className="w-full h-[3px] bg-main rounded-sm opacity-70"></div>

        <ul className="flex flex-col w-11/12 sm:w-10/12 md:w-6/12 mx-auto">
          {sideBarItem.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="w-full flex p-2 items-center border border-secondary my-2 hover:bg-[rgb(0,0,0,0.1)]"
                onClick={() => setTimeout(() => handleCloseMenu(), 100)}
              >
                <item.Icon width={20} height={20} className="w-1/5 md:w-2/5" />
                <p className="flex-grow text-center">{item.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default memo(MenuMobile);
