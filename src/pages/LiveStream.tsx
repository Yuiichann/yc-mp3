import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { RootState } from '../config/store';

const LiveStream = () => {
  const { liveStream, isLoading } = useSelector((state: RootState) => state.mainInfo);

  console.log(liveStream);
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-slate-200 z-50 animate-show">
      {isLoading ? <Loading /> : <></>}
    </div>
  );
};

export default LiveStream;
