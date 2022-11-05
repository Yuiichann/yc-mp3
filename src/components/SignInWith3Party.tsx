import { memo } from 'react';
import { useSignInWithFacebook, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { AiOutlineLoading } from 'react-icons/ai';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { auth } from '../config/firebase';

export const GoogleSignIn = memo(() => {
  // sign in with google
  const [signInWithGoogle, userGoogle, loadingGoogle, errorGoogle] = useSignInWithGoogle(auth);

  // handle when login
  const handleSignInWithGoogle = async () => {
    await signInWithGoogle();
  };
  return (
    <>
      {/* google button login */}
      <div className="signin-button border-red-600" onClick={handleSignInWithGoogle}>
        <div className="text-20">
          {loadingGoogle ? <AiOutlineLoading className="animate-spin" /> : <FcGoogle />}
        </div>
        <h4 className="uppercase flex-grow text-center font-semibold tracking-wide">
          đăng nhập với google
        </h4>
      </div>

      {/* Alert Error */}
      {errorGoogle && (
        <p className="my-3 text-14 text-center text-red-600">{errorGoogle.message}</p>
      )}
    </>
  );
});

export const FacebookSignIn = memo(() => {
  // sign in with facebook
  const [signInWithFb, user, loading, error] = useSignInWithFacebook(auth);

  // handle when login
  const handleSignInWithGoogle = async () => {
    await signInWithFb();
  };
  return (
    <>
      {/* facebook button login */}
      <div className="signin-button border-primary" onClick={handleSignInWithGoogle}>
        <div className="text-20">
          {loading ? <AiOutlineLoading className="animate-spin" /> : <FaFacebook />}
        </div>
        <h4 className="uppercase flex-grow text-center font-semibold tracking-wide">
          đăng nhập với facebook
        </h4>
      </div>

      {/* Alert Error */}
      {error && <p className="my-3 text-14 text-center text-red-600">{error.message}</p>}
    </>
  );
});
