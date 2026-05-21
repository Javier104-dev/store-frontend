import ConfirmUserForm from '@/pages/auth/components/ConfirmUserForm';
import { useAuthProvider } from '@/pages/auth/hooks/useAuthProvider';

export default function ConfirmUser() {
	const { handleConfirmUser, loadingState } = useAuthProvider();
	return (
		<div className="flex-1">
			<ConfirmUserForm
				handleSubmit={handleConfirmUser}
				loading={loadingState.confirmUser}
			/>
		</div>
	);
}
