import { collection, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../config/firebase';
import { AlbumApi } from '../types';

export const useGetFavoritePlaylists = () => {
  const [userLogged, _loading, _error] = useAuthState(auth);

  const collectionQuery = query(
    collection(db, 'favorite_playlists'),
    where('email', '==', userLogged?.email || '')
  );

  const [snapshot, loading, error] = useCollection(collectionQuery);

  const favoritePlaylists = snapshot?.docs.map((item) => item.data().data) as AlbumApi[];

  return {
    favoritePlaylists,
    loading,
    error,
  };
};
