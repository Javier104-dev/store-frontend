import { type UseMutationResult, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface UseMutateOptions<TData, TVariables = void> {
  mutationFn: (variables: TVariables) => Promise<TData>;
  onSuccess?: (data: TData, variables: TVariables) => void;
  onMutate?: (variables: TVariables) => void;
  onError?: (error: AxiosError, variables: TVariables) => void;
}

const useMutate = <TData = unknown, TVariables = void>(
  options: UseMutateOptions<TData, TVariables>,
): UseMutationResult<TData, AxiosError, TVariables> => {
  const { mutationFn, onSuccess, onMutate, onError } = options;

  return useMutation<TData, AxiosError, TVariables>({
    mutationFn,
    onSuccess,
    onMutate,
    onError,
  });
};

export default useMutate;
