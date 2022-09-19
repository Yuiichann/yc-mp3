import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ycMp3 from '../api/ycmp3Api';
import Loading from '../components/Loading';
import { SongApi } from '../types';

const SongInfo = () => {
  // get id song on url
  const [song, setSong] = useState<SongApi>();
  const [linkSong, setLinkSong] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
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
          setLoading(false);
        } else {
          // call fail...
          setLoading(false);
        }
      };
      getData();
    }
  }, [songId]);

  useEffect(() => {
    setLinkSong('');
    if (songId) {
      const getData = async () => {
        const res: any = await ycMp3.getSong({ id: songId });

        if (res.msg === 'Success') {
          setLinkSong(res.data[128]);
        } else {
          console.error({ msg: 'Lỗi khi lấy dữ liệu nhạc!!', error: res.msg });
        }
      };
      getData();
    }
  }, [songId]);

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

            {linkSong && (
              <audio controls>
                <source src={linkSong} />
              </audio>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SongInfo;
