import { memo, useEffect } from 'react';
import Marquee from 'react-fast-marquee';
import { AiOutlineQuestion } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppDispatch, RootState } from '../config/store';
import { fetchDataMp3 } from '../reducer/songPlayingSlice';
import { SongPlaying } from '../types';
import Audio from './Audio';
import { SkeletonSongPlaying } from './Skeleton';

// handle music, playlist is here
const MusicPlayer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentSong, currentDetails, loading } = useSelector(
    (state: RootState) => state.songPlaying
  );
  const { playlistDetail, songs, currentSongIndex } = useSelector(
    (state: RootState) => state.playlist
  );
  const { isHiddenMusicPlayer, statusAudio } = useSelector((state: RootState) => state.audioStatus);

  // play first song when add new List
  // and listen playlistDetail.encode and currentSongIndex changed ==> when play song with index current
  useEffect(() => {
    if (songs.items.length === 0 || currentSongIndex === -1) return;

    const songInPlaylist = songs.items[currentSongIndex];

    const songInPlaylistinfo: SongPlaying['currentDetails'] = {
      title: songInPlaylist.title,
      artistsNames: songInPlaylist.artistsNames,
      thumbnail: songInPlaylist.thumbnailM,
      encodeId: songInPlaylist.encodeId,
      thumbnailM: songInPlaylist.thumbnailM,
    };

    // dispatch event
    dispatch(fetchDataMp3(songInPlaylistinfo));
  }, [playlistDetail.encodeId, currentSongIndex]);

  // alert when data fetch dont have
  useEffect(() => {
    if (loading === 'failed') {
      toast.error('Không có dữ liệu nhạc!!!');
    }
  }, [loading]);

  return (
    <>
      <div
        className={`fixed z-10 h-player effect left-0 w-screen bg-tertiary bg-main text-white select-none shadow-musicplayer ${
          loading === 'idle' || loading === 'failed' || isHiddenMusicPlayer
            ? 'bottom-0'
            : 'bottom-0'
        }`}
      >
        <div className="h-full px-1 py-2 lg:px-8 flex justify-center lg:justify-between">
          {/* Current Song Playing Infomation */}
          <div className="flex items-center flex-grow lg:flex-grow-0 lg:w-[350px]">
            {/* check loading to render */}
            {loading === 'idle' ? (
              <>
                <div className="px-1 min-w-max">
                  <Link to="/ca-nhan">
                    <img
                      src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/3/2/a/3/32a35f4d26ee56366397c09953f6c269.jpg"
                      alt="image-not-found-music"
                      className="w-[65px] h-[65px] max-w-[65px] block max-h-[65px] rounded-full"
                    />
                  </Link>
                </div>
              </>
            ) : loading === 'pending' ? (
              <>
                <SkeletonSongPlaying />
              </>
            ) : loading === 'successed' ? (
              <>
                {/* Image */}
                <div className="px-1 min-w-max">
                  <Link to="/ca-nhan">
                    <img
                      src={currentDetails.thumbnail}
                      alt=""
                      className={`w-[65px] h-[65px] max-w-[65px] block max-h-[65px] rounded-full effect ${
                        statusAudio === 'playing' ? 'animate-spin-slow' : ''
                      }`}
                    />
                  </Link>
                </div>
                {/* title */}
                <div className="px-1 text-14">
                  <Link to="/ca-nhan">
                    <Marquee gradient={false} speed={30} className="md:min-w-[150px]">
                      <h1>{currentDetails.title}</h1>
                    </Marquee>
                  </Link>
                </div>
              </>
            ) : (
              <>
                {/* when faied */}
                {/* <div className="text-4xl flex items-center justify-center flex-grow gap-2">
                  <AiOutlineQuestion />
                </div> */}

                <div className="px-1 min-w-max">
                  <Link to="/ca-nhan">
                    <img
                      src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/3/2/a/3/32a35f4d26ee56366397c09953f6c269.jpg"
                      alt="image-not-found-music"
                      className="w-[65px] h-[65px] max-w-[65px] block max-h-[65px] rounded-full"
                    />
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Audio Component */}
          <div className="text-36 mr-2 sm:mr-4 lg:mr-0 lg:flex-grow">
            <Audio linkMp3={currentSong} />
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(MusicPlayer);
