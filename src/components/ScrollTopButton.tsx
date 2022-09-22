import React, { useState, useEffect } from 'react';
import { BsFillArrowUpSquareFill } from 'react-icons/bs';

//  xau qua nen xoa :3
const ScrollTopButton = () => {
  const [isShow, setIsShow] = useState(false);

  // if scroll over 300 height of window, this will render button scroll to top
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 300) {
        setIsShow(true);
      } else {
        setIsShow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return isShow ? (
    <div className="fixed bottom-[calc(90px+10px)] right-[20px] select-none shadow-sm">
      <div
        className="text-4xl cursor-pointer hover:opacity-80 rounded-full bg-secondary"
        onClick={handleScrollToTop}
      >
        <BsFillArrowUpSquareFill />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ScrollTopButton;
