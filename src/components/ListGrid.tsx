import { memo, useEffect, useState } from 'react';
import { AlbumApi, SongApi } from '../types';
import NewReleaseTabItem from './ListGridItem';
import { SkeletonNewRelease } from './Skeleton';

interface Props {
  data: SongApi[] | AlbumApi[];
  type: 'song' | 'album' | 'playlist';
}

// use page search && home
const ListGrid = ({ data, type }: Props) => {
  const [loading, setLoading] = useState(true);

  //fake loading after 400 milisecond will render
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, [type]);

  return loading ? (
    <>
      {/* fake loading */}
      <SkeletonNewRelease />
    </>
  ) : (
    <>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 lg:gap-1">
        {data.map((item, index) => (
          <NewReleaseTabItem key={item.encodeId} tabInfo={item} type={type} />
        ))}
      </div>
    </>
  );
};

export default memo(ListGrid);
