import { useSelector } from 'react-redux';
import NewReleaseTab from '../components/NewReleaseTab';
import Slide from '../components/Slide';
import { RootState } from '../config/store';
import { useState } from 'react';
import Loading from '../components/Loading';

const newReleaseType = [
  {
    type: 'song',
    title: 'Bài hát',
  },
  {
    type: 'album',
    title: 'Album',
  },
];

// Home and Discover
const Home = () => {
  const [typeNewRelease, setTypeNewRelease] = useState<'song' | 'album'>('song');
  const { banner, newRelease, isLoading, error } = useSelector(
    (state: RootState) => state.mainInfo
  );

  // change type of tab new release
  const handleChangeTypeNewRealse = (type: typeof typeNewRelease) => {
    setTypeNewRelease(type);
  };

  // console.log('home-render');

  return (
    <div className="px-1 lg:px-2">
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <div className="pt-1">
            {/* Slider */}
            <Slide data={banner} />

            {/* New Release */}
            <div className="mt-8">
              {/* title */}
              <h1 className="text-2xl font-semibold tracking-widest text-underline">
                {newRelease.title}
              </h1>
              {/* Button change Type */}
              <div className="w-full flex mt-6 justify-center md:gap-6 lg:justify-start lg:gap-0 lg:space-x-8">
                {newReleaseType.map((item) => (
                  <button
                    className={`flex-1 mx-1 lg:mx-0 ${
                      item.type === typeNewRelease ? 'button' : 'button-outline'
                    }`}
                    key={item.type}
                    onClick={() => handleChangeTypeNewRealse(item.type as typeof typeNewRelease)}
                  >
                    {item.title}
                  </button>
                ))}
                {/* New Release List */}
              </div>
              <NewReleaseTab
                type={typeNewRelease}
                data={typeNewRelease === 'song' ? newRelease.song : newRelease.album}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
