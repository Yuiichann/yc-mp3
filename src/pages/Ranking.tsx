import React, { useEffect, useState } from 'react';
import ycMp3 from '../api/ycmp3Api';
import Loading from '../components/Loading';
import Slide from '../components/Slide';
import { BannerApi, DataRanking } from '../types';

const Ranking = () => {
  const [dataRanking, setDataRanking] = useState<DataRanking[]>();
  const [isLoading, setIsLoading] = useState(false);

  // fetch data top100
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const res: any = await ycMp3.getTop100();

      if (res.msg === 'Success') {
        // set data for state
        setDataRanking(res.data as DataRanking[]);
      } else {
        console.error('Không có dữ liệu');
      }

      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : dataRanking && dataRanking?.length > 0 ? (
        <>
          <section className="px-1 lg:px-2">
            {dataRanking.map((dataItem, index) => (
              <div className="mb-8" key={index}>
                <div className="w-full mb-4 flex items-center justify-center md:justify-start">
                  <h1 className="text-underline text-2xl font-semibold tracking-wider text-center ">
                    {dataItem.title}
                  </h1>
                </div>
                <Slide data={dataItem.items} isRanking={true} />
              </div>
            ))}
          </section>
        </>
      ) : (
        <>
          <h1>Khong co du lieu</h1>
        </>
      )}
    </>
  );
};

export default Ranking;
