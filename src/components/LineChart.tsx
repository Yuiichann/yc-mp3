import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { memo, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { RootState } from '../config/store';
import { darkLineChartOptions, lineChartOptions } from '../constants/lineChartOptions';
import handleDataset from '../utils/handleDataset';

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: string[];
  }[];
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Props {
  darkColor?: boolean;
}

const LineChart = ({ darkColor }: Props) => {
  const { chart, isLoading } = useSelector((state: RootState) => state.mainInfo);
  const [data, setData] = useState<ChartData>();

  useEffect(() => {
    // check chart not empty
    if (Object.keys(chart).length > 0) {
      // get RTChart
      const RTChart = chart.chart;

      //   get label times and handle datasets
      const labels = RTChart.times.map((item) => `${item.hour}:00`);
      const datasets = handleDataset(RTChart.items, RTChart.totalScore, chart.items);

      //   set chart data
      setData({
        labels,
        datasets,
      } as ChartData);
    }
  }, [chart]);

  return isLoading ? (
    <div>Loading .. . </div>
  ) : (
    <>
      <div>
        {data && <Line data={data} options={darkColor ? darkLineChartOptions : lineChartOptions} />}
      </div>
    </>
  );
};

export default memo(LineChart);
