import { useCallback } from 'react';
import { BsPlayCircleFill } from 'react-icons/bs';
import { FcMusic } from 'react-icons/fc';
import { ImLoop, ImVolumeHigh, ImVolumeMute2 } from 'react-icons/im';
import { RiCloseFill } from 'react-icons/ri';
import { TiArrowLoopOutline } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import IconPlaying from '../assets/gif/icon-playing.gif';
import AudioHandler from '../components/AudioHandler';
import InputRangeVolumn from '../components/InputRangeVolumn';
import ListSong from '../components/ListSong';
import { SkeletionPrivateAudio } from '../components/Skeleton';
import { AppDispatch, RootState } from '../config/store';
import {
  setIsPlaylist,
  setLoopAudio,
  setStatusAudio,
  setVolumnAudio,
} from '../reducer/audioStatus';
import { removePlaylist } from '../reducer/playlistSlice';
import { SongApi } from '../types';

const Private = () => {
  const { statusAudio, isLoop, volumn, isPlaylist } = useSelector(
    (state: RootState) => state.audioStatus
  );
  const { currentDetails, loading } = useSelector((state: RootState) => state.songPlaying);
  const { songs } = useSelector((state: RootState) => state.playlist);
  const dispatch = useDispatch<AppDispatch>();

  // set play or pause music
  const handleSetStatusAudio = useCallback(() => {
    dispatch(setStatusAudio(statusAudio === 'pause' ? 'playing' : 'pause'));
  }, [statusAudio]);

  // handle change volumn
  const handleChangeVolumn = useCallback((volumnString: string) => {
    const volumnNumber = Number(volumnString);

    dispatch(setVolumnAudio(volumnNumber));
  }, []);

  // handle toggle mute song
  const handleToggleMuteSong = useCallback(() => {
    if (volumn != 0) {
      dispatch(setVolumnAudio(0));
    } else {
      dispatch(setVolumnAudio(1));
    }
  }, [volumn]);

  // handle toggle isLoop Song
  const handleSetLoop = useCallback(() => {
    const valueLoop = () => {
      if (isPlaylist && isLoop === 'single') return 'multi';

      return !isLoop ? 'single' : false;
    };

    dispatch(setLoopAudio(valueLoop()));
  }, [isPlaylist, isLoop]);

  // handle when click remove playlist
  const handleRemovePlaylist = useCallback(() => {
    if (!isPlaylist) return;

    // dispatch action
    dispatch(removePlaylist());
    dispatch(setIsPlaylist(false)); // set isPlaylist in audioStatus ==> false
    toast.success('Xóa playlist thành công!');
  }, [isPlaylist]);

  return (
    <section className="pt-1 lg:px-2 min-h-[calc(100vh-180px)]">
      <div className="flex flex-col lg:flex-row">
        {/* Current Play song */}
        {/* UI when successed or init-local */}
        {loading === 'successed' || loading === 'init-local' ? (
          <div className="relative md:px-1 xl:px-2 xl:w-4/12 lg:w-6/12">
            <div className="lg:sticky lg:top-[150px] lg:left-0 flex flex-col items-center space-y-4">
              {/* image */}
              <div className="relative w-fit rounded-full overflow-hidden">
                <img
                  src={currentDetails.thumbnailM}
                  alt={currentDetails.title}
                  className={`mx-auto w-[130px] h-[130px] ${
                    statusAudio === 'playing' ? 'animate-spin-slow' : ''
                  }`}
                />

                {/* overlay */}
                <div
                  className="absolute left-0 top-0 w-full h-full bg-[rgb(0,0,0,0.3)] cursor-pointer flex items-center justify-center"
                  onClick={handleSetStatusAudio}
                >
                  {statusAudio === 'playing' ? (
                    <div>
                      <img src={IconPlaying} alt="" />
                    </div>
                  ) : (
                    <div className="text-white text-3xl p-2 hover:opacity-60">
                      <BsPlayCircleFill />
                    </div>
                  )}
                </div>
              </div>

              {/* add Favorite */}
              <div className="min-h-[50px] flex items-center justify-center">
                <AudioHandler songInfo={currentDetails as SongApi} component="Private" />
              </div>

              {/* Song info */}
              <div className="flex flex-col items-center space-y-2">
                <Link
                  to={`/bai-hat?id=${currentDetails.encodeId}`}
                  className="block text-2xl font-semibold tracking-wider text-center"
                >
                  {currentDetails.title}
                </Link>
                <h6 className="text-14 font-normal tracking-normal text-center">
                  {currentDetails.artistsNames}
                </h6>
              </div>

              {/* Handle with audio */}
              <div className="flex items-center justify-evenly space-x-2 w-full">
                {/* change volumn */}
                <div className="flex space-x-1 items-center justify-center group relative">
                  <div className="text-24 icon-player" onClick={handleToggleMuteSong}>
                    {volumn != 0 ? <ImVolumeHigh /> : <ImVolumeMute2 />}
                  </div>
                  <div className="hidden group-hover:block absolute top-0 -translate-y-full left-1/2 -translate-x-1/2 bg-red-100 rounded-md shadow-md">
                    <div className="flex items-center justify-center min-h-[30px] px-3">
                      <InputRangeVolumn
                        volumnValue={volumn}
                        handleChangeVolumn={handleChangeVolumn}
                        isChildOfComponent="private"
                      />
                    </div>
                  </div>
                </div>

                {/* Icon Loop */}
                <div className="flex items-center">
                  <div
                    className={`text-24 icon-player${
                      isLoop === 'single' ? ' text-red-600' : ' opacity-70'
                    }`}
                    onClick={handleSetLoop}
                  >
                    {isLoop === 'multi' ? (
                      <TiArrowLoopOutline className="text-red-500" />
                    ) : (
                      <ImLoop />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}

        {/* UI when idle or faile */}
        {loading === 'idle' || loading === 'failed' ? (
          <div className="lg:w-6/12 xl:w-4/12 justify-center flex flex-col items-center space-y-4 h-full mt-12">
            <div className="min-w-max">
              <img
                src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/3/2/a/3/32a35f4d26ee56366397c09953f6c269.jpg"
                alt="image-not-found-music"
                className="w-[150px] h-[150px] max-w-[150px] block max-h-[150px] rounded-full"
              />
            </div>
            <div>
              <Link to="/">Chọn bài hát</Link>
            </div>
          </div>
        ) : (
          <></>
        )}

        {/* UI when pending */}
        {loading === 'pending' && (
          <SkeletionPrivateAudio center={songs.items.length > 0 ? false : true} />
        )}

        {/* Current Playlists */}
        <div className="xl:w-8/12 lg:w-6/12">
          {/* List Song Play Current */}
          <div className="mt-8 lg:mt-4 mb-4 flex items-center space-x-4 select-none justify-center lg:justify-start flex-col space-y-2 lg:flex-row lg:space-y-0">
            <div className="flex items-center space-x-2 justify-center lg:justify-start border-b-2 border-secondary">
              <div className="text-28">
                <FcMusic />
              </div>
              <h2 className="text-24 tracking-wider font-medium uppercase">
                {isPlaylist ? 'playlist' : 'đang phát'}
              </h2>
              <div className="text-28">
                <FcMusic />
              </div>
            </div>

            {/* Icon remove Playlist -- if playlist true ==> show else hide */}
            {isPlaylist && (
              <div className="icon-player text-xl relative group" onClick={handleRemovePlaylist}>
                <RiCloseFill />

                <div className="toolip-container">
                  <p>Xóa Playlist</p>
                </div>
              </div>
            )}
          </div>

          {/* List song */}
          {songs.items.length > 0 ? (
            <ListSong enbleIndex={false} dataSong={songs} type="" />
          ) : (
            <h1 className="text-center text-xl font-normal">Danh sách phát rỗng</h1>
          )}
        </div>
      </div>
    </section>
  );
};

export default Private;
