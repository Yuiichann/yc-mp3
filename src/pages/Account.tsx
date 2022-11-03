import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import ProtectedLayout from '../components/ProtectedLayout';
import { auth } from '../config/firebase';

const Account = () => {
  const [user] = useAuthState(auth);
  const [loadingSignOut, setLoadingSignOut] = useState(false);

  const handleSignOut = () => {
    setLoadingSignOut(true);
    setTimeout(() => {
      signOut(auth);
      setLoadingSignOut(false);
    }, 1000);
  };
  return (
    <ProtectedLayout>
      <div>
        <div className="title">Hello, {user?.displayName || user?.email}</div>

        <button onClick={handleSignOut} className="button-lg">
          Sign out
        </button>
        {loadingSignOut && <h1>Loading .... </h1>}
      </div>
    </ProtectedLayout>
  );
};

export default Account;
