import { Formik } from 'formik';
import { Link } from 'react-router-dom';

import Button from '@/components/ui/actions/Button';
import AuthContainer from '@/pages/auth/components/AuthContainer';
import AuthForm from '@/pages/auth/components/AuthForm';
import AuthInput from '@/pages/auth/components/AuthInput';
import AuthOr from '@/pages/auth/components/AuthOr';
import AuthSub from '@/pages/auth/components/AuthSub';
import AuthTitle from '@/pages/auth/components/AuthTitle';
import { signInSchema } from '@/pages/auth/schemas/sign-in.schema';

type PropTypes = {
  handleSubmit: (username: string, password: string) => Promise<void>;
  loading: boolean;
};
export default function SignInForm({ handleSubmit, loading }: PropTypes) {
  const initialValues = {
    username: '',
    password: '',
  };

  return (
    <AuthContainer>
      <Formik
        initialValues={initialValues}
        validationSchema={signInSchema}
        onSubmit={({ username, password }) => handleSubmit(username, password)}
      >
        {({ errors, touched }) => (
          <AuthForm>
            <AuthTitle>Sign In</AuthTitle>
            <AuthInput
              label="Username"
              name="username"
              type="email"
              placeholder="user@example.com"
              error={!!errors.username}
              touched={touched.username}
              data-test="sign-in-username"
            />
            <AuthInput
              label="Password"
              name="password"
              type="password"
              placeholder="********"
              error={!!errors.password}
              touched={touched.password}
              data-test="sign-in-password"
            />
            <Button
              isLoading={loading}
              innerText={'Submit'}
              colorFill={true}
              data-test="sign-in-submit"
              type="submit"
            />
            <AuthOr />
            <AuthSub>
              <p>
                Forgot your password?{' '}
                <Link
                  className="font-medium text-blue-500"
                  to="/auth/forgot-password"
                  data-test="link-forgot-password"
                >
                  Click here
                </Link>
              </p>
              <p>
                Don't have an account?{' '}
                <Link
                  className="font-medium text-blue-500"
                  to="/auth/sign-up"
                  data-test="link-sign-up"
                >
                  Sign up
                </Link>
              </p>
              <p>
                Account not confirmed?{' '}
                <Link
                  className="font-medium text-blue-500"
                  to="/auth/confirm-user"
                  data-test="link-confirm-user"
                >
                  Click here
                </Link>
              </p>
            </AuthSub>
          </AuthForm>
        )}
      </Formik>
    </AuthContainer>
  );
}
