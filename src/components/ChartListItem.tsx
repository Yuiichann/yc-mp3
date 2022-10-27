import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../config/store';
import { SongApi } from '../types';
import AudioHandler from './AudioHandler';

interface Props {
  song: SongApi;
  index: number;
}

const ChartListItem = ({ song, index }: Props) => {
  const { chart } = useSelector((state: RootState) => state.mainInfo);
  return (
    <div className="flex items-center bg-[rgb(255,255,255,0.2)] py-3 px-2 space-x-2 rounded-md hover:bg-[rgb(255,255,255,0.3)]">
      {/* Index */}
      <div className="flex items-center justify-center min-w-[35px] select-none">
        <span className={`text-stroke-${index + 1} text-32 font-bold text-[transparent]`}>
          {index + 1}
        </span>
      </div>
      {/* Thumbnail */}
      <div className="w-[50px] h-[50px] relative group overflow-hidden rounded-md">
        <div
          className="pt-[100%] bg-cover bg-no-repeat bg-center group-hover:scale-110 effect"
          style={{ backgroundImage: `url(${song.thumbnail})` }}
        ></div>

        <div className="absolute left-0 top-0 w-full h-full group-hover:bg-[rgb(0,0,0,0.4)] invisible group-hover:visible effect">
          <AudioHandler songInfo={song} component="ChartListItem" />
        </div>
      </div>
      {/* title and artists */}
      <div className="flex flex-col flex-grow text-14 tracking-wide truncate">
        <Link to={`/bai-hat?id=${song.encodeId}`} className="font-medium hover:opacity-80">
          {song.title}
        </Link>
        <p className="truncate opacity-60 text-12">{song.artistsNames}</p>
      </div>
      {/* % ranking */}
      <div className="font-semibold p-1">
        {Math.round((song.score / chart.chart.totalScore) * 100)}%
      </div>
    </div>
  );
};

export default memo(ChartListItem);
