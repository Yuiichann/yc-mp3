import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../config/store';
import IconPlaying from '../assets/gif/icon-playing.gif';
import { BsPlayCircleFill } from 'react-icons/bs';
import { setLoopAudio, setStatusAudio, setVolumnAudio } from '../reducer/audioStatus';
import { ImLoop, ImVolumeHigh, ImVolumeMute2 } from 'react-icons/im';

const Private = () => {
  const { statusAudio, isLoop, isHiddenMusicPlayer, volumn } = useSelector(
    (state: RootState) => state.audioStatus
  );
  const { currentDetails, isPlaylist, currentSong, loading } = useSelector(
    (state: RootState) => state.songPlaying
  );
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
      {currentSong && (
        <div className="flex flex-col lg:flex-row">
          {/* Current Play song */}
          <div className="lg:w-4/12 flex flex-col items-center space-y-4">
            <div className="relative w-fit rounded-full overflow-hidden">
              {/* image */}
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
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    className="w-[150px]"
                    value={volumn}
                    onChange={(e) => handleChangeVolumn(e.target.value)}
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

          {/* Current Playlists */}
          <div className="lg:w-8/12"></div>
        </div>
      )}

      {/* when current song underfined */}
      {!currentSong && (
        <div className="text-center">
          <h1 className="mt-12 text-24 font-bold tracking-widest">Trình phát chưa sẵn sàng !!!</h1>
        </div>
      )}
    </section>
  );
};

export default Private;
