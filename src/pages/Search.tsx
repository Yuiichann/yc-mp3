import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ycMp3 from '../api/ycmp3Api';
import Loading from '../components/Loading';
import NewReleaseTab from '../components/NewReleaseTab';
import SearchInput from '../components/SearchInput';
import { hotArtistKey, hotKeyword } from '../constants/hotTrendKeyWord';
import { SearchItems } from '../types';
import NotFound from './NotFound';

const Search = () => {
  const [searchData, setSearchData] = useState<SearchItems>({
    song: [],
    playlists: [],
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

      // console.log(res);

      if (res.msg === 'Success') {
        const songSearch = res.data.songs; // get list songs
        const playListsSearch = res.data.playlists; // get playlist
        const topItemSearch = res.data.top; // get item top search
        const artistsSearch = res.data.artists; // get artists list
        const videosSearch = res.data.videos; // get Video list

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
  }, [keywordSearch]);

  // console.log(searchData);

  // check URL failed (not keyword)
  // if (!keywordSearch) {
  //   return <NotFound />;
  // }

  return (
    <section className="px-1 lg:px-2 min-h-[calc(100vh-180px)]">
      {/* Seach input when page not keyword */}
      <div className="py-2 flex items-center justify-center flex-col space-y-4">
        <div className="w-full md:w-8/12">
          <SearchInput />
        </div>

        {/* Hot Trend */}
        {!keywordSearch && (
          <div className="self-start">
            <h2 className="font-medium text-xl md:font-2xl">Từ khóa nổi bật</h2>

            {/* keyword hot */}
            <div className="flex flex-wrap">
              {hotKeyword.map((key) => (
                <Link
                  to={`/tim-kiem?keyword=${encodeURI(key.value)}`}
                  className="px-3 py-2 bg-gray-200 mt-2 mr-2 lg:mr-4 lg:mt-4 flex items-center justify-center gap-2"
                >
                  <span className="text-primary">#{key.rank}</span>
                  <span>{key.value}</span>
                </Link>
              ))}
            </div>

            <h2 className="font-medium text-xl md:font-2xl mt-4">Nghệ sĩ nổi bật</h2>

            {/* Artist hot */}
            <div className="flex flex-wrap">
              {hotArtistKey.map((key) => (
                <Link
                  to={`/tim-kiem?keyword=${encodeURI(key.value)}`}
                  className="px-3 py-2 bg-gray-200 mt-2 mr-2 lg:mr-4 lg:mt-4 flex items-center justify-center gap-2"
                >
                  <span className="text-primary">#{key.rank}</span>
                  <span>{key.value}</span>
                </Link>
              ))}
            </div>
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
                  <div>
                    <h1 className="text-2xl lg:text-3xl text-underline tracking-widest font-medium select-none">
                      Trending
                    </h1>
                    <div className="flex flex-col lg:flex-row justify-center items-center lg:justify-start space-y-2 mt-4">
                      <Link to={`/bai-hat?id=${searchData.top.encodeId}`} className="lg:px-16">
                        <img
                          src={searchData.top.thumbnailM || searchData.top.thumbnail}
                          loading="lazy"
                          width={150}
                          height={150}
                          alt={searchData.top.alias}
                          className="w-[230px] h-[230px] rounded-lg"
                        />
                      </Link>
                      <div className="flex flex-col items-center justify-center space-y-2 text-center">
                        <Link
                          to={`/bai-hat?id=${searchData.top.encodeId}`}
                          className="text-2xl font-semibold tracking-wider"
                        >
                          {searchData.top.title}
                        </Link>
                        <h6 className="text-gray-600 select-none">{searchData.top.artistsNames}</h6>
                      </div>
                    </div>
                  </div>
                )}

                {/* List songs */}
                <div className="mt-4">
                  <h1 className="text-2xl lg:text-3xl text-underline tracking-widest font-medium select-none">
                    Bài Hát
                  </h1>

                  {searchData.song ? (
                    <NewReleaseTab data={searchData.song} type="song" />
                  ) : (
                    <h1 className="text-center text-xl my-6">Không có dữ liệu</h1>
                  )}
                </div>

                {/* List Playlists */}
                <div className="mt-4">
                  <h1 className="text-2xl lg:text-3xl text-underline tracking-widest font-medium select-none">
                    Playlists
                  </h1>

                  {searchData.playlists ? (
                    <NewReleaseTab data={searchData.playlists} type="album" />
                  ) : (
                    <h1 className="text-center text-xl my-6">Không có dữ liệu</h1>
                  )}
                </div>

                {/* Videos */}
                <div className="mt-4">
                  <h1 className="text-2xl lg:text-3xl text-underline tracking-widest font-medium select-none">
                    MV
                  </h1>

                  {searchData.videos ? (
                    <>
                      {/* List Video Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-2 lg:px-0 mt-3">
                        {searchData.videos.map((video) => (
                          // Item Video
                          <div key={video.alias}>
                            {/* Image Video */}
                            <Link to={`/video?id=${video.encodeId}`} className="block">
                              <div>
                                <img
                                  src={video.thumbnailM}
                                  alt={video.alias}
                                  loading="lazy"
                                  className="rounded-lg w-full"
                                />
                              </div>
                            </Link>
                            {/* Video Info */}
                            <div className="text-center">
                              <div className="w-full min-w-0 truncate">
                                <Link
                                  to={`/video?id=${video.encodeId}`}
                                  className="text-2xl font-bolder tracking-normal"
                                >
                                  <h2 className="font-medium text-16 md:text-18 cursor-pointer hover:opacity-60">
                                    {video.title}
                                  </h2>
                                </Link>
                                <p className="text-16 text-gray-600 tracking-wider select-none">
                                  {video.artistsNames}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <h1 className="text-center text-xl my-6">Không có dữ liệu</h1>
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
