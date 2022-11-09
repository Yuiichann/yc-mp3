import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import ycMp3 from '../api/ycmp3Api';
import AudioHandler from '../components/AudioHandler';
import ImageLazyLoad from '../components/ImageLazyLoad';
import KeyWordTrending from '../components/KeyWordTrending';
import ListGrid from '../components/ListGrid';
import ListMv from '../components/ListMv';
import Loading from '../components/Loading';
import SearchInput from '../components/SearchInput';
import { AppDispatch, RootState } from '../config/store';
import { addTempSearch } from '../reducer/tempGlobalState';
import { SearchItems, SongApi, VideoItems } from '../types';

const Search = () => {
  const [searchData, setSearchData] = useState<SearchItems>({
    song: [],
    playlists: [],
    artists: {},
  });
  const { temp_search } = useSelector((state: RootState) => state.tempGlobalState);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  // get query
  let [searchParams] = useSearchParams();
  const keywordSearch = searchParams.get('keyword');

  useEffect(() => {
    if (!keywordSearch) return;

    setLoading(true);

    if (temp_search.key !== keywordSearch) {
      const getDataSearch = async () => {
        const res: any = await ycMp3.getSearch({ keyword: keywordSearch });

        if (res.msg === 'Success') {
          const songSearch = res.data.songs; // get list songs
          const playListsSearch = res.data.playlists; // get playlist
          const topItemSearch = res.data.top; // get item top search
          const artistsSearch = res.data.artists; // get artists list
          const videosSearch = res.data.videos; // get Video list

          // save temp search
          dispatch(
            addTempSearch({
              key: keywordSearch,
              data: {
                song: songSearch as SearchItems['song'],
                playlists: playListsSearch as SearchItems['playlists'],
                top: topItemSearch as SearchItems['top'],
                artists: artistsSearch,
                videos: videosSearch as SearchItems['videos'],
              },
            })
          );

          setSearchData({
            song: songSearch as SearchItems['song'],
            playlists: playListsSearch as SearchItems['playlists'],
            top: topItemSearch as SearchItems['top'],
            artists: artistsSearch,
            videos: videosSearch as SearchItems['videos'],
          });
        } else {
          console.error('Fail to fetch search keyword: ' + keywordSearch);
        }

        setLoading(false);
      };
      getDataSearch();
    } else {
      setTimeout(() => {
        setSearchData(temp_search.data);
        setLoading(false);
      }, 400);
    }
  }, [keywordSearch]);

  return (
    <section className="px-1 lg:px-2 min-h-[calc(100vh-180px)]">
      {/* Seach input when page not keyword */}
      <div className="py-2 flex items-center justify-center flex-col space-y-4">
        <div className="w-full md:w-8/12 block lg:hidden">
          <SearchInput />
        </div>

        {/* Hot Trend */}
        {!keywordSearch && (
          <div className="self-start">
            <KeyWordTrending />
          </div>
        )}
      </div>

      {/* Data Search here */}
      {loading ? (
        <Loading />
      ) : (
        <>
          <div>
            {keywordSearch && (
              <>
                {/* Trending (top) */}
                {searchData.top && (
                  <div className="mt-4">
                    <h1 className="title-underline">Trending</h1>
                    {/* Image */}
                    <div className="flex flex-col lg:flex-row justify-center items-center lg:justify-start space-y-2 mt-4">
                      <Link
                        to={
                          searchData.top.encodeId
                            ? `/bai-hat?id=${searchData.top.encodeId}`
                            : `/ca-si?name=${searchData.top.alias}`
                        }
                        className="lg:px-16"
                      >
                        <ImageLazyLoad
                          src={searchData.top.thumbnailM || searchData.top.thumbnail || ''}
                          alt={searchData.top.alias || searchData.top.title || ''}
                          className="w-[230px] h-[230px] rounded-lg"
                        />
                      </Link>

                      {/* main title && sub title */}
                      <div className="flex flex-col items-center justify-center space-y-2 text-center">
                        <Link
                          to={
                            searchData.top.encodeId
                              ? `/bai-hat?id=${searchData.top.encodeId}`
                              : `/ca-si?name=${searchData.top.alias}`
                          }
                          className="text-2xl font-semibold tracking-wider"
                        >
                          {searchData.top.title || searchData.top.name}
                        </Link>
                        <h6 className="text-gray-600 select-none">
                          {searchData.top.artistsNames || searchData.top.alias}
                        </h6>

                        {/* Audio handler */}
                        {searchData.top.title && (
                          <AudioHandler component="SongInfo" songInfo={searchData.top as SongApi} />
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* List songs */}
                <div className="mt-4">
                  <h1 className="title-underline">Bài Hát</h1>

                  {searchData.song ? (
                    <ListGrid data={searchData.song} type="song" />
                  ) : (
                    <h1 className="text-center text-xl my-24">Không có dữ liệu</h1>
                  )}
                </div>

                {/* List Playlists */}
                <div className="mt-4">
                  <h1 className="title-underline">Playlists</h1>

                  {searchData.playlists ? (
                    <ListGrid data={searchData.playlists} type="album" />
                  ) : (
                    <h1 className="text-center text-xl my-24">Không có dữ liệu</h1>
                  )}
                </div>

                {/* Videos */}
                <div className="mt-4">
                  <h1 className="title-underline">MV</h1>

                  {searchData.videos ? (
                    // list video
                    <ListMv data={searchData.videos as VideoItems[]} />
                  ) : (
                    <>
                      <h1 className="text-center text-xl my-24">Không có dữ liệu</h1>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default Search;
