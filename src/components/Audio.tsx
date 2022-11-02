import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { ImLoop, ImVolumeHigh, ImVolumeMute2 } from 'react-icons/im';
import { RiPauseCircleFill, RiPlayFill, RiSkipBackFill, RiSkipForwardFill } from 'react-icons/ri';
import { TiArrowLoopOutline } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AppDispatch, RootState } from '../config/store';
import { setLoopAudio, setStatusAudio, setVolumnAudio } from '../reducer/audioStatus';
import { setPlayBySongIndex } from '../reducer/playlistSlice';
import AudioTimeProcess from './AudioTimeProcess';
import InputRangeVolumn from './InputRangeVolumn';

interface Props {
  linkMp3?: string;
}

// const storeSet = new Set();

const Audio = ({ linkMp3 }: Props) => {
  const { statusAudio, isLoop, volumn, isPlaylist } = useSelector(
    (state: RootState) => state.audioStatus
  );
  const { currentSongIndex, songs } = useSelector((state: RootState) => state.playlist);
  const { loading } = useSelector((state: RootState) => state.songPlaying);

  // ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // state
  const [audioCanPlay, setAudioCanPlay] = useState(true); // trạng thái của audio
  const [percentage, setPercentage] = useState(0); // phần trăm đẻ làm thanh thời gian
  const [duration, setDuration] = useState(0); // thời lượng của bài nhạc
  const [currentTime, setCurrentTime] = useState(0); // thời gian hiện tại khi phát

  // dispathc
  const dispatch = useDispatch<AppDispatch>();

  //when fetch data mp3 to change music, in status pending ==> stop music now and wait new linkMp3
  useEffect(() => {
    if (loading === 'pending' && linkMp3) {
      handlePauseMusic(true);
    }

    if (loading === 'failed') {
      if (isPlaylist) {
        setTimeout(() => {
          handleSkipForwardSong();
        }, 1000);
      } else {
        dispatch(setPlayBySongIndex(-1));
      }
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
  const handleSetLoop = useCallback(() => {
    if (!audioRef.current) return;

    const valueLoop = () => {
      if (isPlaylist && isLoop === 'single') return 'multi';

      return !isLoop ? 'single' : false;
    };

    dispatch(setLoopAudio(valueLoop()));
  }, [isPlaylist, isLoop]);

  //reload when change link music
  const handleReloadMusic = useCallback(() => {
    if (!audioRef.current) return;

    audioRef.current.load();
  }, [linkMp3]);

  //handle play music - onDispatchStatusAudio === true will dispatch.
  const handlePlayMusic = useCallback(
    (onDispatchStatusAudio: boolean) => {
      if (!audioRef.current) return;

      // catch error
      audioRef.current.play().catch((error) => {
        if (error) handlePauseMusic(true);
      });

      // if === true will dispatch
      if (onDispatchStatusAudio) {
        dispatch(setStatusAudio('playing'));
      }
    },
    [linkMp3]
  );

  //handle pause music - onDispatchStatusAudio === true will dispatch.
  const handlePauseMusic = useCallback(
    (onDispatchStatusAudio: boolean) => {
      if (!audioRef.current) return;

      audioRef.current.pause();
      // if === true will dispatch
      if (onDispatchStatusAudio) {
        dispatch(setStatusAudio('pause'));
      }
    },
    [linkMp3]
  );

  // handle when click prev song
  const handleSkipBackSong = useCallback(() => {
    if (!isPlaylist) {
      toast.info('Danh sách phát rỗng!');
      return;
    }

    if (loading === 'pending') {
      return;
    }

    // disable when playlist length = 1
    if (songs.items.length <= 1) {
      toast.warning('Danh sách nhạc chỉ có 1 bài!');
      return;
    }

    // check if <= 0, go to end list
    if (currentSongIndex <= 0) {
      const songInEndList = songs.items.length - 1;
      dispatch(setPlayBySongIndex(songInEndList));
      return;
    }

    const newCurrentSongIndex = currentSongIndex - 1; // calculator index of prev song
    dispatch(setPlayBySongIndex(newCurrentSongIndex));
  }, [currentSongIndex, isPlaylist, songs.items.length, loading]);

  // handle when click next song or when end song and next new song
  const handleSkipForwardSong = useCallback(
    (isClickSkip?: boolean) => {
      if (!isPlaylist) {
        toast.info('Danh sách phát rỗng!');
        return;
      }
      // disable click when fetch data
      if (loading === 'pending') {
        return;
      }

      // disable when playlist length = 1
      if (songs.items.length <= 1) {
        toast.warning('Danh sách nhạc chỉ có 1 bài!');
        return;
      }

      const songsLength = songs.items.length; // get length of list song playlist
      const newCurrentSongIndex = currentSongIndex + 1; // calculator index of next song

      // if true, we is end playlist now ==> go to on start list
      if (newCurrentSongIndex === songsLength) {
        dispatch(setPlayBySongIndex(0));
      } else {
        // when not end list ==> play next song
        dispatch(setPlayBySongIndex(newCurrentSongIndex));
      }
    },
    [currentSongIndex, isPlaylist, songs.items.length, loading]
  );

  // handle when Ended Music
  const handleEndedMusic = useCallback(() => {
    // isPlaylist === true
    if (isPlaylist) {
      if (isLoop === 'single') {
        handlePauseMusic(true);
        setTimeout(() => {
          handlePlayMusic(true);
        }, 50);
        return;
      }

      const songsLength = songs.items.length; // get length of list song playlist
      const newCurrentSongIndex = currentSongIndex + 1; // calculator index of next song

      if (songsLength === newCurrentSongIndex) {
        if (isLoop === 'multi') {
          dispatch(setPlayBySongIndex(0));
        } else {
          handlePauseMusic(true);
          toast.info('Đã đến cuối danh sách nhạc!');
        }
      } else {
        handleSkipForwardSong();
      }
    }
    // isPlaylist === false
    else {
      if (!isLoop) {
        handlePauseMusic(true);
        toast.info('Trình phát nhạc tắt!');
        return;
      } else {
        handlePauseMusic(true);
        setTimeout(() => {
          handlePlayMusic(true);
        }, 50);
      }
    }
  }, [currentSongIndex, isPlaylist, isLoop, songs.items.length]);

  // when audio can play, set state duration of song
  const handleCanPlay = useCallback(() => {
    if (!audioRef.current) return;

    setAudioCanPlay(true);
    setDuration(Math.round(audioRef.current.duration));

    // lần đầu load app, nếu local có dữ liệu thì chỉ setup chứ k phát
    if (loading === 'init-local') return;
    handlePlayMusic(true);
  }, [linkMp3, loading]);

  // handle when change input volumn
  const handleChangeVolumn = useCallback(
    (volumnString: string) => {
      const volumnNumber = Number(volumnString);

      dispatch(setVolumnAudio(volumnNumber));
    },
    [volumn]
  );

  // click to mute song, if song is mute now, delete mute
  const handleClickToggleMuteSong = useCallback(() => {
    if (volumn != 0) {
      dispatch(setVolumnAudio(0));
    } else {
      dispatch(setVolumnAudio(1));
    }
  }, [volumn]);

  // handle when time audio update
  const handleTimeUpdate = useCallback((e: React.SyntheticEvent<HTMLAudioElement>) => {
    if (!audioRef.current) return;

    // tính ra % thời gian hiện tại trên tổng time bài hát
    const percent = ((e.currentTarget.currentTime / e.currentTarget.duration) * 100).toFixed(2);
    // lấy thời gian hiện tại của bài hát
    const time = e.currentTarget.currentTime.toFixed(2);

    // setState
    setPercentage(+percent);
    setCurrentTime(+time);
  }, []);

  // handle when user change time
  const handleChangeCurrentTime = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    audio.currentTime = (audio.duration / 100) * +e.target.value;
    setPercentage(+e.target.value);
  }, []);

  // storeSet.add(handleCanPlay);
  // storeSet.add(handleChangeVolumn);
  // storeSet.add(handleClickToggleMuteSong);
  // storeSet.add(handleEndedMusic);
  // storeSet.add(handleSkipBackSong);
  // storeSet.add(handleSkipForwardSong);
  // storeSet.add(handleSetLoop);
  // storeSet.add(handlePlayMusic);
  // storeSet.add(handlePauseMusic);
  // storeSet.add(handleReloadMusic);
  // storeSet.add(handleTimeUpdate);
  // console.log(storeSet);

  return (
    <>
      {/* Audio */}
      {linkMp3 && (
        <audio
          hidden
          ref={audioRef}
          onEnded={handleEndedMusic}
          onCanPlay={handleCanPlay}
          onTimeUpdate={handleTimeUpdate}
        >
          <source src={linkMp3} />
        </audio>
      )}

      {/* time progress in mobile */}
      <div className="absolute top-0 left-0 w-full  h-2 block lg:hidden">
        <AudioTimeProcess
          currentTime={currentTime}
          duration={duration}
          handleChangeCurrentTime={handleChangeCurrentTime}
          percentage={percentage}
          isMobile={true}
        />
      </div>

      {/* Media controls */}
      <div className="h-full flex space-x-1 items-center">
        <div className="flex-grow flex flex-col gap-1 text-32 lg:text-28">
          <div className="flex space-x-1 justify-center">
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

          <div className="w-10/12 mx-auto hidden lg:flex items-center space-x-1">
            <AudioTimeProcess
              percentage={percentage}
              currentTime={currentTime}
              duration={duration}
              handleChangeCurrentTime={handleChangeCurrentTime}
            />
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
            <div className="absolute hidden group-hover:flex left-1/2 top-0 w-[80px] h-[30px] bg-primary -translate-y-full -translate-x-1/2  items-center justify-center rounded-xl after:absolute after:bottom-0 after:left-0 after:w-full after:h-[5px] after:translate-y-full">
              <InputRangeVolumn
                volumnValue={volumn}
                handleChangeVolumn={handleChangeVolumn}
                isChildOfComponent="audio"
              />
            </div>
          </div>
          {/* loop button */}
          <div
            className={`icon-player${isLoop === 'single' ? ' text-red-600' : ' opacity-70'}`}
            onClick={handleSetLoop}
          >
            {isLoop === 'multi' ? <TiArrowLoopOutline className="text-red-500" /> : <ImLoop />}
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Audio);
