import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import ycMp3 from '../api/ycmp3Api';
import ListSong from '../components/ListSong';
import Loading from '../components/Loading';
import { AppDispatch } from '../config/store';
import { setIsPlaylist } from '../reducer/audioStatus';
import { initNewPlaylist } from '../reducer/playlistSlice';
import { PlaylistItem } from '../types';
import NotFound from './NotFound';

// using for Playlist and album
const AlbumInfo = () => {
  const [dataList, setDataList] = useState<PlaylistItem>();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  // get id query on url - id may be playlistid or albumid
  let [searchParams] = useSearchParams();
  const paramsId = searchParams.get('id');

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
      dispatch(setIsPlaylist(true));
    }
  };

  // handle fetch data with paramsId
  useEffect(() => {
    if (!paramsId) return;

    setIsLoading(true);

    const fetchData = async () => {
      const res: any = await ycMp3.getDetailPlaylist({ id: paramsId });

      // check success fetch data
      if (res.msg === 'Success') {
        setDataList(res.data as PlaylistItem);
      } else {
        console.error(res.msg);
      }

      setIsLoading(false);
    };
    fetchData();
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
              <div className="">
                <img
                  src={dataList.thumbnail}
                  alt={dataList.title}
                  loading="lazy"
                  className="w-[200px] h-[200px] mx-auto rounded-full"
                />
              </div>
              {/* Info include title and artist name */}
              <div className="flex flex-col items-center space-y-4">
                <h2 className="text-2xl tracking-wider font-semibold text-center">
                  {dataList.title}
                </h2>
                <h6 className="text-xl tracking-wider font-semibold text-gray-500">
                  {dataList.artistNames || dataList.artistsNames}
                </h6>
              </div>
              {/* Button Play playlist */}
              <div>
                <button className="button-lg mx-auto" onClick={handleClickPlayList}>
                  Phát
                </button>
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
