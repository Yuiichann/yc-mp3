import { memo, useEffect } from 'react';
import Marquee from 'react-fast-marquee';
import { AiOutlineQuestion } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppDispatch, RootState } from '../config/store';
import { fetchDataMp3, setInfoSongPlaying } from '../reducer/songPlayingSlice';
import { SongPlaying } from '../types';
import Audio from './Audio';
import { SkeletonSongPlaying } from './Skeleton';

const MusicPlayer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentSong, currentDetails, loading } = useSelector(
    (state: RootState) => state.songPlaying
  );
  const { playlistDetail, song } = useSelector((state: RootState) => state.playlist);

  // play first song when add new List
  useEffect(() => {
    if (!playlistDetail.encodeId) return;

    const firstSong = song.items[0];

    const firstSongInfo: SongPlaying['currentDetails'] = {
      title: firstSong.title,
      artistsNames: firstSong.artistsNames,
      thumbnail: firstSong.thumbnailM,
      encodeId: firstSong.encodeId,
    };

    // dispatch event
    dispatch(setInfoSongPlaying(firstSongInfo));
    dispatch(fetchDataMp3(firstSong.encodeId));
  }, [playlistDetail.encodeId]);

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
          loading === 'idle' || loading === 'failed' ? '-bottom-[90px]' : 'bottom-0'
        } left-0 w-screen bg-tertiary bg-main text-white select-none overflow-hidden`}
      >
        <div className="h-full px-1 py-2 lg:px-8 flex justify-center lg:justify-between">
          {/* Current Song Playing Infomation */}
          <div className="flex items-center w-6/12">
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
                <div className="px-1 min-w-max">
                  <Link to="/">
                    <img
                      src={currentDetails.thumbnail}
                      alt=""
                      className="w-full h-full max-w-[60px] max-h-[60px] rounded-md"
                    />
                  </Link>
                </div>
                <div className="px-1 text-14">
                  <Link to="/">
                    <Marquee gradient={false}>
                      <h1>{currentDetails.title}</h1>
                    </Marquee>
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
          <div className="text-32 w-6/12">
            <Audio linkMp3={currentSong} lazyLoading={loading} />
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(MusicPlayer);
