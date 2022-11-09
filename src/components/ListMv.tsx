import { memo } from 'react';
import { VideoItems } from '../types';
import ListMvItem from './ListMvItem';

interface Props {
  data: VideoItems[];
}

const ListMv = ({ data }: Props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-2">
      {data.map((video) => (
        <ListMvItem video={video} />
      ))}
    </div>
  );
};

export default memo(ListMv);
