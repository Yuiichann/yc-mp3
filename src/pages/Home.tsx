import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slide from '../components/Slide';
import { RootState } from '../config/store';

// Home and Discover
const Home = () => {
  const { banner, newRelease, isLoading, error } = useSelector(
    (state: RootState) => state.mainInfo
  );

  return (
    <div className="px-1 lg:px-2">
      {isLoading ? (
        <>
          <h1>Loading ....</h1>
        </>
      ) : (
        <>
          <div className="flex flex-col pt-1 space-y-10">
            <div>
              <Slide data={banner} />
            </div>

            <div>
              <div className="text-3xl font-bold py-2 tracking-wider">
                <h1>{newRelease.title}</h1>
              </div>
              {newRelease.song.map((item) => (
                <div key={item.alias}>
                  <Link to={`/bai-hat?id=${item.encodeId}`}>{item.title}</Link>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
