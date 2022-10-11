import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import ycMp3 from '../api/ycmp3Api';
import Loading from '../components/Loading';
import { AppDispatch } from '../config/store';
import { fetchDataMp3 } from '../reducer/songPlayingSlice';
import { SongApi } from '../types';
import NotFound from './NotFound';

const SongInfo = () => {
  // get id song on url
  const [song, setSong] = useState<SongApi>();
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const songId = searchParams.get('id');

  // handle call API
  useEffect(() => {
    // if songId is avaiable
    if (songId) {
      setLoading(true);

      // call api info music
      const getData = async () => {
        const res: any = await ycMp3.getInfoSong({ id: songId });

        // if call api sucess, render UI
        if (res.msg === 'Success') {
          setSong(res.data as SongApi);
          console.log(res);
          setLoading(false);
        } else {
          // call fail...
          setLoading(false);
        }
      };
      getData();
    }
  }, [songId]);

  const handlePlaySong = (encodeId?: string) => {
    if (encodeId) {
      dispatch(fetchDataMp3(encodeId));
    }
  };

  // URL failed ==> page not found
  if (!songId) {
    return <NotFound />;
  }

  return (
    <div>
      <div>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="w-56 h-5w-56">
              <img src={song?.thumbnailM} width="100%" height="100%" alt="" />
            </div>
            <h1>{song?.title}</h1>
            <h2>{song?.artistsNames}</h2>
            <button className="button" onClick={() => handlePlaySong(song?.encodeId)}>
              Phát
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SongInfo;
