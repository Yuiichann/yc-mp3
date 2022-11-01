import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ycMp3 from './api/ycmp3Api';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import { AppDispatch } from './config/store';
import { setDataOfMainInfo } from './reducer/mainInfoSlice';
import routes from './routes';
import { BannerApi, MainInfoSlider, NewReleaseApi, RoutesProps } from './types';
import alertMessApp from './utils/alertMessApp';
import ScrollTopAction from './utils/ScrollTopAction';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  // call api and set state in main info
  useEffect(() => {
    const getData = async () => {
      const res: any = await ycMp3.getHome({ page: '1' });
      const resAlbumYc: any = await ycMp3.getYcAlbum();

      if (res.msg === 'Success' && resAlbumYc.msg === 'Success') {
        const resItems: any = res.data.items;
        // console.log(resItems);
        const banner = resItems.find((item: any) => item.sectionType === 'banner'); // banner api
        const newRelease = resItems.find((item: any) => item.sectionType === 'new-release'); // new release items
        const artistSpotlight = resItems.find(
          (item: any) => item.sectionType === 'artistSpotlight'
        ); // artist spolight
        const chartData = resItems.find((item: any) => item.sectionType === 'RTChart'); // get data chart
        const weekend: MainInfoSlider = resItems[4]; // weekend items
        const newSongSlider: MainInfoSlider = resItems[6]; // get new song slider
        const top100: MainInfoSlider = resItems[10]; // get top 100

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
            // weekend
            weekend: weekend,
            // new Song
            newSongSlider: newSongSlider,
            // Topp100
            top100: top100,
            // Chart Data
            chart: chartData,
            // Album yc
            albumYc: resAlbumYc.data,

            isLoading: false,
          })
        );
      }
    };

    getData();
  }, []);

  // only alert in production
  if (!process.env.NODE_ENV) {
    alertMessApp();
  }

  return (
    <BrowserRouter>
      {/* Header */}
      <NavBar />

      {/* main section */}
      <div className="mt-navbar py-[32px]">
        <div className="container flex gap-2">
          {/* side bar on left screen */}
          <div className="hidden lg:block min-w-[200px] max-w-[200px] relative">
            <SideBar />
          </div>

          {/* Main content */}
          <div className="flex-grow min-w-0">
            <Routes>
              {routes.map((route: RoutesProps) => (
                <Route path={route.path} element={<route.component />} key={route.title} />
              ))}
            </Routes>
            {/* Action when change route */}
            <ScrollTopAction />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Toastify */}
      <div>
        <ToastContainer autoClose={1200} position="top-center" closeOnClick={true} theme="light" />
      </div>

      {/* Music Player */}
      <MusicPlayer />
    </BrowserRouter>
  );
};

export default App;
