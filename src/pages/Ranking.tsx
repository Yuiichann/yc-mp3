import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ycMp3 from '../api/ycmp3Api';
import { ChartListRanking } from '../components/ChartList';
import LineChart from '../components/LineChart';
import Loading from '../components/Loading';
import { SkeletionChartTop100 } from '../components/Skeleton';
import WeekChart from '../components/WeekChart';
import { RootState } from '../config/store';
import { ChartHome } from '../types';

const Ranking = () => {
  const { isLoading } = useSelector((state: RootState) => state.mainInfo);
  const [chartHome, setChartHome] = useState<ChartHome>();
  const [loadingChartTop, setLoadingChartTop] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res: any = await ycMp3.getCharthome();

      if (res.msg === 'Success') {
        setChartHome(res.data);
      }
      setLoadingChartTop(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <section className="px-1 lg:px-2">
      {loadingChartTop ? (
        <SkeletionChartTop100 />
      ) : (
        <>
          <h2 className="text-4xl font-bold mb-8 mt-2">#chart</h2>
          <div className="w-11/12 mx-auto">
            <LineChart darkColor={true} />
          </div>
          {/* Top 100 */}
          <div className="mt-8">
            {chartHome && <ChartListRanking dataList={chartHome.RTChart.items} />}
          </div>

          {/* WeekChart */}
          <div className="mt-8">
            {chartHome && <WeekChart weekChartData={chartHome.weekChart} />}
          </div>
        </>
      )}
    </section>
  );
};

export default Ranking;
