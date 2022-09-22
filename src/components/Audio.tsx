import React, { memo, useState, useRef, useEffect } from 'react';
import { IoPlay, IoPlaySkipBack, IoPlaySkipForwardSharp, IoPauseCircle } from 'react-icons/io5';

interface Props {
  linkMp3?: string;
  lazyLoading: 'idle' | 'pending' | 'successed' | 'failed';
}

const Audio = ({ linkMp3, lazyLoading }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  //when fetch data mp3 to change music, in status pending ==> stop music now and wait new linkMp3
  useEffect(() => {
    if (lazyLoading === 'pending' && linkMp3) {
      handlePauseMusic();
    }
  }, [lazyLoading]);

  //handle change music
  useEffect(() => {
    if (!linkMp3) return;

    handleReloadMusic();
    handlePlayMusic();
  }, [linkMp3]);

  //reload when change link music
  const handleReloadMusic = () => {
    if (!audioRef.current) return;

    audioRef.current.load();
  };

  //handle play music
  const handlePlayMusic = () => {
    if (!audioRef.current) return;

    audioRef.current.play();
    setIsPlaying(true);
  };

  //handle pause music
  const handlePauseMusic = () => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handleEndedMusic = () => {
    if (!audioRef.current) return;
  };

  return (
    <>
      <div className="h-full flex gap-4 items-center">
        <div className="icon-player">
          <IoPlaySkipBack />
        </div>
        {isPlaying ? (
          <div className="icon-player" onClick={handlePauseMusic}>
            <IoPauseCircle />
          </div>
        ) : (
          <div className="icon-player" onClick={handlePlayMusic}>
            <IoPlay />
          </div>
        )}
        <div className="icon-player">
          <IoPlaySkipForwardSharp />
        </div>
      </div>

      {/* Audio */}
      {linkMp3 && (
        <audio ref={audioRef}>
          <source src={linkMp3} />
        </audio>
      )}
    </>
  );
};

export default memo(Audio);
