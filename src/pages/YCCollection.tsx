import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ycMp3 from '../api/ycmp3Api';
import { AppDispatch } from '../config/store';
import { fetchYcCollection } from '../reducer/songPlayingSlice';

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
      dispatch(fetchYcCollection(item.encodeId as string));
    }
  };

  return (
    <div className="flex gap-4 items-center">
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
