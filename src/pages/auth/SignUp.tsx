import Loading from '@/components/ui/feedback/Loading';
import { UserQueryKeys } from '@/features/user/constants/user.queryKeys';
import type { IUserCountAttributes } from '@/features/user/interfaces/api/response/IUserCountAttributes';
import type { UserCount } from '@/features/user/interfaces/types/UserCount';
import { userService } from '@/features/user/services/user.service';
import useGet from '@/hooks/query/useGet';
import type { ISingleResponse } from '@/interfaces/api/IApiBaseResponse';
import SignUpForm from '@/pages/auth/components/SignUpForm';
import { useAuthProvider } from '@/pages/auth/hooks/useAuthProvider';
import { normalizeJsonApiItem } from '@/utils/jsonApi-normalizer';

export default function SignUp() {
	const { handleSignUp, loadingState } = useAuthProvider();

	const { data: usersCount, isLoading } = useGet<
		ISingleResponse<IUserCountAttributes>,
		UserCount
	>({
		queryKey: [UserQueryKeys.usersCount],
		queryFn: () => userService.getUsersCount(),
		select: normalizeJsonApiItem,
	});

	if (isLoading) {
		return (
			<div className="flex-1">
				<Loading />
			</div>
		);
	}

	return (
		<div className="flex-1">
			<SignUpForm
				handleSubmit={handleSignUp}
				loading={loadingState.signUp}
				signUpTitle={usersCount?.count === 0 ? 'Create super admin' : 'Sign up'}
			/>
		</div>
	);
}
