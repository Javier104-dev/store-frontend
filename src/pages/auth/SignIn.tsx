import SignInForm from '@/pages/auth/components/SignInForm';
import { useAuthProvider } from '@/pages/auth/hooks/useAuthProvider';

export default function SignIn() {
  const { handleSignIn, loadingState } = useAuthProvider();
  return (
    <div className="flex-1">
      <SignInForm handleSubmit={handleSignIn} loading={loadingState.signIn} />
    </div>
  );
}
