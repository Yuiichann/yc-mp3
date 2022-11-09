import Tippy from '@tippyjs/react';
import { addDoc, collection, deleteDoc, doc, getDocs, Timestamp } from 'firebase/firestore';
import React, { useCallback } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AiOutlineLoading } from 'react-icons/ai';
import {
  IoMdAdd,
  IoMdAddCircleOutline,
  IoMdHeart,
  IoMdHeartEmpty,
  IoMdRemove,
} from 'react-icons/io';
import { RiPlayFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { auth, db } from '../config/firebase';
import { AppDispatch, RootState } from '../config/store';
import { useCheckSongIsLiked } from '../hooks/useCheckSongisLiked';
import { setIsPlaylist } from '../reducer/audioStatus';
import {
  addSongToPlaylist,
  initPrivatePlaylist,
  setPlayBySongIndex,
} from '../reducer/playlistSlice';
import { fetchDataMp3 } from '../reducer/songPlayingSlice';
import { SongApi } from '../types';
import checkSongInList from '../utils/checkSongInList';

interface Props {
  songInfo: SongApi;
  component: 'SongInfo' | 'ListGridItem' | 'ChartListItem' | 'Private' | 'ChartItemsTop100';
}

// component xử lý thao tác audio ở ngoài file audio
// tùy thuộc vào props component sẽ trả về giao diện khác nhau nhưng logic vẫn giống nhau
const AudioHandler = ({ songInfo, component }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { songs } = useSelector((state: RootState) => state.playlist);
  const [user] = useAuthState(auth);

  // hooks kiểm tra bài nhạc có nằm trong danh sách yêu thích của user không ==> true or false
  const { isFavoriteSong, loading } = useCheckSongIsLiked(songInfo.encodeId);

  // handle play song
  const handlePlayCurrentSong = useCallback(() => {
    // check if song already in playlist, dispatch index of song
    const checkSongInPlaylist = checkSongInList(songInfo.encodeId, songs.items);
    if (checkSongInPlaylist >= 0) {
      dispatch(setPlayBySongIndex(checkSongInPlaylist));
      return;
    }

    // create const info song
    const songDetail = {
      title: songInfo.title,
      artistsNames: songInfo.artistsNames,
      encodeId: songInfo.encodeId,
      thumbnail: songInfo.thumbnail,
      thumbnailM: songInfo.thumbnailM,
    };

    // if playlist is none (when start app or change each song) ==> init new playlist with one uniqe song
    if (songs.items.length <= 1) {
      dispatch(initPrivatePlaylist(songInfo));
    } else {
      // else, when playlist is avaialbe, play this song
      dispatch(setPlayBySongIndex(-1));
      dispatch(fetchDataMp3(songDetail));
    }
  }, [songInfo]);

  // handle add song to playlist
  const handleAddToPlaylist = useCallback(() => {
    // check if song in playlist, alert and return
    const findSong = songs.items.find((song) => song.encodeId === songInfo.encodeId);

    if (findSong) {
      toast.info('Bài hát đã trong playlist');
      return;
    }

    // if playlist none, init playlist true
    if (songs.items.length <= 1) {
      dispatch(setIsPlaylist(true));

      // listen when not song is play and user click add song to empty playlist ==> hat bai dau
      if (songs.items.length === 0) {
        dispatch(setPlayBySongIndex(0));
      }
    }
    // dispatch action add song to playlist
    dispatch(addSongToPlaylist(songInfo));
    toast.success('Đã thêm vào danh sách phát');
  }, [songInfo]);

  // handle when click add song to favorites list
  const handleCLickLikeButton = useCallback(async () => {
    if (!user) {
      toast.error('Vui lòng đăng nhập để sử dụng tính năng này!!!');
      return;
    }

    try {
      // create object data
      const songItem = {
        email: user.email,
        createAt: Timestamp.now(),
        data: {
          encodeId: songInfo.encodeId,
          title: songInfo.title,
          artistsNames: songInfo.artistsNames || '',
          releaseDate: songInfo.releaseDate || '',
          thumbnail: songInfo.thumbnail,
          thumbnailM: songInfo.thumbnailM,
        },
      };
      // call api add doccument
      await addDoc(collection(db, 'favorite_songs'), songItem);
      toast.success('Đã thêm vào danh sách yêu thích!!!');
    } catch (error) {
      console.log(error);
      toast.error('Lỗi trong quá trình!');
    }
  }, [songInfo]);

  // handle click remove songs to favorites list
  const handleClickRemoveFavoriteSong = useCallback(async () => {
    if (!user) return;

    try {
      // get favorites collection
      const favoriteRef = collection(db, 'favorite_songs');
      const favoriteList = await getDocs(favoriteRef);

      // tìm kiếm bài hát mún xóa trong collection theo email và encodeId của bài hát ==> xóa nó
      favoriteList.docs.forEach(async (item) => {
        const data = item.data();

        if (data.email === user.email && data.data.encodeId === songInfo.encodeId) {
          await deleteDoc(doc(db, 'favorite_songs', item.id));
          toast.success('Đã xóa khỏi danh sách yêu thích!');
        }
      });
    } catch (error) {
      console.log(error);
      toast.error('Lỗi trong quá trình!');
    }
  }, [songInfo]);

  //   tùy vào component sẽ có giao diện khác nhau
  //   component === SongInfo
  if (component === 'SongInfo') {
    return (
      <div className="flex justify-center items-center gap-5 text-3xl">
        <Tippy content="Phát bài hát" animation="fade">
          <div className="icon-player text-secondary" onClick={handlePlayCurrentSong}>
            <RiPlayFill />
          </div>
        </Tippy>

        <Tippy content="Thêm vào danh sách phát" animation="fade">
          <div className="icon-player text-secondary" onClick={handleAddToPlaylist}>
            <IoMdAddCircleOutline />
          </div>
        </Tippy>

        {/* liked */}
        {loading ? (
          <div className="icon-player animate-spin text-primary">
            <AiOutlineLoading />
          </div>
        ) : isFavoriteSong ? (
          <Tippy content="Xóa khỏi danh sách yêu thích" animation="fade">
            <div className="icon-player text-red-600" onClick={handleClickRemoveFavoriteSong}>
              <IoMdHeart />
            </div>
          </Tippy>
        ) : (
          <Tippy content="Thêm vào danh sách yêu thích" animation="fade">
            <div className="icon-player text-red-600" onClick={handleCLickLikeButton}>
              <IoMdHeartEmpty />
            </div>
          </Tippy>
        )}
      </div>
    );
  }
  //   component === ListGridItem
  if (component === 'ListGridItem') {
    return (
      <div className="w-full flex items-center text-2xl xl:text-3xl justify-around">
        {/* Button favorite */}
        {loading ? (
          <div className="p-1 text-20 animate-spin text-primary">
            <AiOutlineLoading />
          </div>
        ) : isFavoriteSong ? (
          <Tippy content="Xóa khỏi danh sách yêu thích">
            <div
              className="text-red-500 p-2 hover:scale-110 cursor-pointer effect"
              onClick={handleClickRemoveFavoriteSong}
            >
              <IoMdHeart />
            </div>
          </Tippy>
        ) : (
          <Tippy content="Thêm vào danh sách yêu thích">
            <div
              className="text-white p-2 hover:scale-110 cursor-pointer effect"
              onClick={handleCLickLikeButton}
            >
              <IoMdHeartEmpty />
            </div>
          </Tippy>
        )}

        {/* Button play music */}
        <Tippy content="Phát">
          <div
            className="text-white text-4xl xl:text-5xl p-2 hover:scale-125 hover:text-secondary cursor-pointer effect"
            onClick={handlePlayCurrentSong}
          >
            <RiPlayFill />
          </div>
        </Tippy>
        {/* Button add song to playlist */}
        <Tippy content="Thêm vào danh sách phát">
          <div
            className="text-white p-2 hover:scale-110 cursor-pointer effect"
            onClick={handleAddToPlaylist}
          >
            <IoMdAddCircleOutline />
          </div>
        </Tippy>
      </div>
    );
  }

  // component === ChartItemsTop100
  if (component === 'ChartItemsTop100') {
    return (
      <div className="flex justify-center items-center gap-1 text-xl lg:text-2xl">
        <Tippy content="Phát">
          <div className="icon-player text-secondary" onClick={handlePlayCurrentSong}>
            <RiPlayFill />
          </div>
        </Tippy>

        <Tippy content="Thêm vào danh sách phát">
          <div className="icon-player text-secondary" onClick={handleAddToPlaylist}>
            <IoMdAddCircleOutline />
          </div>
        </Tippy>

        {loading ? (
          <div className="p-1 text-20 animate-spin text-primary">
            <AiOutlineLoading />
          </div>
        ) : isFavoriteSong ? (
          <Tippy content="Xóa khỏi danh sách yêu thích">
            <div className="icon-player text-red-600" onClick={handleClickRemoveFavoriteSong}>
              <IoMdHeart />
            </div>
          </Tippy>
        ) : (
          <Tippy content="Thêm vào danh sách yêu thích">
            <div className="icon-player text-red-600" onClick={handleCLickLikeButton}>
              <IoMdHeartEmpty />
            </div>
          </Tippy>
        )}
      </div>
    );
  }

  // component === Private
  if (component === 'Private') {
    return loading ? (
      <div className="p-2 text-20 animate-spin text-primary">
        <AiOutlineLoading />
      </div>
    ) : isFavoriteSong ? (
      <div
        className="flex items-center space-x-2 select-none px-2 py-1 cursor-pointer border border-red-600 rounded-xl hover:bg-red-100 effect"
        onClick={handleClickRemoveFavoriteSong}
      >
        <div className="text-24 text-red-600">
          <IoMdRemove />
        </div>
        <span className="text-14">Xóa khỏi yêu thích</span>
      </div>
    ) : (
      <div
        className="flex items-center space-x-2 select-none px-2 py-1 cursor-pointer border border-red-600 rounded-xl hover:bg-red-100 effect"
        onClick={handleCLickLikeButton}
      >
        <div className="text-24 text-red-600">
          <IoMdAdd />
        </div>
        <span className="text-14">Thêm vào yêu thích</span>
      </div>
    );
  }

  // component === ChartListItem
  if (component === 'ChartListItem') {
    return (
      <div className="w-full h-full flex items-center justify-center text-white">
        <div
          className="text-3xl cursor-pointer hover:scale-110 hover:text-secondary effect"
          onClick={handlePlayCurrentSong}
        >
          <RiPlayFill />
        </div>
      </div>
    );
  }

  return <></>;
};

export default React.memo(AudioHandler);
