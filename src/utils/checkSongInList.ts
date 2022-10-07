import { SongApi } from '../types';

// check one song is in list or not
// if true will return index of song, or not return -1
const checkSongInList = (songId: string, songs: SongApi[]) => {
  const checked = songs.findIndex((song) => song.encodeId === songId);

  return checked >= 0 ? checked : -1;
};

export default checkSongInList;
