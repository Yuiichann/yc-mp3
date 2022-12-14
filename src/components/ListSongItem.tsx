import { memo, useEffect, useRef } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { BsDisc, BsPlayCircle } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { AppDispatch, RootState } from '../config/store';
import { initPrivatePlaylist, setPlayBySongIndex } from '../reducer/playlistSlice';
import { fetchDataMp3 } from '../reducer/songPlayingSlice';
import { SongApi, SongPlaying } from '../types';
import checkSongInList from '../utils/checkSongInList';
import ImageLazyLoad from './ImageLazyLoad';

interface Props {
  song: SongApi;
  enbleIndex: boolean;
  index: number;
}

const ListSongItem = ({ song, enbleIndex, index }: Props) => {
  const { currentDetails, loading } = useSelector((state: RootState) => state.songPlaying);
  const { songs, currentSongIndex } = useSelector((state: RootState) => state.playlist);
  const songRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  // check path
  const location = useLocation();

  // scroll into song is playing
  useEffect(() => {
    if (location.pathname === '/ca-nhan' && currentDetails.encodeId === song.encodeId) {
      songRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  const handleClickPlaySong = () => {
    // chặn lại khi đang fetch 1 bài khác
    if (loading === 'pending') return;

    // if song in playylist, set currentIndexSong ==> index of song in playlist
    const checkSongInPlaylist = checkSongInList(song.encodeId, songs.items);
    if (checkSongInPlaylist >= 0) {
      dispatch(setPlayBySongIndex(checkSongInPlaylist));
      return;
    }

    const detailSong: SongPlaying['currentDetails'] = {
      artistsNames: song.artistsNames,
      encodeId: song.encodeId,
      thumbnail: song.thumbnail,
      thumbnailM: song.thumbnailM,
      title: song.title,
    };

    // if playlist is none (when start app or change each song) ==> init new playlist with one uniqe song
    if (songs.items.length <= 1) {
      dispatch(initPrivatePlaylist(song));
    } else {
      // else, when playlist is avaialbe, play this song
      dispatch(setPlayBySongIndex(-1));
      dispatch(fetchDataMp3(detailSong));
    }
  };

  return (
    <div
      className={`flex items-center border-b-2 py-3 hover:bg-gray-100 ${
        currentDetails.encodeId === song.encodeId ? 'bg-gray-100' : ''
      }`}
      key={song.encodeId}
      ref={songRef}
    >
      {/* STT */}
      {enbleIndex ? (
        <div className="min-w-[50px] text-14 lg:text-18 font-bold">
          <p className="text-center">{index + 1}</p>
        </div>
      ) : (
        <div className="min-w-[60px] flex items-center justify-center">
          <ImageLazyLoad
            src={song.thumbnail}
            alt={song.alias}
            className="rounded-sm"
            width={40}
            height={40}
          />
        </div>
      )}

      {/* Info include name and artist name */}
      <div className="flex-grow flex flex-col space-y-1 truncate">
        <Link
          to={`/bai-hat?id=${song.encodeId}`}
          className={`text-16 font-semibold tracking-wide cursor-pointer hover:text-secondary truncate ${
            currentDetails.encodeId === song.encodeId ? 'text-secondary' : 'text-black'
          }`}
        >
          {song.title}
        </Link>
        {/* aritst link */}
        <div className="text-14 text-gray-500 tracking-wide truncate flex items-center space-x-1">
          {song.artists ? (
            song.artists.map((artist, index) => (
              <Link
                to={`/ca-si?name=${artist.alias}`}
                className="truncate hover:text-primary"
                key={artist.alias}
              >
                {artist.name}
                {index < song.artists.length - 1 ? ',' : ''}
              </Link>
            ))
          ) : (
            <span className="truncate">{song.artistsNames}</span>
          )}
        </div>
      </div>

      {/* Button Play current Music -- check UI only show in page ca nhan */}
      {index === currentSongIndex && loading === 'pending' && location.pathname === '/ca-nhan' ? (
        <div className="text-3xl py-2 min-w-[60px] px-4 cursor-pointer text-secondary hover:opacity-70 animate-spin">
          <AiOutlineLoading />
        </div>
      ) : (
        <div
          className="text-3xl py-2 min-w-[60px] px-4 cursor-pointer hover:opacity-70 hover:text-secondary"
          onClick={handleClickPlaySong}
        >
          {currentDetails.encodeId === song.encodeId ? (
            <BsDisc className="text-primary animate-spin-medium" />
          ) : (
            <BsPlayCircle />
          )}
        </div>
      )}
    </div>
  );
};

export default memo(ListSongItem);
