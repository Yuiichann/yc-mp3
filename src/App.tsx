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
import { BannerApi, NewReleaseApi, RoutesProps } from './types';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  // call api and set state in main info
  useEffect(() => {
    const getData = async () => {
      const res: any = await ycMp3.getHome({ page: '1' });

      if (res.msg === 'Success') {
        const resItems: any = res.data.items;
        // console.log(resItems);
        const banner = resItems.find((item: any) => item.sectionType === 'banner'); // banner api
        const newRelease = resItems.find((item: any) => item.sectionType === 'new-release');

        dispatch(
          setDataOfMainInfo({
            // set data banner
            banner: banner.items as BannerApi[],
            // set data newRelease
            newRelease: {
              title: newRelease.title || '',
              ...newRelease.items[0],
            } as NewReleaseApi,

            isLoading: false,
          })
        );
      }
    };

    getData();
  }, []);

  return (
    <BrowserRouter>
      {/* Toastify */}
      <ToastContainer autoClose={1200} />

      {/* Header */}
      <NavBar />

      {/* main section */}
      <div className="mt-navbar py-8">
        <div className="container flex gap-2">
          {/* side bar on left screen */}
          <div className="hidden lg:block min-w-[200px] max-w-[200px]">
            <SideBar />
          </div>

          {/* Main content */}
          <div className="flex-grow min-w-0">
            <Routes>
              {routes.map((route: RoutesProps) => (
                <Route path={route.path} element={<route.component />} key={route.title} />
              ))}
            </Routes>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Music Player */}
      <MusicPlayer />
    </BrowserRouter>
  );
};

export default App;
