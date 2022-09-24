import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ycMp3 from '../api/ycmp3Api';
import Loading from '../components/Loading';
import NewReleaseTab from '../components/NewReleaseTab';
import { SearchItems } from '../types';
import NotFound from './NotFound';

const Search = () => {
  const [searchData, setSearchData] = useState<SearchItems>({
    song: [],
    playlists: [],
    top: {},
    artists: {},
  });
  const [loading, setLoading] = useState(false);

  // get query
  let [searchParams] = useSearchParams();
  const keywordSearch = searchParams.get('keyword');

  useEffect(() => {
    if (!keywordSearch) return;

    setLoading(true);
    const getDataSearch = async () => {
      const res: any = await ycMp3.getSearch({ keyword: keywordSearch });

      console.log(res);

      if (res.msg === 'Success') {
        const songSearch = res.data.songs; // get list songs
        const playListsSearch = res.data.playlists; // get playlist
        const topItemSearch = res.data.top; // get item top search
        const artistsSearch = res.data.artists; // get artists list

        setSearchData({
          song: songSearch,
          playlists: playListsSearch,
          top: topItemSearch,
          artists: artistsSearch,
        });
      } else {
        console.error('Fail to fetch search keyword: ' + keywordSearch);
      }

      setLoading(false);
    };
    getDataSearch();
  }, [keywordSearch]);

  // check URL failed (not keyword)
  if (!keywordSearch) {
    return <NotFound />;
  }

  return (
    <section className="px-1 lg:px-2">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div>
            <div>
              <h1 className="text-2xl lg:text-3xl text-underline tracking-widest font-medium select-none">
                Bài Hát
              </h1>
              <NewReleaseTab data={searchData.song} type="song" />
            </div>

            <div className="mt-4">
              <h1 className="text-2xl lg:text-3xl text-underline tracking-widest font-medium select-none">
                Playlists
              </h1>
              <NewReleaseTab data={searchData.playlists} type="album" />
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Search;
