import { BsPlayCircleFill } from 'react-icons/bs';
import { FcMusic } from 'react-icons/fc';
import { ImLoop, ImVolumeHigh, ImVolumeMute2 } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import IconPlaying from '../assets/gif/icon-playing.gif';
import InputRangeVolumn from '../components/InputRangeVolumn';
import ListSong from '../components/ListSong';
import { AppDispatch, RootState } from '../config/store';
import { setLoopAudio, setStatusAudio, setVolumnAudio } from '../reducer/audioStatus';
import { SiYoutubemusic } from 'react-icons/si';
import { SkeletionPrivateAudio } from '../components/Skeleton';

const Private = () => {
  const { statusAudio, isLoop, isHiddenMusicPlayer, volumn } = useSelector(
    (state: RootState) => state.audioStatus
  );
  const { currentDetails, currentSong, loading } = useSelector(
    (state: RootState) => state.songPlaying
  );
  const { playlistDetail, songs } = useSelector((state: RootState) => state.playlist);

  const dispatch = useDispatch<AppDispatch>();

  const handleSetStatusAudio = () => {
    dispatch(setStatusAudio(statusAudio === 'pause' ? 'playing' : 'pause'));
  };

  const handleChangeVolumn = (volumnString: string) => {
    const volumnNumber = Number(volumnString);

    dispatch(setVolumnAudio(volumnNumber));
  };

  const handleToggleMuteSong = () => {
    if (volumn != 0) {
      dispatch(setVolumnAudio(0));
    } else {
      dispatch(setVolumnAudio(1));
    }
  };

  const handleSetLoop = () => {
    dispatch(setLoopAudio(!isLoop));
  };

  return (
    <section className="pt-1 lg:px-2 min-h-[calc(100vh-180px)]">
      <div className="flex flex-col lg:flex-row">
        {/* Current Play song */}

        {/* UI when successed */}
        {loading === 'successed' && (
          <div className="lg:w-4/12 relative md:px-1 xl:px-2">
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
                  className="absolute left-0 top-0 w-full h-full bg-[rgb(0,0,0,0.5)] cursor-pointer flex items-center justify-center"
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
              {/* Song info */}
              <div className="flex flex-col items-center space-y-2">
                <h2 className="text-2xl font-semibold tracking-wider text-center">
                  {currentDetails.title}
                </h2>
                <h6 className="text-14 font-normal tracking-normal text-center">
                  {currentDetails.artistsNames}
                </h6>
              </div>

              {/* Handle with audio */}
              <div className="flex items-center justify-evenly space-x-2 w-full">
                {/* change volumn */}
                <div className="flex space-x-1 items-center justify-center">
                  <div className="text-24 icon-player" onClick={handleToggleMuteSong}>
                    {volumn != 0 ? <ImVolumeHigh /> : <ImVolumeMute2 />}
                  </div>
                  <div className="flex items-center justify-center">
                    <InputRangeVolumn
                      volumnValue={volumn}
                      handleChangeVolumn={handleChangeVolumn}
                      isChildOfComponent="private"
                    />
                  </div>
                </div>

                {/* Icon Loop */}
                <div className="flex items-center">
                  <div
                    className={`text-24 icon-player${
                      isLoop ? ' text-red-500 bg-[rgb(0,0,0,0.1)]' : ''
                    }`}
                    onClick={handleSetLoop}
                  >
                    <ImLoop />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* UI when idle */}
        {loading === 'idle' && (
          <div className="lg:w-4/12 flex flex-col items-center space-y-4 h-full mt-12">
            <div className="text-48">
              <SiYoutubemusic />
            </div>
            <h2 className="font-semibold">Trình phát nhạc rỗng</h2>
          </div>
        )}

        {/* UI when pending */}
        {loading === 'pending' && <SkeletionPrivateAudio />}

        {/* UI when faied */}
        {loading === 'failed' && (
          <div className="lg:w-4/12 flex flex-col items-center space-y-4 h-full mt-12">
            <div className="text-48">
              <SiYoutubemusic />
            </div>
            <h2 className="font-semibold">Không tìm thấy dữ liệu nhạc</h2>
          </div>
        )}

        {/* Current Playlists */}
        <div className="lg:w-8/12">
          {/* List Song Play Current */}
          <div className="flex items-center space-x-2 justify-center lg:justify-start mt-8 lg:mt-4 mb-4 border-b-2 border-secondary">
            <div className="text-28">
              <FcMusic />
            </div>
            <h2 className="text-24 tracking-wider font-medium uppercase">Playlist</h2>
            <div className="text-28">
              <FcMusic />
            </div>
          </div>

          {songs.items.length > 1 ? (
            <ListSong enbleIndex={false} dataSong={songs} type="" />
          ) : (
            <div className="text-24 font-medium tracking-widest ml-4">
              <h1 className="text-center lg:text-left">Rỗng</h1>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Private;
