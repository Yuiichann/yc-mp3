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
      <div className="w-[50px] min-w-[50px] h-[50px] relative group overflow-hidden rounded-md">
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
        <Link to={`/bai-hat?id=${song.encodeId}`} className="font-medium hover:opacity-80 truncate">
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

export const ChartItemsTop100 = memo(({ song, index }: Props) => {
  // convert duration to mm:ss
  const durationCovert = () => {
    const minutes = song.duration / 60;
    const seconds = song.duration % 60;

    return `${minutes.toFixed(0)}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  return (
    <div className="group flex items-center py-3 border-b-2 space-x-4 hover:bg-gray-200">
      {/* index ranking */}
      <div className="flex items-center justify-center min-w-[38px] lg:min-w-[62px] select-none">
        <span
          className={`text-stroke-${
            index <= 2 ? index + 1 : 0
          } text-20 lg:text-32 font-bold lg:font-extrabold text-[transparent]`}
        >
          {index + 1}
        </span>
      </div>

      {/* raking status */}
      <div className="flex flex-col justify-between gap-1 items-center min-w-[30px]">
        {song.rakingStatus === 0 ? (
          <div className="w-8/12 h-[3px] rounded-md bg-gray-300"></div>
        ) : (
          <>
            {song.rakingStatus > 0 && (
              <div className="border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-[#00FF00]"></div>
            )}
            <span className="text-14">{song.rakingStatus}</span>
            {song.rakingStatus < 0 && (
              <div className="border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-[#FF0000]"></div>
            )}
          </>
        )}
      </div>

      {/* image bg */}
      <div className="min-w-[50px] h-[50px] rounded-sm relative group overflow-hidden">
        <div
          className="bg-cover bg-no-repeat bg-center pt-[100%] group-hover:scale-110 effect"
          style={{ backgroundImage: `url(${song.thumbnail})` }}
        ></div>

        {/* audio handler */}
        <div className="absolute left-0 top-0 w-full h-full group-hover:bg-[rgb(0,0,0,0.4)] invisible group-hover:visible effect">
          <AudioHandler songInfo={song} component="ChartListItem" />
        </div>
      </div>

      {/* title and artistNames */}
      <div className="flex flex-col justify-around h-full truncate flex-grow">
        <Link
          to={`/bai-hat?id=${song.encodeId}`}
          className="truncate font-medium hover:opacity-70 text-secondary w-fit"
        >
          {song.title}
        </Link>
        <p className="truncate text-12 opacity-80 select-none">{song.artistsNames}</p>
      </div>

      {/* audio handler */}
      <div className="hidden md:group-hover:block">
        <AudioHandler component="ChartItemsTop100" songInfo={song} />
      </div>

      {/* time mm:ss of song */}
      <div className="text-[13px] tracking-wide px-2">
        <span>{durationCovert()}</span>
      </div>
    </div>
  );
});
