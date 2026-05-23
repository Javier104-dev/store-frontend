import ResendConfirmationCodeForm from '@/pages/auth/components/ResendConfirmationCodeForm';
import { useAuthProvider } from '@/pages/auth/hooks/useAuthProvider';

export default function ResendConfirmationCode() {
  const { handleResendConfirmationCode, loadingState } = useAuthProvider();
  return (
    <div className="flex-1">
      <ResendConfirmationCodeForm
        handleSubmit={handleResendConfirmationCode}
        loading={loadingState.resendConfirmationCode}
      />
    </div>
  );
}
