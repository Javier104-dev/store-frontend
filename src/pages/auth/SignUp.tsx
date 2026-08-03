import Loading from '@/components/ui/feedback/Loading';
import { UserQueryKeys } from '@/features/user/constants/user.queryKeys';
import type { UserCount } from '@/features/user/interfaces/types/UserCount';
import { userService } from '@/features/user/services/user.service';
import useGet from '@/hooks/query/useGet';
import SignUpForm from '@/pages/auth/components/SignUpForm';
import { useAuthProvider } from '@/pages/auth/hooks/useAuthProvider';

export default function SignUp() {
  const { handleSignUp, loadingState } = useAuthProvider();

  const { data: usersCount, isLoading } = useGet<UserCount>({
    queryKey: [UserQueryKeys.usersCount],
    queryFn: () => userService.getUsersCount(),
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
