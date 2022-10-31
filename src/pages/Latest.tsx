import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import NewReleaseTab from '../components/ListGrid';
import { RootState } from '../config/store';

// Nhạc & Album Mới Nhất
const Latest = () => {
  const location = useLocation();
  const { isLoading, newRelease, error } = useSelector((state: RootState) => state.mainInfo);

  // check url is song or album latest
  const checkTypeOfRoute = () => {
    if (location.pathname === '/nhac-moi-nhat') {
      return 'song';
    } else {
      return 'album';
    }
  };

  // check error
  if (error) {
    console.error(error.message);
  }

  return (
    <div className="mt-1">
      <h1 className="mx-auto text-3xl text-underline">Mới cập nhật</h1>
      {isLoading ? (
        <Loading />
      ) : (
        <NewReleaseTab
          type={checkTypeOfRoute()}
          data={checkTypeOfRoute() === 'song' ? newRelease.vPop : newRelease.others}
        />
      )}
    </div>
  );
};

export default Latest;
