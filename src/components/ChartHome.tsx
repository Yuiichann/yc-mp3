import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../config/store';
import { ChartlistHome } from './ChartList';
import LineChart from './LineChart';

const ChartHome = () => {
  const { chart } = useSelector((state: RootState) => state.mainInfo);

  return (
    <div className="bg-chartbg py-4 px-3 rounded-2xl">
      <div>
        <Link
          to="/bxh"
          className="text-white font-semibold text-28 mb-2 block text-center lg:text-left"
        >
          Top Chart
        </Link>
      </div>

      <div className="flex flex-col-reverse lg:flex-row items-start text-white gap-4 lg:gap-0">
        <div className="w-full lg:w-4/12">
          <ChartlistHome dataList={chart.items} />
        </div>
        <div className="w-full lg:w-8/12">
          <LineChart />
        </div>
      </div>
    </div>
  );
};

export default ChartHome;
