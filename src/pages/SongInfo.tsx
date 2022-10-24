import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import ycMp3 from '../api/ycmp3Api';
import AudioHandler from '../components/AudioHandler';
import Loading from '../components/Loading';
import Lyric from '../components/Lyric';
import { AppDispatch, RootState } from '../config/store';
import { addTempSong } from '../reducer/tempGlobalState';
import { SongApi } from '../types';
import convertDate from '../utils/convertDate';
import NotFound from './NotFound';

const SongInfo = () => {
  const [songInfo, setSongInfo] = useState<SongApi>();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const { temp_songs } = useSelector((state: RootState) => state.tempGlobalState);

  // get ID SONG
  const [searchParams] = useSearchParams();
  const songID = searchParams.get('id');

  // check song maybe save in temp state
  const tempSongSaved = temp_songs.find((song) => song.encodeId === songID);

  // fetch Data Song
  useEffect(() => {
    if (songID) {
      setIsLoading(true);

      // check in temp
      if (!tempSongSaved) {
        const fetchData = async () => {
          const res: any = await ycMp3.getInfoSong({ id: songID });

          if (res.msg === 'Success') {
            dispatch(addTempSong(res.data));
            setSongInfo(res.data);
          }
          setIsLoading(false);
        };
        fetchData();
      } else {
        setSongInfo(tempSongSaved);
        setTimeout(() => {
          setIsLoading(false);
        }, 200);
      }
    }
  }, [songID]);

  if (!songID) {
    return <NotFound />;
  }

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

                {/* Icon Audio handler */}
                <AudioHandler songInfo={songInfo} component="SongInfo" />
              </div>

              {/* Info details */}
              <div className="flex-grow">
                <div className="flex items-center flex-col lg:flex-row text-xl font-normal tracking-wider gap-2 justify-center flex-wrap lg:justify-start mt-2">
                  <h2 className="text-center lg:text-left font-medium">{songInfo.title}</h2>
                  <span className="hidden lg:block"> - </span>
                  <p className="text-center lg:text-left font-medium">{songInfo.artistsNames}</p>
                </div>

                {songInfo.releaseDate && (
                  <div className="mt-4">
                    <h5 className="text-center lg:text-left italic">
                      Ngày phát hành: {convertDate(songInfo.releaseDate)}
                    </h5>
                  </div>
                )}

                <div className="flex space-x-0 lg:space-x-4 mt-4 flex-col lg:flex-row space-y-2 lg:space-y-0">
                  <h2 className="text-center italic">Ca sĩ trình bày:</h2>
                  <div className="flex flex-wrap items-center justify-center lg:justify-start space-x-4">
                    {songInfo.artists.map((artist) => (
                      <Link
                        key={artist.id}
                        to={`/ca-si?name=${artist.alias}`}
                        className="flex items-center flex-col space-y-2 text-12 truncate"
                      >
                        <img
                          src={artist.thumbnailM}
                          alt={artist.alias}
                          loading="lazy"
                          width={60}
                          height={60}
                          className="shadow-sm"
                        />
                        <h2>{artist.name}</h2>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Lyric */}
            <div className={`effect overflow-y-scroll scrollbar-none mt-6 h-[500px] bg-slate-100`}>
              <div className="flex items-center justify-center lg:justify-start gap-4 sticky top-0 left-0 w-full bg-white lg:pl-4 py-1">
                {/* Lyric title */}
                <h2 className="text-center font-semibold text-xl tracking-wide my-2 text-secondar">
                  Lời bài hát
                </h2>
              </div>

              {/* Lyric show here */}
              <Lyric encodeId={songInfo.encodeId} />
            </div>
          </section>
        )
      )}
    </>
  );
};

export default SongInfo;
