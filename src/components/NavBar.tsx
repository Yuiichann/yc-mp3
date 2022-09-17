import { useState } from 'react';
import { BiMenuAltLeft, BiSearchAlt } from 'react-icons/bi';
import { IoCloseSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import MenuMobile from './MenuMobile';
import SearchInput from './SearchInput';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // handle open or close menu when click
  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="fixed left-0 top-0 w-screen bg-[whitesmoke] shadow-lg">
      <div className="container">
        <div className="flex flex-row justify-between items-center h-navbar">
          {/* Menu Icon Mobile */}
          <div
            className="p-2 cursor-pointer text-[26px] text-secondary lg:hidden"
            onClick={handleToggleMenu}
          >
            {isMenuOpen ? <IoCloseSharp /> : <BiMenuAltLeft />}
          </div>

          {/* Menu toggle on Mobile */}
          <div
            className={`fixed top-0 lg:hidden ${
              isMenuOpen ? 'left-0 opacity-100' : '-left-full opacity-0'
            }  mt-navbar h-screen w-screen bg-slate-200 effect`}
          >
            <MenuMobile handleCloseMenu={handleToggleMenu} />
          </div>

          {/* Logo */}
          <div className="font-bold tracking-widest p-1 hover:opacity-70 text-2xl ">
            <Link to="/" className="text-secondary logo">
              YC MP3
            </Link>
          </div>

          {/* Menu on desktop */}
          <div className="hidden lg:flex justify-center items-center space-x-4">
            {/* Search */}
            <SearchInput />

            {/* Button Group signin/signup */}
            <div className="flex flex-row justify-center items-center space-x-3">
              <Link to="/dang-nhap" className="button-none">
                Đăng Nhập
              </Link>
              <Link to="/dang-ky" className="button">
                Đăng Ký
              </Link>
            </div>
          </div>

          {/* Search Icon Mobile */}
          <div className="p-2 cursor-pointer lg:hidden" onClick={handleToggleMenu}>
            <BiSearchAlt className="text-[26px] text-secondary" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
