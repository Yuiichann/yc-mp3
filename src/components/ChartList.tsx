import { memo } from 'react';
import { SongApi } from '../types';
import ChartListItem from './ChartListItem';

interface Props {
  dataList: SongApi[];
  onlyTop?: boolean;
  type: 'home' | 'bxh';
}

const ChartList = ({ dataList, onlyTop, type }: Props) => {
  // chart UI of Home
  if (type === 'home') {
    return (
      <div className="flex flex-col space-y-4">
        {dataList.map((song, index) =>
          onlyTop ? (
            index < 3 && <ChartListItem song={song} key={index} index={index} />
          ) : (
            <ChartListItem song={song} key={index} index={index} />
          )
        )}
      </div>
    );
  }

  //   chart UI of BXH
  if (type === 'bxh') {
    return (
      <div className="flex flex-col space-y-4">
        {dataList.map((song, index) => (
          <div>chart home </div>
        ))}
      </div>
    );
  }

  return <></>;
};

export default memo(ChartList);
