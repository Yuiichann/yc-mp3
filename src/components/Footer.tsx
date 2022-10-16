import { memo } from 'react';
import { BsFacebook, BsGithub } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className="w-full bg-[whitesmoke] shadow-sm effect pb-player">
      <div className="container text-[13px] text-secondary tracking-widest">
        <div className="h-navbar flex flex-col items-center justify-center select-none">
          <p>Copyright © 2022 - YC Entertainment</p>
          <div className="flex items-center justify-center space-x-2">
            <h2>Contact: </h2>
            <ul className="flex items-center justify-center gap-3 text-xl text-black">
              <li className="hover:opacity-60">
                <a href="https://facebook.com/hiiradesu" target="_blank">
                  <BsFacebook />
                </a>
              </li>
              <li className="hover:opacity-60">
                <a href="https://github.com/Yuiichann" target="_blank">
                  <BsGithub />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
