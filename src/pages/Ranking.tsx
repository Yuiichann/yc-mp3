import React, { useState, useEffect } from 'react';
import ycMp3 from '../api/ycmp3Api';
import Loading from '../components/Loading';
import NewReleaseTab from '../components/NewReleaseTab';
import { AlbumApi } from '../types';

//  Page Bảng xếp hạng
const Ranking = () => {
  const [rankingData, setRankingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res: any = await ycMp3.getTop100();

      if (res.msg === 'Success') {
        setRankingData(res.data);
      } else {
        console.error(res.msg);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* {isLoading ? (
        <Loading />
      ) : (
        <>
          {rankingData.map((item: any) => (
            <div>
              <h1>{item.genre.name}</h1>
              <NewReleaseTab data={item.items as AlbumApi[]} type="playlist" />
            </div>
          ))}
        </>
      )} */}
    </div>
  );
};

export default Ranking;
