import React, { memo } from 'react';
import { MdPlayCircleFilled } from 'react-icons/md';
import { IoMdAddCircleOutline, IoMdHeartEmpty } from 'react-icons/io';
import { RiPlayFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../config/store';
import {
  addSongToPlaylist,
  initPrivatePlaylist,
  setPlayBySongIndex,
} from '../reducer/playlistSlice';
import { fetchDataMp3 } from '../reducer/songPlayingSlice';
import { AlbumApi, SongApi, SongPlaying } from '../types';
import checkSongInList from '../utils/checkSongInList';
import convertDate from '../utils/convertDate';
import { toast } from 'react-toastify';
import { setIsPlaylist } from '../reducer/audioStatus';

interface Props {
  type: 'song' | 'album' | 'playlist';
  tabInfo: AlbumApi | SongApi;
}

const NewReleaseTabInfo = ({ tabInfo, type }: Props) => {
  const { songs } = useSelector((state: RootState) => state.playlist);
  const dispatch = useDispatch<AppDispatch>();

  // handle play 1 song when click play
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

  const handleAddSongToPlaylist = () => {
    const checkSong = checkSongInList(tabInfo.encodeId, songs.items);

    if (checkSong !== -1) {
      toast.error('Bài hát đã trong playlist');
      return;
    }

    // if playlist none, init playlist true
    if (songs.items.length <= 1) {
      dispatch(setIsPlaylist(true));
    }
    // dispatch action add song to playlist
    dispatch(addSongToPlaylist(tabInfo as SongApi));
    toast.success('Đã thêm vào danh sách phát');
  };

  return (
    <div className="p-1" key={tabInfo.encodeId}>
      {/* Image component */}
      <div className="relative overflow-hidden rounded-sm group">
        {/* Image background */}
        <div
          className="pt-[100%] bg-center bg-no-repeat bg-cover scale-100 group-hover:scale-110 effect"
          style={{ backgroundImage: `url(${tabInfo.thumbnailM})` }}
        ></div>

        {/* Overlay and action in this song */}
        {type === 'song' && (
          <div className="absolute bg-[rgb(0,0,0,0.5)] top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 effect flex items-center justify-center">
            <div className="w-full flex items-center text-4xl justify-around">
              {/* Button play music */}
              <div
                className="text-white p-2 hover:scale-110 cursor-pointer effect"
                onClick={handlePlayCurrentMusic}
              >
                <RiPlayFill />
              </div>
              {/* Button add song to playlist */}
              <div
                className="text-white p-2 hover:scale-110 cursor-pointer effect"
                onClick={handleAddSongToPlaylist}
              >
                <IoMdAddCircleOutline />
              </div>
            </div>
          </div>
        )}
      </div>

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
