import { SongApi } from '../types';

// handle data ==> return dataset
const handleDataset = (dataChart: any, totalScore: number, songs: SongApi[]) => {
  //   get keys of object ==> array
  const keys = Object.keys(dataChart);

  //   key is encodeId
  const datasets = keys.map((key, index) => {
    const songDetail = songs.find((song) => song.encodeId === key);
    const label = songDetail ? songDetail.title : key;

    // get data counter of chart
    const data = dataChart[key].map((item: any) => {
      const score = item.counter as number;

      return score;
    });

    const borderColor = index === 0 ? '#FFD700' : index === 1 ? '#50e3c2' : '#e35050';

    return {
      label,
      data,
      borderColor,
      backgroundColor: borderColor,
      fill: false,
      tension: 0.5,
      borderWidth: 2,
      pointBorderWidth: 3,
      pointRadius: 3,
      pointHoverBackgroundColor: borderColor,
      pointHoverBorderColor: borderColor,
      pointHoverBorderWidth: 3,
      pointHoverRadius: 5.5,
      hoverRadius: 12,
      oder: 2,
      hoverBorderWidth: 3,
    };
  });

  // return data
  return datasets;
};

export default handleDataset;
