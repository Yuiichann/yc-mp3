import { useEffect, useState } from 'react';
import { FormSignUp } from '../components/CustomForm';
import Loading from '../components/Loading';
import { BlockedLayout } from '../components/ProtectedLayout';

const SignUp = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  return (
    <BlockedLayout>
      {loading ? (
        <Loading />
      ) : (
        <section className="px-1 lg:px-2">
          <div className="mt-2 h-screen">
            <div className="text-center">
              <h1 className="title uppercase text-primary">đăng ký tài khoản Yc mp3</h1>
            </div>

            {/* Form */}
            <div className="w-10/12 md:w-7/12 lg:w-5/12 mx-auto">
              <FormSignUp />
            </div>
          </div>
        </section>
      )}
    </BlockedLayout>
  );
};

export default SignUp;
