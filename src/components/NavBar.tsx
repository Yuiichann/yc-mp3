import { signOut } from 'firebase/auth';
import { memo, useCallback, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BiMenuAltLeft, BiSearchAlt } from 'react-icons/bi';
import { IoCloseSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../config/firebase';
import MenuMobile from './MenuMobile';
import SearchInput from './SearchInput';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user] = useAuthState(auth);

  // handle open or close menu when click
  const handleToggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, [isMenuOpen]);

  const handleSignOut = useCallback(() => {
    signOut(auth);
    toast.success('Đăng xuất thành công!!!');
  }, []);

  return (
    <header className="fixed z-50 left-0 top-0 w-screen bg-[whitesmoke] shadow-lg">
      <div className="px-2 md:px-6 lg:px-8 xl:px-5 max-w-[1636px] mx-auto">
        <div className="flex flex-row justify-between items-center h-navbar">
          {/* Menu Icon Mobile */}
          <div
            className="p-2 cursor-pointer text-[26px] text-secondary lg:hidden icon-btn"
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
            <MenuMobile handleCloseMenu={handleToggleMenu} handleSignOut={handleSignOut} />
          </div>

          {/* Logo */}
          <div
            className="font-bold tracking-widest p-1 hover:opacity-70 text-2xl"
            onClick={() => setIsMenuOpen(false)}
          >
            <Link to="/" className="text-secondary logo">
              YC MP3
            </Link>
          </div>

          {/* Menu on desktop */}
          <div className="hidden lg:flex justify-center items-center space-x-4">
            {/* Search */}
            <SearchInput />

            {/* Button Group signin/signup or profile */}
            {user ? (
              <div className="relative w-[40px] h-[40px] group">
                <Link to="/tai-khoan">
                  <img
                    src={user.photoURL || ''}
                    alt={user.displayName || ''}
                    className="w-full h-full rounded-full"
                  />
                </Link>

                <ul className="absolute hidden group-hover:block top-full right-0 text-14 w-[120px] bg-secondary rounded-md overflow-hidden text-center text-white">
                  <li className="p-2 cursor-pointer hover:opacity-70">
                    <Link to="/tai-khoan">Thư viên</Link>
                  </li>
                  <li className="p-2 cursor-pointer hover:opacity-70" onClick={handleSignOut}>
                    Đăng xuất
                  </li>
                </ul>
              </div>
            ) : (
              <div className="flex flex-row justify-center items-center space-x-3">
                <Link to="/dang-nhap" className="button-none">
                  Đăng Nhập
                </Link>
                <Link to="/dang-ky" className="button">
                  Đăng Ký
                </Link>
              </div>
            )}
          </div>

          {/* Search Icon Mobile */}
          <Link
            className="p-2 cursor-pointer lg:hidden icon-btn"
            to="/tim-kiem"
            onClick={() => setIsMenuOpen(false)}
          >
            <BiSearchAlt className="text-[26px] text-secondary" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default memo(NavBar);
