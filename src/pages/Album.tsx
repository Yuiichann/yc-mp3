import Tippy from '@tippyjs/react';
import { addDoc, collection, deleteDoc, doc, getDocs, Timestamp } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { RiPlayFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ycMp3 from '../api/ycmp3Api';
import ImageLazyLoad from '../components/ImageLazyLoad';
import ListSong from '../components/ListSong';
import Loading from '../components/Loading';
import { auth, db } from '../config/firebase';
import { AppDispatch, RootState } from '../config/store';
import { useCheckPlaylistIsLiked } from '../hooks/useCheckPlaylistIsLiked';
import { setIsPlaylist } from '../reducer/audioStatus';
import { initNewPlaylist } from '../reducer/playlistSlice';
import { addTempPlaylist } from '../reducer/tempGlobalState';
import { PlaylistItem } from '../types';
import NotFound from './NotFound';

// using for Playlist and album
const AlbumInfo = () => {
  const [dataList, setDataList] = useState<PlaylistItem>();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const { temp_playlists } = useSelector((state: RootState) => state.tempGlobalState);
  const [user] = useAuthState(auth);

  // get id query on url - id may be playlistid or albumid
  let [searchParams] = useSearchParams();
  const paramsId = searchParams.get('id');

  // check is like playlist
  const { isFavoritePlaylist, loading } = useCheckPlaylistIsLiked(paramsId);

  const tempPlaylistSaved = temp_playlists.find((pl) => pl.encodeId === paramsId);

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

  // handle when click play playlist or album
  const handleClickPlayList = useCallback(() => {
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
  }, [dataList]);

  // handle Click add to favorites list
  const handleClickAddToFavorite = useCallback(async () => {
    if (!user) {
      toast.error('Vui l??ng ????ng nh???p ????? s??? d???ng t??nh n??ng n??y!!!');
      return;
    }

    if (!dataList) return;

    try {
      await addDoc(collection(db, 'favorite_playlists'), {
        email: user.email,
        createAt: Timestamp.now(),
        data: {
          encodeId: dataList.encodeId,
          title: dataList.title,
          artistsNames: dataList.artistsNames || '',
          releaseDate: dataList.releaseDate || '',
          thumbnail: dataList.thumbnail || '',
          thumbnailM: dataList.thumbnailM || '',
        },
      });
      toast.success('???? th??m v??o danh s??ch y??u th??ch');
    } catch (error) {
      console.log(error);
      toast.error('L???i trong qu?? tr??nh');
    }
  }, [dataList, user]);

  // handle click remove to favorites
  const handleClickRemoveToFavorite = useCallback(async () => {
    if (!user) return;

    if (!paramsId) return;

    try {
      const favoriteRef = collection(db, 'favorite_playlists');
      const favoriteList = await getDocs(favoriteRef);

      // l??p qua danh s??ch ????? t??m item m??n x??a theo ????ng email user v?? encodeId c???a object
      favoriteList.docs.forEach(async (item) => {
        const data = item.data();

        if (data.email === user.email && data.data.encodeId === paramsId) {
          await deleteDoc(doc(db, 'favorite_playlists', item.id));
          toast.success('???? x??a kh???i danh sach y??u th??ch!');
        }
      });
    } catch (error) {
      console.log(error);
      toast.error('L???i trong qu?? tr??nh!');
    }
  }, []);

  // check paramsid not found
  if (!paramsId) {
    return <NotFound />;
  }

  return (
    <div className="pt-1">
      {isLoading ? (
        <Loading />
      ) : dataList ? (
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
              {dataList.artists && (
                <div className="font-semibold text-gray-500 italic flex items-center flex-wrap space-x-1">
                  {dataList.artists.map((artist, index) => (
                    <Link
                      to={`/ca-si?name=${artist.alias}`}
                      key={artist.alias}
                      className="hover:text-primary"
                    >
                      {artist.name}
                      {index < dataList.artists.length - 1 ? ',' : ''}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Button Play playlist and add/remove playlist to list */}
            <div className="flex items-center justify-center gap-8 text-28">
              {/* Button play playlist */}
              <Tippy content="Ph??t danh s??ch nh???c" animation="fade">
                <div className="icon-player text-primary" onClick={handleClickPlayList}>
                  <RiPlayFill />
                </div>
              </Tippy>

              {/* Button add/remove to favorite */}
              {loading ? (
                'Loading...'
              ) : isFavoritePlaylist ? (
                <Tippy content="X??a kh???i y??u th??ch" animation="fade">
                  <div className="icon-player text-red-600" onClick={handleClickRemoveToFavorite}>
                    <IoMdHeart />
                  </div>
                </Tippy>
              ) : (
                <Tippy content="Th??m v??o y??u th??ch" animation="fade">
                  <div className="icon-player text-red-600" onClick={handleClickAddToFavorite}>
                    <IoMdHeartEmpty />
                  </div>
                </Tippy>
              )}
            </div>
          </div>

          {/* List Song */}
          <div className="mt-8">
            <h1 className="text-underline text-2xl font-bold tracking-widest mx-auto mb-3">
              Danh s??ch: {dataList.song.total} B??i
            </h1>

            <ListSong dataSong={dataList.song} type={dataList.textType} enbleIndex={true} />
          </div>
        </>
      ) : (
        <div>
          <NotFound />
        </div>
      )}
    </div>
  );
};

export default AlbumInfo;
