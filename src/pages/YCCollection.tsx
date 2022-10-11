import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ycMp3 from '../api/ycmp3Api';
import { AppDispatch } from '../config/store';
import { initSong } from '../reducer/songPlayingSlice';
import { SongPlaying } from '../types';

const YCCollection = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await ycMp3.getYcAlbum();

      setData(res.data);
    };

    fetchData();
  }, []);

  const handlePlayMusic = (item: any) => {
    if (item) {
      const songPlaying: SongPlaying = {
        currentSong: item.link_mp3 as string,
        loading: 'successed',
        currentDetails: {
          artistsNames: item.artistsNames,
          encodeId: item.encodeId,
          thumbnail: item.thumbnail,
          thumbnailM: item.thumbnailM,
          title: item.title,
        },
      };
      dispatch(initSong(songPlaying));
    }
  };

  return (
    <div>
      {data.map((item: any) => (
        <div key={item.encodeId} className="flex flex-col items-center space-y-2 mb-4">
          <div className="flex flex-col items-center">
            <img src={item.thumbnailM} alt="" loading="lazy" width={200} height={200} />
            <h2>{item.title}</h2>
          </div>
          <button className="button" onClick={() => handlePlayMusic(item)}>
            Play
          </button>
        </div>
      ))}
    </div>
  );
};

export default YCCollection;
