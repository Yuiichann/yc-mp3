import React from 'react';
import { BsFillArrowUpSquareFill } from 'react-icons/bs';

const ScrollTopButton = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-[30px] right-[30px] select-none shadow-sm">
      <div
        className="text-4xl cursor-pointer hover:opacity-80 rounded-full bg-secondary"
        onClick={handleScrollToTop}
      >
        <BsFillArrowUpSquareFill />
      </div>
    </div>
  );
};

export default ScrollTopButton;
