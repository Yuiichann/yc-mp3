import { useGetFavoriteSongs } from './useGetFavoriteSongs';

// check song is in favorites list
export const useCheckSongIsLiked = (encodeId: string) => {
  const { favoriteSongs, loading } = useGetFavoriteSongs();

  let isFavoriteSong: boolean = false;

  if (favoriteSongs && favoriteSongs.length > 0) {
    const checkSong = favoriteSongs.find((song) => song.encodeId === encodeId);
    isFavoriteSong = checkSong ? true : false;
  }

  return { isFavoriteSong, loading };
};
