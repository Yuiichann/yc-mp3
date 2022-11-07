import { useGetFavoritePlaylists } from './useGetFavoritePlaylists';

export const useCheckPlaylistIsLiked = (encodeId: string | null) => {
  const { favoritePlaylists, loading } = useGetFavoritePlaylists();

  let isFavoritePlaylist: boolean = false;

  if (favoritePlaylists && favoritePlaylists.length > 0) {
    const checkPlaylist = favoritePlaylists.find((playlist) => playlist.encodeId === encodeId);
    isFavoritePlaylist = checkPlaylist ? true : false;
  }

  return { isFavoritePlaylist, loading };
};
