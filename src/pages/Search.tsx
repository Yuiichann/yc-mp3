import React from 'react';
import { useSearchParams } from 'react-router-dom';

const Search = () => {
  let [searchParams] = useSearchParams();

  return <div>Tìm Kiếm: {searchParams.get('keyword')}</div>;
};

export default Search;
