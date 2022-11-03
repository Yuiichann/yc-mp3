import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import Loading from './Loading';

interface Props {
  children: JSX.Element;
}

const ProtectedLayout = ({ children }: Props) => {
  const [user, loading, __error] = useAuthState(auth);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/dang-nhap" />;
  }

  return children;
};

export default ProtectedLayout;

export const BlockedLayout = ({ children }: Props) => {
  const [user, loading, __error] = useAuthState(auth);

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return <Navigate to="/tai-khoan" />;
  }

  return children;
};
