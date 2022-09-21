import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

const NotFound = () => {
  // fake loading
  const [delay, setDelay] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setDelay(false);
    }, 500);
  }, []);
  return delay ? (
    <Loading />
  ) : (
    <div className="text-center text-2xl h-[calc(100vh-150px)]">
      <h1 className="font-semibold mt-12 mb-8 tracking-wider">Trang không tìm thấy</h1>
      <Link to="/" className="text-xl text-underline">
        Về trang chủ
      </Link>
    </div>
  );
};

export default NotFound;
