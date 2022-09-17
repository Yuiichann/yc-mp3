import { useSelector } from 'react-redux';
import Slide from '../components/Slide';
import { RootState } from '../config/store';

// Home and Personal
const Home = () => {
  const { banner, isLoading } = useSelector((state: RootState) => state.mainInfo);

  return (
    <div className="px-2">
      {isLoading ? (
        <>
          <div>
            <div className="flex flex-row justify-around animate-pulse">
              <div className="w-80 h-48 bg-slate-300"></div>
              <div className="w-80 h-48 bg-slate-300"></div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <Slide data={banner} />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
