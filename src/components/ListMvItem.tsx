import { memo } from 'react';
import { Link } from 'react-router-dom';
import { VideoItems } from '../types';
import ImageLazyLoad from './ImageLazyLoad';

interface Props {
  video: VideoItems;
}

const ListMvItem = ({ video }: Props) => {
  return (
    <Link to={`/video?id=${video.encodeId}`} className="flex flex-col space-y-1 group">
      <ImageLazyLoad src={video.thumbnailM} alt={video.alias} className="w-full rounded-md" />
      <div className="group-hover:opacity-90 group-hover:text-primary truncate">
        <h1 className="font-medium truncate">{video.title}</h1>
        <p className="italic text-14 truncate">{video.artistsNames}</p>
      </div>
    </Link>
  );
};

export default memo(ListMvItem);
