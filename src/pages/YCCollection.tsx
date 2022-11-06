import Tippy from '@tippyjs/react';
import { useCallback } from 'react';
import { RiPlayFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import ListGrid from '../components/ListGrid';
import Loading from '../components/Loading';
import { AppDispatch, RootState } from '../config/store';
import { setIsPlaylist } from '../reducer/audioStatus';
import { initNewPlaylist } from '../reducer/playlistSlice';
import { PlayList } from '../types';

const YCCollection = () => {
  const { albumYc, isLoading } = useSelector((state: RootState) => state.mainInfo);
  const dispatch = useDispatch<AppDispatch>();

  // play album yc
  const handlePlayAlbumYc = useCallback(() => {
    const createAlbumYc: PlayList = {
      playlistDetail: {
        encodeId: 'album-yc',
        title: '',
        thumbnail: '',
        artistsNames: 'Collection create by Ycmp3',
      },
      songs: {
        total: albumYc.length,
        totalDuration: 0,
        items: albumYc,
      },
      currentSongIndex: 0,
    };

    dispatch(initNewPlaylist(createAlbumYc));
    if (albumYc.length > 1) {
      dispatch(setIsPlaylist(true));
    }
  }, [albumYc]);

  return isLoading ? (
    <Loading />
  ) : (
    <section className="px-1 lg:px-2">
      <div className="flex space-x-4 items-center mt-2">
        <h1 className="title m-0">Bộ Sưu Tập Của YC MP3</h1>

        <Tippy content="Phát Album">
          <div className="icon-player text-24 text-primary" onClick={handlePlayAlbumYc}>
            <RiPlayFill />
          </div>
        </Tippy>
      </div>
      {albumYc && <ListGrid type="song" data={albumYc} />}
    </section>
  );
};

export default YCCollection;
