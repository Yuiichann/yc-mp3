import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const signUpSchema = yup.object().shape({
  email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc.'),
  password: yup
    .string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự!')
    .max(18, 'Mật khẩu không vượt quá 18 ký tự!')
    .matches(passwordRules, {
      message: 'Password phải có ít nhất 1 ký tự thường, 1 ký tự in hoa và 1 chữ số!',
    })
    .required('Mật khẩu là bắt buộc.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Mật khẩu không trùng khớp!')
    .required('Bắt buộc nhập.'),
});

export const signInSchema = yup.object().shape({
  email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc.'),
  password: yup.string().required('Mật khẩu là bắt buộc.'),
});
