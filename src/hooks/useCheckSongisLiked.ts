import { useGetFavoriteSongs } from './useGetFavoriteSongs';

// check song is in favorites list
export const useCheckSongIsLiked = (encodeId: string) => {
  const { favoriteSongs } = useGetFavoriteSongs();

  if (favoriteSongs && favoriteSongs.length > 0) {
    const checkSong = favoriteSongs.find((song) => song.encodeId === encodeId);
    return checkSong ? true : false;
  }

  return false;
};
