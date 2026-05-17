import ConfirmPasswordForm from '@/pages/auth/components/ConfirmPasswordForm';
import { useAuthProvider } from '@/pages/auth/hooks/useAuthProvider';

export default function ConfirmPassword() {
	const { loadingState, handleConfirmPassword } = useAuthProvider();
	return (
		<div className="flex-1">
			<ConfirmPasswordForm
				loading={loadingState.confirmPassword}
				handleSubmit={handleConfirmPassword}
			/>
		</div>
	);
}
