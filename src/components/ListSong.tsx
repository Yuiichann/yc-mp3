import { memo } from 'react';
import { PlaylistItem } from '../types';
import ListSongItem from './ListSongItem';

interface Props {
  dataSong: PlaylistItem['song']; // list song array
  type: string;
  enbleIndex: boolean;
}

const ListSong = ({ dataSong, enbleIndex }: Props) => {
  return (
    // list song
    <div className="flex flex-col px-2 mb-12">
      {dataSong.items.map((song, index) => (
        <ListSongItem key={index} index={index} song={song} enbleIndex={enbleIndex} />
      ))}
    </div>
  );
};

export default memo(ListSong);
