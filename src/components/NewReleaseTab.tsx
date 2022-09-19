import React, { memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlbumApi, SongApi } from '../types';
import convertDate from '../utils/convertDate';

interface Props {
  data: SongApi[] | AlbumApi[];
  type: 'song' | 'album';
}

const NewReleaseTab = ({ data, type }: Props) => {
  const [loading, setLoading] = useState(true);

  //   fake loading after 400 milisecond will render
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, [type]);

  return loading ? (
    <>
      {/* fake loading */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-4 animate-pulse">
        <div className="p1">
          <div className="w-full h-[150px] md:h-[150px] lg:h-[150px] xl:h-[210px] rounded-md bg-[rgb(0,0,0,0.3)] "></div>
          <div className="w-full rounded-md bg-[rgb(0,0,0,0.3)] h-[30px] mt-1"></div>
        </div>
        <div className="p1">
          <div className="w-full h-[150px] md:h-[150px] lg:h-[150px] xl:h-[210px] rounded-md bg-[rgb(0,0,0,0.3)] "></div>
          <div className="w-full rounded-md bg-[rgb(0,0,0,0.3)] h-[30px] mt-1"></div>
        </div>
        <div className="p1">
          <div className="w-full h-[150px] md:h-[150px] lg:h-[150px] xl:h-[210px] rounded-md bg-[rgb(0,0,0,0.3)] "></div>
          <div className="w-full rounded-md bg-[rgb(0,0,0,0.3)] h-[30px] mt-1"></div>
        </div>{' '}
        <div className="p1">
          <div className="w-full h-[150px] md:h-[150px] lg:h-[150px] xl:h-[210px] rounded-md bg-[rgb(0,0,0,0.3)] "></div>
          <div className="w-full rounded-md bg-[rgb(0,0,0,0.3)] h-[30px] mt-1"></div>
        </div>{' '}
        <div className="p1">
          <div className="w-full h-[150px] md:h-[150px] lg:h-[150px] xl:h-[210px] rounded-md bg-[rgb(0,0,0,0.3)] "></div>
          <div className="w-full rounded-md bg-[rgb(0,0,0,0.3)] h-[30px] mt-1"></div>
        </div>{' '}
        <div className="p1">
          <div className="w-full h-[150px] md:h-[150px] lg:h-[150px] xl:h-[210px] rounded-md bg-[rgb(0,0,0,0.3)] "></div>
          <div className="w-full rounded-md bg-[rgb(0,0,0,0.3)] h-[30px] mt-1"></div>
        </div>{' '}
        <div className="p1">
          <div className="w-full h-[150px] md:h-[150px] lg:h-[150px] xl:h-[210px] rounded-md bg-[rgb(0,0,0,0.3)] "></div>
          <div className="w-full rounded-md bg-[rgb(0,0,0,0.3)] h-[30px] mt-1"></div>
        </div>{' '}
        <div className="p1">
          <div className="w-full h-[150px] md:h-[150px] lg:h-[150px] xl:h-[210px] rounded-md bg-[rgb(0,0,0,0.3)] "></div>
          <div className="w-full rounded-md bg-[rgb(0,0,0,0.3)] h-[30px] mt-1"></div>
        </div>{' '}
        <div className="p1">
          <div className="w-full h-[150px] md:h-[150px] lg:h-[150px] xl:h-[210px] rounded-md bg-[rgb(0,0,0,0.3)] "></div>
          <div className="w-full rounded-md bg-[rgb(0,0,0,0.3)] h-[30px] mt-1"></div>
        </div>{' '}
        <div className="p1">
          <div className="w-full h-[150px] md:h-[150px] lg:h-[150px] xl:h-[210px] rounded-md bg-[rgb(0,0,0,0.3)] "></div>
          <div className="w-full rounded-md bg-[rgb(0,0,0,0.3)] h-[30px] mt-1"></div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 lg:gap-1">
        {data.map((item) => (
          <div className="p-1" key={item.encodeId}>
            <div className="">
              <Link to={`/${type === 'song' ? 'bai-hat' : 'album'}?id=${item.encodeId}`}>
                <img src={item.thumbnailM} alt="" loading="lazy" className="rounded-md mx-auto" />
              </Link>
            </div>
            <div className="mt-1 text-center lg:text-left">
              <div className="w-full min-w-0 truncate my-1">
                <Link to={`/${type === 'song' ? 'bai-hat' : 'album'}?id=${item.encodeId}`}>
                  <h2 className="font-medium text-16 md:text-18 cursor-pointer hover:opacity-60">
                    {item.title}
                  </h2>
                </Link>
              </div>
              <p className="cursor-default">{convertDate(item.releaseDate)}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default memo(NewReleaseTab);
