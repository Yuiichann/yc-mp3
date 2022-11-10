import { memo, useEffect, useState } from 'react';
import weekChartOptions from '../constants/weekChartOptions';
import { ChartHome, WeekChartItem } from '../types';
import { WeekChartList } from './ChartList';
import ImageLazyLoad from './ImageLazyLoad';
import { SkeletionChartTop100 } from './Skeleton';

interface Props {
  weekChartData: ChartHome['weekChart'];
}

type WeekChartOptions = 'vn' | 'us' | 'korea';

const WeekChart = ({ weekChartData }: Props) => {
  const [chartOptions, setChartOptions] = useState<WeekChartOptions>('vn');

  const [currentWeekChart, setCurrentWeekChart] = useState<WeekChartItem>(
    weekChartData[chartOptions]
  );

  //   fake loading
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentWeekChart(weekChartData[chartOptions]);
      setIsLoading(false);
    }, 500);
  }, [chartOptions]);

  // handle click change option week chart
  const handleChangeWeekOption = (options: WeekChartOptions) => {
    if (isLoading) return;

    setChartOptions(options);
  };

  return (
    <>
      {/* Title */}
      <div>
        <h2 className="title font-extrabold text-24 lg:text-32">Bảng Xếp Hạng Tuần</h2>
      </div>

      {/* Week chart options */}
      <ul className="flex items-center mb-6 space-x-8 md:space-x-10 text-20 md:text-24 font-bold tracking-wide">
        {weekChartOptions.map((option) => (
          <li
            key={option.key}
            className={`cursor-pointer relative py-1 select-none ${
              option.key === chartOptions
                ? 'after:absolute after:left-0 after:bottom-0 after:w-full after:h-1 after:bg-secondary'
                : 'opacity-60'
            }`}
            onClick={() => handleChangeWeekOption(option.key as WeekChartOptions)}
          >
            {option.value}
          </li>
        ))}
      </ul>

      {/* Week Chart Data */}
      {isLoading ? (
        <SkeletionChartTop100 />
      ) : (
        <>
          {/* Banner */}
          <div className="my-2 flex items-center justify-center min-h-[150px] lg:min-h-[190px]">
            <ImageLazyLoad
              src={currentWeekChart.banner}
              alt="Week chart banner"
              className="w-full lg:w-10/12 mx-auto"
            />
          </div>

          {/* time */}
          <div className="my-4  ">
            <span className="opacity-80 tracking-wider">
              Tuần {currentWeekChart.week}: {currentWeekChart.startDate} -{' '}
              {currentWeekChart.endDate}
            </span>
          </div>

          {/* Chart list */}
          <div className="my-2">
            <WeekChartList dataList={currentWeekChart.items} />
          </div>
        </>
      )}
    </>
  );
};

export default memo(WeekChart);
