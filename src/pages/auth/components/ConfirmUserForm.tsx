import { Formik } from 'formik';
import { Link } from 'react-router-dom';

import Button from '@/components/ui/actions/Button';
import AuthContainer from '@/pages/auth/components/AuthContainer';
import AuthForm from '@/pages/auth/components/AuthForm';
import AuthInput from '@/pages/auth/components/AuthInput';
import AuthOr from '@/pages/auth/components/AuthOr';
import AuthSub from '@/pages/auth/components/AuthSub';
import AuthTitle from '@/pages/auth/components/AuthTitle';
import { useConfirmationLink } from '@/pages/auth/hooks/useConfirmationLink';
import { confirmUserSchema } from '@/pages/auth/schemas/confirm-user.schema';

type PropTypes = {
	handleSubmit: (username: string, code: string) => Promise<void>;
	loading: boolean;
};
export default function ConfirmUserForm({ handleSubmit, loading }: PropTypes) {
	useConfirmationLink();
	const initialValues = {
		username: '',
		code: '',
	};

	return (
		<AuthContainer>
			<Formik
				initialValues={initialValues}
				validationSchema={confirmUserSchema}
				onSubmit={({ username, code }) =>
					handleSubmit(username, code.toString())
				}
			>
				{({ errors, touched }) => (
					<AuthForm>
						<AuthTitle>Confirm user</AuthTitle>
						<AuthInput
							name="username"
							label="Username"
							type="email"
							placeholder="user@example.com"
							error={!!errors.username}
							touched={touched.username}
							data-test="confirm-user-username"
						/>
						<AuthInput
							name="code"
							label="Code"
							type="tel"
							placeholder="123456"
							error={!!errors.code}
							touched={touched.code}
							data-test="confirm-user-code"
						/>
						<Button
							isLoading={loading}
							innerText={'Submit'}
							colorFill={true}
							data-test="confirm-user-submit"
							type="submit"
						/>
						<AuthOr />
						<AuthSub>
							<p>
								Didn't receive your code?{' '}
								<Link
									className="font-medium text-blue-500"
									to="/auth/resend-confirmation-code"
									data-test="link-resend-confirmation-code"
								>
									Click here
								</Link>
							</p>
							<p>
								Already confirmed?{' '}
								<Link
									className="font-medium text-blue-500"
									to="/auth/sign-in"
									data-test="link-sign-in"
								>
									Sign in
								</Link>
							</p>
						</AuthSub>
					</AuthForm>
				)}
			</Formik>
		</AuthContainer>
	);
}
