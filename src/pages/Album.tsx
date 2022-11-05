import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import ycMp3 from '../api/ycmp3Api';
import ListSong from '../components/ListSong';
import Loading from '../components/Loading';
import { AppDispatch, RootState } from '../config/store';
import { setIsPlaylist } from '../reducer/audioStatus';
import { initNewPlaylist } from '../reducer/playlistSlice';
import { addTempPlaylist } from '../reducer/tempGlobalState';
import { PlaylistItem } from '../types';
import NotFound from './NotFound';
import { IoMdAddCircleOutline, IoMdHeartEmpty } from 'react-icons/io';
import { RiPlayFill } from 'react-icons/ri';
import ImageLazyLoad from '../components/ImageLazyLoad';
import Tippy from '@tippyjs/react';

// using for Playlist and album
const AlbumInfo = () => {
  const [dataList, setDataList] = useState<PlaylistItem>();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const { temp_playlists } = useSelector((state: RootState) => state.tempGlobalState);

  // get id query on url - id may be playlistid or albumid
  let [searchParams] = useSearchParams();
  const paramsId = searchParams.get('id');

  const tempPlaylistSaved = temp_playlists.find((pl) => pl.encodeId === paramsId);

  // handle when click play playlist or album
  const handleClickPlayList = () => {
    if (dataList) {
      // init playlist
      dispatch(
        initNewPlaylist({
          songs: dataList.song,
          playlistDetail: {
            encodeId: dataList.encodeId,
            thumbnail: dataList.thumbnail,
            title: dataList.title,
            artistsNames: dataList.artistNames,
          },
          currentSongIndex: 0,
        })
      );
      // set state isPlaylist of state songPlay ==> true
      if (dataList.song.items.length > 1) {
        dispatch(setIsPlaylist(true));
      }
    }
  };

  // handle fetch data with paramsId
  useEffect(() => {
    if (!paramsId) return;
    setIsLoading(true);

    if (!tempPlaylistSaved) {
      const fetchData = async () => {
        const res: any = await ycMp3.getDetailPlaylist({ id: paramsId });

        // check success fetch data
        if (res.msg === 'Success') {
          dispatch(addTempPlaylist(res.data));
          setDataList(res.data as PlaylistItem);
        } else {
          console.error(res.msg);
        }

        setIsLoading(false);
      };
      fetchData();
    } else {
      setDataList(tempPlaylistSaved);
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    }
  }, [paramsId]);

  // check paramsid not found
  if (!paramsId) {
    return <NotFound />;
  }

  return (
    <div className="pt-1">
      {isLoading ? (
        <Loading />
      ) : (
        dataList && (
          <>
            {/* alubm or playlist info */}
            <div className="flex flex-col justify-center space-y-4">
              {/* image */}
              <div className="mx-auto">
                <ImageLazyLoad
                  src={dataList.thumbnailM}
                  alt={dataList.title}
                  className="rounded-full"
                  width={200}
                  height={200}
                />
              </div>

              {/* Info include title and artist name */}
              <div className="flex flex-col items-center space-y-4">
                <h2 className="text-2xl tracking-wider font-semibold text-center">
                  {dataList.title}
                </h2>
                <h6 className="text-xl tracking-wider font-semibold text-gray-500 text-center">
                  {dataList.artistNames || dataList.artistsNames}
                </h6>
              </div>

              {/* Button Play playlist and add playlist to list */}
              <div className="flex items-center justify-center gap-8 text-28">
                <Tippy content="Phát danh sách nhạc" animation="fade">
                  <div className="icon-player text-primary" onClick={handleClickPlayList}>
                    <RiPlayFill />
                  </div>
                </Tippy>
                <Tippy content="Thêm vào yêu thích" animation="fade">
                  <div className="icon-player text-red-600">
                    <IoMdHeartEmpty />
                  </div>
                </Tippy>
              </div>
            </div>

            {/* List Song */}
            <div className="mt-8">
              <h1 className="text-underline text-2xl font-bold tracking-widest mx-auto mb-3">
                Danh sách: {dataList.song.total} Bài
              </h1>

              <ListSong dataSong={dataList.song} type={dataList.textType} enbleIndex={true} />
            </div>
          </>
        )
      )}
    </div>
  );
};

export default AlbumInfo;
