import { useSelector } from 'react-redux';
import { RootState } from '../config/store';
import { memo } from 'react';

const MusicPlayer = () => {
  const { currentSong, loading } = useSelector((state: RootState) => state.songPlaying);
  return (
    <div className="fixed bottom-0 left-0 w-screen bg-tertiary bg-main text-white">
      <div className="h-player px-4 py-2">
        {loading === 'idle' ? (
          'Hàng chờ rỗng'
        ) : loading === 'pending' ? (
          'Loading...'
        ) : loading === 'successed' ? (
          <audio controls>
            <source src={currentSong} />
          </audio>
        ) : (
          'Không có dữ liệu nhạc hoặc lỗi gì đó'
        )}
      </div>
    </div>
  );
};

export default memo(MusicPlayer);
