import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ChartHome from '../components/ChartHome';
import ListGrid from '../components/ListGrid';
import Loading from '../components/Loading';
import { Slider, SliderBanner, SliderSpotlight } from '../components/Slide';
import { RootState } from '../config/store';

const newReleaseType = [
  {
    type: 'vPop',
    title: 'Việt Nam',
  },
  {
    type: 'others',
    title: 'Nước Ngoài',
  },
];

// Home and Discover
const Home = () => {
  const [typeNewRelease, setTypeNewRelease] = useState<'vPop' | 'others'>('vPop');
  const {
    banner,
    newRelease,
    weekend,
    newSongSlider,
    favoriteArtists,
    top100,
    xone,
    artistSpotlight,
    isLoading,
    error,
  } = useSelector((state: RootState) => state.mainInfo);

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
            {/* <Slide data={banner} /> */}
            <div className="min-h-fit overflow-hidden">
              <div className="hidden lg:block">
                <SliderBanner data={banner} />
              </div>
              <div className="block lg:hidden">
                <SliderBanner data={banner} onMobile={true} />
              </div>
            </div>

            {/* New Release */}
            <div className="mt-1">
              {/* title */}
              <h1 className="title-underline">{newRelease.title}</h1>
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
              <ListGrid
                type="song"
                data={typeNewRelease === 'vPop' ? newRelease.vPop : newRelease.others}
              />
            </div>

            {/* Weekend */}
            <div className="mt-8">
              <h1 className="title">{weekend.title}</h1>

              <ListGrid type="playlist" data={weekend.items} />
            </div>

            {/* Favorites Artist */}
            <div className="mt-8">
              <h1 className="title">{favoriteArtists.title}</h1>
              <ListGrid type="playlist" data={favoriteArtists.items} />
            </div>

            {/* New Song Slider */}
            <div className="mt-6">
              <h1 className="title">{newSongSlider.title}</h1>

              <ListGrid type="playlist" data={newSongSlider.items} />
            </div>

            {/* XONE's CORNER */}
            <div className="mt-6">
              <h1 className="title">{xone.title}</h1>

              <ListGrid type="playlist" data={xone.items} />
            </div>

            {/* Chart  */}
            <div className="mt-6">
              <ChartHome />
            </div>

            {/* Top 100  Slider */}
            <div className="mt-6">
              <div className="flex justify-between items-start">
                <h1 className="title-underline">{top100.title}</h1>
                <Link to="/top100" className="text-14 text-primary">
                  Xem tất cả
                </Link>
              </div>

              <div className="block sm:hidden lg:hidden">
                <Slider data={top100.items} slidePerView={3} space={4} navigate={false} />
              </div>
              <div className="hidden sm:block lg:hidden">
                <Slider data={top100.items} slidePerView={4} space={4} navigate={false} />
              </div>
              <div className="hidden lg:block">
                <Slider
                  data={top100.items}
                  slidePerView={top100.items.length < 6 ? top100.items.length : 6}
                />
              </div>
            </div>

            {/* Artist Spotlight */}
            <div className="mt-6">
              <h1 className="title-underline">{artistSpotlight.title}</h1>

              <div className="block sm:hidden lg:hidden">
                <SliderSpotlight
                  data={artistSpotlight.items}
                  slidePerView={3}
                  space={4}
                  navigate={false}
                />
              </div>
              <div className="hidden sm:block lg:hidden">
                <SliderSpotlight
                  data={artistSpotlight.items}
                  slidePerView={4}
                  space={4}
                  navigate={false}
                />
              </div>
              <div className="hidden lg:block">
                <SliderSpotlight
                  data={artistSpotlight.items}
                  slidePerView={artistSpotlight.items.length < 6 ? artistSpotlight.items.length : 6}
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
