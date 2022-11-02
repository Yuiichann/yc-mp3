import { memo } from 'react';
import { Link } from 'react-router-dom';
import { AlbumApi, SongApi } from '../types';
import convertDate from '../utils/convertDate';
import AudioHandler from './AudioHandler';

interface Props {
  type: 'song' | 'album' | 'playlist';
  tabInfo: AlbumApi | SongApi;
}

const ListGridItem = ({ tabInfo, type }: Props) => {
  return (
    <div className="p-1" key={tabInfo.encodeId}>
      {/* Image component */}
      <div className="relative overflow-hidden rounded-sm group">
        {/* UI with type === album | playlist */}
        {type !== 'song' && (
          <Link to={`/${type}?id=${tabInfo.encodeId}`}>
            <div
              className="pt-[100%] bg-center bg-no-repeat bg-cover scale-100 group-hover:scale-110 effect"
              style={{ backgroundImage: `url(${tabInfo.thumbnailM})` }}
            ></div>
          </Link>
        )}

        {/* UI with type === song */}
        {type === 'song' && (
          <>
            <div
              className="pt-[100%] bg-center bg-no-repeat bg-cover scale-100 group-hover:scale-110 effect"
              style={{ backgroundImage: `url(${tabInfo.thumbnailM})` }}
            ></div>
            {/* Overlay and action in this song */}
            <div className="absolute bg-[rgb(0,0,0,0.5)] top-0 left-0 w-full h-full opacity-0 invisible group-hover:visible group-hover:opacity-100 effect flex items-center justify-center">
              {/* Audio handler */}
              <AudioHandler component="ListGridItem" songInfo={tabInfo as SongApi} />
            </div>
          </>
        )}
      </div>

      {/* Info iclude name and releaseDate */}
      <div className="mt-1 text-center lg:text-left">
        <div className="w-full min-w-0 truncate my-1">
          <Link
            to={`/${type === 'song' ? 'bai-hat' : type === 'album' ? 'album' : 'playlist'}?id=${
              tabInfo.encodeId
            }`}
          >
            <h2 className="font-medium text-16 cursor-pointer hover:opacity-60">{tabInfo.title}</h2>
          </Link>
        </div>
        <p className="cursor-default text-14">{convertDate(tabInfo.releaseDate)}</p>
      </div>
    </div>
  );
};

export default memo(ListGridItem);
