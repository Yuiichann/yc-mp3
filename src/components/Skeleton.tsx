const SkeletonNewRelease = () => {
  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-4 animate-pulse">
      <div className="p1">
        <div className="w-full h-[150px] md:h-[150px] lg:h-[15  0px] xl:h-[180px] rounded-md bg-[rgb(0,0,0,0.2)] "></div>
        <div className="w-full rounded-md bg-[rgb(0,0,0,0.2)] h-[30px] mt-1"></div>
      </div>
      <div className="p1">
        <div className="w-full h-[150px] md:h-[150px] lg:h-[150px] xl:h-[180px] rounded-md bg-[rgb(0,0,0,0.2)] "></div>
        <div className="w-full rounded-md bg-[rgb(0,0,0,0.2)] h-[30px] mt-1"></div>
      </div>
      <div className="p1">
        <div className="w-full h-[150px] md:h-[150px] lg:h-[150px] xl:h-[180px] rounded-md bg-[rgb(0,0,0,0.2)] "></div>
        <div className="w-full rounded-md bg-[rgb(0,0,0,0.2)] h-[30px] mt-1"></div>
      </div>{' '}
      <div className="p1">
        <div className="w-full h-[150px] md:h-[150px] lg:h-[150px] xl:h-[180px] rounded-md bg-[rgb(0,0,0,0.2)] "></div>
        <div className="w-full rounded-md bg-[rgb(0,0,0,0.2)] h-[30px] mt-1"></div>
      </div>{' '}
      <div className="p1">
        <div className="w-full h-[150px] md:h-[150px] lg:h-[150px] xl:h-[180px] rounded-md bg-[rgb(0,0,0,0.2)] "></div>
        <div className="w-full rounded-md bg-[rgb(0,0,0,0.2)] h-[30px] mt-1"></div>
      </div>{' '}
      <div className="p1">
        <div className="w-full h-[150px] md:h-[150px] lg:h-[150px] xl:h-[180px] rounded-md bg-[rgb(0,0,0,0.2)] "></div>
        <div className="w-full rounded-md bg-[rgb(0,0,0,0.2)] h-[30px] mt-1"></div>
      </div>{' '}
      <div className="p1">
        <div className="w-full h-[150px] md:h-[150px] lg:h-[150px] xl:h-[180px] rounded-md bg-[rgb(0,0,0,0.2)] "></div>
        <div className="w-full rounded-md bg-[rgb(0,0,0,0.2)] h-[30px] mt-1"></div>
      </div>{' '}
      <div className="p1">
        <div className="w-full h-[150px] md:h-[150px] lg:h-[150px] xl:h-[180px] rounded-md bg-[rgb(0,0,0,0.2)] "></div>
        <div className="w-full rounded-md bg-[rgb(0,0,0,0.2)] h-[30px] mt-1"></div>
      </div>{' '}
      <div className="p1">
        <div className="w-full h-[150px] md:h-[150px] lg:h-[150px] xl:h-[180px] rounded-md bg-[rgb(0,0,0,0.2)] "></div>
        <div className="w-full rounded-md bg-[rgb(0,0,0,0.2)] h-[30px] mt-1"></div>
      </div>{' '}
      <div className="p1">
        <div className="w-full h-[150px] md:h-[150px] lg:h-[150px] xl:h-[180px] rounded-md bg-[rgb(0,0,0,0.2)] "></div>
        <div className="w-full rounded-md bg-[rgb(0,0,0,0.2)] h-[30px] mt-1"></div>
      </div>
    </div>
  );
};

const SkeletonSongPlaying = () => {
  return (
    <div className="flex items-center animate-pulse lg:min-w-[350px]">
      <div className="w-[65px] h-[65px] bg-[rgb(0,0,0,0.4)] ml-2 rounded-full"></div>
      <div className="w-[120px] h-[20px] bg-[rgb(0,0,0,0.4)] ml-2 rounded-md"></div>
    </div>
  );
};

const SkeletionPrivateAudio = ({ center }: { center: boolean }) => {
  return (
    <div className={`relative lg:w-6/12 xl:w-4/12 ${center ? 'lg:w-full justify-center' : ''}`}>
      <div
        className={`flex flex-col items-center space-y-4 animate-pulse h-[263px] lg:mt-[65px] lg:sticky lg:top-[150px] left-0 w-full`}
      >
        <div className="w-[130px] h-[130px] bg-[rgb(0,0,0,0.3)] rounded-full"></div>

        <div className="w-5/12 h-[20px] rounded-md bg-[rgb(0,0,0,0.3)]"></div>
        <div className="w-3/12 h-[16px] rounded-md bg-[rgb(0,0,0,0.3)]"></div>
      </div>
    </div>
  );
};

const SkeletionKeyWordTrending = () => {
  return (
    <>
      <div className="flex flex-wrap animate-pulse">
        <div className="px-3 py-2 w-[150px] h-[36px] bg-gray-300 mt-2 mr-2 lg:mr-4 lg:mt-4 flex items-center justify-center gap-2"></div>
        <div className="px-3 py-2 w-[100px] h-[36px] bg-gray-300 mt-2 mr-2 lg:mr-4 lg:mt-4 flex items-center justify-center gap-2"></div>
        <div className="px-3 py-2 w-[120px] h-[36px] bg-gray-300 mt-2 mr-2 lg:mr-4 lg:mt-4 flex items-center justify-center gap-2"></div>
        <div className="px-3 py-2 w-[110px] h-[36px] bg-gray-300 mt-2 mr-2 lg:mr-4 lg:mt-4 flex items-center justify-center gap-2"></div>
      </div>
    </>
  );
};

const SkeletionChartTop100 = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1];
  return (
    <div className="flex flex-col space-y-3 mt-8 animate-pulse">
      {arr.map((item) => (
        <div className="w-full h-[52px] flex items-center space-x-4">
          <div className="w-[50px] min-w-[50px] h-[50px] bg-gray-300 rounded-md"></div>

          <div className="flex flex-col justify-around flex-grow h-full">
            <div className="w-[150px] h-[17px] bg-gray-300 rounded-md"></div>
            <div className="w-[100px] h-[13px] bg-gray-300 rounded-md"></div>
          </div>

          <div className="w-[200px] h-[17px] bg-gray-300 rounded-md"></div>
        </div>
      ))}
    </div>
  );
};

export {
  SkeletonNewRelease,
  SkeletonSongPlaying,
  SkeletionPrivateAudio,
  SkeletionKeyWordTrending,
  SkeletionChartTop100,
};
