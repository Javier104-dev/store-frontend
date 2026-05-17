import ForgotPasswordForm from '@/pages/auth/components/ForgotPasswordForm';
import { useAuthProvider } from '@/pages/auth/hooks/useAuthProvider';

export default function ForgotPassword() {
	const { handleForgotPassword, loadingState } = useAuthProvider();
	return (
		<div className="flex-1">
			<ForgotPasswordForm
				handleSubmit={handleForgotPassword}
				loading={loadingState.forgotPassword}
			/>
		</div>
	);
}
