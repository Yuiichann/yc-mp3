import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import routes from './routes';
import { RoutesProps } from './types';

const App = () => {
  
  return (
    <BrowserRouter>
      {/* Toastify */}
      <ToastContainer autoClose={1200} />

      {/* Header */}
      <NavBar />

      {/* main section */}
      <div className="mt-navbar py-4 h-[1500px]">
        <div className="container flex">
          <div className="hidden lg:flex w-[240px] ">
            <SideBar />
          </div>

          <div className="flex-grow">
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
