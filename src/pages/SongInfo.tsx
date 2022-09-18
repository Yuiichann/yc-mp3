import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { AppDispatch } from '../config/store';
import { addSongToQueue, setOneSongPlaying } from '../reducer/songPlaying';

const SongInfo = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();

  const songId = searchParams.get('id');

  const handlePlaying = () => {
    if (songId) {
      dispatch(setOneSongPlaying(songId));
    }
  };

  return (
    <div>
      Thông tin bài hát
      <button className="button" onClick={handlePlaying}>
        CHƠI NHẠC
      </button>
    </div>
  );
};

export default SongInfo;
