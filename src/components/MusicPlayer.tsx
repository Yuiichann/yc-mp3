import { useSelector } from 'react-redux';
import { RootState } from '../config/store';
import { memo, useEffect, useState } from 'react';
import Audio from './Audio';
import { Link } from 'react-router-dom';

const MusicPlayer = () => {
  const { currentSong, currentDetails, loading } = useSelector(
    (state: RootState) => state.songPlaying
  );

  console.log(currentDetails);

  return (
    <>
      <div className="fixed h-player bottom-0 left-0 w-screen bg-tertiary bg-main text-white">
        <div className="h-full px-1 py-2 lg:px-8 flex">
          {/* Current Song Playing Infomation */}
          <div className="w-6/12 flex items-center">
            {loading === 'idle' ? (
              <></>
            ) : loading === 'pending' ? (
              <></>
            ) : loading === 'successed' ? (
              <>
                <div className="px-1">
                  <Link to="/">
                    <img
                      src={currentDetails.thumbnail}
                      alt=""
                      className="w-full h-full max-w-[60px] max-h-[60px] rounded-md"
                    />
                  </Link>
                </div>
                <div className="px-1 text-14 tracking-normal">
                  <Link to="/">
                    <h3>{currentDetails.title}</h3>
                  </Link>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>

          {/* Audio Component */}
          <div className="w-6/12 text-32">
            <Audio linkMp3={currentSong} lazyLoading={loading} />
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(MusicPlayer);
