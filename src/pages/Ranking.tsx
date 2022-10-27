import { useSelector } from 'react-redux';
import ChartList from '../components/ChartList';
import LineChart from '../components/LineChart';
import Loading from '../components/Loading';
import { RootState } from '../config/store';
import { useState, useEffect } from 'react';

const Ranking = () => {
  const { isLoading, chart } = useSelector((state: RootState) => state.mainInfo);

  const [data, setData] = useState();
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {});

  return isLoading ? (
    <Loading />
  ) : (
    <section className="px-1 lg:px-2">
      <h2 className="text-4xl font-bold mb-8 mt-2">#chart</h2>
      <div className="w-11/12 mx-auto">
        <LineChart darkColor={true} />
      </div>

      {loading ? (
        <></>
      ) : (
        <div className="mt-4">
          <ChartList dataList={chart.items} type="bxh" />
        </div>
      )}
    </section>
  );
};

export default Ranking;
