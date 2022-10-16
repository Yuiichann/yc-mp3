import React, { memo } from 'react';
import { MdPlayCircleFilled } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../config/store';
import { initPrivatePlaylist, setPlayBySongIndex } from '../reducer/playlistSlice';
import { fetchDataMp3 } from '../reducer/songPlayingSlice';
import { AlbumApi, SongApi, SongPlaying } from '../types';
import checkSongInList from '../utils/checkSongInList';
import convertDate from '../utils/convertDate';

interface Props {
  type: 'song' | 'album' | 'playlist';
  tabInfo: AlbumApi | SongApi;
}

const NewReleaseTabInfo = ({ tabInfo, type }: Props) => {
  const { songs } = useSelector((state: RootState) => state.playlist);
  const dispatch = useDispatch<AppDispatch>();

  // handle play 1 song when click play this, after click, they will dispatch 2 actions: 1 actions set info song, the other will fetch link mp3
  const handlePlayCurrentMusic = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // with type === album
    if (type === 'album') {
      console.warn('Chưa hỗ trợ phát Album');
      return;
    }

    // with type === song
    if (type === 'song') {
      // check if song already in playlist, dispatch index of song
      const checkSongInPlaylist = checkSongInList(tabInfo.encodeId, songs.items);
      if (checkSongInPlaylist >= 0) {
        dispatch(setPlayBySongIndex(checkSongInPlaylist));
        return;
      }

      // create const info song
      const detailSong: SongPlaying['currentDetails'] = {
        artistsNames: tabInfo.artistsNames,
        encodeId: tabInfo.encodeId,
        thumbnail: tabInfo.thumbnail,
        thumbnailM: tabInfo.thumbnailM,
        title: tabInfo.title,
      };

      // if playlist is none (when start app or change each song) ==> init new playlist with one uniqe song
      if (songs.items.length <= 1) {
        dispatch(initPrivatePlaylist(tabInfo as SongApi));
      } else {
        // else, when playlist is avaialbe, play this song
        dispatch(setPlayBySongIndex(-1));
        dispatch(fetchDataMp3(detailSong));
      }
    }
  };

  return (
    <div className="p-1" key={tabInfo.encodeId}>
      <Link
        to={`/${type === 'song' ? 'bai-hat' : type === 'album' ? 'album' : 'playlist'}?id=${
          tabInfo.encodeId
        }`}
        className="relative block"
      >
        {/* Image */}
        <div className="min-h-[150px]">
          <img
            src={tabInfo.thumbnailM}
            alt=""
            loading="lazy"
            className="rounded-md w-full min-w-[100px] min-h-[150px]"
            width={150}
            height={150}
          />
        </div>
        {/* overlay */}
        {type === 'song' && (
          <div className="absolute top-0 left-0 rounded-md bg-overlay w-full h-full">
            <div
              className="absolute right-1 bottom-1 text-3xl lg:text-3xl xl:text-4xl text-white cursor-pointer p-1 hover:scale-125 effect"
              onClick={handlePlayCurrentMusic}
            >
              <MdPlayCircleFilled />
            </div>
          </div>
        )}
      </Link>

      {/* Info iclude name and releaseDate */}
      <div className="mt-1 text-center lg:text-left">
        <div className="w-full min-w-0 truncate my-1">
          <Link
            to={`/${type === 'song' ? 'bai-hat' : type === 'album' ? 'album' : 'playlist'}?id=${
              tabInfo.encodeId
            }`}
          >
            <h2 className="font-medium text-16 md:text-18 cursor-pointer hover:opacity-60">
              {tabInfo.title}
            </h2>
          </Link>
        </div>
        <p className="cursor-default">{convertDate(tabInfo.releaseDate)}</p>
      </div>
    </div>
  );
};

export default memo(NewReleaseTabInfo);
