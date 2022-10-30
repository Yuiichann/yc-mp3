import { memo, useState } from 'react';
import { SongApi } from '../types';
import ChartListItem, { ChartItemsTop100 } from './ChartListItem';
import { AiOutlineLoading } from 'react-icons/ai';

interface Props {
  dataList: SongApi[];
}

// using for home page
export const ChartlistHome = memo(({ dataList }: Props) => {
  return (
    <div className="flex flex-col space-y-4">
      {dataList.map(
        (song, index) => index < 3 && <ChartListItem song={song} key={index} index={index} />
      )}
    </div>
  );
});

// using for ranking page
export const ChartListRanking = memo(({ dataList }: Props) => {
  const [itemShowed, setItemShowed] = useState(10); // 10 items
  const [isLoading, setIsLoading] = useState(false); // 10 items

  const handleSetShowAllItem = () => {
    setIsLoading(true);

    // fake loading
    setTimeout(() => {
      setItemShowed(100); // 100 items
      setIsLoading(false);
    }, 1000);
  };

  //   chart UI of BXH
  return (
    <div className="flex flex-col">
      {dataList.map(
        (song, index) =>
          index < itemShowed && <ChartItemsTop100 song={song} index={index} key={index} />
      )}

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center my-4 h-[100px]">
          <div>
            <div className="text-secondary text-2xl animate-spin">
              <AiOutlineLoading />
            </div>
          </div>
        </div>
      )}

      {/* Loading load more */}
      {itemShowed === 10 && !isLoading && (
        <div className="flex items-center justify-center my-4 h-[100px]">
          <button
            className="py-2 px-4 border border-secondary rounded-md hover:opacity-70"
            onClick={handleSetShowAllItem}
          >
            Xem Top 100
          </button>
        </div>
      )}
    </div>
  );
});
