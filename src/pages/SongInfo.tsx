import { useEffect, useState } from 'react';
import { IoMdAddCircleOutline, IoMdHeartEmpty } from 'react-icons/io';
import { RiPlayFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ycMp3 from '../api/ycmp3Api';
import Loading from '../components/Loading';
import Lyric from '../components/Lyric';
import { AppDispatch, RootState } from '../config/store';
import { setIsPlaylist } from '../reducer/audioStatus';
import {
  addSongToPlaylist,
  initPrivatePlaylist,
  setPlayBySongIndex,
} from '../reducer/playlistSlice';
import { fetchDataMp3 } from '../reducer/songPlayingSlice';
import { addTempSong } from '../reducer/tempGlobalState';
import { SongApi } from '../types';
import checkSongInList from '../utils/checkSongInList';
import convertDate from '../utils/convertDate';
import NotFound from './NotFound';

const SongInfo = () => {
  const [songInfo, setSongInfo] = useState<SongApi>();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const { songs } = useSelector((state: RootState) => state.playlist);
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

  // handle play song
  const handlePlayCurrentSong = () => {
    if (songInfo) {
      // check if song already in playlist, dispatch index of song
      const checkSongInPlaylist = checkSongInList(songInfo.encodeId, songs.items);
      if (checkSongInPlaylist >= 0) {
        dispatch(setPlayBySongIndex(checkSongInPlaylist));
        return;
      }

      // create const info song
      const songDetail = {
        title: songInfo.title,
        artistsNames: songInfo.artistsNames,
        encodeId: songInfo.encodeId,
        thumbnail: songInfo.thumbnail,
        thumbnailM: songInfo.thumbnailM,
      };

      // if playlist is none (when start app or change each song) ==> init new playlist with one uniqe song
      if (songs.items.length <= 1) {
        dispatch(initPrivatePlaylist(songInfo));
      } else {
        // else, when playlist is avaialbe, play this song
        dispatch(setPlayBySongIndex(-1));
        dispatch(fetchDataMp3(songDetail));
      }
    }
  };

  console.log(songInfo);
  // Handle add song to playlist
  const handleAddToPlaylist = () => {
    if (!songInfo) return;

    // check if song in playlist, alert and return
    const findSong = songs.items.find((song) => song.encodeId === songInfo.encodeId);

    if (findSong) {
      toast.info('Bài hát đã trong playlist');
      return;
    }

    // if playlist none, init playlist true
    if (songs.items.length <= 1) {
      dispatch(setIsPlaylist(true));

      // listen when not song is play and user click add song to empty playlist ==> hat bai dau
      if (songs.items.length === 0) {
        dispatch(setPlayBySongIndex(0));
      }
    }
    // dispatch action add song to playlist
    dispatch(addSongToPlaylist(songInfo));
    toast.success('Đã thêm vào danh sách phát');
  };

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

                {/* Icon */}
                <div className="flex justify-center items-center gap-5 text-3xl">
                  <div
                    className="icon-player text-secondary relative group"
                    onClick={handlePlayCurrentSong}
                  >
                    <RiPlayFill />

                    <div className="toolip-container">
                      <p>Phát bài hát</p>
                    </div>
                  </div>

                  <div
                    className="icon-player text-secondary relative group"
                    onClick={handleAddToPlaylist}
                  >
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
