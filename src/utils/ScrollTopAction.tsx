import React from 'react';
import { useLocation } from 'react-router-dom';

const ScrollTopAction = () => {
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return <></>;
};

export default React.memo(ScrollTopAction);
