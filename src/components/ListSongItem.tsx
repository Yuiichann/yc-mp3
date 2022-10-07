import React, { memo } from 'react';
import { BsDisc, BsPlayCircle } from 'react-icons/bs';
import { GiMusicalNotes } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../config/store';
import { setPlayBySongIndex } from '../reducer/playlistSlice';
import { fetchDataMp3, setInfoSongPlaying } from '../reducer/songPlayingSlice';
import { SongApi, SongPlaying } from '../types';
import checkSongInList from '../utils/checkSongInList';

interface Props {
  song: SongApi;
  enbleIndex: boolean;
  index: number;
}

const ListSongItem = ({ song, enbleIndex, index }: Props) => {
  const { currentDetails } = useSelector((state: RootState) => state.songPlaying);
  const { songs } = useSelector((state: RootState) => state.playlist);
  const dispatch = useDispatch<AppDispatch>();

  const handleClickPlaySong = () => {
    const checkSongInPlaylist = checkSongInList(song.encodeId, songs.items);

    const detailSong: SongPlaying['currentDetails'] = {
      artistsNames: song.artistsNames,
      encodeId: song.encodeId,
      thumbnail: song.thumbnail,
      thumbnailM: song.thumbnailM,
      title: song.title,
    };

    dispatch(setInfoSongPlaying(detailSong));
    dispatch(fetchDataMp3(song.encodeId));

    // if song in playylist, set currentIndexSong ==> index of song in playlist
    if (checkSongInPlaylist >= 0) {
      dispatch(setPlayBySongIndex(checkSongInPlaylist));
    }
  };

  return (
    <div
      className={`flex items-center border-b-2 py-2 ${
        currentDetails.encodeId === song.encodeId ? 'bg-gray-100' : ''
      }`}
      key={song.encodeId}
    >
      {/* STT */}
      {enbleIndex ? (
        <div className="min-w-[80px] text-xl font-extrabold">
          <p className="text-center">{index + 1}</p>
        </div>
      ) : (
        <div className="min-w-[50px] text-xl font-extrabold">
          <GiMusicalNotes className="mx-auto" />
        </div>
      )}

      {/* Info include name and artist name */}
      <div className="flex-grow flex flex-col space-y-1">
        <Link
          to={`/bai-hat?id=${song.encodeId}`}
          className={`text-16 font-semibold tracking-wide cursor-pointer hover:text-secondary break-all ${
            currentDetails.encodeId === song.encodeId ? 'text-secondary' : 'text-black'
          }`}
        >
          {song.title}
        </Link>
        <p className="text-14 text-gray-500 tracking-wide">{song.artistsNames}</p>
      </div>

      {/* Button Play current Music */}
      <div
        className={`text-3xl py-2 min-w-[60px] px-4 cursor-pointer hover:opacity-70 hover:text-secondary ${
          currentDetails.encodeId === song.encodeId ? 'text-secondary' : 'text-black'
        }`}
        onClick={handleClickPlaySong}
      >
        {currentDetails.encodeId === song.encodeId ? <BsDisc /> : <BsPlayCircle />}
      </div>
    </div>
  );
};

export default memo(ListSongItem);