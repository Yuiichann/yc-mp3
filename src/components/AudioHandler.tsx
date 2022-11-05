import { addDoc, collection, doc, Timestamp } from 'firebase/firestore';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { IoMdAddCircleOutline, IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';
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
  component: 'SongInfo' | 'ListGridItem' | 'ChartListItem' | 'ChartItemsTop100';
}

// component xử lý thao tác audio ở ngoài file audio
// tùy thuộc vào props component sẽ trả về giao diện khác nhau nhưng logic vẫn giống nhau
const AudioHandler = ({ songInfo, component }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { songs } = useSelector((state: RootState) => state.playlist);
  const [user] = useAuthState(auth);

  const isLiked = useCheckSongIsLiked(songInfo.encodeId);

  // handle play song
  const handlePlayCurrentSong = () => {
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
  };

  const handleAddToPlaylist = () => {
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
  };

  const handleCLickLikeButton = async () => {
    if (!user) {
      toast.error('Vui lòng đăng nhập để sử dụng tính năng này!!!');
      return;
    }

    try {
      const newData = await addDoc(collection(db, 'favorite_songs'), {
        email: user.email,
        createAt: Timestamp.now(),
        data: songInfo,
      });
      toast.success('Thêm bài hát thành công !!!');
    } catch (error) {
      console.log(error);
      toast.error('Lỗi trong quá trình!');
    }
  };

  //   tùy vào component sẽ có giao diện khác nhau
  //   component === SongInfo
  if (component === 'SongInfo') {
    return (
      <div className="flex justify-center items-center gap-5 text-3xl">
        <div className="icon-player text-secondary relative group" onClick={handlePlayCurrentSong}>
          <RiPlayFill />

          <div className="toolip-container">
            <p>Phát bài hát</p>
          </div>
        </div>

        <div className="icon-player text-secondary relative group" onClick={handleAddToPlaylist}>
          <IoMdAddCircleOutline />

          <div className="toolip-container">
            <p>Thêm vào danh sách phát</p>
          </div>
        </div>

        {/* liked */}
        {isLiked ? (
          <div className="icon-player text-red-600 relative group">
            <IoMdHeart />
            <div className="toolip-container">
              <p>Xóa khỏi yêu thích</p>
            </div>
          </div>
        ) : (
          <div className="icon-player text-red-600 relative group" onClick={handleCLickLikeButton}>
            <IoMdHeartEmpty />

            <div className="toolip-container">
              <p>Thêm vào yêu thích</p>
            </div>
          </div>
        )}
      </div>
    );
  }
  //   component === ListGridItem
  if (component === 'ListGridItem') {
    return (
      <div className="w-full flex items-center text-2xl xl:text-3xl justify-around">
        {/* Button favorite */}
        {isLiked ? (
          <div className="text-red-500 p-2 hover:scale-110 cursor-pointer effect">
            <IoMdHeart />
          </div>
        ) : (
          <div
            className="text-white p-2 hover:scale-110 cursor-pointer effect"
            onClick={handleCLickLikeButton}
          >
            <IoMdHeartEmpty />
          </div>
        )}

        {/* Button play music */}
        <div
          className="text-white text-4xl xl:text-5xl p-2 hover:scale-125 hover:text-secondary cursor-pointer effect"
          onClick={handlePlayCurrentSong}
        >
          <RiPlayFill />
        </div>
        {/* Button add song to playlist */}
        <div
          className="text-white p-2 hover:scale-110 cursor-pointer effect"
          onClick={handleAddToPlaylist}
        >
          <IoMdAddCircleOutline />
        </div>
      </div>
    );
  }

  // component === ChartItemsTop100
  if (component === 'ChartItemsTop100') {
    return (
      <div className="flex justify-center items-center gap-1 text-xl lg:text-2xl">
        <div className="icon-player text-secondary" onClick={handlePlayCurrentSong}>
          <RiPlayFill />
        </div>

        <div className="icon-player text-secondary" onClick={handleAddToPlaylist}>
          <IoMdAddCircleOutline />
        </div>

        {isLiked ? (
          <div className="icon-player text-red-600">
            <IoMdHeart />
          </div>
        ) : (
          <div className="icon-player text-red-600" onClick={handleCLickLikeButton}>
            <IoMdHeartEmpty />
          </div>
        )}
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
