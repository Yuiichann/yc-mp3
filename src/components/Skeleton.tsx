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
      <div className="w-[65px] h-[65px] bg-[rgb(0,0,0,0.4)] ml-2 rounded-full"></div>
      <div className="w-[120px] h-[20px] bg-[rgb(0,0,0,0.4)] ml-2 rounded-md"></div>
    </div>
  );
};

const SkeletionPrivateAudio = () => {
  return (
    <div className="lg:w-4/12 flex flex-col items-center space-y-4 animate-pulse h-[263px] lg:mt-[65px]">
      <div className="w-[150px] h-[150px] bg-[rgb(0,0,0,0.3)] rounded-full"></div>

      <div className="w-5/12 h-[20px] rounded-md bg-[rgb(0,0,0,0.3)]"></div>
      <div className="w-3/12 h-[16px] rounded-md bg-[rgb(0,0,0,0.3)]"></div>
    </div>
  );
};

export { SkeletonNewRelease, SkeletonSongPlaying, SkeletionPrivateAudio };
