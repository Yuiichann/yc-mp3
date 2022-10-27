import { useSelector } from 'react-redux';
import ListGrid from '../components/ListGrid';
import Loading from '../components/Loading';
import { RootState } from '../config/store';

const YCCollection = () => {
  const { albumYc, isLoading } = useSelector((state: RootState) => state.mainInfo);

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
