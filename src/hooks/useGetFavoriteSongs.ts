import { collection, orderBy, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../config/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { SongApi } from '../types';

// hooks get favorites song by email logged
export const useGetFavoriteSongs = () => {
  const [userLogged, _loading, _error] = useAuthState(auth);

  const collectionQuery = query(
    collection(db, 'favorite_songs'),
    where('email', '==', userLogged?.email || '')
  );

  const [snapshot, loading, error] = useCollection(collectionQuery);

  const favoriteSongs = snapshot?.docs.map((item) => item.data().data) as SongApi[];

  // return favorites list by email, loading, and error
  return {
    favoriteSongs,
    loading,
    error,
  };
};
