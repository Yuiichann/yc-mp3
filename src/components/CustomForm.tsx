import { Form, Formik, FormikHelpers } from 'formik';
import { memo } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { signInSchema, signUpSchema } from '../schema/yupSchema';
import CustomInput from './CustomInput';
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import { AiOutlineLoading } from 'react-icons/ai';
import { FacebookSignIn, GoogleSignIn } from './SignInWith3Party';

interface SignUpValues {
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignInValues {
  email: string;
  password: string;
}

const initialValuesSignIn: SignInValues = {
  email: '',
  password: '',
};

const initialValuesSignUp: SignUpValues = {
  email: '',
  password: '',
  confirmPassword: '',
};

export const FormSignUp = memo(() => {
  const [createUser, user, loading, error] = useCreateUserWithEmailAndPassword(auth);

  // handle submit
  const handleSubmit = async (values: SignUpValues, actions: FormikHelpers<SignUpValues>) => {
    await createUser(values.email, values.password);

    // reset form when sign up successfully
    actions.setValues({ email: values.email, password: '', confirmPassword: '' });
    actions.setFieldTouched('password', false);
    actions.setSubmitting(false);
  };

  return (
    <>
      {/* formik */}
      <Formik
        initialValues={initialValuesSignUp}
        onSubmit={handleSubmit}
        validationSchema={signUpSchema}
      >
        {(props) => (
          <Form autoComplete="off">
            <CustomInput
              label="Email"
              type="text"
              name="email"
              placeholder="Nhập Email"
              id="email"
            />

            <CustomInput
              label="Mật khẩu"
              type="password"
              name="password"
              placeholder="Nhập mật khẩu"
              id="pwd"
            />
            <CustomInput
              label="Nhập lại mật khẩu"
              type="password"
              name="confirmPassword"
              placeholder="Xác nhận mật khẩu"
              id="re-pwd"
            />

            {/* alert error firebase */}
            {error && <p className="my-3 text-14 text-center text-red-600">{error.message}</p>}

            <button
              type="submit"
              className={`button-full ${props.isSubmitting ? 'bg-gray-300 hover:opacity-100' : ''}`}
              disabled={props.isSubmitting}
            >
              Đăng Ký
            </button>
          </Form>
        )}
      </Formik>

      {/* link */}
      <p className="mt-5 text-14 text-center">
        Đã có tải khoản?
        <Link to="/dang-nhap" className="inline-block ml-1 text-primary">
          Đăng nhập
        </Link>
      </p>
    </>
  );
});

export const FormSignIn = memo(() => {
  // sign in with email and password
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

  // handle submit
  const handleSubmit = async (values: SignInValues, actions: FormikHelpers<SignInValues>) => {
    await signInWithEmailAndPassword(values.email, values.password);

    // login failed, remove password
    actions.setValues({ email: values.email, password: '' });
    actions.setFieldTouched('password', false);
    actions.setSubmitting(false);
  };

  return (
    <>
      <Formik
        initialValues={initialValuesSignIn}
        onSubmit={handleSubmit}
        validationSchema={signInSchema}
      >
        {(props) => (
          <Form autoComplete="off">
            <CustomInput
              label="Email"
              name="email"
              id="email"
              type="text"
              placeholder="Nhập Email"
            />
            <CustomInput
              label="Password"
              name="password"
              id="pwd"
              type="password"
              placeholder="Nhập Password"
            />

            {/* alert error firebase */}
            {error && <p className="my-3 text-14 text-center text-red-600">{error.message}</p>}

            <button
              type="submit"
              className={`button-full ${props.isSubmitting ? 'bg-gray-300 hover:opacity-100' : ''}`}
              disabled={props.isSubmitting}
            >
              Đăng nhập
            </button>
          </Form>
        )}
      </Formik>

      <p className="my-4 text-14 text-center">
        Chưa có tải khoản?
        <Link to="/dang-ky" className="inline-block ml-1 text-primary">
          Đăng ký
        </Link>
      </p>

      <div className="text-center font-semibold tracking-wider mb-4">HOẶC</div>

      <div>
        <GoogleSignIn />
      </div>

      <div className='my-3'>
        <FacebookSignIn />
      </div>
    </>
  );
});
