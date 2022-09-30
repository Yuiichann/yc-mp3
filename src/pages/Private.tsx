import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../config/store';
import IconPlaying from '../assets/gif/icon-playing.gif';
import { BsPlayCircleFill } from 'react-icons/bs';
import { setStatusAudio } from '../reducer/audioStatus';

const Private = () => {
  const { statusAudio, isLoop, isHiddenMusicPlayer } = useSelector(
    (state: RootState) => state.audioStatus
  );
  const { currentDetails, isPlaylist, currentSong, loading } = useSelector(
    (state: RootState) => state.songPlaying
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleSetStatusAudio = () => {
    dispatch(setStatusAudio(statusAudio === 'pause' ? 'playing' : 'pause'));
  };

  return (
    <section className="pt-1 lg:px-2">
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
              <h2 className="text-2xl font-semibold tracking-wider">{currentDetails.title}</h2>
              <h6 className="text-14 font-normal tracking-normal">{currentDetails.artistsNames}</h6>
            </div>
          </div>

          {/* Current Playlists */}
          <div className="lg:w-8/12"></div>
        </div>
      )}
    </section>
  );
};

export default Private;
