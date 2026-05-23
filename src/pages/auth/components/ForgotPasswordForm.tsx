import { Formik } from 'formik';
import { Link } from 'react-router-dom';

import Button from '@/components/ui/actions/Button';
import AuthContainer from '@/pages/auth/components/AuthContainer';
import AuthForm from '@/pages/auth/components/AuthForm';
import AuthInput from '@/pages/auth/components/AuthInput';
import AuthOr from '@/pages/auth/components/AuthOr';
import AuthSub from '@/pages/auth/components/AuthSub';
import AuthTitle from '@/pages/auth/components/AuthTitle';
import { usernameOnlySchema } from '@/pages/auth/schemas/username-only.schema';

type PropTypes = {
  handleSubmit: (username: string) => Promise<void>;
  loading: boolean;
};
export default function ForgotPasswordForm({
  handleSubmit,
  loading,
}: PropTypes) {
  const initialValues = {
    username: '',
  };
  return (
    <AuthContainer>
      <Formik
        initialValues={initialValues}
        validationSchema={usernameOnlySchema}
        onSubmit={({ username }) => handleSubmit(username)}
      >
        {({ errors, touched }) => (
          <AuthForm>
            <AuthTitle>Forgot Password</AuthTitle>
            <AuthInput
              name="username"
              label="Username"
              type="email"
              placeholder="user@example.com"
              error={!!errors.username}
              touched={touched.username}
              data-test="forgot-password-username"
            />
            <Button
              isLoading={loading}
              innerText={'Submit'}
              colorFill={true}
              data-test="forgot-password-submit"
              type="submit"
            />
            <AuthOr />
            <AuthSub>
              <p>
                Already have your code?{' '}
                <Link
                  className="font-medium text-blue-500"
                  to="/auth/confirm-password"
                  data-test="link-confirm-password"
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
