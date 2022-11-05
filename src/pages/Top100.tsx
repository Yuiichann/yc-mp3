import { useEffect, useState } from 'react';
import ycMp3 from '../api/ycmp3Api';
import ListGrid from '../components/ListGrid';
import { SkeletonNewRelease } from '../components/Skeleton';
import { MainInfoSlider } from '../types';

const Top100 = () => {
  const [dataTop100, setDataTop100] = useState<MainInfoSlider[]>();
  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res: any = await ycMp3.getTop100();

      if (res.msg === 'Success') {
        setDataTop100(res.data);
      } else {
        console.error('Page Top 100: Data not found!');
      }
      setLoadingPage(false);
    };
    fetchData();
  }, []);

  console.log(dataTop100);

  return (
    <section className="px-1 lg:px-2">
      <div>
        {/* Nhac Viet Nam */}
        <div className="mt-6">
          <div className="title">Nhạc Việt Nam</div>

          {loadingPage ? (
            <SkeletonNewRelease />
          ) : dataTop100 ? (
            <ListGrid type="playlist" data={dataTop100[1].items} />
          ) : (
            <h1 className="text-center font-medium my-6">Không có dữ liệu</h1>
          )}
        </div>

        {/* Nhạc Châu Á */}
        <div className="mt-6">
          <div className="title">Nhạc Châu Á</div>

          {loadingPage ? (
            <SkeletonNewRelease />
          ) : dataTop100 ? (
            <ListGrid type="playlist" data={dataTop100[2].items} />
          ) : (
            <h1 className="text-center font-medium my-6">Không có dữ liệu</h1>
          )}
        </div>

        {/* Nhạc Âu Mỹ */}
        <div className="mt-6">
          <div className="title">Nhạc Âu Mỹ</div>

          {loadingPage ? (
            <SkeletonNewRelease />
          ) : dataTop100 ? (
            <ListGrid type="playlist" data={dataTop100[3].items} />
          ) : (
            <h1 className="text-center font-medium my-6">Không có dữ liệu</h1>
          )}
        </div>

        {/* Nhạc Hòa Tấu */}
        <div className="mt-6">
          <div className="title">Nhạc Hòa Tấu</div>

          {loadingPage ? (
            <SkeletonNewRelease />
          ) : dataTop100 ? (
            <ListGrid type="playlist" data={dataTop100[4].items} />
          ) : (
            <h1 className="text-center font-medium my-6">Không có dữ liệu</h1>
          )}
        </div>
      </div>
    </section>
  );
};

export default Top100;
