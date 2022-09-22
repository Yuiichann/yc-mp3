import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ycMp3 from '../api/ycmp3Api';
import Loading from '../components/Loading';

const Search = () => {
  const [searchData, setSearchData] = useState({});
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
        const songSearch = res.data.songs;
        const playListsSearch = res.data.playlists;
        const topItemSearch = res.data.top;
        const artistsSearch = res.data.artists;

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

  console.log(searchData);

  return (
    <section className="px-1 lg:px-2">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div></div>
        </>
      )}
    </section>
  );
};

export default Search;
