import React from 'react';

const SkeletonNewRelease = () => {
  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-4 animate-pulse">
      <div className="p1">
        <div className="w-full h-[150px] md:h-[150px] lg:h-[150px] xl:h-[210px] rounded-md bg-[rgb(0,0,0,0.2)] "></div>
        <div className="w-full rounded-md bg-[rgb(0,0,0,0.2)] h-[30px] mt-1"></div>
      </div>
      <div className="p1">
        <div className="w-full h-[150px] md:h-[150px] lg:h-[150px] xl:h-[210px] rounded-md bg-[rgb(0,0,0,0.2)] "></div>
        <div className="w-full rounded-md bg-[rgb(0,0,0,0.2)] h-[30px] mt-1"></div>
      </div>
      <div className="p1">
        <div className="w-full h-[150px] md:h-[150px] lg:h-[150px] xl:h-[210px] rounded-md bg-[rgb(0,0,0,0.2)] "></div>
        <div className="w-full rounded-md bg-[rgb(0,0,0,0.2)] h-[30px] mt-1"></div>
      </div>{' '}
      <div className="p1">
        <div className="w-full h-[150px] md:h-[150px] lg:h-[150px] xl:h-[210px] rounded-md bg-[rgb(0,0,0,0.2)] "></div>
        <div className="w-full rounded-md bg-[rgb(0,0,0,0.2)] h-[30px] mt-1"></div>
      </div>{' '}
      <div className="p1">
        <div className="w-full h-[150px] md:h-[150px] lg:h-[150px] xl:h-[210px] rounded-md bg-[rgb(0,0,0,0.2)] "></div>
        <div className="w-full rounded-md bg-[rgb(0,0,0,0.2)] h-[30px] mt-1"></div>
      </div>{' '}
      <div className="p1">
        <div className="w-full h-[150px] md:h-[150px] lg:h-[150px] xl:h-[210px] rounded-md bg-[rgb(0,0,0,0.2)] "></div>
        <div className="w-full rounded-md bg-[rgb(0,0,0,0.2)] h-[30px] mt-1"></div>
      </div>{' '}
      <div className="p1">
        <div className="w-full h-[150px] md:h-[150px] lg:h-[150px] xl:h-[210px] rounded-md bg-[rgb(0,0,0,0.2)] "></div>
        <div className="w-full rounded-md bg-[rgb(0,0,0,0.2)] h-[30px] mt-1"></div>
      </div>{' '}
      <div className="p1">
        <div className="w-full h-[150px] md:h-[150px] lg:h-[150px] xl:h-[210px] rounded-md bg-[rgb(0,0,0,0.2)] "></div>
        <div className="w-full rounded-md bg-[rgb(0,0,0,0.2)] h-[30px] mt-1"></div>
      </div>{' '}
      <div className="p1">
        <div className="w-full h-[150px] md:h-[150px] lg:h-[150px] xl:h-[210px] rounded-md bg-[rgb(0,0,0,0.2)] "></div>
        <div className="w-full rounded-md bg-[rgb(0,0,0,0.2)] h-[30px] mt-1"></div>
      </div>{' '}
      <div className="p1">
        <div className="w-full h-[150px] md:h-[150px] lg:h-[150px] xl:h-[210px] rounded-md bg-[rgb(0,0,0,0.2)] "></div>
        <div className="w-full rounded-md bg-[rgb(0,0,0,0.2)] h-[30px] mt-1"></div>
      </div>
    </div>
  );
};

const SkeletonSongPlaying = () => {
  return (
    <div className="flex items-center animate-pulse">
      <div className="w-[60px] h-[60px] bg-[rgb(0,0,0,0.4)] ml-2 rounded-md"></div>
      <div className="w-[100px] h-[20px] bg-[rgb(0,0,0,0.4)] ml-2 rounded-md"></div>
    </div>
  );
};

export { SkeletonNewRelease, SkeletonSongPlaying };
