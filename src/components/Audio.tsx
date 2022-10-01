import React, { memo, useEffect, useRef, useState } from 'react';
import { RiPauseCircleFill, RiPlayFill, RiSkipBackFill, RiSkipForwardFill } from 'react-icons/ri';
import { ImLoop, ImVolumeHigh, ImVolumeMute2 } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../config/store';
import { setLoopAudio, setStatusAudio, setVolumnAudio } from '../reducer/audioStatus';

interface Props {
  linkMp3?: string;
  lazyLoading: 'idle' | 'pending' | 'successed' | 'failed';
}

const Audio = ({ linkMp3, lazyLoading }: Props) => {
  const { statusAudio, isLoop, volumn } = useSelector((state: RootState) => state.audioStatus);
  const [duration, setDuration] = useState(0); // duration of current song
  const [currentTime, setCurrentTime] = useState(0); // current time now of song
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  //when fetch data mp3 to change music, in status pending ==> stop music now and wait new linkMp3
  useEffect(() => {
    if (lazyLoading === 'pending' && linkMp3) {
      handlePauseMusic(true);
    }
  }, [lazyLoading]);

  //handle when change props: linkmp3 ==> re load audio
  useEffect(() => {
    if (!linkMp3) {
      dispatch(setStatusAudio('pause'));
      return;
    }

    handleReloadMusic();
  }, [linkMp3]);

  // handle when dispath statusAudio in out audio component
  useEffect(() => {
    if (statusAudio === 'playing') {
      handlePlayMusic(false);
    } else {
      handlePauseMusic(false);
    }
  }, [statusAudio]);

  // handle when state volumn change will set state to audio volumn
  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = volumn;
  }, [volumn]);

  // set loop true or false
  const handleSetLoop = () => {
    if (!audioRef.current) return;

    dispatch(setLoopAudio(!isLoop));
  };

  //reload when change link music
  const handleReloadMusic = () => {
    if (!audioRef.current) return;

    audioRef.current.load();
  };

  //handle play music - onDispatchStatusAudio === true will dispatch.
  const handlePlayMusic = (onDispatchStatusAudio: boolean) => {
    if (!audioRef.current) return;

    audioRef.current.play();
    // if === true will dispatch
    if (onDispatchStatusAudio) {
      dispatch(setStatusAudio('playing'));
    }
  };

  //handle pause music - onDispatchStatusAudio === true will dispatch.
  const handlePauseMusic = (onDispatchStatusAudio: boolean) => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    // if === true will dispatch
    if (onDispatchStatusAudio) {
      dispatch(setStatusAudio('pause'));
    }
  };

  // handle Ended Music
  const handleEndedMusic = () => {
    // if loop is active
    if (isLoop) {
      handlePauseMusic(true);
      setTimeout(() => {
        handlePlayMusic(true);
      }, 50);
    } else {
      handlePauseMusic(true);
    }
  };

  // when audio can play, set state duration of song
  const handleCanPlay = () => {
    if (!audioRef.current) return;

    handlePlayMusic(true);
    setDuration(audioRef.current.duration);
  };

  // when current time change, set currentTime now
  const handleUpdateTime = () => {
    if (!audioRef.current) return;

    setCurrentTime(audioRef.current.currentTime);
  };

  const handleChangeVolumn = (volumnString: string) => {
    const volumnNumber = Number(volumnString);

    dispatch(setVolumnAudio(volumnNumber));
  };

  // click to mute song, if song is mute now, delete mute
  const handleClickToggleMuteSong = () => {
    if (volumn != 0) {
      dispatch(setVolumnAudio(0));
    } else {
      dispatch(setVolumnAudio(1));
    }
  };

  return (
    <>
      {/* time progress in mobile */}
      {/* <div className="absolute left-0 top-0 w-[calc(100%-5px)] h-[5px]">
        <input
          type="range"
          id=""
          className="absolute left-0 top-0 w-full h-full bg-amber-400 appearance-none"
        />
      </div> */}

      {/* Media controls */}
      <div className="h-full flex space-x-1 items-center">
        <div className="flex-grow flex space-x-1 justify-center">
          <div className="icon-player">
            <RiSkipBackFill />
          </div>
          {statusAudio === 'playing' ? (
            <div className="icon-player" onClick={() => handlePauseMusic(true)}>
              <RiPauseCircleFill />
            </div>
          ) : (
            <div className="icon-player" onClick={() => handlePlayMusic(true)}>
              <RiPlayFill />
            </div>
          )}
          <div className="icon-player">
            <RiSkipForwardFill />
          </div>
        </div>

        <div className="hidden lg:flex text-18 space-x-2">
          {/* volumn button */}
          <div className="icon-player relative group">
            {volumn > 0 ? (
              <ImVolumeHigh onClick={handleClickToggleMuteSong} />
            ) : (
              <ImVolumeMute2 onClick={handleClickToggleMuteSong} />
            )}

            {/* input range to increase/decrease volumn */}
            <div className="absolute hidden group-hover:flex left-1/2 top-0 w-[80px] h-[30px] bg-primary -translate-y-full -translate-x-1/2  items-center justify-center rounded-xl">
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                className="w-11/12 slider"
                value={volumn}
                onChange={(e) => handleChangeVolumn(e.target.value)}
              />
            </div>
          </div>
          {/* loop button */}
          <div
            className={`icon-player${isLoop ? ' text-yellow-500 bg-[rgb(0,0,0,0.3)]' : ''}`}
            onClick={handleSetLoop}
          >
            <ImLoop />
          </div>
        </div>
      </div>

      {/* Audio */}
      {linkMp3 && (
        <audio
          hidden={true}
          ref={audioRef}
          onEnded={handleEndedMusic}
          onCanPlay={handleCanPlay}
          onTimeUpdate={handleUpdateTime}
        >
          <source src={linkMp3} />
        </audio>
      )}
    </>
  );
};

export default memo(Audio);
