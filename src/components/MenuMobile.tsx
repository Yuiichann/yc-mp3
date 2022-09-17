import { memo } from 'react';
import { Link } from 'react-router-dom';
import SearchInput from './SearchInput';

interface Props {
  handleCloseMenu: VoidFunction;
}

const MenuMobile = ({ handleCloseMenu }: Props) => {
  return (
    <nav className="container">
      <div className="flex flex-col space-y-6">
        {/* Input Search */}
        <div className="mt-4">
          <SearchInput />
        </div>

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
      </div>
    </nav>
  );
};

export default memo(MenuMobile);
