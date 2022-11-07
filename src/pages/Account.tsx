import { useEffect, useState } from 'react';
import { ReactComponent as RecentlyIcon } from '../assets/icons/gan_day.svg';
import { FavoritePlaylists, FavoriteSongs } from '../components/Favorites';
import Loading from '../components/Loading';
import ProtectedLayout from '../components/ProtectedLayout';

const Account = () => {
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
            {/* <div className="mt-12">
              <div className="flex items-center space-x-2">
                <RecentlyIcon />
                <h1 className="select-none font-medium">Nghe Gần Đây</h1>
              </div>

              <div></div>
            </div> */}

            {/* Song Favorites */}
            <div className="mt-12">
              <FavoriteSongs />
            </div>

            {/* Playlist Favorites */}
            <div className="mt-12">
              <FavoritePlaylists />
            </div>
          </div>
        </section>
      )}
    </ProtectedLayout>
  );
};

export default Account;
