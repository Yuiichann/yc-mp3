import React, { memo, useEffect, useRef, useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SearchInput = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');

  //    handle Search
  const handleSearch = () => {
    if (!searchInput) {
      toast.warning('Bạn chưa nhập gì cả!!');
      return;
    }

    navigate(`/tim-kiem?keyword=${encodeURI(searchInput)}`);
    setSearchInput('');
  };

  //   hanlde when click enter on input field
  const handleEnterOnInputField = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-row justify-start lg:justify-center items-center py-[4px] px-[8px] rounded-md border border-secondary">
      <BiSearchAlt
        className="cursor-pointer text-[20px] mr-2 text-secondary"
        onClick={handleSearch}
      />
      <input
        type="text"
        className="outline-none bg-transparent text-primary flex-grow"
        placeholder="Tìm kiếm"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyUp={(e) => handleEnterOnInputField(e)}
      />
    </div>
  );
};

export default memo(SearchInput);
