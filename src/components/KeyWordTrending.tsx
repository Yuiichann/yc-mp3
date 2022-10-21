import { memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { hotArtistKey, hotKeyword } from '../constants/hotTrendKeyWord';
import { SkeletionKeyWordTrending } from './Skeleton';

const KeyWordTrending = () => {
  const [delay, setDelay] = useState(true);

  //   delay UI
  useEffect(() => {
    setTimeout(() => {
      setDelay(false);
    }, 700);
  }, []);

  return (
    <>
      <h2 className="font-medium text-xl md:font-2xl">Từ khóa nổi bật</h2>

      {/* keyword hot */}
      {delay ? (
        <SkeletionKeyWordTrending />
      ) : (
        <div className="flex flex-wrap">
          {hotKeyword.map((key) => (
            <Link
              key={key.rank}
              to={`/tim-kiem?keyword=${encodeURI(key.value)}`}
              className="px-3 py-2 bg-gray-200 mt-2 mr-2 lg:mr-4 lg:mt-4 flex items-center justify-center gap-2"
            >
              <span className="text-primary">#{key.rank}</span>
              <span>{key.value}</span>
            </Link>
          ))}
        </div>
      )}

      <h2 className="font-medium text-xl md:font-2xl mt-4">Nghệ sĩ nổi bật</h2>

      {/* Artist hot */}
      {delay ? (
        <SkeletionKeyWordTrending />
      ) : (
        <div className="flex flex-wrap">
          {hotArtistKey.map((key) => (
            <Link
              key={key.rank}
              to={`/tim-kiem?keyword=${encodeURI(key.value)}`}
              className="px-3 py-2 bg-gray-200 mt-2 mr-2 lg:mr-4 lg:mt-4 flex items-center justify-center gap-2"
            >
              <span className="text-primary">#{key.rank}</span>
              <span>{key.value}</span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default memo(KeyWordTrending);
