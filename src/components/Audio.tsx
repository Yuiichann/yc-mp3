import { memo, useEffect, useRef, useState } from 'react';
import { ImLoop, ImVolumeHigh, ImVolumeMute2 } from 'react-icons/im';
import { RiPauseCircleFill, RiPlayFill, RiSkipBackFill, RiSkipForwardFill } from 'react-icons/ri';
import { AiOutlineLoading } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AppDispatch, RootState } from '../config/store';
import { setLoopAudio, setStatusAudio, setVolumnAudio } from '../reducer/audioStatus';
import { setPlayBySongIndex } from '../reducer/playlistSlice';
import InputRangeVolumn from './InputRangeVolumn';

interface Props {
  linkMp3?: string;
}

const Audio = ({ linkMp3 }: Props) => {
  const { statusAudio, isLoop, volumn, isPlaylist } = useSelector(
    (state: RootState) => state.audioStatus
  );
  const { currentSongIndex, songs } = useSelector((state: RootState) => state.playlist);
  const { loading } = useSelector((state: RootState) => state.songPlaying);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioCanPlay, setAudioCanPlay] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  //when fetch data mp3 to change music, in status pending ==> stop music now and wait new linkMp3
  useEffect(() => {
    if (loading === 'pending' && linkMp3) {
      handlePauseMusic(true);
    }

    if (loading === 'successed') {
      setAudioCanPlay(false);
    }
  }, [loading]);

  //handle when change props: linkmp3 ==> re load audio
  useEffect(() => {
    if (!linkMp3) {
      dispatch(setStatusAudio('pause'));
      return;
    }

    handleReloadMusic();

    // gan lai volumn to new Song current
    if (audioRef.current) {
      audioRef.current.volume = volumn;
    }
  }, [linkMp3]);

  // active when isPlaylist === true
  // handle when fetch data failed ==> will fetch next song in play list

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

  // handle when click prev song
  const handleSkipBackSong = () => {
    if (!isPlaylist) {
      toast.warning('Danh sách phát rỗng!');
      return;
    }
    if (loading === 'pending') {
      return;
    }

    // check if === 0, stop func
    if (currentSongIndex === 0) {
      const songInEndList = songs.items.length - 1;
      dispatch(setPlayBySongIndex(songInEndList));
      return;
    }

    const newCurrentSongIndex = currentSongIndex - 1; // calculator index of prev song
    dispatch(setPlayBySongIndex(newCurrentSongIndex));
  };

  // handle when click next song or when end song and next new song
  const handleSkipForwardSong = (isClickSkip?: boolean) => {
    if (!isPlaylist) {
      toast.warning('Danh sách phát rỗng!');
      return;
    }
    // disable click when fetch data
    if (loading === 'pending') {
      return;
    }

    const songsLength = songs.items.length; // get length of list song playlist
    const newCurrentSongIndex = currentSongIndex + 1; // calculator index of next song

    // if true, we is end playlist now
    if (newCurrentSongIndex === songsLength) {
      // check if loop is true or isClickSkip true, restart playlist ---- and false ==> pause music
      if (isLoop || isClickSkip) {
        dispatch(setPlayBySongIndex(0));
      } else {
        handlePauseMusic(true);
      }
    } else {
      // when not end list ==> play next song
      dispatch(setPlayBySongIndex(newCurrentSongIndex));
    }
  };

  // handle when Ended Music
  const handleEndedMusic = () => {
    // check isPlaylist or not
    if (isPlaylist) {
      handleSkipForwardSong();
    } else {
      // if loop is active with simple song
      if (isLoop) {
        handlePauseMusic(true);
        setTimeout(() => {
          handlePlayMusic(true);
        }, 50);
      } else {
        handlePauseMusic(true);
      }
    }
  };

  // when audio can play, set state duration of song
  const handleCanPlay = () => {
    if (!audioRef.current) return;

    setAudioCanPlay(true);
    handlePlayMusic(true);
  };

  // handle when change input volumn
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
      {/* Audio */}
      {linkMp3 && (
        <audio hidden ref={audioRef} onEnded={handleEndedMusic} onCanPlay={handleCanPlay}>
          <source src={linkMp3} />
        </audio>
      )}

      {/* time progress in mobile */}
      {/* <InputRangeTime /> */}

      {/* Media controls */}
      <div className="h-full flex space-x-1 items-center">
        <div className="flex-grow flex space-x-1 justify-center">
          <div className="icon-player" onClick={handleSkipBackSong}>
            <RiSkipBackFill />
          </div>
          {!audioCanPlay ? (
            <div className="icon-player animate-spin">
              <AiOutlineLoading />
            </div>
          ) : statusAudio === 'playing' ? (
            <div className="icon-player" onClick={() => handlePauseMusic(true)}>
              <RiPauseCircleFill />
            </div>
          ) : (
            <div className="icon-player" onClick={() => handlePlayMusic(true)}>
              <RiPlayFill />
            </div>
          )}
          <div className="icon-player" onClick={() => handleSkipForwardSong(true)}>
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
            <div className="absolute hidden group-hover:flex left-1/2 top-0 w-[80px] h-[30px] bg-primary -translate-y-full -translate-x-1/2  items-center justify-center rounded-xl after:absolute after:bottom-0 after:left-0 after:w-full after:h-[15px] after:translate-y-full">
              <InputRangeVolumn
                volumnValue={volumn}
                handleChangeVolumn={handleChangeVolumn}
                isChildOfComponent="audio"
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
    </>
  );
};

export default memo(Audio);
