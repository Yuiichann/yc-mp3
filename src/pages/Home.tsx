import { useSelector } from 'react-redux';
import NewReleaseTab from '../components/NewReleaseTab';
import Slide, { Slider } from '../components/Slide';
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
  const { banner, newRelease, weekend, newSongSlider, top100, isLoading, error } = useSelector(
    (state: RootState) => state.mainInfo
  );

  // change type of tab new release
  const handleChangeTypeNewRealse = (type: typeof typeNewRelease) => {
    setTypeNewRelease(type);
  };

  // console.log('home-render');

  return (
    <section className="px-1 lg:px-2">
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

            {/* Weekend */}
            <div className="mt-8">
              <h1 className="text-2xl font-semibold tracking-widest text-underline mb-2">
                {weekend.title}
              </h1>

              <div className="block lg:hidden">
                <Slider data={weekend.items} slidePerView={4} space={4} navigate={false} />
              </div>
              <div className="hidden lg:block">
                <Slider
                  data={weekend.items}
                  slidePerView={weekend.items.length < 6 ? weekend.items.length : 6}
                />
              </div>
            </div>

            {/* New Song Slider */}
            <div className="mt-6">
              <h1 className="text-2xl font-semibold tracking-widest text-underline mb-2">
                {newSongSlider.title}
              </h1>

              <div className="block lg:hidden">
                <Slider data={newSongSlider.items} slidePerView={4} space={4} navigate={false} />
              </div>

              <div className="hidden lg:block">
                <Slider
                  data={newSongSlider.items}
                  slidePerView={newSongSlider.items.length < 6 ? newSongSlider.items.length : 6}
                />
              </div>
            </div>

            {/* Top 100  Slider */}
            <div className="mt-6">
              <h1 className="text-2xl font-semibold tracking-widest text-underline mb-2">
                {top100.title}
              </h1>

              <div className="block lg:hidden">
                <Slider data={top100.items} slidePerView={4} space={4} navigate={false} />
              </div>

              <div className="hidden lg:block">
                <Slider
                  data={top100.items}
                  slidePerView={top100.items.length < 6 ? top100.items.length : 6}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Home;
