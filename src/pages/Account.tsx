import { useEffect, useState } from 'react';
import { ReactComponent as RecentlyIcon } from '../assets/icons/gan_day.svg';
import { ReactComponent as PlaylistsIcon } from '../assets/icons/playlist.svg';
import { ReactComponent as SongsIcon } from '../assets/icons/songs.svg';
import ListGrid from '../components/ListGrid';
import Loading from '../components/Loading';
import ProtectedLayout from '../components/ProtectedLayout';
import { useGetFavoriteSongs } from '../hooks/useGetFavoriteSongs';

const Account = () => {
  const favoriteSongs = useGetFavoriteSongs();
  const [isLoading, setIsLoading] = useState(true);

  // fake loading.
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  return (
    <ProtectedLayout>
      {isLoading ? (
        <Loading />
      ) : (
        <section className="px-1 lg:px-2">
          <div className="mt-2">
            <h1 className="title text-center text-primary">Thư viện của bạn</h1>

            {/* Recently */}
            <div className="mt-12">
              <div className="flex items-center space-x-2">
                <RecentlyIcon />
                <h1 className="select-none font-medium">Nghe Gần Đây</h1>
              </div>

              {/* data in here */}
              <div></div>
            </div>

            {/* Song Favorites */}
            <div className="mt-12">
              <div className="flex items-center space-x-2">
                <SongsIcon />
                <h1 className="select-none font-medium">Bài hát</h1>
              </div>

              <div>
                {favoriteSongs && favoriteSongs.length > 0 ? (
                  <ListGrid data={favoriteSongs} type="song" />
                ) : (
                  <h1 className="mt-4">Danh sách rỗng</h1>
                )}
              </div>
            </div>

            {/* Playlist Favorites */}
            <div className="mt-12">
              <div className="flex items-center space-x-2">
                <PlaylistsIcon />
                <h1 className="select-none font-medium">Playlist</h1>
              </div>
            </div>
          </div>
        </section>
      )}
    </ProtectedLayout>
  );
};

export default Account;
