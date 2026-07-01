import { Formik } from 'formik';
import { Link } from 'react-router-dom';

import Button from '@/components/ui/buttons/Button';
import AuthContainer from '@/pages/auth/components/AuthContainer';
import AuthForm from '@/pages/auth/components/AuthForm';
import AuthInput from '@/pages/auth/components/AuthInput';
import AuthOr from '@/pages/auth/components/AuthOr';
import AuthSub from '@/pages/auth/components/AuthSub';
import AuthTitle from '@/pages/auth/components/AuthTitle';
import { signUpSchema } from '@/pages/auth/schemas/sign-up.schema';

type PropTypes = {
  handleSubmit: (username: string, password: string) => Promise<void>;
  signUpTitle: string;
  loading: boolean;
};

export default function SignUpForm({
  handleSubmit,
  loading,
  signUpTitle,
}: PropTypes) {
  const initialValues = {
    username: '',
    password: '',
  };

  return (
    <AuthContainer>
      <Formik
        initialValues={initialValues}
        validationSchema={signUpSchema}
        onSubmit={({ username, password }) => handleSubmit(username, password)}
      >
        {({ errors, touched }) => (
          <AuthForm>
            <AuthTitle>{signUpTitle}</AuthTitle>
            <AuthInput
              name="username"
              label="Username"
              type="email"
              placeholder="user@example.com"
              error={!!errors.username}
              touched={touched.username}
              data-test="sign-up-username"
            />
            <AuthInput
              name="password"
              label="Password"
              type="password"
              placeholder="********"
              error={!!errors.password}
              touched={touched.password}
              data-test="sign-up-password"
            />
            <Button
              isLoading={loading}
              innerText={'Submit'}
              colorFill={true}
              data-test="sign-up-submit"
              type="submit"
            />
          </AuthForm>
        )}
      </Formik>
      <AuthOr />
      <AuthSub>
        <p>
          Already have an account?{' '}
          <Link
            className="font-medium text-blue-500"
            to="/auth/sign-in"
            data-test="link-sign-in"
          >
            Sign in
          </Link>
        </p>
      </AuthSub>
    </AuthContainer>
  );
}
