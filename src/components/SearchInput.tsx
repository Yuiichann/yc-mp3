import React, { memo, useState, useRef, useEffect } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineHistory } from 'react-icons/ai';

interface Props {
  isMobile?: boolean;
  handleCloseMenu?: VoidFunction;
}

const SearchInput = ({ isMobile, handleCloseMenu }: Props) => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    const localHistory = localStorage.getItem('__history');

    // if avaialbe, with return data or return []
    if (localHistory) {
      const parserData = JSON.parse(localHistory) as string[];

      return parserData;
    }

    return [];
  });

  // save local when search History change
  useEffect(() => {
    if (searchHistory.length > 0) {
      localStorage.setItem('__history', JSON.stringify(searchHistory));
    }
  }, [searchHistory]);

  //    handle Search
  const handleSearch = () => {
    if (!searchInput) {
      navigate('/tim-kiem');

      // check if menu on mobile open that will close
      if (isMobile && handleCloseMenu) {
        handleCloseMenu();
      }
      return;
    }

    // push key search to arr
    handleChangeHistory();
    // navigate
    navigate(`/tim-kiem?keyword=${encodeURI(searchInput)}`);
    setSearchInput('');
    searchRef.current?.blur();

    // if in mobile, after enter keyword in field search, this will close menu
    if (isMobile && handleCloseMenu) {
      handleCloseMenu();
    }
  };

  // searchHistory only saved 6 keyword latest
  const handleChangeHistory = () => {
    let temp = [...searchHistory]; // covert

    // check keyword trung, neu trung xoa di
    if (temp.includes(searchInput)) {
      const checkIndex = temp.findIndex((item) => item === searchInput);
      temp.splice(checkIndex, 1);
    }

    if (searchHistory.length > 5) {
      temp.splice(temp.length - 1, 1);
    }

    setSearchHistory([searchInput, ...temp]);
  };

  //   hanlde when click enter on input field
  const handleEnterOnInputField = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div
      className="flex flex-row justify-start lg:justify-center items-center py-[4px] px-[8px] rounded-md border border-secondary relative"
      tabIndex={0}
    >
      <BiSearchAlt
        className="cursor-pointer text-[20px] mr-2 text-secondary "
        onClick={handleSearch}
      />
      <input
        type="text"
        ref={searchRef}
        className="outline-none bg-transparent text-primary flex-grow peer"
        placeholder="Tìm kiếm"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyUp={(e) => handleEnterOnInputField(e)}
      />

      {/* Tab History */}
      {searchHistory.length > 0 && (
        <div className="absolute z-10 top-full translate-y-1 left-0 w-full bg-gray-100 rounded-md overflow-hidden shadow-sm border-secondary border hidden peer-focus-visible:block hover:block">
          {/* History content */}
          <div className="flex flex-col text-14">
            {searchHistory.map((key, index) => (
              <Link
                to={`/tim-kiem?keyword=${encodeURI(key)}`}
                key={index}
                className="flex items-center space-x-2 hover:bg-gray-200 p-2"
              >
                <div className="text-16">
                  <AiOutlineHistory />
                </div>

                <div className="truncate">{key}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(SearchInput);
