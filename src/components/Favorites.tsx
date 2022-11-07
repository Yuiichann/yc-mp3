import Tippy from '@tippyjs/react';
import { memo } from 'react';
import { RiPlayFill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { ReactComponent as PlaylistsIcon } from '../assets/icons/playlist.svg';
import { ReactComponent as SongsIcon } from '../assets/icons/songs.svg';
import { AppDispatch } from '../config/store';
import { useGetFavoritePlaylists } from '../hooks/useGetFavoritePlaylists';
import { useGetFavoriteSongs } from '../hooks/useGetFavoriteSongs';
import { setIsPlaylist } from '../reducer/audioStatus';
import { initNewPlaylist } from '../reducer/playlistSlice';
import ListGrid from './ListGrid';
import { SkeletonNewRelease } from './Skeleton';

export const FavoriteSongs = memo(() => {
  const { favoriteSongs, loading } = useGetFavoriteSongs();
  const dispatch = useDispatch<AppDispatch>();

  //   handle when click play all favorite songs
  const handleClickPlayPlaylist = () => {
    if (favoriteSongs && favoriteSongs.length > 0) {
      dispatch(
        initNewPlaylist({
          songs: {
            total: favoriteSongs.length,
            totalDuration: 0,
            items: favoriteSongs,
          },
          playlistDetail: {
            encodeId: 'favorite-songs',
            title: '',
            thumbnail: '',
            artistsNames: '',
          },
          currentSongIndex: 0,
        })
      );

      if (favoriteSongs.length > 1) {
        dispatch(setIsPlaylist(true));
      }
    } else {
      toast.info('Danh sách rỗng!');
    }
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        <SongsIcon />
        <h1 className="select-none font-medium">Bài hát</h1>

        <Tippy content="Phát toàn bộ bài hát">
          <div className="icon-player text-primary text-24" onClick={handleClickPlayPlaylist}>
            <RiPlayFill />
          </div>
        </Tippy>
      </div>

      {/* data in here */}
      <div>
        {loading ? (
          <SkeletonNewRelease />
        ) : favoriteSongs && favoriteSongs.length > 0 ? (
          <ListGrid data={favoriteSongs} type="song" />
        ) : (
          <h1 className="my-12 text-center">Danh sách rỗng</h1>
        )}
      </div>
    </>
  );
});

export const FavoritePlaylists = memo(() => {
  const { favoritePlaylists, loading } = useGetFavoritePlaylists();

  return (
    <>
      <div className="flex items-center space-x-2">
        <PlaylistsIcon />
        <h1 className="select-none font-medium">Playlists</h1>
      </div>

      {/* data in here */}
      <div>
        {loading ? (
          <SkeletonNewRelease />
        ) : favoritePlaylists && favoritePlaylists.length > 0 ? (
          <ListGrid type="playlist" data={favoritePlaylists} />
        ) : (
          <h1 className="my-12 text-center">Danh sách rỗng</h1>
        )}
      </div>
    </>
  );
});
