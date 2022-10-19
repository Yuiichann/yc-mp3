import { SongApi } from '../types';
import { useState, useEffect } from 'react';
import ycMp3 from '../api/ycmp3Api';
import Loading from '../components/Loading';
import ListGrid from '../components/ListGrid';

const YCCollection = () => {
  const [albumYc, setAlbumYc] = useState<SongApi[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res: any = await ycMp3.getYcAlbum();

      if (res.msg === 'Success') {
        setAlbumYc(res.data);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <section className="px-1 lg:px-2">
      <div className="flex items-center justify-center mt-2">
        <h1 className="title-underline">Bộ Sưu Tập Của YC MP3</h1>
      </div>
      {albumYc && <ListGrid type="song" data={albumYc} />}
    </section>
  );
};

export default YCCollection;
