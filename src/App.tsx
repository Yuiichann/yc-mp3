import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'tippy.js/dist/tippy.css';
import ycMp3 from './api/ycmp3Api';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import { AppDispatch, RootState } from './config/store';
import { setDataOfMainInfo, setErrorApp } from './reducer/mainInfoSlice';
import routes from './routes';
import { BannerApi, MainInfoSlider, MainInfoStream, NewReleaseApi, RoutesProps } from './types';
import alertMessApp from './utils/alertMessApp';
import ScrollTopAction from './utils/ScrollTopAction';

const App = () => {
  const { error } = useSelector((state: RootState) => state.mainInfo);
  const dispatch = useDispatch<AppDispatch>();

  // only alert in production
  if (!process.env.NODE_ENV) {
    alertMessApp();
  }

  // handle call api and set state in main state of app
  useEffect(() => {
    const getData = async () => {
      const res: any = await ycMp3.getHome({ page: '1' }).catch((err) => {
        dispatch(setErrorApp(err.message as string));
      });
      const resAlbumYc: any = await ycMp3.getYcAlbum();

      if (res.msg === 'Success' && resAlbumYc.msg === 'Success') {
        const resItems: any = res.data.items;
        console.log(resItems);

        const banner = resItems.find((item: any) => item.sectionType === 'banner'); // banner api
        const newRelease = resItems.find((item: any) => item.sectionType === 'new-release'); // new release items
        const artistSpotlight = resItems.find(
          (item: any) => item.sectionType === 'artistSpotlight'
        ); // artist spolight
        // const xone = resItems.find((item: any) => item.sectionId === 'hXone') as MainInfoSlider; // XONE NE`
        const chartData = resItems.find((item: any) => item.sectionType === 'RTChart'); // get data chart
        // const weekend: MainInfoSlider = resItems[4]; // weekend items
        const favoriteArtists: MainInfoSlider = resItems[5]; // nghe si yeu thichs
        const newSongSlider: MainInfoSlider = resItems[6]; // get new song slider
        const top100: MainInfoSlider = resItems.find((item: any) => item.sectionId === 'h100'); // top 100
        const liveStream: MainInfoStream = resItems.find(
          (item: any) => item.sectionType === 'livestream'
        );

        dispatch(
          setDataOfMainInfo({
            // set data banner
            banner: banner.items as BannerApi[],
            // set data newRelease
            newRelease: {
              title: newRelease.title || '',
              ...newRelease.items,
            } as NewReleaseApi,
            // data artist spotlight
            artistSpotlight: {
              title: 'Spotlight',
              items: artistSpotlight.items,
            },
            favoriteArtists,
            // weekend
            // weekend: weekend,
            // xone la gi ne
            // new Song
            newSongSlider: newSongSlider,
            // Topp100
            top100: top100,
            // Chart Data
            chart: chartData,
            // streaming data a.k.a audio
            liveStream: liveStream,
            // Album yc
            albumYc: resAlbumYc.data,

            isLoading: false,
          })
        );
      }
    };

    getData();
  }, []);

  return (
    <BrowserRouter>
      {/* Header */}
      <NavBar />

      {/* main section */}
      <div className="mt-navbar pt-[32px] min-h-screen bg-[rgb(245,245,245,0.2)]">
        <div className="container flex gap-2">
          {/* side bar on left screen */}
          <div className="hidden lg:block min-w-[200px] max-w-[200px] min-h-screen relative">
            <SideBar />
          </div>

          {/* Main content */}
          {/* check error network */}
          {error?.message ? (
            <div className="min-h-screen flex-grow">
              <h1 className="title mt-12 text-center text-red-500">{error.message}</h1>
              <h2 className="text-center mt-4 italic">
                Please check internet or using VPN to access the app
              </h2>
            </div>
          ) : (
            <div className="flex-grow min-w-0 pb-24">
              <Routes>
                {routes.map((route: RoutesProps) => (
                  <Route path={route.path} element={<route.component />} key={route.title} />
                ))}
              </Routes>
              {/* Action when change route */}
              <ScrollTopAction />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Toastify */}
      <div>
        <ToastContainer
          autoClose={1200}
          position="top-center"
          className="text-center"
          closeOnClick={true}
          theme="light"
        />
      </div>

      {/* Music Player */}
      <MusicPlayer />
    </BrowserRouter>
  );
};

export default App;
