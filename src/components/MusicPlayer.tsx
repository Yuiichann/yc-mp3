import { useSelector } from 'react-redux';
import { RootState } from '../config/store';
import { memo, useEffect, useState } from 'react';
import Audio from './Audio';
import { Link } from 'react-router-dom';
import { SkeletonSongPlaying } from './Skeleton';
import { AiOutlineQuestion } from 'react-icons/ai';
import { toast } from 'react-toastify';

const MusicPlayer = () => {
  const { currentSong, currentDetails, loading } = useSelector(
    (state: RootState) => state.songPlaying
  );

  // alert when data fetch dont have
  useEffect(() => {
    if (loading === 'failed') {
      toast.error('Không có dữ liệu nhạc!!!');
    }
  }, [loading]);

  return (
    <>
      <div
        className={`fixed h-player effect ${
          loading === 'idle' ? '-bottom-[90px]' : 'bottom-0'
        } left-0 w-screen bg-tertiary bg-main text-white overflow-hidden`}
      >
        <div className="h-full px-1 py-2 lg:px-8 flex">
          {/* Current Song Playing Infomation */}
          <div className="w-6/12 flex items-center">
            {loading === 'idle' ? (
              <>
                <h1>Rỗng</h1>
              </>
            ) : loading === 'pending' ? (
              <>
                <SkeletonSongPlaying />
              </>
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
              <>
                <div className="text-4xl flex items-center justify-center flex-grow gap-2">
                  <AiOutlineQuestion />
                </div>
              </>
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
