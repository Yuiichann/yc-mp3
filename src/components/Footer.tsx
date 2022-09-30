import { memo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../config/store';

const Footer = () => {
  const { loading } = useSelector((state: RootState) => state.songPlaying);
  const { isHiddenMusicPlayer } = useSelector((state: RootState) => state.audioStatus);
  return (
    <footer
      className={`w-full text-center bg-[whitesmoke] shadow-sm effect ${
        loading === 'idle' || loading === 'failed' || isHiddenMusicPlayer ? '' : 'pb-player'
      }`}
    >
      <div className="container">
        <div className="h-navbar flex items-center justify-center">
          <p className="text-[12px] text-secondary tracking-widest">
            Copyright © 2022 -{' '}
            <a href="https://www.facebook.com/hiiradesu" target="_blank">
              YC
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
