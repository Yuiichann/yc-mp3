import { memo } from 'react';
import { BsDisc, BsPlayCircle } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../config/store';
import { fetchDataMp3, setInfoSongPlaying } from '../reducer/songPlayingSlice';
import { PlaylistItem, SongPlaying } from '../types';

interface Props {
  dataSong: PlaylistItem['song']; // list song array
  type: string;
}

const ListSong = ({ dataSong }: Props) => {
  const { currentDetails } = useSelector((state: RootState) => state.songPlaying);
  const dispatch = useDispatch<AppDispatch>();

  //hanle when click play one song in list
  const handleClickPlaySong = (encodeId: string, detailSong: SongPlaying['currentDetails']) => {
    dispatch(setInfoSongPlaying(detailSong));
    dispatch(fetchDataMp3(encodeId));
  };

  return (
    // list song
    <div className="flex flex-col px-2 mb-12">
      {dataSong.items.map((song, index) => (
        // Song item
        <div
          className={`flex items-center border-b-2 py-2 ${
            currentDetails.encodeId === song.encodeId ? 'bg-gray-100' : ''
          }`}
          key={song.encodeId}
        >
          {/* STT */}
          <div className="min-w-[80px] text-xl font-extrabold">
            <p className="text-center">{index + 1}</p>
          </div>

          {/* Info include name and artist name */}
          <div className="flex-grow flex flex-col space-y-1">
            <Link
              to={`/bai-hat?id=${song.encodeId}`}
              className={`text-16 font-semibold tracking-wide cursor-pointer hover:text-secondary ${
                currentDetails.encodeId === song.encodeId ? 'text-secondary' : 'text-black'
              }`}
            >
              {song.title}
            </Link>
            <p className="text-14 text-gray-500 tracking-wide">{song.artistsNames}</p>
          </div>

          {/* Button Play current Music */}
          <div
            className={`text-3xl py-2 px-4 cursor-pointer hover:opacity-70 hover:text-secondary ${
              currentDetails.encodeId === song.encodeId ? 'text-secondary' : 'text-black'
            }`}
            onClick={() =>
              handleClickPlaySong(song.encodeId, {
                encodeId: song.encodeId,
                title: song.title,
                artistsNames: song.artistsNames,
                thumbnail: song.thumbnail,
              })
            }
          >
            {currentDetails.encodeId === song.encodeId ? <BsDisc /> : <BsPlayCircle />}
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(ListSong);
