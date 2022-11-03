import { memo } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { AiOutlineLoading } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { auth } from '../config/firebase';

const GoogleSignIn = () => {
  // sign in with google
  const [signInWithGoogle, userGoogle, loadingGoogle, errorGoogle] = useSignInWithGoogle(auth);

  // handle when login
  const handleSignInWithGoogle = async () => {
    await signInWithGoogle();
  };
  return (
    <>
      {/* google button login */}
      <div className="google-button" onClick={handleSignInWithGoogle}>
        <div className="text-20">
          {loadingGoogle ? <AiOutlineLoading className="animate-spin" /> : <FcGoogle />}
        </div>
        <h4 className="uppercase font-semibold tracking-wide">đăng nhập với google</h4>
      </div>

      {/* Alert Error */}
      {errorGoogle && (
        <p className="my-3 text-14 text-center text-red-600">{errorGoogle.message}</p>
      )}
    </>
  );
};

export default memo(GoogleSignIn);
