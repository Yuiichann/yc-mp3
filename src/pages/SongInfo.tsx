import { SongApi } from '../types';
import { useState, useEffect } from 'react';
import ycMp3 from '../api/ycmp3Api';
import { useSearchParams } from 'react-router-dom';
import NotFound from './NotFound';
import Loading from '../components/Loading';
import { RiPauseCircleFill, RiPlayFill } from 'react-icons/ri';
import { IoMdHeartEmpty, IoMdHeart, IoMdAddCircleOutline } from 'react-icons/io';
import Lyric from '../components/Lyric';
import { BiHide, BiShow } from 'react-icons/bi';

const SongInfo = () => {
  const [songInfo, setSongInfo] = useState<SongApi>();
  const [isLoading, setIsLoading] = useState(false);
  const [isShowLyric, setIsShowLyric] = useState(true);

  // get ID SONG
  const [searchParams] = useSearchParams();
  const songID = searchParams.get('id');

  // fetch Data Song
  useEffect(() => {
    if (songID) {
      setIsLoading(true);
      const fetchData = async () => {
        const res: any = await ycMp3.getInfoSong({ id: songID });

        if (res.msg === 'Success') {
          setSongInfo(res.data);
        }
        setIsLoading(false);
      };
      fetchData();
    }
  }, []);

  if (!songID) {
    return <NotFound />;
  }

  console.log(songInfo);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        songInfo && (
          <section className="px-1 lg:px-2 mt-10 min-h-[calc(100vh-150px)]">
            <div className="flex justify-center flex-col lg:flex-row space-y-4 lg:space-y-0 lg:justify-start lg:space-x-4">
              {/* banner song */}
              <div className="flex flex-col items-center space-y-4">
                {/* image */}
                <div className="min-w-max shadow-lg">
                  <img
                    src={songInfo.thumbnailM}
                    alt={songInfo.alias}
                    loading="lazy"
                    className="w-[200px] h-[200px] rounded-md"
                  />
                </div>

                {/* Icon */}
                <div className="flex justify-center items-center gap-5 text-3xl">
                  <div className="icon-player text-secondary relative group">
                    <RiPlayFill />

                    <div className="toolip-container">
                      <p>Phát bài hát</p>
                    </div>
                  </div>

                  <div className="icon-player text-secondary relative group">
                    <IoMdAddCircleOutline />

                    <div className="toolip-container">
                      <p>Thêm vào danh sách phát</p>
                    </div>
                  </div>

                  <div className="icon-player text-red-600 relative group">
                    <IoMdHeartEmpty />

                    <div className="toolip-container">
                      <p>Thêm vào yêu thích</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info details */}
              <div className="flex-grow">
                <div className="flex items-center flex-col lg:flex-row text-xl font-normal tracking-wider gap-2 justify-center lg:justify-start mt-2">
                  <h2 className="text-center lg:text-left">{songInfo.title}</h2>
                  <span className="hidden lg:block"> - </span>
                  <p className="text-center lg:text-left">{songInfo.artistsNames}</p>
                </div>

                {/* Lyric */}
                <div
                  className={`effect overflow-y-scroll scrollbar-none mt-6 ${
                    isShowLyric ? 'h-[300px] border border-secondary' : 'h-fit'
                  }`}
                >
                  <div className="flex items-center justify-center lg:justify-start gap-4 sticky top-0 left-0 w-full bg-white pl-4 py-1">
                    {/* Lyric title */}
                    <h2 className="text-center font-semibold text-xl tracking-wide my-2 text-secondar">
                      Lời bài hát
                    </h2>

                    <div
                      className="icon-player text-2xl text-secondary"
                      onClick={() => setIsShowLyric((prev) => !prev)}
                    >
                      {isShowLyric ? <BiHide /> : <BiShow />}
                    </div>
                  </div>

                  {/* Lyric show here */}
                  {isShowLyric && <Lyric encodeId={songInfo.encodeId} />}
                </div>
              </div>
            </div>
          </section>
        )
      )}
    </>
  );
};

export default SongInfo;
