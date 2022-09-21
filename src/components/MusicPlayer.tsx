import { useSelector } from 'react-redux';
import { RootState } from '../config/store';
import { memo, useRef, useEffect, useState } from 'react';

import { IoPlay, IoPlaySkipBack, IoPlaySkipForwardSharp, IoPauseCircle } from 'react-icons/io5';

const MusicPlayer = () => {
  const { currentSong, details, loading } = useSelector((state: RootState) => state.songPlaying);
  // handle change music will remove current song
  const [playAble, setPlayAble] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // handle change music will change audio tag
  useEffect(() => {
    if (loading === 'successed') {
      setPlayAble(true);
    } else {
      setPlayAble(false);
    }
  }, [loading]);

  useEffect(() => {
    if (!playAble) return;

    audioRef.current?.play();
    setIsPlay(true);
  }, [playAble]);

  const handlePlayMusic = () => {
    audioRef.current?.play();
    setIsPlay(false);
  };

  const handlePauseMusic = () => {
    audioRef.current?.pause();
    setIsPlay(true);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 w-screen bg-tertiary bg-main text-white">
        <div className="h-player px-1 py-2 lg:px-8">
          <div className="flex flex-col space-y-2 items-center h-full justify-center">
            <div className="flex gap-12 text-24">
              <div className="cursor-pointer p-1">
                <IoPlaySkipBack />
              </div>

              {isPlay ? (
                <div className="cursor-pointer p-1" onClick={handlePauseMusic}>
                  <IoPauseCircle />
                </div>
              ) : (
                <div className="cursor-pointer p-1" onClick={handlePlayMusic}>
                  <IoPlay />
                </div>
              )}

              <div className="cursor-pointer p-1">
                <IoPlaySkipForwardSharp />
              </div>
            </div>
            <div>{loading === 'pending' ? 'Loading...' : <h1>{details.title}</h1>}</div>
          </div>
        </div>
      </div>

      {/* Audio */}
      {playAble && (
        <audio ref={audioRef}>
          <source src={currentSong} />
        </audio>
      )}
    </>
  );
};

export default memo(MusicPlayer);
